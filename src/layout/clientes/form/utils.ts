

type actionsOptionsType = {
  label: string;
  value: string;
}[];

export const actionsOptions: actionsOptionsType = [
  { label: "Crear depósito", value: "createDeposit" },
];

export const getNameField = (FIELD: string) => {
  return {
    IDAGEP_TIPO_TASA: `${FIELD}.idagep_tipo_tasa`,
    IDAGEP_CAT_PRODUCTO: `${FIELD}.idagep_cat_producto`,
    IDAGEP_ADQUIRIENTE: `${FIELD}.idagep_adquiriente`,
    AFILIACION: `${FIELD}.afiliacion`,
    FIID: `${FIELD}.fiid`,
    INTERCAMBIO_TD: `${FIELD}.intercambioTD`,
    INTERCAMBIO_TC: `${FIELD}.intercambioTC`,
    INTERCAMBIO_TI: `${FIELD}.intercambioTI`,
    COMISION_TD: `${FIELD}.comisionTD`,
    COMISION_TC: `${FIELD}.comisionTC`,
    COMISION_TI: `${FIELD}.comisionTI`,
    MSI: `${FIELD}.msi`,
    MSI_3: `${FIELD}.msi3`,
    MSI_6: `${FIELD}.msi6`,
    MSI_9: `${FIELD}.msi9`,
    MSI_12: `${FIELD}.msi12`,
    MSI_18: `${FIELD}.msi18`,
    MSI_24: `${FIELD}.msi24`,
    INTERCAMBIO_3: `${FIELD}.intercambio3`,
    INTERCAMBIO_6: `${FIELD}.intercambio6`,
    INTERCAMBIO_9: `${FIELD}.intercambio9`,
    INTERCAMBIO_12: `${FIELD}.intercambio12`,
    INTERCAMBIO_18: `${FIELD}.intercambio18`,
    INTERCAMBIO_24: `${FIELD}.intercambio24`,
    COMISION_3: `${FIELD}.comision3`,
    COMISION_6: `${FIELD}.comision6`,
    COMISION_9: `${FIELD}.comision9`,
    COMISION_12: `${FIELD}.comision12`,
    COMISION_18: `${FIELD}.comision18`,
    COMISION_24: `${FIELD}.comision24`,
    MINIMO_3: `${FIELD}.minimo3`,
    MINIMO_6: `${FIELD}.minimo6`,
    MINIMO_9: `${FIELD}.minimo9`,
    MINIMO_12: `${FIELD}.minimo12`,
    MINIMO_18: `${FIELD}.minimo18`,
    MINIMO_24: `${FIELD}.minimo24`,
    ESTATUS: `${FIELD}.estatus`,
  };
};
