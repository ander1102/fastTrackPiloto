import { Client } from "./Clients";
import { Byte } from "./Form";

export enum PERSONA {
  fisica = "Física",
  "Física" = "fisica",
  moral = "Moral",
  Moral = "moral",
}

export interface DossiersFilters {
  cumplimiento: string;
  empresafiltro: string;
  persona: string;
  pagina: number;
  tamano_pagina: number;
}

export interface DossiersAllKpis {
  TotalClientes: number;
  Terminados: number;
  Pendientes: number;
  Validar: number;
}

export interface DossierClient
  extends Pick<
    Client,
    | "cumplimiento"
    | "email"
    | "fechaEnt"
    | "idagep_empresa"
    | "infoComercio"
    | "nombre"
    | "persona"
  > {}

export interface DossiersAllResponse {
  empresas: DossierClient[];
  totalRegistros: number;
}

export interface ClientFulfillment {
  [key: string]: boolean | undefined | number | string;
  idagep_empresa?: number | undefined;
  estatus?: number;
}

export interface FulfillmentGet {
  idagep_empresa?: number | undefined;
}

export interface FulfillmentResponse {
  status: number;
  data: ClientFulfillment;
}

export interface FulfillmentExceptionalBodyRead {
  idagep_empresa: number;
  idagep_usuario: number;
}
export interface FulfillmentExceptionalResponseRead {
  excepcional: Byte;
}

export interface FulfillmentExceptionalBodyUpdate {
  idagep_usuario: number;
  idagep_empresa: number;
  excepcional: Byte;
}
export interface FulfillmentExceptionalResponseUpdate {
  mensaje: string;
}
