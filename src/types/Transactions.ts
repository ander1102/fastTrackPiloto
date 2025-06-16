import { Byte } from "./Form";

export enum TRANSACTION_PRODUCT {
  "Link de Pago" = "TLS",
  "Terminal" = "DUKPT",
  "Link de Negocio" = "TLS",
  "Ligas de pago" = "TLS",
  "Pagos recurrentes" = "PR",
  "DUKPT" = "Terminal",
  "TLS" = "Ligas de pago",
  "PR" = "Pagos recurrentes",
}

export type TransactionType = "TLS" | "DUKPT";
export interface Transaction {
  idTransaccion: number;
  idTrans: number;
  ID: number;
  device_id: string;
  redtarj: string;
  tipotarj: string;
  tipotxn: string;
  pan: string;
  tarjeta: string;
  BIN: string;
  porcentaje: number;
  amount: number;
  ganancia: number;
  iva: number;
  comision: number;
  sobretasa: number;
  Ivasobretasa: number;
  resto: number;
  Transaccion: string;
  datcr: string;
  propina: number;
  msi: number;
  numAut: string;
  cancela: Byte;
  devolucion: Byte;
  reverso: Byte;
  aproved: string;
  id_aproved: number;
  idagep_empresa: number;
  EMP: string;
  direccion: string;
  SUC: string;
  tipo: TRANSACTION_PRODUCT;
  ARQC: string;
  AID: string;
  FIID: string;
  afiliacion: string;
  adquiriente: string;
  entrada: string;
  entrymode: string;
  referencia: string;
  nacionalidad: string;
  producto: string;
  firma: Byte;

  idagep_pago_recurrente: number;
  idagep_pagos_suscriptor: number;
}

///--------TransactionEfevoopayAmoun------
export interface TransactionSaldoEfevoopay {
  saldoefevoo: number;
  montoReserva: number;
}
export interface TransactionSaldoEfevoopayBody
  extends Pick<TransactionFilters, "idagep_empresa" | "idagep_usuarios"> {}
export interface TransactionSaldoEfevoopayResponse
  extends TransactionSaldoEfevoopay {}
export interface TransactionSaldoEfevoopayCall
  extends TransactionSaldoEfevoopay {}

export interface TransactionKpis {
  totalTransacciones: number;
  montoTotal: number;
  comisionTotal: number;
  promedioPorTicket: number;
}
///--------TransactionKpis------
export interface TransactionKpisBody {}
export interface TransactionKpisResponse extends TransactionKpis {}

export interface TransactionKpisCall extends TransactionKpis {}

///--------TransactionAllKPIs------
export interface TransactionAllKPIs
  extends TransactionKpisResponse,
    TransactionSaldoEfevoopayResponse {
  loader: boolean;
}

///--------TransactionReference------
export interface TransactionReference {}

export interface TransactionReferenceBody {
  idagep_empresa: number;
  idTransaccion: number;
  referencia: string;
  tipo: string;
  operacion: string;
}
export interface TransactionReferenceResponse {}
export interface TransactionReferenceCall {}
///--------TransactionFilters------
export interface TransactionFilters {
  idagep_empresa: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: TRANSACTION_PRODUCT | "all";
  tipoTransaccion: string;
  clients?: number[];
  sucursal?: number;
  idagep_sucursal: number;
  idagep_usuarios: number;
  pagina: number;
  tamano_pagina: number;
}

///--------TransactionResume------
export interface TransactionResumenBody
  extends Pick<
    TransactionFilters,
    "idagep_empresa" | "fechaInicio" | "fechaFin" | "idagep_usuarios"
  > {}

export interface TransactionResumen {
  transacciones: Transaction[];
}
export interface TransactionResumenResponse extends TransactionResumen {}
export interface TransactionResumenCall extends TransactionResumen {}

///--------TransactionDate------

export interface TransactionDateBody extends TransactionFilters {}
export interface TransactionDateResponse {
  transacciones: Transaction[];
  totalRegistros: number;
}
export interface TransactionDateCall {
  transacciones: Transaction[];
  totalRegistros: number;
}

///--------TransactionExcel------

export interface TransaccionExcelBody
  extends Omit<TransactionFilters, "pagina" | "tamano_pagina"> {}

export interface TransactionExcelCall {
  transacciones: TransactionExcelResponse[];
}

export interface TransactionExcelResponse {
  idTrans: number;
  ID: number;
  adquiriente: string;
  afiliacion: string;
  FIID: string;
  cliente: string;
  marcaTarjeta: string;
  metodoPago: string;
  numTarjeta: string;
  monto: number;
  fecha: string;
  hora: string;
  TipodeTransaccion: string;
  numAutorizacion: string;
  modoEntrada: string;
  metodoTH: string;
  ECI: string;
  tipoTarjeta: string;
  tasaComisionEfevoopay: string;
  montoComisionEfevoopay: number;
  IVAComision: number;
  sobretasaEfevoopay: string;
  montoSobretasaEfevoopay: number;
  IVASobretasaEfevoopay: number;
  sucursal: string;
  producto: string;
  terminal: string;
  referencia: string;
}

export type TransactionExcelColumns = Pick<
  TransactionExcelResponse,
  | "ID"
  | "adquiriente"
  | "afiliacion"
  | "FIID"
  | "cliente"
  | "marcaTarjeta"
  | "metodoPago"
  | "numTarjeta"
  | "monto"
  | "fecha"
  | "hora"
  | "TipodeTransaccion"
  | "numAutorizacion"
  | "modoEntrada"
  | "metodoTH"
  | "ECI"
  | "tipoTarjeta"
  | "tasaComisionEfevoopay"
  | "montoComisionEfevoopay"
  | "IVAComision"
  | "sobretasaEfevoopay"
  | "montoSobretasaEfevoopay"
  | "IVASobretasaEfevoopay"
  | "sucursal"
  | "producto"
  | "terminal"
  | "referencia"
>;

export type TransactionExcelClientColumns = Pick<
  TransactionExcelResponse,
  | "ID"
  | "marcaTarjeta"
  | "metodoPago"
  | "numTarjeta"
  | "monto"
  | "fecha"
  | "hora"
  | "TipodeTransaccion"
  | "numAutorizacion"
  | "tipoTarjeta"
  | "tasaComisionEfevoopay"
  | "montoComisionEfevoopay"
  | "IVAComision"
  | "sobretasaEfevoopay"
  | "montoSobretasaEfevoopay"
  | "IVASobretasaEfevoopay"
  | "sucursal"
  | "producto"
  | "terminal"
  | "referencia"
>;

export interface TransactionFirmaBody extends Pick<Transaction, "ARQC"> {}
export interface TransactionFirmaResponse {
  firmaBase64: string;
}
