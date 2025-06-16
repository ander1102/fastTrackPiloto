import { Terminal, TerminalFilters } from "@app/types/Terminal";
import { User } from "@app/types/User";

export const DEFAULT_TERMINAL_INFO: Terminal = {
  aplicacionInst: "",
  conectividad: "",
  custodioInterno: "",
  descripcion: "",
  Empresa: "",
  estado_asignacion: "",
  fabricante: "",
  fechaEnt: "",
  fechaMod: "",
  fechaTransaccion: "",
  firmware: "",
  Estado: "",
  idagep_terminal: 0,
  idagep_terminal_tipo: 0,
  Modelo: "",
  snTerminal: "",
  ubicacionFisica: "",
  estatus: 0,
  idEmpresa: 0,
  idagep_sucursal: 0,
  estado_asignacion_sucursal: "",
  Sucursal: "",
  estatus_terminal: 0,
};

export const REQUIRED_TERMINAL_INFO: (keyof Terminal)[] = [
  "snTerminal",
  "Modelo",
  "firmware",
];

export const DEFAULT_TERMINAL_ROWS = 20;

export const DEFAULT_TERMINAL_VALUES = (user: User): TerminalFilters => ({
  idagep_empresa: user.idagep_empresa ?? 0,
  idagep_usuarios: user.persona.idagep_usuarios ?? 0,
  estatus: "",
  filtro: "",
  pagina: 1,
  tamano_pagina: DEFAULT_TERMINAL_ROWS,
  terminalesDisp: "",
});
