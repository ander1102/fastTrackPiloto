import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Client, ClientCreateBody } from "@app/types/Clients";
import { ClientFulfillment } from "@app/types/Dossiers";
import {
  INIT_DOCUMENTS,
  VALIDATION_CLIENT,
  VALIDATION_CLIENT_TAB_GENERAL,
  VALIDATION_CLIENT_TAB_DOCUMENTATIONS,
  VALIDATION_CLIENT_TAB_OPERATIONS,
  VALIDATION_CLIENT_INFO_CONTACTOS,
  VALIDATION_CLIENT_INFO_REPRESENTANTES,
  VALIDATION_CLIENT_MSI,
  VALIDATION_CLIENT_TAB_DOCUMENTS_INFO_DOCUMENTS,
  VALIDATION_CLIENT_TAB_GENERAL_INFO_DOCUMENTS,
} from "@app/constants/client";
import { omit, getYupError, nestObject,isEmpty } from "@app/common";
import { ClientsControllers } from "@app/logic/backend/clients";
import { DossiersControllers } from "@app/logic/backend/dossiers";
import { ShowFetchResponseToast } from "@app/utils/DOM";
import { cleanBase64 } from "@app/common/format";
import { MenuItems } from "@app/components/Nav/MenuItems";
import { modalManager } from "@app/components/ModalComponent";
import { useFormik } from "formik";
import { OnChangeParams } from "@app/components/InputFile";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import FulfillmentReasons from "@app/components/ModalComponent/modals/fulfillments/FulfillmentReasons";
import useEffectAsync from "@app/hooks/useEffectAsync";
// Custom hook para manejar un contador
export function useFormClientes(tpmClient: Client) {
  const [client, setClient] = useState(tpmClient);
  const [countTimes, setCountTimes] = useState<number>(0);
  
  const isNew = useMemo(() => !client?.email, [client?.email]);
  const idagep_empresa = useMemo(
    () => client.idagep_empresa ?? 0,
    [client.idagep_empresa]
  );
  const [clientFulfillment, setClientFulfillment] = useState<ClientFulfillment>(
    {}
  );
  const canSaveFulfillment = useMemo(() => isEmpty(omit(clientFulfillment,'email','idagep_empresa','estatus')), [clientFulfillment]);

  const router = useRouter();
  const documentoTipos = useMemo(
    () => INIT_DOCUMENTS.map((documento) => documento.documentoTipo),
    []
  );
  const [activeTab, setActiveTab] = useState<number | undefined>(0);
  const [disabled, setDisabled] = useState<boolean[]>(
    Array.from({ length: 2 }, () => false)
  );

  //Use Efects
  useEffectAsync(async () => {
    if (!isNew) {
      toggleDisabled(0, true);
      toggleDisabled(1, true);
      toggleDisabled(3, true);
      handleMsiEmpty();

    }
  }, []);

  const handleMsiEmpty = ()=>{

  }


  useEffectAsync(async () => {
    if (idagep_empresa) {
      const responseFulfillment = await DossiersControllers.get({
        idagep_empresa,
      });
      if (
        responseFulfillment &&
        responseFulfillment.response &&
        responseFulfillment.response.data
      ) {
        setClientFulfillment({
          idagep_empresa,
          ...responseFulfillment.response.data,
        });
        setCountTimes(0);
      }
    }
  }, [idagep_empresa]);



  useEffect(() => {
    formik.setValues(client);
  }, [client]);

  useEffect(() => {
    setCountTimes((prevValue) => prevValue + 1);
    if (
      Object.keys(clientFulfillment).length > 0 &&
      idagep_empresa &&
      countTimes
    ) {
      DossiersControllers.update(clientFulfillment);
    }
    if (clientFulfillment) {
      const errors = {};
      for (const propiedad in clientFulfillment) {
        if (propiedad.endsWith("Reason")) {
          const propiedadOriginal = propiedad.slice(0, -6); // Remover "Reason"
          (errors as any)[propiedadOriginal] =
            "* Favor de corregir esta información";
        }
      }

      if (activeTab == 99) {
        const tpmError = nestObject(errors);
        formik.setErrors(tpmError);
      }
    }
  }, [clientFulfillment]);

  //useMemos
  const hasReasons = useMemo(() => {
    return Object.values(clientFulfillment).some((item) => item === false);
  }, [clientFulfillment]);

  const canFulfillment = useMemo(() => {
    if (isNew) return false;
    if (activeTab == 99) return false;
    return true;
  }, [isNew, activeTab]);

  const validationSchema = useMemo(() => {
    if (isNew) return VALIDATION_CLIENT;
    if (activeTab === 0) return VALIDATION_CLIENT_TAB_GENERAL;
    if (activeTab === 1) return VALIDATION_CLIENT_TAB_DOCUMENTATIONS;
    if (activeTab === 2) return VALIDATION_CLIENT_TAB_OPERATIONS;
    return VALIDATION_CLIENT;
  }, [activeTab]);

  //handles
  const handleSubmitGeneral = async (client: Client) => {
    const body: ClientCreateBody = {
      ...omit(
        client,
        "idagep_empresa",
        "3DS",
        "fechaEnt",
        "fechaMod",
        "idagep_catgiro",
        "idagep_catpago",
        "documents"
      ),
      minimo3DS: client.minimo3DS ?? 0,
      ticketPromedioMensual: client.ticketPromedioMensual ?? 0,
      porcetaje: client.porcetaje ?? 0,

      infoOperaciones: {
        ...client.infoOperaciones,
        ventaMensual: client.infoOperaciones.ventaMensual ?? 0,
        ticketPromedio: client.infoOperaciones.ticketPromedio ?? 0,
        ticketAlto: client.infoOperaciones.ticketAlto ?? 0,
      },

      emailUsuario: client.email,
      id3DS: client["3DS"],
      nombreUsuario: client.nombre,
      accesos: MenuItems.filter((x) => !x.subRoute && !x.admin).map(
        (access) => ({
          create: true,
          delete: true,
          read: true,
          update: true,
          departamento: access.keyname,
        })
      ),
    };

    await ClientsControllers.createReserveFund({
      idagep_empresa: client.idagep_empresa,
      fondoActivo: client.fondoActivo ? 1 : 0, //1 - ON, 0 OFF ,
      porcentaje:
        (client.porcetaje as number) > 100 ? 100 : (client.porcetaje as number),
      operacion: "C", // debería usarse 'U' para este update, pero de manera temporal usar 'C'
    });

    const res = isNew
      ? await ClientsControllers.add(body)
      : await ClientsControllers.update({
          ...omit(body, "accesos"),
          idagep_empresa: client.idagep_empresa,
          idagep_catgiro: client.idagep_catgiro,
          idagep_catpago: client.idagep_catpago,
        });

    if (
      ShowFetchResponseToast(res, {
        setError: (res) => res.response?.status !== 200,
        setFailureTitle: (res) =>
          res.response?.mensaje ??
          "Ha ocurrido un error al guardar la información",
        setSuccessTitle: () =>
          isNew
            ? "Cliente agregado correctamente"
            : `Cliente ${client.nombre} modificado correctamente`,
      })
    ) {
      const idagep_empresa = isNew
        ? res.response.idagep_empresa
        : client.idagep_empresa;

      if (idagep_empresa && client.documents && client.documents.length) {
        const infoDocumentos = client.documents
          .filter(
            (f) => f.docBase64 && documentoTipos.includes(f.documentoTipo)
          )
          .map((x) => ({
            ...x,
            docBase64: x.docBase64 ? cleanBase64(x.docBase64) : "",
          }));

        if (infoDocumentos.length) {
          const uploadFiles = await ClientsControllers.uploadDocuments({
            idagep_empresa,
            infoDocumentos,
          });

          ShowFetchResponseToast(uploadFiles, {
            setError: (res) => res.response?.status !== 200,
            setFailureTitle: (res) =>
              res.response?.data?.mensaje ??
              "Ha ocurrido un error al guardar los documentos",
            setSuccessTitle: () => "Documentos subidos correctamente",
          });
        }
      }
      if (activeTab != 99) {
        router.back();
      }
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
      const documents = values.documents.reduce((acc: any, documento: any) => {
        acc[documento.documentoTipo] = documento.filename;
        return acc;
      }, {});

      try {
        await validationSchema.validate(values, optionsValidation);
      } catch (err: any) {
        let tpmError: any = getYupError(err);
        errors = { ...errors, ...tpmError };
      }

      //TAB GENERAL
      if (isNew || activeTab === 0) {
        try {
          await VALIDATION_CLIENT_TAB_GENERAL_INFO_DOCUMENTS.validate(
            documents,
            optionsValidation
          );
        } catch (err: any) {
          let tpmError: any = getYupError(err);
          errors.documents = tpmError;
          errorGeneral = true;
        }
        //contactos
        if (values.infoContactos && values.infoContactos.length > 0) {
          try {
            await VALIDATION_CLIENT_INFO_CONTACTOS.validate(
              values.infoContactos[0],
              optionsValidation
            );
          } catch (err: any) {
            let tpmError: any = getYupError(err);
            errors.infoContactos = [tpmError];
            errorGeneral = true;
          }
        }

        //representantes

        if (values.infoRepresentantes && values.infoRepresentantes.length > 0) {
          try {
            await VALIDATION_CLIENT_INFO_REPRESENTANTES.validate(
              values.infoRepresentantes[0],
              optionsValidation
            );
          } catch (err: any) {
            let tpmError: any = getYupError(err);
            errors.infoRepresentantes = [tpmError];
            errorGeneral = true;
          }
        }
      }

      //TAB DOCUMENTATION
      if (isNew || activeTab === 1) {
        try {
          await VALIDATION_CLIENT_TAB_DOCUMENTS_INFO_DOCUMENTS.validate(
            documents,
            optionsValidation
          );
        } catch (err: any) {
          let tpmError: any = getYupError(err);
          errors.documents = tpmError;
        }
      }

      //TAB OPERATION
      if (isNew || activeTab === 2) {
        //MSI
        if (values.msi) {
          try {
            await VALIDATION_CLIENT_MSI.validate(values, optionsValidation);
          } catch (err: any) {
            toast.error(err.message, DEFAULT_TOAST_CONFIGURATION);
            return err;
          }
        }
      }

      //Nuevo
      if (isNew) {
        try {
          await VALIDATION_CLIENT_TAB_GENERAL_INFO_DOCUMENTS.validate(
            documents,
            optionsValidation
          );
        } catch (err: any) {
          let tpmError: any = getYupError(err);
          errors.documents = tpmError;
          errorGeneral = true;
        }

        //Validaton general
        try {
          await VALIDATION_CLIENT_TAB_GENERAL.validate(
            values,
            optionsValidation
          );
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

        //Validar documentos
        try {
          await VALIDATION_CLIENT_TAB_DOCUMENTS_INFO_DOCUMENTS.validate(
            documents,
            optionsValidation
          );
        } catch (err: any) {
          let tpmError: any = getYupError(err);
          errors.documents = tpmError;
          toast.error(
            "Algunos campos de la sección de Documentación debe ser completados",
            DEFAULT_TOAST_CONFIGURATION
          );
          setActiveTab(1);
          return errors;
        }

        //validar operaciones
        try {
          await VALIDATION_CLIENT_TAB_OPERATIONS.validate(values);
        } catch (err: any) {
          toast.error(
            "Algunos campos de la sección de Operaciones deben ser completados",
            DEFAULT_TOAST_CONFIGURATION
          );

          setActiveTab(2);
          let tpmError: any = getYupError(err);
          errors.documents = { ...errors, ...tpmError };
          return errors;
        }
      }

      if (activeTab == 99) {
      }

      //TOAST MESSAGES
      if (Object.keys({ ...errors }).length) {
        toast.error(ERROR_MESSAGE, DEFAULT_TOAST_CONFIGURATION);
        return errors;
      }

      return errors;
    },
  });

  //handle
  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
  };

  const handleOnReasons = async () => {
    if (hasReasons) {
      setCountTimes(0)
      await modalManager.show(FulfillmentReasons, { item: clientFulfillment });
      
    } else {
      // 1 - Todo validado
      await DossiersControllers.update({
        ...clientFulfillment,
        estatus: 1,
      });
      toast.success(
        "El cliente ha sido validado correctamente ",
        DEFAULT_TOAST_CONFIGURATION
      );
    }
  };

  const handleOnDocumentChange = (value: OnChangeParams) => {
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

  const toggleDisabled = (index: number, force?: boolean | undefined) => {
    setDisabled((prevState) => {
      const newState = [...prevState];
      newState[index] = force !== undefined ? force : !newState[index];
      return newState;
    });
  };

  return {
    isNew,
    client,
    hasReasons,
    toggleDisabled,
    disabled,
    activeTab,
    setActiveTab,
    setClient,
    canSaveFulfillment,
    canFulfillment,
    formik,
    clientFulfillment,
    setClientFulfillment,
    handleOnDocumentChange,
    handleTabChange,
    handleOnReasons,
  };
}
