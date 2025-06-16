import { useEffect, useMemo, useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  Client,
  ClientCreateBody,
  ClientFinance,
  ClientDocuments,
} from "@app/types/Clients";
import { UserContext } from "@app/context";
import { ClientFulfillment } from "@app/types/Dossiers";
import {
  INIT_FINANCE,
  INIT_DOCUMENTS,
  INIT_DOCUMENTS_ADDITIONAL,
  VALIDATION_CLIENT,
  VALIDATION_CLIENT_TAB_GENERAL,
  VALIDATION_CLIENT_TAB_OPERATIONS,
  VALIDATION_CLIENT_INFO_CONTACTOS,
  VALIDATION_CLIENT_INFO_REPRESENTANTES,
  VALIDATION_CLIENT_MSI,
  VALIDATION_CLIENT_TAB_DOCUMENTS_INFO_DOCUMENTS,
  VALIDATION_CLIENT_TAB_GENERAL_INFO_DOCUMENTS,
} from "@app/constants/client";
import { omit, getYupError, isEmpty } from "@app/common";
import { ClientsControllers } from "@app/logic/backend/clients";
import { ShowFetchResponseToast } from "@app/utils/DOM";
import { cleanBase64 } from "@app/common/format";
import { MenuItems } from "@app/components/Nav/MenuItems";
import { Field, useFormik } from "formik";
import { OnChangeParams } from "@app/components/InputFile";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { DateFormat } from "@app/common/format";
import { ClientsReferralsControllers } from "@app/logic/backend/clientsReferrals";
import { getNameField } from "./form/utils";
import { PREFIX_FILE } from "./form/FormItemInputFile";
export type FormClientes = ReturnType<typeof useFormClientes>;
const TOTAL_CLIENT_TABS = 7;

// Custom hook para manejar un contador
export function useFormClientes(tpmClient: Client) {
  const [client, setClient] = useState(tpmClient);
  const user = useContext(UserContext);

  const [finances, setFinances] = useState<ClientFinance>(INIT_FINANCE);
  const isNew = useMemo(() => !client?.email, [client?.email]);

  const [clientFulfillment, setClientFulfillment] = useState<ClientFulfillment>(
    {}
  );
  const canSaveFulfillment = useMemo(
    () =>
      isEmpty(omit(clientFulfillment, "email", "idagep_empresa", "estatus")),
    [clientFulfillment]
  );

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number | undefined>(0);
  const [disabled, setDisabled] = useState<boolean[]>(() =>
    Array.from({ length: TOTAL_CLIENT_TABS }, () => !isNew)
  );

  useEffect(() => {
    formik.setValues(client);
    handleMsiEmpty("terminal");
    handleMsiEmpty("terminalAMEX");
    handleMsiEmpty("ventaLinea");
    handleMsiEmpty("ventaLineaAMEX");
  }, [client]);

  //useMemos

  const canFulfillment = useMemo(() => {
    if (isNew) return false;
    if (activeTab == 99) return false;
    return true;
  }, [isNew, activeTab]);

  const validationSchema = useMemo(() => {
    setFinances(INIT_FINANCE);
    if (isNew) return VALIDATION_CLIENT;

    return VALIDATION_CLIENT;
  }, [activeTab]);

  //handles
  const handleSubmitGeneral = async (client: Client) => {
    const body: ClientCreateBody = {
      ...omit(
        client,
        "idagep_catpago",
        "idagep_empresa",
        "3DS",
        "fechaEnt",
        "fechaMod",
        "idagep_catgiro",
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
      persona: client.persona,
      idagep_usuarios: user.user.persona.idagep_usuarios,
      terminal: {
        ...client.terminal,
        idagep_cat_producto: 1,
        idagep_adquiriente: client.terminal.idagep_adquiriente ?? 0,
        idagep_tipo_tasa: client.terminal.idagep_tipo_tasa ?? 0,
        intercambio3: client.terminal.intercambio3 ?? 0,
        intercambio6: client.terminal.intercambio6 ?? 0,
        intercambio9: client.terminal.intercambio9 ?? 0,
        intercambio12: client.terminal.intercambio12 ?? 0,
        intercambio18: client.terminal.intercambio18 ?? 0,
        intercambio24: client.terminal.intercambio24 ?? 0,
        comision3: client.terminal.comision3 ?? 0,
        comision6: client.terminal.comision6 ?? 0,
        comision9: client.terminal.comision9 ?? 0,
        comision12: client.terminal.comision12 ?? 0,
        comision18: client.terminal.comision18 ?? 0,
        comision24: client.terminal.comision24 ?? 0,
        comisionTD: client.terminal.comisionTD ?? 0,
        comisionTC: client.terminal.comisionTC ?? 0,
        comisionTI: client.terminal.comisionTI ?? 0,
        intercambioTD: client.terminal.intercambioTD ?? 0,
        intercambioTC: client.terminal.intercambioTC ?? 0,
        intercambioTI: client.terminal.intercambioTI ?? 0,
        estatus: 1, //TODO validar que exista
      },
      terminalAMEX: {
        ...client.terminalAMEX,
        idagep_cat_producto: 2,
        idagep_adquiriente: client.terminalAMEX.idagep_adquiriente ?? 0,
        idagep_tipo_tasa: client.terminalAMEX.idagep_tipo_tasa ?? 0,
        intercambio3: client.terminalAMEX.intercambio3 ?? 0,
        intercambio6: client.terminalAMEX.intercambio6 ?? 0,
        intercambio9: client.terminalAMEX.intercambio9 ?? 0,
        intercambio12: client.terminalAMEX.intercambio12 ?? 0,
        intercambio18: client.terminalAMEX.intercambio18 ?? 0,
        intercambio24: client.terminalAMEX.intercambio24 ?? 0,
        comision3: client.terminalAMEX.comision3 ?? 0,
        comision6: client.terminalAMEX.comision6 ?? 0,
        comision9: client.terminalAMEX.comision9 ?? 0,
        comision12: client.terminalAMEX.comision12 ?? 0,
        comision18: client.terminalAMEX.comision18 ?? 0,
        comision24: client.terminalAMEX.comision24 ?? 0,
        comisionTD: client.terminalAMEX.comisionTD ?? 0,
        comisionTC: client.terminalAMEX.comisionTC ?? 0,
        comisionTI: client.terminalAMEX.comisionTI ?? 0,
        intercambioTD: client.terminalAMEX.intercambioTD ?? 0,
        intercambioTC: client.terminalAMEX.intercambioTC ?? 0,
        intercambioTI: client.terminalAMEX.intercambioTI ?? 0,
        estatus: 1, //TODO validar que exista
      },
      ventaLinea: {
        ...client.ventaLinea,
        idagep_cat_producto: 3,
        idagep_adquiriente: client.ventaLinea.idagep_adquiriente ?? 0,
        idagep_tipo_tasa: client.ventaLinea.idagep_tipo_tasa ?? 0,
        intercambio3: client.ventaLinea.intercambio3 ?? 0,
        intercambio6: client.ventaLinea.intercambio6 ?? 0,
        intercambio9: client.ventaLinea.intercambio9 ?? 0,
        intercambio12: client.ventaLinea.intercambio12 ?? 0,
        intercambio18: client.ventaLinea.intercambio18 ?? 0,
        intercambio24: client.ventaLinea.intercambio24 ?? 0,
        comision3: client.ventaLinea.comision3 ?? 0,
        comision6: client.ventaLinea.comision6 ?? 0,
        comision9: client.ventaLinea.comision9 ?? 0,
        comision12: client.ventaLinea.comision12 ?? 0,
        comision18: client.ventaLinea.comision18 ?? 0,
        comision24: client.ventaLinea.comision24 ?? 0,
        comisionTD: client.ventaLinea.comisionTD ?? 0,
        comisionTC: client.ventaLinea.comisionTC ?? 0,
        comisionTI: client.ventaLinea.comisionTI ?? 0,
        intercambioTD: client.ventaLinea.intercambioTD ?? 0,
        intercambioTC: client.ventaLinea.intercambioTC ?? 0,
        intercambioTI: client.ventaLinea.intercambioTI ?? 0,
        estatus: 1, //TODO validar que exista
      },
      ventaLineaAMEX: {
        ...client.ventaLineaAMEX,
        idagep_adquiriente: client.ventaLineaAMEX.idagep_adquiriente ?? 0,
        idagep_tipo_tasa: client.ventaLineaAMEX.idagep_tipo_tasa ?? 0,
        idagep_cat_producto: 4,
        intercambio3: client.ventaLineaAMEX.intercambio3 ?? 0,
        intercambio6: client.ventaLineaAMEX.intercambio6 ?? 0,
        intercambio9: client.ventaLineaAMEX.intercambio9 ?? 0,
        intercambio12: client.ventaLineaAMEX.intercambio12 ?? 0,
        intercambio18: client.ventaLineaAMEX.intercambio18 ?? 0,
        intercambio24: client.ventaLineaAMEX.intercambio24 ?? 0,
        comision3: client.ventaLineaAMEX.comision3 ?? 0,
        comision6: client.ventaLineaAMEX.comision6 ?? 0,
        comision9: client.ventaLineaAMEX.comision9 ?? 0,
        comision12: client.ventaLineaAMEX.comision12 ?? 0,
        comision18: client.ventaLineaAMEX.comision18 ?? 0,
        comision24: client.ventaLineaAMEX.comision24 ?? 0,
        comisionTD: client.ventaLineaAMEX.comisionTD ?? 0,
        comisionTC: client.ventaLineaAMEX.comisionTC ?? 0,
        comisionTI: client.ventaLineaAMEX.comisionTI ?? 0,
        intercambioTD: client.ventaLineaAMEX.intercambioTD ?? 0,
        intercambioTC: client.ventaLineaAMEX.intercambioTC ?? 0,
        intercambioTI: client.ventaLineaAMEX.intercambioTI ?? 0,
        estatus: 1, //TODO validar que exista
      },
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
        setError: (res) => res.response?.status === 200 && res.response.mensaje === 'Correo duplicado' || res.response?.status !== 200,
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
          .filter((f) => f.docBase64)
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

      if (isNew) router.back();
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
        //contactos
        if (
          tpmClient.persona === "moral" &&
          values.infoContactos &&
          values.infoContactos.length > 0
        ) {
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

        if (
          tpmClient.persona === "moral" && // Ahora los representantes son exclusivos para personas morales
          values.infoRepresentantes &&
          values.infoRepresentantes.length > 0
        ) {
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
      /* if ((isNew || activeTab === 1) && tpmClient.persona === "moral") {
        try {
          await VALIDATION_CLIENT_TAB_DOCUMENTS_INFO_DOCUMENTS.validate(
            documents,
            optionsValidation
          );
        } catch (err: any) {
          let tpmError: any = getYupError(err);
          errors.documents = tpmError;
        }
      } */

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
        if (tpmClient.persona === "moral") {
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
            "Algunos campos deben ser completados",
            DEFAULT_TOAST_CONFIGURATION
          );
          setActiveTab(0);
          return errors;
        }

        if (tpmClient.persona === "moral") {
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

  const handleMsiEmpty = (
    item: keyof Pick<
      Client,
      "terminal" | "terminalAMEX" | "ventaLinea" | "ventaLineaAMEX"
    >
  ) => {
    const FIELD = getNameField(item);
    const adquiriente = formik.values[item];

    if (!adquiriente.comision3)
      formik.setFieldValue(FIELD.COMISION_3, undefined);
    if (!adquiriente.comision6)
      formik.setFieldValue(FIELD.COMISION_6, undefined);
    if (!adquiriente.comision9)
      formik.setFieldValue(FIELD.COMISION_9, undefined);
    if (!adquiriente.comision12)
      formik.setFieldValue(FIELD.COMISION_12, undefined);
    if (!adquiriente.comision18)
      formik.setFieldValue(FIELD.COMISION_18, undefined);
    if (!adquiriente.comision24)
      formik.setFieldValue(FIELD.COMISION_24, undefined);
    if (!adquiriente.intercambio3)
      formik.setFieldValue(FIELD.INTERCAMBIO_3, undefined);
    if (!adquiriente.intercambio6)
      formik.setFieldValue(FIELD.INTERCAMBIO_6, undefined);
    if (!adquiriente.intercambio9)
      formik.setFieldValue(FIELD.INTERCAMBIO_9, undefined);
    if (!adquiriente.intercambio12)
      formik.setFieldValue(FIELD.INTERCAMBIO_12, undefined);
    if (!adquiriente.intercambio18)
      formik.setFieldValue(FIELD.INTERCAMBIO_18, undefined);
    if (!adquiriente.intercambio24)
      formik.setFieldValue(FIELD.INTERCAMBIO_24, undefined);
  };

  const handleOnDocumentChange = (value: OnChangeParams) => {
    let tmpDocuments: ClientDocuments[] = [...formik.values.documents];
    const findIndex = tmpDocuments.findIndex(
      (x) => x.documentoTipo === value.id
    );

    const newData = {
      docBase64: value.value,
      extension: value.extension,
      filename: value.filename,
      documentoTipo: value.id ?? "",
    };

    if (findIndex >= 0) {
      tmpDocuments[findIndex] = {
        ...tmpDocuments[findIndex],
        ...newData,
      };
    } else {
      const display =
        INIT_DOCUMENTS_ADDITIONAL.display +
        " " +
        newData.documentoTipo.replace(PREFIX_FILE, "");

      tmpDocuments.push({
        ...INIT_DOCUMENTS_ADDITIONAL,
        ...newData,
        display,
      });
    }

    formik.setFieldValue("documents", tmpDocuments);
  };

  const toggleDisabled = (index: number, force?: boolean | undefined) => {
    setDisabled((prevState) => {
      const newState = [...prevState];
      newState[index] = force !== undefined ? force : !newState[index];
      return newState;
    });
  };

  const handleOnFinance = (start: Date, end: Date) => {
    ClientsControllers.finance({
      idagep_empresa: client.idagep_empresa,
      fechaFin: DateFormat.day.end(end, true).toSimpleFormatString(),
      fechaInicio: DateFormat.day.start(start, true).toSimpleFormatString(),
    }).then((response) => {
      setFinances(response.response);
    });
  };

  const handleOnChangeFinaceCheck = (estatus: number) => {
    ClientsControllers.updateCheck({
      idagep_empresa: client.idagep_empresa,
      estatus: estatus,
    });
  };

  useEffect(() => {
    const { infoCotizacion } = formik.values;
    if (
      infoCotizacion &&
      infoCotizacion.giro &&
      infoCotizacion.familia &&
      infoCotizacion.adquiriente &&
      infoCotizacion.rollos
    ) {
      handleQuotes();
    }
  }, [formik.values.infoCotizacion]);

  const handleQuotes = async () => {
    const res = await ClientsReferralsControllers.cotizador(
      formik.values.infoCotizacion
    );
    if (res) {
      formik.setFieldValue("resCotizacion", res.response);
    }
  };
  return {
    isNew,
    client,
    finances,
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
    handleOnFinance,
    handleOnChangeFinaceCheck,
    validationSchema,
  };
}
