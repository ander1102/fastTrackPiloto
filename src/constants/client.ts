import * as Yup from "yup";
import {
  Client,
  ClientAddress,
  ClientCommerce,
  ClientContacts,
  ClientRepresents,
  ClientDocuments,
  ClientOperations,
  ClientExcelColumns,
  ClientFinance,
  ClientTypeObj,
  ClientAdquiriente,
  ORIGEN_CLIENT_TYPE,
} from "@app/types/Clients";
import {
  INIT_QUOTATION,
  INIT_RES_QUOTATION,
} from "@app/constants/clientsReferrals";
import { DropdownOptions } from "@app/types/Form";
import { ExcelOptions, ExcelCell } from "@app/types/Excel";
import { PREFIX_FILE } from "@app/layout/clientes/form/FormItemInputFile";

export const INIT_FINANCE: ClientFinance = {
  monto: 0,
  comision: 0,
  tasa: 0,
  utilidad: 0,
  saldoefevoo: 0,
  reserva: 0,
};
export const INIT_INFO_REPRESENTATIVES: ClientRepresents[] = new Array(3).fill({
  nombre: "",
  fechaNacimiento: "",
  rfc: "",
  curp: "",
  pais: "MX",
  acreditacion: "",
  numeroAcreditacion: "",
});

export const INIT_INFO_ADDRESS: ClientAddress = {
  calle: "",
  codigoPostal: "",
  colonia: "",
  estado: "",
  municipio: "",
  numExt: "",
  pais: "MX",
  numInt: "",
  ciudad: "",
};
export const INIT_INFO_COMMERCE: ClientCommerce = {
  email: "",
  fechaConst: "",
  giroSocial: "",
  paisConst: "",
  razonSocial: "",
  rfc: "",
  telefono: "",
  banco: "",
  clabe: "",
  cuenta: "",
  titular: "",
  correoDeposito: 0,
  persona: "",
  origen: "",
};
export const INIT_INFO_CONTACTS: ClientContacts[] = new Array(2).fill({
  email: "",
  nombre: "",
  telefono: "",
});

export const INIT_DOCUMENTS_ADDITIONAL: ClientDocuments = {
  display: "Documento Adicional",
  docBase64: "",
  documentoTipo: PREFIX_FILE,
  extension: "",
  accept: "image/*, .pdf",
  filename: "",
  required: false,
  tab: 0,
};

export const INIT_DOCUMENTS: ClientDocuments[] = [
  {
    display: "Acta Constitutiva y sus modificaciones",
    docBase64: "",
    documentoTipo: "acta",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Registro Público del Acta Constitutiva y sus modificaciones",
    docBase64: "",
    documentoTipo: "registroPublico",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Cédula de identificación Fiscal",
    docBase64: "",
    documentoTipo: "rfc",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Identificación oficial",
    docBase64: "",
    documentoTipo: "ine",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },

  {
    display: "Comprobante de domicilio",
    docBase64: "",
    documentoTipo: "address",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Estado de cuenta",
    docBase64: "",
    documentoTipo: "estadoDeCuenta",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Poder notariado del representante Legal",
    docBase64: "",
    documentoTipo: "representante1Poder",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Poder notariado del representante Legal",
    docBase64: "",
    documentoTipo: "representante2Poder",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Poder notariado del representante Legal",
    docBase64: "",
    documentoTipo: "representante3Poder",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Poder notariado del representante Legal",
    docBase64: "",
    documentoTipo: "representante4Poder",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Poder legal",
    docBase64: "",
    documentoTipo: "representante5Poder",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Identificación oficial",
    docBase64: "",
    documentoTipo: "representante1INE",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: true,
    tab: 0,
  },
  {
    display: "Identificación oficial",
    docBase64: "",
    documentoTipo: "representante2INE",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Identificación oficial",
    docBase64: "",
    documentoTipo: "representante3INE",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Identificación oficial",
    docBase64: "",
    documentoTipo: "representante4INE",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
  {
    display: "Identificación oficial",
    docBase64: "",
    documentoTipo: "representante5INE",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: false,
    tab: 0,
  },
];

const INIT_INFO_OPERATIONS: ClientOperations = {
  ventaMensual: undefined,
  ticketPromedio: undefined,
  ticketAlto: undefined,
  horarioI: "",
  horarioF: "",
  banco: "",
  cuenta: "",
  clabe: "",
  titular: "",
  reverso: "no",
};

const INIT_ADQUIRIENTE: ClientAdquiriente = {
  idagep_tipo_tasa: undefined,
  idagep_cat_producto: 0,
  idagep_adquiriente: undefined,
  afiliacion: "",
  fiid: "",
  intercambioTD: undefined,
  intercambioTC: undefined,
  intercambioTI: undefined,
  comisionTD: undefined,
  comisionTC: undefined,
  comisionTI: undefined,
  msi: 0,
  msi3: 0,
  msi6: 0,
  msi9: 0,
  msi12: 0,
  msi18: 0,
  msi24: 0,
  intercambio3: undefined,
  intercambio6: undefined,
  intercambio9: undefined,
  intercambio12: undefined,
  intercambio18: undefined,
  intercambio24: undefined,
  comision3: undefined,
  comision6: undefined,
  comision9: undefined,
  comision12: undefined,
  comision18: undefined,
  comision24: undefined,
  minimo3: 300,
  minimo6: 600,
  minimo9: 900,
  minimo12: 1200,
  minimo18: 1800,
  minimo24: 2400,
  estatus: 0,
};

export const INIT_CLIENT: Client = {
  "3DS": 0,
  descripcion: "",
  email: "",
  estatus: 0,
  fechaEnt: "",
  fechaMod: "",
  idagep_catgiro: 0,
  idagep_empresa: 0,
  idagep_usuarios: 0,
  infoComercio: INIT_INFO_COMMERCE,
  infoContactos: INIT_INFO_CONTACTS,
  infoDomicilio: INIT_INFO_ADDRESS,
  infoOperaciones: INIT_INFO_OPERATIONS,
  infoRepresentantes: INIT_INFO_REPRESENTATIVES,
  terminal: INIT_ADQUIRIENTE,
  terminalAMEX: INIT_ADQUIRIENTE,
  ventaLinea: INIT_ADQUIRIENTE,
  ventaLineaAMEX: INIT_ADQUIRIENTE,
  minimo3DS: undefined,
  msi: 0,
  nombre: "",
  plazosMsi: 0,
  plazosMci: 0,
  tasa: undefined,
  ticketPromedioMensual: undefined,
  Giro: "",
  fondoActivo: 0,
  porcetaje: undefined,
  documents: INIT_DOCUMENTS, //.map((x) => omit(x, "accept", "display")),
  kpiReserveFund: undefined,
  refreshReserveFund: undefined,
  persona: "moral",
  ecommerce: 0,
  infoCotizacion: INIT_QUOTATION,
  resCotizacion: INIT_RES_QUOTATION,
  idagep_catpago: 0,
};

export const INIT_CLIENTS: Client[] = [];

export const LABEL_CLIENT: Record<string, string> = {
  "3DS": "3DS",
  comisionTC: "Comisión tarjeta de crédito",
  comisionTD: "Comisión tarjeta de débito",
  comisionTI: "Comisión internacional",
  msi: "Meses sin intereses",
  ticketPromedioMensual: "Ticket promedio mensual",
  tasa: "Tipo de tasa",
  descripcion: "",
  email: "Correo electrónico",
  nombre: "Nombre comercial",
  Giro: "Giro del negocio",
  estatus: "",
  fechaEnt: "Horario de operación",
  fechaMod: "",
  subAfiliado: "Sub afiliado (FID)",
  idagep_catgiro: "",
  idagep_empresa: "",
  idagep_catpago: "",
  fondoActivo: "Fondo de reserva",
  porcetaje: "Porcentaje a retener",
  msi3: "3 meses",
  comisionEfevoopay3: "3 meses comisión",
  tasaBanorte3: "3 meses tasa",
  msi6: "6 meses",
  comisionEfevoopay6: "6 meses comisión",
  tasaBanorte6: "6 meses tasa",
  msi9: "9 meses",
  comisionEfevoopay9: "12 meses comisión",
  tasaBanorte9: "12 meses tasa",
  msi12: "12 meses",
  comisionEfevoopay12: "12 meses comisión",
  tasaBanorte12: "12 meses tasa",
  msi18: "18 meses",
  comisionEfevoopay18: "18 meses comisión",
  tasaBanorte18: "18 meses tasa",
  rfc: "RFC o Número de Identificación fiscal",
  "infoComercio.email": "Correo electrónico de la empresa",
  "infoComercio.fechaConst": "Fecha de constitución",
  "infoComercio.giroSocial": "Giro mercantil / Objeto social",
  "infoComercio.paisConst": "País de constitución",
  "infoComercio.razonSocial": "Nombre / Denominación o Razón Social",
  "infoComercio.rfc": "RFC o Número de Identificación fiscal",
  "infoComercio.telefono": "Teléfono del corporativo",
  "infoOperaciones.banco": "Banco",
  "infoOperaciones.clabe": "Clabe",
  "infoOperaciones.cuenta": "Cuenta",
  "infoOperaciones.titular": "Titular",
  "infoComercio.correoDeposito": "Correo electrónico de de depositos de",
  "infoContactos[0].email": "Correo electrónico de contacto 1",
  "infoContactos[0].nombre": "Nombre completo contacto 1",
  "infoContactos[0].telefono": "Teléfono de contacto 1",
  "infoContactos[1].email": "Correo electrónico de contacto 2",
  "infoContactos[1].nombre": "Nombre completo contacto 2",
  "infoContactos[1].telefono": "Teléfono de contacto 2",
  // Etiquetas para los atributos de infoDomicilio
  "infoDomicilio.calle": "Calle",
  "infoDomicilio.codigoPostal": "Código postal",
  "infoDomicilio.colonia": "Colonia",
  "infoDomicilio.estado": "Estado",
  "infoDomicilio.municipio": "Delegación",
  "infoDomicilio.numExt": "Número Ext",
  "infoDomicilio.pais": "País",
  "infoDomicilio.numInt": "Número Int",
  "infoDomicilio.ciudad": "Ciudad",

  // Etiquetas para los atributos de infoOperaciones
  "infoOperaciones.ventaMensual": "Venta Mensual",
  "infoOperaciones.ticketPromedio": "Ticket Promedio",
  "infoOperaciones.ticketAlto": "Ticket Alto",
  "infoOperaciones.horarioI": "Horario de inicio",
  "infoOperaciones.horarioF": "Horario de fin",
  // "infoOperaciones.banco": "Banco",
  // "infoOperaciones.cuenta": "Cuenta",
  // "infoOperaciones.clabe": "Clabe",
  // "infoOperaciones.titular": "Titular",

  // Etiquetas para los atributos de infoRepresentantes
  "infoRepresentantes[0].nombre": "Nombre completo del representante 1",
  "infoRepresentantes[0].fechaNacimiento":
    "Fecha nacimiento del representante 1",
  "infoRepresentantes[0].rfc":
    "RFC o número de identificación fiscal del representante 1",
  "infoRepresentantes[0].curp": "CURP del representante 1",
  "infoRepresentantes[0].pais": "País del representante 1",
  "infoRepresentantes[0].acreditacion": "Acreditacion del representante 1",
  "infoRepresentantes[0].numeroAcreditacion":
    "Número de acreditación del representante 1",
  // Etiquetas para los atributos de infoRepresentantes (continuación)
  "infoRepresentantes[1].nombre": "Nombre completo del representante 2",
  "infoRepresentantes[1].fechaNacimiento":
    "Fecha nacimiento del representante 2",
  "infoRepresentantes[1].rfc":
    "RFC o número de identificación fiscal del representante 2",
  "infoRepresentantes[1].curp": "CURP del representante 2",
  "infoRepresentantes[1].pais": "País del representante 2",
  "infoRepresentantes[1].acreditacion": "Acreditacion del representante 2",
  "infoRepresentantes[1].numeroAcreditacion":
    "Número de acreditación del representante 2",

  // Etiquetas para los atributos de infoRepresentantes (continuación)
  "infoRepresentantes[2].nombre": "Nombre completo del representante 3",
  "infoRepresentantes[2].fechaNacimiento":
    "Fecha nacimiento del representante 3",
  "infoRepresentantes[2].rfc":
    "RFC o número de identificación fiscal del representante 3",
  "infoRepresentantes[2].curp": "CURP del representante 3",
  "infoRepresentantes[2].pais": "País del representante 3",
  "infoRepresentantes[2].acreditacion": "Acreditacion del representante 3",
  "infoRepresentantes[2].numeroAcreditacion":
    "Número de acreditación del representante 3",

  // Etiquetas para los atributos de infoRepresentantes (continuación)
  "infoRepresentantes[3].nombre": "Nombre completo del representante 4",
  "infoRepresentantes[3].fechaNacimiento":
    "Fecha nacimiento del representante 4",
  "infoRepresentantes[3].rfc":
    "RFC o número de identificación fiscal del representante 4",
  "infoRepresentantes[3].curp": "CURP del representante 4",
  "infoRepresentantes[3].pais": "País del representante 4",
  "infoRepresentantes[3].acreditacion": "Acreditacion del representante 4",
  "infoRepresentantes[3].numeroAcreditacion":
    "Número de acreditación del representante 4",

  // Etiquetas para los atributos de infoRepresentantes (continuación)
  "infoRepresentantes[4].nombre": "Nombre completo del representante 5",
  "infoRepresentantes[4].fechaNacimiento":
    "Fecha nacimiento del representante 5",
  "infoRepresentantes[4].rfc":
    "RFC o número de identificación fiscal del representante 5",
  "infoRepresentantes[4].curp": "CURP del representante 5",
  "infoRepresentantes[4].pais": "País del representante 5",
  "infoRepresentantes[4].acreditacion": "Acreditacion del representante 5",
  "infoRepresentantes[4].numeroAcreditacion":
    "Número de acreditación del representante 5",
  "documents.ine": "Identificación oficial",
  "documents.rfc": "RFC o número de identificación fiscal",
  "documents.acta": "Acta Constitutiva",
  "documents.address": "Comprobante de domicilio",
  "documents.estadoDeCuenta": "Estado de cuenta",
  "documents.representante1Poder": "Poder legal del representante 1",
  "documents.representante2Poder": "Poder legal del representante 2",
  "documents.representante3Poder": "Poder legal del representante 3",
  "documents.representante4Poder": "Poder legal del representante 4",
  "documents.representante5Poder": "Poder legal del representante 5",
  "documents.representante1INE": "Identificación oficial del representante 1",
  "documents.representante2INE": "Identificación oficial del representante 2",
  "documents.representante3INE": "Identificación oficial del representante 3",
  "documents.representante4INE": "Identificación oficial del representante 4",
  "documents.representante5INE": "Identificación oficial del representante 5",
  "documents.files_1": "Documento Adicional 1",
  "documents.files_2": "Documento Adicional 2",
  "documents.files_3": "Documento Adicional 3",
  "documents.files_4": "Documento Adicional 4",
  "documents.files_5": "Documento Adicional 5"
};

export const TASA_OPTIONS: DropdownOptions<number>[] = [
  {
    label: "Natural",
    value: 1,
  },
  {
    label: "Agregadora",
    value: 2,
  },
];

export const ORIGEN_OPTIONS: DropdownOptions<string>[] = [
  {
    label: ORIGEN_CLIENT_TYPE.VENTAS_DIGITALES,
    value: ORIGEN_CLIENT_TYPE.VENTAS_DIGITALES,
  },
  {
    label: ORIGEN_CLIENT_TYPE.RED_COMERCIAL,
    value: ORIGEN_CLIENT_TYPE.RED_COMERCIAL,
  },
  {
    label: ORIGEN_CLIENT_TYPE.VENTA_INTERNA,
    value: ORIGEN_CLIENT_TYPE.VENTA_INTERNA,
  },
  {
    label: ORIGEN_CLIENT_TYPE.USO_INTERNO,
    value: ORIGEN_CLIENT_TYPE.USO_INTERNO,
  },
  {
    label: ORIGEN_CLIENT_TYPE.POR_DEFINIR,
    value: ORIGEN_CLIENT_TYPE.POR_DEFINIR,
  },
];

export const VENTA_MENSUAL_OPTIONS: DropdownOptions<string>[] = [
  {
    label: "0 - 200,000",
    value: "0 - 200,000",
  },
  {
    label: "200,000 - 400,000",
    value: "200,000 - 400,000",
  },
  {
    label: "400,000 - 600,000",
    value: "400,000 - 600,000",
  },
  {
    label: "600,000 - 800,000+",
    value: "600,000 - 800,000+",
  },
];

//VALIDATIONS
const VALIDATION_CLIENT_ADQUIRIENTE_CEROS = Yup.object().shape({
  intercambio3: Yup.number().min(1, "El número debe ser mayor que cero"),
  intercambio6: Yup.number().min(1, "El número debe ser mayor que cero"),
  intercambio9: Yup.number().min(1, "El número debe ser mayor que cero"),
  intercambio12: Yup.number().min(1, "El número debe ser mayor que cero"),
  intercambio18: Yup.number().min(1, "El número debe ser mayor que cero"),
  comision3: Yup.number().min(1, "El número debe ser mayor que cero"),
  comision6: Yup.number().min(1, "El número debe ser mayor que cero"),
  comision9: Yup.number().min(1, "El número debe ser mayor que cero"),
  comision12: Yup.number().min(1, "El número debe ser mayor que cero"),
  comision18: Yup.number().min(1, "El número debe ser mayor que cero"),
});
const VALIDATION_CLIENT_ADQUIRIENTE_NULLABLE = Yup.object().shape({
  intercambio3: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  intercambio6: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  intercambio9: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  intercambio12: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  intercambio18: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  comision3: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  comision6: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  comision9: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  comision12: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
  comision18: Yup.number().min(1, "El número debe ser mayor que cero").nullable(),
});

const VALIDATION_CLIENT_ADQUIRIENTE_CEROS_AMEX = Yup.object().shape({
  comision24: Yup.number().min(1, "El número debe ser mayor que cero"),
  intercambio24: Yup.number().min(1, "El número debe ser mayor que cero"),
});
const VALIDATION_CLIENT_ADQUIRIENTE = Yup.object()
  .shape({
    idagep_adquiriente: Yup.number().required(
      "El campo adquiriente es obligatorio"
    ),
    idagep_tipo_tasa: Yup.number().required(
      "El campo tipo de tasa es obligatorio"
    ),
    comisionTD: Yup.number().required(
      "El campo comisión tarjeta de débito es obligatorio"
    ),
    comisionTC: Yup.number().required(
      "El campo comisión tarjeta de crédito es obligatorio"
    ),
    comisionTI: Yup.number().required(
      "El campo comisión tarjeta de internacional es obligatorio"
    ),
    intercambioTD: Yup.number().required("El campo tasa débito es obligatorio"),
    intercambioTC: Yup.number().required(
      "El campo tasa crédito es obligatorio"
    ),
    intercambioTI: Yup.number().required(
      "El campo tasa internacional es obligatorio"
    ),
  })
  .concat(VALIDATION_CLIENT_ADQUIRIENTE_CEROS);
const VALIDATION_OBJECTS_GENERAL = {
  nombre: Yup.string().required("El campo nombre es obligatorio"),
  Giro: Yup.string().required("El campo giro del negocio es obligatorio"),
  email: Yup.string()
    .required("El campo correo electrónico es obligatorio")
    .email("El campo correo electrónico no es válido"),
  infoComercio: Yup.object({
    razonSocial: Yup.string().required("El campo razón social es obligatorio"),
    rfc: Yup.string().required("Este campo es obligatorio"),
    fechaConst: Yup.string(),
    giroSocial: Yup.string(),
    telefono: Yup.string()
      .required("El campo teléfono del corporativo es obligatorio")
      .max(10)
      .matches(
        /^\d{10}$/,
        "El campo teléfono debe tener exactamente 10 dígitos"
      ),
    paisConst: Yup.string(),
    correoDeposito: Yup.string(),
    email: Yup.string().email(
      "El campo correo electrónico de la empresa no es válido"
    ),
  }),
  infoDomicilio: Yup.object({
    calle: Yup.string().required("El campo calle es obligatorio"),
    numExt: Yup.string().required("El campo número ext. es obligatorio"),
    numInt: Yup.string(),
    colonia: Yup.string().required("El campo colonia es obligatorio"),
    municipio: Yup.string().required("El campo municipio es obligatorio"),
    codigoPostal: Yup.string().required(
      "El campo código postal es obligatorio"
    ),
    ciudad: Yup.string().required("El campo ciudad es obligatorio"),
    estado: Yup.string().required("El campo estado es obligatorio"),
    pais: Yup.string().required("El campo país es obligatorio"),
  }),
};
const VALIDATION_OBJECTS_OPERATIONS = {
  infoOperaciones: Yup.object({
    banco: Yup.string().required("El campo banco es obligatorio"),
    titular: Yup.string().required("El campo titular es obligatorio"),
    clabe: Yup.string().required("El campo clabe interbancaria es obligatorio"),
    cuenta: Yup.string().required("El campo cuenta es obligatorio"),
  }),
  terminal: VALIDATION_CLIENT_ADQUIRIENTE,
  terminalAMEX: VALIDATION_CLIENT_ADQUIRIENTE_NULLABLE.concat(
    VALIDATION_CLIENT_ADQUIRIENTE_CEROS_AMEX
  ),
  ventaLinea: VALIDATION_CLIENT_ADQUIRIENTE_NULLABLE,
  ventaLineaAMEX: VALIDATION_CLIENT_ADQUIRIENTE_NULLABLE.concat(
    VALIDATION_CLIENT_ADQUIRIENTE_CEROS_AMEX
  ),
  infoRepresentantes: Yup.array().of(
    Yup.object().shape({
      acreditacion: Yup.string(),
      curp: Yup.string(),
      fechaNacimiento: Yup.string(),
      nombre: Yup.string(),
      numeroAcreditacion: Yup.string(),
      pais: Yup.string(),
      rfc: Yup.string(),
    })
  ),
};

export const VALIDATION_CLIENT = Yup.object().shape({
  ...VALIDATION_OBJECTS_GENERAL,
  ...VALIDATION_OBJECTS_OPERATIONS,
});

export const VALIDATION_CLIENT_TAB_GENERAL = Yup.object().shape({
  ...VALIDATION_OBJECTS_GENERAL,
});

export const VALIDATION_CLIENT_TAB_DOCUMENTATIONS = Yup.object().shape({});

export const VALIDATION_CLIENT_TAB_OPERATIONS = Yup.object().shape({
  ...VALIDATION_OBJECTS_OPERATIONS,
});

export const VALIDATION_CLIENT_INFO_CONTACTOS = Yup.object().shape({
  nombre: Yup.string().required("El campo nombre es obligatorio"),
  telefono: Yup.string()
    .required("El campo teléfono es obligatorio")
    .matches(/^\d{10}$/, "El campo teléfono debe tener exactamente 10 dígitos"),
  email: Yup.string()
    .required("El campo correo electrónico es obligatorio")
    .email("El campo correo electrónico no es válido"),
});

export const VALIDATION_CLIENT_INFO_REPRESENTANTES = Yup.object().shape({
  nombre: Yup.string().required("El campo nombre es obligatorio"),
});

export const VALIDATION_CLIENT_TAB_DOCUMENTS_INFO_DOCUMENTS =
  Yup.object().shape({
    /* ine: Yup.string().required(
      "El campo identificación oficial es obligatorio"
    ),
    address: Yup.string().required(
      "El campo comprobante de domicilio es obligatorio"
    ), */
  });
export const VALIDATION_CLIENT_TAB_GENERAL_INFO_DOCUMENTS = Yup.object().shape({
  /* representante1INE: Yup.string().required(
    "El campo identificación oficial es obligatorio"
  ), */
});

export const VALIDATION_CLIENT_ALL = Yup.object()
  .concat(VALIDATION_CLIENT.clone())
  .concat(
    Yup.object().shape({
      infoContactos: VALIDATION_CLIENT_INFO_CONTACTOS.clone(),
    })
  )
  .concat(VALIDATION_CLIENT_INFO_REPRESENTANTES.clone())
  .concat(VALIDATION_CLIENT_TAB_DOCUMENTS_INFO_DOCUMENTS.clone())
  .concat(VALIDATION_CLIENT_TAB_GENERAL_INFO_DOCUMENTS.clone());

export const VALIDATION_CLIENT_MSI = Yup.object().shape({
  msi3Fields: Yup.number().test(
    "msi3Fields",
    "Error: Los plazos a MSI deben ser continuos y elegir mínimo 3",
    function (value, context) {
      const { msi3, msi6, msi9, msi12, msi18 } = context.parent;
      const msis = [msi3, msi6, msi9, msi12, msi18];
      return msis.some(
        (value, index) => value && msis[index + 1] && msis[index + 2]
      );
    }
  ),
});

const EXCEL_CLIENT_COLUMNS: Record<keyof ClientExcelColumns, string> = {
  banco: "Banco",
  clabe: "Clabe",
  cuentaInterbancaria: "Cuenta Interbancaria",
  email: "Correo Electrónico",
  estado: "Estado",
  fechaIncorporacion: "Fecha Incorporación",
  id: "ID",
  montoliquidar: "Monto por liquidar",
  nombreComercial: "Nombre Comercial",
  razonSocial: "Razón social",
  origen: "Origen del cliente",
};

const CLIENT_EXCEL_HEADER_CONFIG = Object.fromEntries(
  Object.keys(EXCEL_CLIENT_COLUMNS).map((key) => [
    key,
    {
      height: 30,
      align: "left",
      alignVertical: "bottom",
      fontWeight: "bold",
      backgroundColor: "#000000",
      color: "#FFFFFF",
      wrap: true,
    } as ExcelCell,
  ])
);

export const CLIENT_EXCEL_CONFIG: Partial<ExcelOptions<ClientExcelColumns>> = {
  displayColumns: EXCEL_CLIENT_COLUMNS,
  sortKeys: [
    "id",
    "nombreComercial",
    "razonSocial",
    "email",
    "estado",
    "fechaIncorporacion",
    "banco",
    "clabe",
    "cuentaInterbancaria",
    "montoliquidar",
    "origen"
  ],
  headerOptions: CLIENT_EXCEL_HEADER_CONFIG,
  columnOptions: {
    banco: { width: 15 },
    clabe: { width: 20 },
    cuentaInterbancaria: { width: 20 },
    email: { width: 30 },
    estado: { width: 10 },
    fechaIncorporacion: { width: 16 },
    id: { width: 5 },
    montoliquidar: { width: 15 },
    nombreComercial: { width: 30 },
    razonSocial: { width: 30 },
    origen: { width: 20 },
  },
};

export const createClientTypes = (): ClientTypeObj[] => [
  {
    value: "moral",
    name: "Persona Moral",
    icon: "ClientMoral",
    color: "#608BC0",
  },
  {
    value: "fisica",
    name: "Persona Fisica",
    icon: "ClientFisica",
    color: "#608BC0",
  },
];
