import { DropdownOptions } from "@app/types/Form";
import { ORIGEN_OPTIONS } from "./client";
import { ESTATUS_EXPEDIENTE, ESTATUS_TYPE } from "@app/types/Clients";
import { PERSONA } from "@app/types/Dossiers";

export const ONLY_LETTERS = /^[A-Za-z\s]*$/;

export const DROPDOWN_ALL = <T>(value: T): DropdownOptions<T>[] => [
  {
    label: "Todos",
    value: value,
  },
];

export const ESTATUS: DropdownOptions<string>[] = [
  {
    label: ESTATUS_TYPE.ACTIVO,
    value: ESTATUS_TYPE.ACTIVO,
  },
  {
    label: ESTATUS_TYPE.INACTIVO,
    value: ESTATUS_TYPE.INACTIVO,
  },
  {
    label: `${ESTATUS_TYPE.SIN_MOVIMIENTO}s`,
    value: ESTATUS_TYPE.SIN_MOVIMIENTO,
  },
  {
    label: ESTATUS_TYPE.DESHABILITADO,
    value: ESTATUS_TYPE.DESHABILITADO,
  },
  // {
  //   label: ESTATUS_TYPE.CONFIGURAR,
  //   value: ESTATUS_TYPE.CONFIGURAR,
  // },
];

export const ESTATUS_USUARIOS: DropdownOptions<string>[] = [
  {
    label: "Habilitado",
    value: "Habilitado",
  },
  {
    label: "Inactivo",
    value: "Inactivo",
  },
];

export const ESTATUS_ALL: DropdownOptions<string>[] =
  DROPDOWN_ALL("").concat(ESTATUS);

export const EXPEDIENTE_ESTATUS: DropdownOptions<string>[] = [
  {
    label: ESTATUS_EXPEDIENTE.VALIDAR,
    value: ESTATUS_EXPEDIENTE.VALIDAR,
  },
  {
    label: ESTATUS_EXPEDIENTE.PENDIENTE,
    value: ESTATUS_EXPEDIENTE.PENDIENTE,
  },
  {
    label: ESTATUS_EXPEDIENTE.TERMINADO,
    value: ESTATUS_EXPEDIENTE.TERMINADO,
  },
];

export const EXPEDIENTE_ESTATUS_ALL: DropdownOptions<string>[] =
  DROPDOWN_ALL("").concat(EXPEDIENTE_ESTATUS);

export const ORIGEN_ALL: DropdownOptions<string>[] =
  DROPDOWN_ALL("").concat(ORIGEN_OPTIONS);

export const PERSONA_OPTIONS: DropdownOptions<string>[] = [
  { label: PERSONA.fisica, value: PERSONA[PERSONA.fisica] },
  { label: PERSONA.moral, value: PERSONA[PERSONA.moral] },
];

export const PERSONA_ALL: DropdownOptions<string>[] =
  DROPDOWN_ALL("").concat(PERSONA_OPTIONS);

export const LEADESTATUS: DropdownOptions<string>[] = [
  {
    label: "Nuevo",
    value: "nuevo",
  },
  {
    label: "Calificado",
    value: "calificado",
  },
  {
    label: "No Calificado",
    value: "nocalificado",
  },
  {
    label: "Contactado",
    value: "contactado",
  },
  {
    label: "Convertido",
    value: "convertido",
  },
];

export const LEADESTATUS_ALL: DropdownOptions<string>[] = LEADESTATUS.concat([
  {
    label: "Todos",
    value: "all",
  },
]);

export const LEADCONTACTED: DropdownOptions<string>[] = [
  {
    label: "Si",
    value: "si",
  },
  {
    label: "No",
    value: "no",
  },
];

export const ROLES: DropdownOptions[] = [
  {
    label: "Administrador",
    value: "Administrador",
  },
  {
    label: "Lectura",
    value: "Lectura",
  },
  // {
  //   label: "Gerente de Ventas",
  //   value: "Gerente de ventas",
  // },
];

export const TRANSACTION_TYPE: DropdownOptions[] = [
  {
    label: "Deposito",
    value: "Deposito",
  },
  {
    label: "Retiro",
    value: "Retiro",
  },
  {
    label: "Comisiones",
    value: "Comisiones",
  },
];

export const TRANSACTION_TYPE_ALL: DropdownOptions[] = TRANSACTION_TYPE.concat([
  { label: "Todos", value: "all" },
]);

export const TERMINAL_ESTATUS: DropdownOptions[] = DROPDOWN_ALL("").concat([
  {
    label: "Asignada",
    value: "Asignada",
  },
  {
    label: "Disponible",
    value: "Disponible",
  },
]);

export const TERMINAL_ESTADO: DropdownOptions[] = DROPDOWN_ALL("").concat([
  {
    label: "Activa",
    value: "Activa",
  },
  {
    label: "Sin movimientos",
    value: "Sin movimientos",
  },
  {
    label: "Inactiva",
    value: "Inactiva",
  },
  {
    label: "Deshabilitada",
    value: "Deshabilitada",
  },
  {
    label: "Disponible",
    value: "Disponible",
  },
]);

export const TERMINAL_SUCURSAL_ESTATUS: DropdownOptions[] = DROPDOWN_ALL(
  ""
).concat([
  {
    label: "Asignada a sucursal",
    value: "Asignada a sucursal",
  },
  {
    label: "Disponible",
    value: "Disponible",
  },
]);

export const USER_FILTER_OPTIONS: DropdownOptions[] = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Administrador",
    value: "Administrador",
  },
  {
    label: "Lectura",
    value: "Lectura",
  },
];

export const FORM_EMPTY_VALUES = ["", null, undefined];

export const GENERO: DropdownOptions<string>[] = [
  {
    label: "Hombre",
    value: "H",
  },
  {
    label: "Mujer",
    value: "M",
  },
];

export const PERSON_TYPE: DropdownOptions<string>[] = [
  {
    label: "Persona Moral",
    value: "moral",
  },
  {
    label: "Persona Fisica",
    value: "Fisica",
  },
];

export const SINO: DropdownOptions<string>[] = [
  {
    label: "Sí",
    value: "si",
  },
  {
    label: "No",
    value: "no",
  },
];

export const LIQUIDACION: DropdownOptions<string>[] = [
  {
    label: "Lunes-Viernes",
    value: "Lunes-Viernes",
  },
  {
    label: "Cada Viernes",
    value: "Cada Viernes",
  },
  {
    label: "Cada Día Último",
    value: "Cada Día Último",
  },
];
export const TERMINAL_TYPE_OPTIONS: DropdownOptions[] = [
  {
    label: "Renta",
    value: "Renta",
  },
];

export const ESTATUS_REFERIDOS: DropdownOptions<string>[] = [
  {
    label: "Prospecto",
    value: "Prospecto",
  },
  {
    label: "En proceso",
    value: "En proceso",
  },
  {
    label: "Habilitado",
    value: "Habilitado",
  },
  {
    label: "Revisar",
    value: "Revisar",
  },
  {
    label: "Todos",
    value: "",
  },
];
