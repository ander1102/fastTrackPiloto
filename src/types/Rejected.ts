import { PaginationBody } from ".";

export interface TransactionRejectedBody extends PaginationBody {
  idagep_empresa: string;
  fechaIni: string;
  fechaFin: string;
  producto: string;
  tarjeta: string;
  motivo: string;
}

export interface TransactionRejectedResponse {
  estatus: number;
  data: TransactionRejected[];
  total: number;
  porcentaje: number;
  totalPages: number;
}

export interface TransactionRejected {
  ID: number;
  cliente: string;
  producto: string;
  device_id: string;
  tipoTransaccion: string;
  monto: number;
  metodo: string;
  tarjeta: string;
  numTarjeta: string;
  fecha: string;
  codigo: string;
  descripcion: string;
  mensaje: string;
  metodoTransaccion: string;
}

export type TransactionRejectedExcelColumns = TransactionRejected;
