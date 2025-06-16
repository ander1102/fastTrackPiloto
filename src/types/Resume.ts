import { Transaction } from "./Transactions";

export type ResumeInfoType = "date" | "month";

interface ResumeTransactionResponse {
  transacciones: Transaction[];
}

export interface ResumeTabs {
  key: ResumeInfoType;
  header: string;
  dateFormat: string;
}

export type ResumeGetResponse = ResumeTransactionResponse;

export type ResumeGetType = "all" | "dukpt" | "tls";

export interface ResumeGetByDate {
  idagep_empresa: number;
  fechaInicio: string;
  fechaFin: string;
  tipo: string;
  tipoTransaccion: string;
  idagep_sucursal: number;
  idagep_usuarios: number;
  pagina:number;
  tamano_pagina:number;
}


export type PROSAOperation = "D" | "M";

export interface IPostTransactionEmail
  extends Pick<Transaction, "tipo" | "idTransaccion" | "idagep_empresa"> {
  email: string;
}
export interface IPostTransactionRefund {
  tipo: string;
  tipotxn: string;
  id: number;
}
export interface IPostTransactionReverse {
  tipo: string;
  tipotxn: string;
  id: number;
}

export interface ResumeDataPeriod {
  period: number;
  count: number;
  amount: number;
}
