import * as Yup from "yup";
import {
  ClientsReferralsAddress,
  ClientsReferralsCommerce,
  ClientsReferralsContacts,
  ClientsReferralsRepresents,
  ClientsReferralsDocuments,
  ClientsReferralsQuotation,
  ClientsReferrals,
  ClientsReferralsResQuotation,
} from "@app/types/ClientsReferrals";

export const INIT_INFO_COMMERCE: ClientsReferralsCommerce = {
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
};
export const INIT_INFO_CONTACTS: ClientsReferralsContacts[] = new Array(2).fill(
  {
    email: "",
    nombre: "",
    telefono: "",
  }
);
export const INIT_INFO_REPRESENTATIVES: ClientsReferralsRepresents[] =
  new Array(4).fill({
    nombre: "",
    fechaNacimiento: "",
    rfc: "",
    curp: "",
    pais: "MX",
    acreditacion: "",
    numeroAcreditacion: "",
  });
export const INIT_INFO_ADDRESS: ClientsReferralsAddress = {
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

export const INIT_QUOTATION: ClientsReferralsQuotation = {
  giro: "",
  familia: "",
  adquiriente: "",
  rollos: "",
  arrendamiento: "",
  ventaMensual: 0,
  ticketProm: 0,
  debito: 0,
  credito: 0,
  internacional: 0,
  prosa: 0,
  tasaDebito: 0,
  tasaCredito: 0,
  tasaInternacional: 0,
  tasaProsa: 0,
  rentaMini: 0,
  rentaD20: 0,
  rentaD30: 0,
  cantMini: 0,
  cantD20: 0,
  cantD30: 0,
  chipMini: 0,
  chipD20: 0,
  chipD30: 0,
  liquidacion: "",
  corteDia: "",
  ecommerce: "No",
  tarjeta: "No",
};

export const INIT_RES_QUOTATION: ClientsReferralsResQuotation = {
  credito: 0,
  cuotaAdmin: 0,
  debito: 0,
  internacional: 0,
  margenConRED: 0,
  margenSinRED: 0,
  msgCredito: "",
  msgDebito: "",
  msgInternacional: "",
  msgProsa: "",
  msgRentaD20: "",
  msgRentaD30: "",
  msgRentaMini: "",
  msgTasaCredito: "",
  msgTasaDebito: "",
  msgTasaInternacional: "",
  msgTasaProsa: "",
  porcentajeConRED: 0,
  porcentajeSinRED: 0,
  prosa: 0,
  redComercial: 0,
  rentaD20: 0,
  rentaD30: 0,
  rentaMini: 0,
  tasaCredito: 0,
  tasaDebito: 0,
  tasaInternacional: 0,
  tasaProsa: 0,
  vobo: "",
};
export const INIT_DOCUMENTS: ClientsReferralsDocuments[] = [
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
    required: true,
    tab: 0,
  },

  {
    display: "Comprobante de domicilio",
    docBase64: "",
    documentoTipo: "address",
    extension: "",
    accept: "image/*, .pdf",
    filename: "",
    required: true,
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

export const INIT_CLIENTS_REFERRALS: ClientsReferrals[] = [];

export const INIT_CLIENT_REFERRALS: ClientsReferrals = {
  idagep_referido: 0,
  idagep_usuario: 0,
  idagep_catgiro: 0,
  idagep_catpago: 0,
  idagep_empresa: 0,
  nombre: "",
  persona: "fisica",
  email: "",
  infoComercio: INIT_INFO_COMMERCE,
  infoDomicilio: INIT_INFO_ADDRESS,
  infoContactos: INIT_INFO_CONTACTS,
  infoRepresentantes: INIT_INFO_REPRESENTATIVES,
  documents: INIT_DOCUMENTS,
  infoCotizacion: INIT_QUOTATION,
  resCotizacion: INIT_RES_QUOTATION,
  operacion: "C",
  agente: "",
  gerente: "",
};
/* AQUI OP */

//VALIDATIONS
export const VALIDATION_OBJECTS_GENERAL = Yup.object().shape({
  nombre: Yup.string().required("El campo nombre es obligatorio"),
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
});
export const VALIDATION_OBJECTS_ADDRESS = Yup.object().shape({
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
    //pais: Yup.string().required("El campo país es obligatorio"),
  }),
});
export const VALIDATION_OBJECTS_CONTACTOS = Yup.object().shape({
  infoContactos: Yup.array().of(
    Yup.object({
      nombre: Yup.string().required("El campo nombre es obligatorio"),
      telefono: Yup.string()
        .required("El campo teléfono es obligatorio")
        .matches(
          /^\d{10}$/,
          "El campo teléfono debe tener exactamente 10 dígitos"
        ),
      email: Yup.string()
        .required("El campo correo electrónico es obligatorio")
        .email("El campo correo electrónico no es válido"),
    })
  ),
});

export const VALIDATION_OBJECTS_DOCUMENTS = Yup.object().shape({
  ine: Yup.string().required("El campo identificación oficial es obligatorio"),
  address: Yup.string().required(
    "El campo comprobante de domicilio es obligatorio"
  ),
});
export const VALIDATION_OBJECTS_REPRESENTATIVES = Yup.object().shape({
  nombre: Yup.string().required("El campo nombre es obligatorio"),
  representante1INE: Yup.string().required(
    "El campo identificación oficial es obligatorio"
  ),
});
export const VALIDATION_OBJECTS_QUOTATION = Yup.object().shape({
  infoCotizacion: Yup.object({
    giro: Yup.string().required("El campo giro es obligatorio"),
    familia: Yup.string().required("El campo familia es obligatorio"),
    adquiriente: Yup.string().required("El campo adquiriente es obligatorio"),
    rollos: Yup.string().required("El campo rollos regalados es obligatorio"),
  }),
});

export const VALIDATION_OBJECTS_ALL = Yup.object()
  .concat(VALIDATION_OBJECTS_GENERAL.clone())
  .concat(VALIDATION_OBJECTS_ADDRESS.clone())
  .concat(VALIDATION_OBJECTS_CONTACTOS.clone())
  .concat(VALIDATION_OBJECTS_QUOTATION.clone());
