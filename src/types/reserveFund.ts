export type CreateReserveFundBody = {
  idagep_empresa: number;
  fondoActivo: 1 | 0 /* 1 - ON, 0 OFF */;
  porcentaje: number;
  operacion:
    | "C"
    | "U" /* C- Crear registro,  U- Update el off/on o el porcentaje */;
};

export interface CreateReserveFundResponse {
  mensaje: string;
}

export type kpiReserveFundType = {
  idagep_empresa: number;
  fondoActivo: 1 | 0 /* 1 - ON, 0 OFF */;
  porcentaje: number;
  totalReservado: number;
};

export interface getKpiReserveFundResponse {
  fondo: kpiReserveFundType[];
}
