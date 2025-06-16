//PAGOS RECURRENTES

import { Transaction } from "./Transactions";

//*PAYMENTS*
//TICKET
export interface PagosRecurrentesPaymentsTicketBody {
  token: string;
  id: number;
}
export interface PagosRecurrentesPaymentsTicketResponse {
  empresa: string;
  direccion: string;
  fechaPago: string;
  idagep_pagos_suscriptor: number;
  nombreSuscriptor: string;
  nombrePago: string;
  recurrencia: string;
  montoPagado: string;
  montoTotal: string;
  pagosRealizados: number;
  pagosFaltan: number;
  totalPagos: number;
  reqtls_redtarj: string;
  reqtls_tipotarj: string;
  formaPago: string;
  moneda: string;
  sigPago: string;
  fechaCont: string;
}
//-CREATE
export interface PagosRecurrentesPaymentsCreateBody {
  idagep_usuario: number;
  idagep_empresa: number;
  nombre: string;
  descripcion: string;
  monto: number | undefined;
  referencia: string;
  recurrencia: number | undefined;
  fechaVigencia: string;
  estatus: number;
}
export interface PagosRecurrentesPaymentsCreateResponse {
  mensaje: string;
  tokenPR: string;
  tokenQR: string;
}
//-READ
export interface PagosRecurrentesPaymentsReadBody {
  idagep_pago_recurrente: number;
  idagep_usuario: number;
}
export interface PagosRecurrentesPaymentsReadResponsePagosRecurrentes {
  descripcion: string;
  empresa: string;
  fechaRegistro: string;
  fechaVigencia: string;
  idagep_empresa: number;
  idagep_pago_recurrente: number;
  monto: number;
  pagoNombre: string;
  recurrencia: number;
  referencia: string;
  token: string;
  estatus: number | string;
}
export interface PagosRecurrentesPaymentsReadResponse {
  pagosRecurrentes: PagosRecurrentesPaymentsReadResponsePagosRecurrentes[];
  totalRegistros: number;
}
//-UPDATE
//-DISABLE
export interface PagosRecurrentesPaymentsDisableBody {
  idagep_pago_recurrente: number;
  idagep_usuario: number;
  idagep_empresa: number;
}
export interface PagosRecurrentesPaymentsDisableResponse {
  estatus: number;
  idagep_pago_recurrente: number;
  mensaje: string;
}
//-ALL
export interface PagosRecurrentesPaymentsAllBody {
  idagep_usuario: number;
  filtroNombre: string;
  filtroRecurrencia: string;
  pagina: number;
  tamano_pagina: number;
}
export interface PagosRecurrentesPaymentsAllResponsePagosRecurrentes {
  descripcion: string;
  empresa: string;
  estatus: number;
  fechaRegistro: string;
  fechaVigencia: string;
  idagep_empresa: number;
  idagep_pago_recurrente: number;
  monto: number;
  pagoNombre: string;
  pagos: number;
  recurrencia: number;
  referencia: string;
  suscriptores: number;
  token: string;
}
export interface PagosRecurrentesPaymentsAllResponse {
  pagosRecurrentes: PagosRecurrentesPaymentsAllResponsePagosRecurrentes[];
  totalRegistros: number;
}
//CHEKOUT

//-CREATE
export interface PagosRecurrentesCheckoutCreateBody {
  token: string;
  idSuscriptor: number;
  data: string;
}
export interface PagosRecurrentesCheckoutCreateResponse {
  mensaje: string;
}
//-READ
export interface PagosRecurrentesCheckoutReadBody {
  token: string;
}
export interface PagosRecurrentesCheckoutReadResponse {
  pagoRecurrente: string;
  recurrencia: number;
  monto: number;
  numPago: string;
  sigConbro: string;
  fechaVigencia: string;
  referencia: string;
  descripcion: string;
  infoEmp: string;
  infoPago: string;
  token: string;
  mensaje: string;
  estatus: string | number;
}
//-UPDATE
//-DELETE
//-ALL

//SUBSCRIBERS
//-CREATE
interface PagosRecurrentesSubscribersCreateBodyInfoSuscriptor {
  telefono: string;
  direccion: string;
}
export interface PagosRecurrentesSubscribersCreateBody {
  idagep_usuario: number;
  idagep_empresa: number;
  nombre: string;
  email: string;
  infoSuscriptor: PagosRecurrentesSubscribersCreateBodyInfoSuscriptor;
  estatus: number;
  token: string;
}
export interface PagosRecurrentesSubscribersCreateResponse {
  code: string;
  mensaje: string;
  idSuscriptor: number;
}

//PAGOS
export interface PagosRecurrentesSubscribersPagosBody {
  idagep_usuario: number;
  idagep_pagos_suscriptor: number;
  pagina: number;
  tamano_pagina: number;
}
export interface PagosRecurrentesSubscribersPagosResponsePagos
  extends Transaction {}
export interface PagosRecurrentesSubscribersPagosResponse {
  pagos: PagosRecurrentesSubscribersPagosResponsePagos[];
  totalRegistros: number;
  sumaMonto: number;
}
//-READ

//-CANCEL

export interface PagosRecurrentesSubscribersCancelBody {
  email: string;
  token: string;
}
export interface PagosRecurrentesSubscribersCancelResponse {
  mensaje: string;
  code: string;
}
//-DISABLE
export interface PagosRecurrentesSubscribersDisableBody {
  idagep_pagos_suscriptor: number;
  idagep_empresa: number;
  idagep_usuario: number;
  estatus: number;
}
export interface PagosRecurrentesSubscribersDisableResponse {
  estatus: number;
  // idagep_pago_recurrente: number;
  mensaje: string;
}

//ALL
export interface PagosRecurrentesSubscribersAllBody {
  idagep_usuario: number;
  idagep_pago_recurrente: number;
  filtroSuscriptor: string;
  filtroTelefono: string;
  pagina: number;
  tamano_pagina: number;
}

export interface PagosRecurrentesSubscribersAllResponseSuscriptoresInfoSuscriptor {
  direccion: string;
  telefono: string;
}
export interface PagosRecurrentesSubscribersAllResponseSuscriptores {
  idagep_pagos_suscriptor: number;
  suscriptor: string;
  email: string;
  infoSuscriptor: PagosRecurrentesSubscribersAllResponseSuscriptoresInfoSuscriptor;
  fechaRegistro: string;
  estatus: number;
  pagosRealizados: number;
  idagep_empresa: number;
  empresa: string;
  suscripciones: number;
  idTransaccion: number;
}
export interface PagosRecurrentesSubscribersAllResponse {
  suscriptores: PagosRecurrentesSubscribersAllResponseSuscriptores[];
  totalRegistros: number;
}

export enum ESTATUS_TYPES {
  "Inactivo" = 0,
  "Activo" = 1,
}
export enum RECURRENCIA_TYPES {
  "Diario" = 1,
  "Semanal" = 7,
  "Quincenal" = 15,
  "Mensual" = 30,
  "Anual" = 365,
}
