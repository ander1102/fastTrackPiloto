import { Byte } from "./Form";

export interface DepositsGet {
  idagep_empresa: number;
  monto: number;
  tipoDep: number;
  referencia: string;
  transacciones?: string;
  operacion: "R" | "C" | "D" | "RES" | "T";
  fechaInicio?: string;
  fechaFin?: string;
  montoTotal: number;
  porcentaje: number;
  montoReserva: number;
  idDeposito?: number;
}

export interface Deposit {
  ultima_fecha?: any;
  primera_fecha?: any;
  subtotal?: string;
  deducciones?: string;
  iva?: string;
  comisiones?: string;
  ventas?: string;
  acumulado?: number;
  saldo?: string;
  FechaHora?: Date | string | any;
  descripcion?: string;
  idDeposito?: number;
  idagep_empresa?: number;
  monto: string;
  montoReserva: string;
  porcentaje: string;
  nombre: string;
  referencia: string;
}

export interface DepositExcel {
  idDeposito?: number;
  Sucursal?: string;
  tipotarj: string;
  FechaHora?: string;
  monto: string;
  comision?: string;
  iva?: string;
  saldo?: string;
  acumulado?: number;
}

interface DepositsResponse {
  depositos: Deposit[];
}

export type DepositsGetResponse = DepositsResponse;

export type DepositExcelColumns = Pick<
  Deposit,
  | "FechaHora"
  | "descripcion"
  | "idDeposito"
  | "idagep_empresa"
  | "monto"
  | "nombre"
  | "referencia"
>;


export type DepositTransExcelColumns = Pick<
DepositExcel,
  | "idDeposito"
  | "Sucursal"
  | "tipotarj"
  | "FechaHora"
  | "monto"
  | "comision"
  | "iva"
  | "saldo"
  | "acumulado"
>;

export interface DepositGetByDate {
  idagep_empresa: number;
  fechaInicio: string;
  fechaFin: string;
}

export interface SendDepositsBody {
  idagep_empresa: number;
  avisoCorreo: Byte;
}
