import { Byte } from "./Form";
import {
  Transaction,
  TransactionExcelClientColumns,
  TransactionExcelResponse,
} from "./Transactions";

export enum PARAMETERS_TYPES {
  OPERATIVOS = 1,
  TRANSACCIONALES = 2,
}
export enum ALERT_TYPES {
  "INCREMENTO LÍMITE INFERIOR" = 1,
  "INCREMENTO LÍMITE AUTORIZADO",
  "INHABILITAR",
  "BAJA OPERACIÓN",
  "OPERACIÓN MÚLTIPLE",
  "TICKET ALTO",
}

export enum RISK_TYPES {
  "SIN RIESGO" = 1,
  "MEDIA",
  "ALTA",
  "CRÍTICO",
}
//CAT
export interface OperationsCatAlertas {
  nombre: ALERT_TYPES;
  idagep_catalerta: number;
  descripcion: ALERT_TYPES;
}
export interface OperationsCatAlertasBody {
  range: string;
}
export interface OperationsCatAlertasResponse {
  alertas: OperationsCatAlertas[];
}

export interface OperationsCatRiesgos
  extends Pick<OperationsFastTrackAllBody, "idagep_catriesgo"> {
  nombre: RISK_TYPES;
  descripcion: RISK_TYPES;
}
export interface OperationsCatRiesgosResponse {
  riesgos: OperationsCatRiesgos[];
}

//Parameters
export interface Parameters {
  idagep_usuario: number;
  idagep_catparametros: PARAMETERS_TYPES;
  montoSuperior: number;
  montoMedio: number;
  montoInferior: number;
  diasNaturales: number;
  notificacion: Byte;
  periodoTiempo: number;
  estatus: 1;
}

export interface OperationalParameters extends Parameters {
  idagep_catparametros: PARAMETERS_TYPES.OPERATIVOS;
  montoMedio: 0;
  periodoTiempo: 0;
}

export interface TransactionalParameters extends Parameters {
  idagep_catparametros: PARAMETERS_TYPES.TRANSACCIONALES;
  montoInferior: 0;
  diasNaturales: 0;
  notificacion: 0;
}
export interface AlertsParameters {
  idagep_usuario: number;
  idagep_controles_alertas_param: number;
  ticketAlto: number;
  estatus_ticketAlto: number;
  ticketClienteAlto: number;
  estatus_ticketClienteAlto: number;
  cargoDuplicado: number;
  estatus_cargoDuplicado: number;
  actividadInusual: number;
  estatus_actividadInusual: number;
  horarioAtipicoEnt: string;
  estatus_horarioAtipico: number;
  horarioAtipicoSalida: string;
  estatus_horarioInusual: number;
  duplicidadTarjeta: number;
  estatus_duplicidadTarjeta: number;
  txnIntetrnacional: number;
  estatus_txnInternacional: number;
  estatus_rechazosRiesgo: number;
  rechazoTiempo: number;
  estatus_rechazoTiempo: number;
}
//calls
export interface OperationsParametersOperationalGetBody
  extends Pick<
    OperationalParameters,
    "idagep_catparametros" | "idagep_usuario"
  > {}

export interface OperationsParametersTransactionalGetBody
  extends Pick<
    TransactionalParameters,
    "idagep_catparametros" | "idagep_usuario"
  > {}
export interface GetTransactionalResult {
  parametros: TransactionalParameters[];
}

export interface parametersAlertsGetBody extends AlertsParameters {}

//Nose

export interface UpdateParametersResult {
  parametros: [{ mensaje: string }];
}
export interface CreateAlertResult {
  //parametros: TransactionalParameters[];
}
export interface ParametersAlertsAllResponseEmpresas {}
export interface ParametersAlertsAllResponse {
  empresas: ParametersAlertsAllResponseEmpresas[];
  totalRegistros: number;
}

export interface OperationUpdateStatus {
  idagep_usuario: number;
  idagep_empresa: number;
  estatus: "Deshabilitar";
}

export interface Operation {
  idagep_controles_empresas: number;
  idagep_empresa: number;
  idagep_catalerta: ALERT_TYPES;
  idagep_catriesgo: RISK_TYPES;
  diasOperacion: number;
  fechaAlerta: string;
  fechaRegistro: string;
  montoTransaccionado: number;
  nombre: string;
  primeraTransaccion: string;
}
export interface GetOperationalResult {
  parametros: OperationalParameters[];
}

/* Fasttrack*/
export interface OperationsFastTrackAllBody {
  fechaInicio: string;
  fechaFin: string;
  idagep_catalerta: string;
  idagep_catriesgo: number;
  idagep_empresa: string;
  pagina: number;
  tamano_pagina: number;
}
export interface OperationsFastTrackAllResponse {
  totalRegistros: number;
  empresas: Operation[];
}
/*Alerts */
export interface OperationsAlertsRisksAllBody {
  idagep_usuario: number;
  filtroEmpresa: string;
  filtroAlerta: string;
  filtroEstatus: string;
  pagina: number;
  tamano_pagina: number;
  fechaInicio: string;
  fechaFin: string;
}
export interface OperationsAlertsRisksAllResponseAlertas {
  empresa: string;
  estatus: string;
  fechaEnt: Date;
  idTxn: number;
  idagep_catalerta: number;
  idagep_controles_alertas: number;
  idagep_empresa: number;
  nombre: string;
  tipo: string;
}
export interface OperationsAlertsRisksAllResponse {
  alertas: Array<OperationsAlertsRisksAllResponseAlertas>;
  totalRegistros: number;
}

export interface OperationsAlertsRisksSatusBody {
  idagep_usuario: number;
  idagep_controles_alertas: number;
  estatus: string;
}
export interface OperationsAlertsRisksSatusResponse {}

export interface OperationsAlertsRisksTxnBody {
  idagep_usuario: number;
  idTxn: number;
  tipo: string;
}
export interface OperationsAlertsRisksTxnResponse extends Transaction {}

export interface OperationsAlertsRisksExcelBody {}

export interface OperationsAlertsRisksExcelResponseAlertas
  extends TransactionExcelResponse {
  alerta: string;
  fechaAlerta: string;
}

export interface OperationsAlertsRisksExcelResponse {
  alertas: OperationsAlertsRisksExcelResponseAlertas[];
}
export interface OperationsAlertsRisksExcelColumns
  extends TransactionExcelClientColumns {
  ID: number;
  adquiriente: string;
  afiliacion: string;
  FIID: string;
  cliente: string;
  marcaTarjeta: string;
  metodoPago: string;
  numTarjeta: string;
  monto: number;
  fecha: string;
  hora: string;
  TipodeTransaccion: string;
  numAutorizacion: string;
  modoEntrada: string;
  metodoTH: string;
  ECI: string;
  tipoTarjeta: string;
  tasaComisionEfevoopay: string;
  montoComisionEfevoopay: number;
  IVAComision: number;
  sobretasaEfevoopay: string;
  montoSobretasaEfevoopay: number;
  IVASobretasaEfevoopay: number;
  sucursal: string;
  producto: string;
  terminal: string;
  referencia: string;
  alerta: string;
  fechaAlerta: string;
}
