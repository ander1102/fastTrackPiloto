import { DataTableQuery } from "@app/types";
import {
  Subsidiary,
  SubsidiaryAddress,
  SubsidiaryContact,
  SubsidiaryQuery,
} from "@app/types/Subsidiary";
import { User } from "@app/types/User";

export const DEFAULT_SUBSIDIARY_ROWS = 10;

export const DEFAULT_SUBSIDIARY_BODY = (user: User): SubsidiaryQuery => ({
  idagep_usuarios: user.persona.idagep_usuarios ?? 0,
  idagep_empresa: user.idagep_empresa ?? 0,
  idagep_sucursal: 0,
  nomSucursal: "",
  pagina: 1,
  tamano_pagina: 10,
});

export const DEFAULT_SUBSIDIARY_QUERY: DataTableQuery = {
  first: 0,
  page: 0,
  rows: DEFAULT_SUBSIDIARY_ROWS,
  totalRecords: 0,
  currRecords: 0,
};

export const DEFAULT_SUBSIDIARY_ADDRESS: SubsidiaryAddress = {
  calle: "",
  ciudad: "",
  colonia: "",
  delegacion: "",
  estado: "",
  NoExt: "",
  NoInt: "",
  pais: "",
  telefono: "",
  cp: "",
};

export const DEFAULT_SUBSIDIARY_CONTACTS: SubsidiaryContact = {
  nombre: "",
  telefono: "",
};

export const DEFAULT_SUBSIDIARY_INFO = (user: User): Subsidiary => ({
  email: "",
  estatus: 1,
  idagep_empresa: user.idagep_empresa ?? 0,
  idagep_sucursal: 0,
  infoDomicilio: DEFAULT_SUBSIDIARY_ADDRESS,
  infoContactos: [DEFAULT_SUBSIDIARY_CONTACTS],
  nombre: "",
  nombre_empresa: "",
});

export const REQUIRE_SUBSIDIARY_FIELDS: (keyof Subsidiary)[] = [
  "nombre",
  "email",
];
