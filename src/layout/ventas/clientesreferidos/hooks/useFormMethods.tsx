import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ClientsReferrals } from "@app/types/ClientsReferrals";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import {
  INIT_DOCUMENTS,
  VALIDATION_OBJECTS_QUOTATION,
  VALIDATION_OBJECTS_GENERAL,
  VALIDATION_OBJECTS_ADDRESS,
  VALIDATION_OBJECTS_CONTACTOS,
  VALIDATION_OBJECTS_ALL,
} from "@app/constants/clientsReferrals";
import { omit, getYupError } from "@app/common";
import { ClientsReferralsControllers } from "@app/logic/backend/clientsReferrals";
import { ShowFetchResponseToast } from "@app/utils/DOM";
import { cleanBase64 } from "@app/common/format";
import { useFormik } from "formik";
import { OnChangeParams } from "@app/components/InputFile";
import { toast } from "react-toastify";
import { modalManager } from "@app/components/ModalComponent";
import QuestionCard from "@app/components/ModalComponent/modals/general/QuestionCard";
import SuccessModal from "@app/components/ModalComponent/modals/ventas//clientereferidos/SuccessModal";

import { VOBO_TYPE } from "@app/components/Cotizador/constants";

const TOTAL_CLIENT_TABS = 6;

// Custom hook para manejar un contador
export function useFormMethods(tpmClient: ClientsReferrals) {
  const [client, setClient] = useState(tpmClient);
  const [isSaved, setIsSaved] = useState(false);

  const isNew = useMemo(
    () => !client?.idagep_referido,
    [client?.idagep_referido]
  );
  const router = useRouter();
  const [disabledSave, setDisabledSave] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean[]>(() =>
    Array.from({ length: TOTAL_CLIENT_TABS }, () => !isNew)
  );

  //useEffect
  useEffect(() => {
    setClient(tpmClient);
    formik.setValues(tpmClient);
    handleQuotes();
  }, [tpmClient]);

  const documentoTipos = useMemo(
    () => INIT_DOCUMENTS.map((documento) => documento.documentoTipo),
    []
  );
  const validationSchema = VALIDATION_OBJECTS_ALL;

  const toggleDisabled = (index: number, force?: boolean | undefined) => {
    setDisabled((prevState) => {
      const newState = [...prevState];
      newState[index] = force !== undefined ? force : !newState[index];
      return newState;
    });
  };

  //handle of formik
  const handleSubmitGeneral = async (client: ClientsReferrals) => {
    setDisabledSave(true);
    const body = {
      ...omit(client, "documents", "resCotizacion", "estatus"),
      operacion: isNew ? "C" : "U",
    };
    const callCreateOrUpdate = isNew
      ? await ClientsReferralsControllers.create(body)
      : await ClientsReferralsControllers.update(body);

    const idagep_referido = isNew
      ? callCreateOrUpdate.response?.idagep_referido ?? 0
      : client.idagep_referido;

    const isSuccess =
      callCreateOrUpdate.isSuccess &&
      (callCreateOrUpdate.response?.idagep_referido ?? 0);

    if (
      ShowFetchResponseToast(callCreateOrUpdate, {
        setError: () => !isSuccess,
        setFailureTitle: (res) => res.response.mensaje,
        setSuccessTitle: () =>
          isNew
            ? callCreateOrUpdate.response.mensaje
            : `Cliente ${client.nombre} modificado correctamente`,
      })
    ) {
      if (idagep_referido) {
        setIsSaved(true);

        setClient({
          ...client,
          idagep_referido,
        });

        if (client.documents && client.documents.length) {
          const infoDocumentos = client.documents
            .filter(
              (f) => f.docBase64 && documentoTipos.includes(f.documentoTipo)
            )
            .map((x) => ({
              ...x,
              docBase64: x.docBase64 ? cleanBase64(x.docBase64) : "",
            }));

          if (infoDocumentos.length) {
            const res = await ClientsReferralsControllers.documentos({
              idagep_referido,
              infoDocumentos,
            });
            ShowFetchResponseToast(res, {
              setError: ({ response }) => response.status !== 200,
              setFailureTitle: ({ response }) =>
                response.data?.mensaje ??
                "Ha ocurrido un error al guardar los documentos",
              setSuccessTitle: () => "Documentos subidos correctamente",
            });
          }
        }

        if (isSuccess && isNew) {
          setTimeout(() => {
            router.back();
          }, 1000);
        }
      }

      setDisabledSave(false);
    }
  };
  ///Formik
  const formik = useFormik({
    initialValues: client,
    validationSchema: validationSchema,
    onSubmit: handleSubmitGeneral,
    validateOnChange: false,
    validate: async (values) => {
      let errors: any = {};
      let errorGeneral = false;
      const ERROR_MESSAGE = "Algunos campos deben ser completados.";

      const optionsValidation = { abortEarly: false };
      try {
        await validationSchema.validate(values, optionsValidation);
      } catch (err: any) {
        let tpmError: any = getYupError(err);
        errors = { ...errors, ...tpmError };
      }

      //Validaton general
      try {
        await VALIDATION_OBJECTS_GENERAL.validate(values, optionsValidation);
      } catch (err: any) {
        let tpmError: any = getYupError(err);
        errors = { ...errors, ...tpmError };
        errorGeneral = true;
      }
      if (errorGeneral) {
        toast.error(
          "Algunos campos de sección de General debe ser completados",
          DEFAULT_TOAST_CONFIGURATION
        );
        setActiveTab(0);
        return errors;
      }

      //Validaton direccion
      try {
        await VALIDATION_OBJECTS_ADDRESS.validate(values, optionsValidation);
      } catch (err: any) {
        let tpmError: any = getYupError(err);
        errors = { ...errors, ...tpmError };
        errorGeneral = true;
      }
      if (errorGeneral) {
        toast.error(
          "Algunos campos de sección de Dirección debe ser completados",
          DEFAULT_TOAST_CONFIGURATION
        );
        setActiveTab(1);
        return errors;
      }
      //Validaton contactos
      try {
        await VALIDATION_OBJECTS_CONTACTOS.validate(values, optionsValidation);
      } catch (err: any) {
        let tpmError: any = getYupError(err);
        errors.infoContactos = [tpmError];
        errorGeneral = true;
      }
      if (errorGeneral) {
        toast.error(
          "Algunos campos de sección Contactos debe ser completados",
          DEFAULT_TOAST_CONFIGURATION
        );
        setActiveTab(2);
        return errors;
      }
      //Validaton cotizacion
      try {
        await VALIDATION_OBJECTS_QUOTATION.validate(
          values,
          optionsValidation
        );
      } catch (err: any) {
        let tpmError: any = getYupError(err);
        errors.infoContactos = [tpmError];
        errorGeneral = true;
      }
      if (errorGeneral) {
        toast.error(
          "Algunos campos de sección Cotización debe ser completados",
          DEFAULT_TOAST_CONFIGURATION
        );
        setActiveTab(values.persona === "moral" ? 5 : 4);
        return errors;
      }

      //TOAST MESSAGES
      if (Object.keys({ ...errors }).length) {
        toast.error(ERROR_MESSAGE, DEFAULT_TOAST_CONFIGURATION);
      }
      return errors;
    },
  });

  useEffect(() => {
    setClient(formik.values);
  }, [formik.values]);

  useEffect(() => {
    const { infoCotizacion } = formik.values;
    if (
      infoCotizacion.giro &&
      infoCotizacion.familia &&
      infoCotizacion.adquiriente &&
      infoCotizacion.rollos
    ) {
      handleQuotes();
    }
  }, [formik.values.infoCotizacion]);

  //disableds
  const disabledSend = useMemo(() => {
    const { values } = formik;
    const representanteFiles = ["representante1Poder", "representante1INE"];
    const documentacionFiles = [
      "acta",
      "rfc",
      "ine",
      "estadoDeCuenta",
      "address",
    ];

    const tabGeneral: boolean =
      !values.nombre ||
      !values.email ||
      !values.infoComercio.rfc ||
      !values.infoComercio.paisConst ||
      !values.infoComercio.razonSocial ||
      !values.idagep_catgiro ||
      !values.infoComercio.fechaConst ||
      !values.infoComercio.telefono;

    const tabDireccion =
      !values.infoDomicilio.calle ||
      !values.infoDomicilio.colonia ||
      !values.infoDomicilio.numExt ||
      !values.infoDomicilio.municipio || //delegacion
      !values.infoDomicilio.codigoPostal ||
      !values.infoDomicilio.calle ||
      !values.infoDomicilio.estado;

    const tabContactos =
      !values.infoContactos[0].nombre ||
      !values.infoContactos[0].telefono ||
      !values.infoContactos[0].email;

    const tabRepresentante =
      !values.infoRepresentantes[0].nombre ||
      !values.infoRepresentantes[0].fechaNacimiento ||
      !values.infoRepresentantes[0].rfc ||
      !values.infoRepresentantes[0].curp ||
      !values.infoRepresentantes[0].pais ||
      !values.infoRepresentantes[0].numeroAcreditacion ||
      !(
        values.documents.filter(
          (f) => representanteFiles.includes(f.documentoTipo) && f.filename
        ).length == representanteFiles.length
      );

    const tabDocumentacion = !(
      values.documents.filter(
        (f) => documentacionFiles.includes(f.documentoTipo) && f.filename
      ).length == documentacionFiles.length
    );

    const tabCotizacon =
      !values.infoCotizacion.giro ||
      !values.infoCotizacion.familia ||
      !values.infoCotizacion.adquiriente ||
      !values.infoCotizacion.rollos ||
      ![
        VOBO_TYPE.ENVIAR_PARA_VOBO,
        VOBO_TYPE.ENVIAR_VOBO_PARA_REVISION,
        VOBO_TYPE.NEGADO,
      ].includes(values.resCotizacion.vobo as VOBO_TYPE);

    if (values.persona === "fisica") {
      return !(
        !tabGeneral &&
        !tabDireccion &&
        !tabContactos &&
        !tabDocumentacion &&
        !tabCotizacon &&
        isSaved
      );
    }
    if (values.persona === "moral") {
      return !(
        (
          !tabGeneral &&
          !tabDireccion &&
          !tabContactos &&
          !tabRepresentante &&
          !tabDocumentacion &&
          !tabCotizacon &&
          isSaved
        )
        //&& values.resCotizacion.vobo ==
      );
    }
    return false;
  }, [formik.values, isSaved]);

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
  };
  const handleSend = async () => {
    openModalQuestionSend();
  };
  const handleDelete = async () => {
    openModalQuestionDelete();
  };

  const handleQuotes = async () => {
    const res = await ClientsReferralsControllers.cotizador(
      formik.values.infoCotizacion
    );
    if (res) {
      formik.setFieldValue("resCotizacion", res.response);
    }
  };
  const handleDocumentChange = (value: OnChangeParams) => {
    const newDocument = formik.values.documents.find(
      (x) => x.documentoTipo === value.id
    )
      ? formik.values.documents.map((doc) => {
          if (doc.documentoTipo === value.id)
            return {
              ...doc,
              docBase64: value.value,
              extension: value.extension,
              filename: value.filename,
            };
          return doc;
        })
      : INIT_DOCUMENTS;

    formik.setFieldValue("documents", newDocument);
  };

  const handleSave = () => {
    formik.handleSubmit();
  };

  ///openModal
  const openModalQuestionSend = async () => {
    await modalManager.show(
      QuestionCard,
      {
        title: "¿Desea continuar?",
        description:
          "La información enviada ya no podrá ser modificada en este Módulo, se podrán hacer cambios al contactar a Operaciones.",
        handleAccept: async (handleClose) => {
          const res = await ClientsReferralsControllers.enviar({
            idagep_referido: client.idagep_referido,
          });
          if (
            ShowFetchResponseToast(res, {
              setError: (res) => res.status !== 200,
              setFailureTitle: () =>
                "Ha ocurrido un error al enviar la información",
              setSuccessTitle: () =>
                "Cliente referido se ha enviado exitosamente",
            })
          ) {
            handleClose(false);
            openModalSuccess();
          }
        },
        handleCancel: (handleClose) => {
          handleClose(true);
        },
        buttonAcceptProps: {
          className: "w-[200px] h-[48px] bg-black-1",
          label: "Confirmar",
        },
        buttonCancelProps: {
          className: "w-[200px] h-[48px] bg-grey-1",
          label: "Regresar",
        },
      },
      "dashboard/ventas/clientesreferidos/form"
    );
  };

  const openModalQuestionDelete = async () => {
    await modalManager.show(
      QuestionCard,
      {
        title: "¿Desea continuar?",
        description:
          "El cliente será eliminado y no podrá recuperar la información.",
        handleAccept: async (handleClose) => {
          const res = await ClientsReferralsControllers.deletes({
            idagep_referido: client.idagep_referido,
          });
          if (
            ShowFetchResponseToast(res, {
              setError: (res) => res.status !== 200,
              setFailureTitle: () =>
                "Ha ocurrido un error al eliminar la información",
              setSuccessTitle: () =>
                "Cliente referido se ha eliminado exitosamente",
            })
          ) {
            handleClose(false);
          }
        },
        handleCancel: (handleClose) => {
          handleClose(true);
        },
        buttonAcceptProps: {
          className: "w-[200px] h-[48px] bg-black-1",
          label: "Confirmar",
        },
        buttonCancelProps: {
          className: "w-[200px] h-[48px] bg-grey-1",
          label: "Regresar",
        },
      },
      "dashboard/ventas/clientesreferidos/form"
    );
  };

  const openModalSuccess = async () => {
    await modalManager.show(
      SuccessModal,
      "dashboard/ventas/clientesreferidos/form"
    );
  };

  return {
    client,
    toggleDisabled,
    activeTab,
    setActiveTab,
    setClient,
    formik,
    validationSchema,
    //actions
    handleDocumentChange,
    handleTabChange,
    handleSave,
    handleSend,
    handleDelete,
    handleQuotes,
    //boolena
    isNew,
    disabled,
    disabledSend,
    disabledSave,
  };
}

export default useFormMethods;
