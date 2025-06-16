export interface SubsidiaryAddress {
  calle: string;
  NoInt: string;
  NoExt: string;
  colonia: string;
  estado: string;
  pais: string;
  telefono: string;
  ciudad: string;
  delegacion: string;
  cp: string;
}

export interface SubsidiaryContact {
  nombre: string;
  telefono: string;
}

export interface Subsidiary {
  idagep_empresa: number;
  idagep_sucursal: number;
  nombre: string;
  email: string;
  infoDomicilio: SubsidiaryAddress;
  infoContactos: SubsidiaryContact[];
  estatus: number;
  nombre_empresa: string;
}

export interface SubsidiaryPost {
  idagep_empresa: number;
  idagep_sucursal: number;
  nomSucursal: string;
  email: string;
  infoDomicilio: SubsidiaryAddress;
  infoContactos: SubsidiaryContact[];
  estatus: number;
}

export type SubsidiaryDisabled = Record<keyof Subsidiary, boolean>;

export interface SubsidiaryQuery {
  idagep_usuarios: number;
  idagep_empresa: number;
  idagep_sucursal: number;
  nomSucursal: string;
  pagina: number;
  tamano_pagina: number;
}

export type SubsidiaryGetResponse = [
  {
    mensaje: {
      sucursales: Subsidiary[];
    };
  }
];

export type SubsidiaryPostResponse = [
  {
    mensaje: SubsidiaryPostMessage;
  }
];

export interface SubsidiaryPostMessage {
  mensaje: string;
  idSucursal: number;
  idagep_empresa: number;
}

export type SubsidiaryTotalRecordsResponse = {
  "Total de sucursales": number;
};
