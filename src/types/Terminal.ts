export interface Terminal {
  idagep_terminal: number;
  idagep_terminal_tipo: number;
  snTerminal: string;
  aplicacionInst: string | null;
  ubicacionFisica: string;
  custodioInterno: string;
  fechaEnt: string;
  fechaMod: string;
  fechaTransaccion: string;
  Estado: string;
  Modelo: string;
  descripcion: string;
  fabricante: string;
  firmware: string;
  conectividad: string;
  estado_asignacion: string;
  Empresa: string;
  estatus: number;
  idEmpresa: number;
  idagep_sucursal: number;
  estado_asignacion_sucursal: string;
  Sucursal: string;
  estatus_terminal: number;
}

export interface TerminalByIdBody {
  idagep_empresa: number;
  idagep_terminal: number;
}

export type TerminalDisabled = Record<keyof Terminal, boolean>;

export interface TerminalResponse {
  terminales: Terminal[];
  total: number;
}

export interface TerminalTotal {
  total: number;
  totalAssign: number;
  totalAssignD20: number;
  totalAssignD30: number;
  totalAssignQPSMini: number;
  totalAvailable: number;
  totalAvailableD20: number;
  totalAvailableD30: number;
  totalAvailableQPSMini: number;
}

export interface TerminalTotalRecordsResponse {
  data: {
    count: [
      {
        "Total de terminales": number;
        "Total de asignadas": number;
        "Total de asignadas D20": number;
        "Total de asignadas D30": number;
        TotalQPSMini: number;
        "Total disponibles": number;
        "Total disponibles D20": number;
        "Total disponibles D30": number;
        "Total disponibles QPSMini": number;
      }
    ];
  };
}

export interface TerminalType {
  idagep_terminal_tipo: number;
  nombre: string;
  descripcion: string;
  fabricante: string;
  frimware: string | null;
  conectividad: string;
}

export interface TerminalTypeResponse {
  tipos: TerminalType[];
}

export interface TerminalFilters {
  idagep_empresa: number;
  idagep_usuarios: number;
  estatus: string;
  filtro: string;
  pagina: number;
  tamano_pagina: number;
  terminalesDisp: string;
}

export interface TerminalAssignAdmin {
  idagep_empresa: number;
  idCliente: number;
  snTerminal: string;
}

export interface TerminalUnassignAdmin extends TerminalAssignAdmin {
  operacion: "D";
}

export interface TerminalAssignClient
  extends Omit<TerminalAssignAdmin, "idCliente"> {
  idagep_sucursal: number;
}
