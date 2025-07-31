import { ClientBankDataBody } from "./Clients";
import { Transaction } from "./Transactions";

export enum LINK_ESTATUS {
  Pagado = "Pagado",
  Pendiente = "Pendiente",
  Vencido = "Vencido",
}

export type APIKeysIntegrationBody = Pick<
  ClientBankDataBody,
  "idagep_empresa" | "operacion"
>;

export interface APIKeysIntegration {
  idagep_empresa: number;
  api_key: string;
  api_secret: string;
  api_totp: string;
  api_hash: string;
  estatus: string;
  fechaEnt: string;
}

export interface IntegrationGenerateAPIKeys {
  mensaje: string;
}

export interface IntegrationHistoryFilters {
  estatus: LINK_ESTATUS | "";
  fechaInicio: string;
  fechaFin: string;
  idagep_empresa: number;
  pagina: number;
  tamano_pagina: number;
}

export interface IntegrationHistoryRecord {
  empresa: string;
  estatus: LINK_ESTATUS;
  fechaCreacion: string;
  fechaPago: string;
  idagep_integraciones_link_pago: number;
  link: string;
  monto: number;
  referencia: string;
  req_id: number;
}

export interface IntegrationHistoryResponse {
  links: IntegrationHistoryRecord[];
  total: number;
}

export interface IntegrationLinkDetailsBody
  extends Pick<IntegrationHistoryRecord, "idagep_integraciones_link_pago"> {}

export interface IntegrationLinkDetailsResponse {
  info: Transaction[];
}

export interface IntegrationKPIsBody
  extends Pick<
    IntegrationHistoryFilters,
    "estatus" | "fechaFin" | "fechaInicio" | "idagep_empresa"
  > {}

export interface IntegrationKPIs {
  totalTransacciones: number;
  montoTotal: number;
  promedioPorTicket: number;
}

export interface IntegrationLink {
  token: string;
  mode: string;
  tokenQR: string;
}

export interface IntegrationLinkPagoBody {
  idagep_empresa: number;
  concepto: string;
  monto: number;
  expiracion: number;
  checkout_opciones: {
    client_email: boolean;
    client_name: boolean;
    client_phone: boolean;
    client_address: boolean;
  };
}

export interface IntegrationLinkPagoResponse {
  status: {
    code: string;
    description: string;
  };
  payload: IntegrationLink;
}

export interface IntegrationLinkNegocioBody {
  idagep_empresa: number;
  mensaje: string;
  montoMax: number;
  checkout_opciones: {
    client_email: boolean;
    client_name: boolean;
    client_phone: boolean;
    client_address: boolean;
  };
}

export interface IntegrationExcelColumn
  extends Omit<IntegrationHistoryRecord, "link"> {}

export interface IntegrationExcelResponse {
  links: IntegrationExcelColumn[];
}
