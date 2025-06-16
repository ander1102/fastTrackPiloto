import { ClientPersona } from "@app/layout/clientes/form/types";
import { Persona } from "./User";

export interface ClientsReferralsAddress {
  calle: string;
  numExt: string;
  numInt: string;
  colonia: string;
  ciudad: string;
  municipio: string;
  codigoPostal: string;
  estado: string;
  pais: string;
}
export interface ClientsReferralsContacts {
  nombre: string;
  telefono: string;
  email: string;
}
export interface ClientsReferralsCommerce {
  razonSocial: string;
  rfc: string;
  fechaConst: string;
  giroSocial: string;
  paisConst: string;
  telefono: string;
  email: string;
  banco: string;
  cuenta: string;
  clabe: string;
  titular: string;
  correoDeposito: number;
  persona: string;
}
export interface ClientsReferralsDocuments {
  documentoTipo: string;
  extension: string;
  docBase64: string;
  filename: string;
  display: string;
  accept: string;
  required: boolean;
  tab: number;
}
export interface ClientsReferralsQuotation {
  giro: string;
  familia: string;
  adquiriente: string;
  rollos: string;
  arrendamiento: string;
  ventaMensual: number;
  ticketProm: number;
  debito: number;
  credito: number;
  internacional: number;
  prosa: number;
  tasaDebito: number;
  tasaCredito: number;
  tasaInternacional: number;
  tasaProsa: number;
  rentaMini: number;
  rentaD20: number;
  rentaD30: number;
  cantMini: number;
  cantD20: number;
  cantD30: number;
  chipMini: number;
  chipD20: number;
  chipD30: number;
  liquidacion: string;
  corteDia: string;
  ecommerce: string;
  tarjeta: string;
}
export interface ClientsReferralsRepresents {
  nombre: string;
  fechaNacimiento: string;
  rfc: string;
  curp: string;
  pais: string;
  acreditacion: string;
  numeroAcreditacion: string;
  documents: ClientsReferralsDocuments[];
}

/*aqui */
export interface ClientsReferrals {
  idagep_referido: number;
  idagep_usuario: number;
  idagep_catgiro: number;
  idagep_catpago: number;
  idagep_empresa: number;
  nombre: string;
  email: string;
  infoComercio: ClientsReferralsCommerce;
  infoDomicilio: ClientsReferralsAddress;
  infoContactos: ClientsReferralsContacts[];
  infoRepresentantes: ClientsReferralsRepresents[];
  infoCotizacion: ClientsReferralsQuotation;
  documents: ClientsReferralsDocuments[];
  resCotizacion: ClientsReferralsResQuotation;
  operacion: string;
  estatus?: number;
  //Aparecen al Leer
  agente?:string;
  gerente?:string;
  persona:ClientPersona;
}

//All

export interface ClientReferralsKpisParams {
  idagep_empresa: number;
}

//Aqui empiezo yo

//Adquirentes
export interface ClientsReferralsAdquierentesResponse {}
//All
export interface ClientsReferralsAllBody {}
export interface ClientsReferralsAllResponseData {
  comisionTotal: number;
  countRechazadas: number;
  email: string;
  estatus: string;
  fechaEnt: string;
  giro: string;
  idagep_empresa: number;
  idagep_referido: number;
  montoTotal: number;
  nombre: string;
  persona: ClientPersona;
  seller: string;
  telefono: string;
  totalProductos: number;
}
export interface ClientsReferralsAllResponse {
  data: Array<ClientsReferralsAllResponseData>;
  estatus: number;
  total: number;
  totalPages: number;
}
export interface ClientReferralsAllParams {
  fechaInicio: string | undefined;
  fechaFin: string | undefined;
  estatus: string;
  idagep_usuarios: number;
  gerente: string;
  agente: string;
  tamano_pagina: number;
  pagina: number;
}

//Cotizador
export interface ClientsReferralsCotizadorBody
  extends ClientsReferralsQuotation {}
export interface ClientsReferralsResQuotation {
  credito: number;
  cuotaAdmin: number;
  debito: number;
  internacional: number;
  margenConRED: number;
  margenSinRED: number;
  msgCredito: string;
  msgDebito: string;
  msgInternacional: string;
  msgProsa: string;
  msgRentaD20: string;
  msgRentaD30: string;
  msgRentaMini: string;
  msgTasaCredito: string;
  msgTasaDebito: string;
  msgTasaInternacional: string;
  msgTasaProsa: string;
  porcentajeConRED: number;
  porcentajeSinRED: number;
  prosa: number;
  redComercial: number;
  rentaD20: number;
  rentaD30: number;
  rentaMini: number;
  tasaCredito: number;
  tasaDebito: number;
  tasaInternacional: number;
  tasaProsa: number;
  vobo: string;
}

export interface ClientsReferralsCotizadorResponse {
  status: number;
  data: ClientsReferralsResQuotation;
}

//Create
export interface ClientsReferralsCreateBody {}
export interface ClientsReferralsCreateResponse {
  estatus: number;
  idagep_referido?: number;
  mensaje: string;
}

//Update
export interface ClientsReferralsUpdateBody {}
export interface ClientsReferralsUpdateResponse {
  estatus: number;
  idagep_referido?: number;
  mensaje: string;
}

//Read
export interface ClientsReferralsReadBody {
  idagep_referido: number;
  operacion: string;
}

export interface ClientsReferralsReadResponse {
  data: ClientsReferrals;
}

//Documentos
export interface ClientsReferralsDocumentosResponse {
  status: number;
  data: {
    mensaje: string;
  };
}
export interface ClientsReferralsDocumentosBody {}
export interface ClientsReferralsDocumentosShowBody {
  idagep_referido:number;
}
export interface ClientDocument {
  idagep_empresas: number;
  nombre: string;
  ruta: string;
  descripcion: string;
  estatus: 1 | 0;
}
export interface ClientsReferralsDocumentosShowResponse {
  docs: ClientDocument[];
}
//Familias
export interface ClientsReferralsFamiliasBody {}
export interface ClientsReferralsFamiliasResponse {}

//Giro
export interface ClientsReferralsGiroBody {}
export interface ClientsReferralsGiroResponse {}

//Kpi
export interface ClientsReferralsKpiBody {
  idagep_usuarios: number;
}
export interface ClientsReferralsKpiRepsonse {}

//Enviar
export interface ClientsReferralsEnviarBody {
  idagep_referido: number;
}
export interface ClientsReferralsEnviarResponse {}

//delete
export interface ClientsReferralsDeleteBody {
  idagep_referido: number;
}
export interface ClientsReferralsDeleteResponse {}
//seller
export interface ClientsReferralsSellerBody {
  idagep_usuarios: number;
}
export interface ClientsReferralsSellerResponseData {
  nombre: string;
  referencia: string;
}

export interface ClientsReferralsSellerResponse {
  data: ClientsReferralsSellerResponseData[];
}
//agente

export interface ClientsReferralsAgenteBody {
  referencia: string;
}
export interface ClientsReferralsAgenteResponseData {
  nombre: string;
  referencia: string;
}

export interface ClientsReferralsAgenteResponse {
  data: ClientsReferralsAgenteResponseData[];
}
