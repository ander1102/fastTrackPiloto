
export const OPERATIONS_DROPDOWN_DEFAULT_SELECT: DropdownOptions<number>[] = [
  {
    label: "Todos",
    value: 0,
  },
];

export const ESTATUS: DropdownOptions<string>[] = [
  {
    label: "Nueva",
    value: "Nueva",
  },
  {
    label: "Validada",
    value: "Validada",
  },
  {
    label: "Retenida",
    value: "Retenida",
  },
];

import { ExcelCell, ExcelOptions } from "@app/types/Excel";
import { DropdownOptions } from "@app/types/Form";
import {
  AlertsParameters,
  OperationalParameters,
  PARAMETERS_TYPES,
  TransactionalParameters,
  OperationsAlertsRisksExcelColumns
} from "@app/types/Operations";
import { User } from "@app/types/User";

function getTimePeriods(hours: number): DropdownOptions<number>[] {
  const hourArray = [];
  for (let h = 1; h <= hours; h++) {
    const label = `${h} hora${h === 1 ? "" : "s"}`;
    const value = h;
    hourArray.push({ label, value });
  }
  return hourArray;
}

export const PERIODO_DE_TIEMPO_OPTIONS = getTimePeriods(24);

export const INIT_VALUES_OPERATIONAL = (user: User): OperationalParameters => ({
  idagep_usuario: user.persona.idagep_usuarios,
  montoSuperior: 0,
  idagep_catparametros: PARAMETERS_TYPES.OPERATIVOS,
  montoInferior: 0,
  montoMedio: 0,
  diasNaturales: 0,
  notificacion: 0,
  periodoTiempo: 0,
  estatus: 1,
});
export const INIT_VALUES_TRANSACTIONAL = (
  user: User
): TransactionalParameters => ({
  idagep_usuario: user.persona.idagep_usuarios,
  montoSuperior: 0,
  idagep_catparametros: PARAMETERS_TYPES.TRANSACCIONALES,
  montoInferior: 0,
  montoMedio: 0,
  diasNaturales: 0,
  notificacion: 0,
  periodoTiempo: 0,
  estatus: 1,
});

export const INIT_VALUES_ALERTS = (user: User): AlertsParameters => ({
  idagep_usuario: user.persona.idagep_usuarios,
  idagep_controles_alertas_param: 0,
  ticketAlto: 0,
  estatus_ticketAlto: 0,
  ticketClienteAlto: 0,
  estatus_ticketClienteAlto: 0,
  cargoDuplicado: 0,
  estatus_cargoDuplicado: 0,
  actividadInusual: 0,
  estatus_actividadInusual: 0,
  horarioAtipicoEnt: "00:00:00",
  estatus_horarioAtipico: 0,
  horarioAtipicoSalida: "00:00:00",
  estatus_horarioInusual: 0,
  duplicidadTarjeta: 0,
  estatus_duplicidadTarjeta:0,
  txnIntetrnacional: 0,
  estatus_txnInternacional: 0,
  estatus_rechazosRiesgo: 0,
  rechazoTiempo: 0,
  estatus_rechazoTiempo: 0,
});

const EXCEL_ALERTS_RISKS_TRANSACTION_CLIENT_COLUMNS: Record<keyof OperationsAlertsRisksExcelColumns, string> =
  {
    ID:"ID",
    adquiriente:"Adquiriente",
    afiliacion:"Afiliación",
    FIID:"FIID",
    cliente:"Cliente",
    marcaTarjeta:"Marca de Tarjeta",
    metodoPago:"Método de Pago",
    numTarjeta:"Número de Tarjeta",
    monto:"Monto",
    fecha:"Fecha",
    hora:"Hora",
    TipodeTransaccion:"Tipo de Transacción",
    numAutorizacion:"Número de autorización",
    modoEntrada:"Modo de Entrada",
    metodoTH:"Metodo de Autenticación TH",
    ECI:"ECI",
    tipoTarjeta:"Tipo de Tarjeta",
    tasaComisionEfevoopay:"Tasa Comisión Thunderpay",
    montoComisionEfevoopay:"Monto Comisión Thunderpay",
    IVAComision:"IVA Comisión Thunderpay",
    sobretasaEfevoopay:"Sobretasa Thunderpay",
    montoSobretasaEfevoopay:"Monto Sobretasa Thunderpay",
    IVASobretasaEfevoopay:"IVA Sobretasa Thunderpay",
    sucursal:"Sucursal",
    producto:"Producto",
    terminal:"Terminal",
    referencia:"Referencia",
    alerta:"Alerta",
    fechaAlerta:"Fecha Alerta"
  };

  const ALERTS_RISKS_TRANSACTION_EXCEL_CLIENT_HEADER_CONFIG = Object.fromEntries(
    Object.keys(EXCEL_ALERTS_RISKS_TRANSACTION_CLIENT_COLUMNS).map((key) => [
      key,
      {
        height: 30,
        align: "left",
        alignVertical: "bottom",
        fontWeight: "bold",
        wrap: true,
      } as ExcelCell
    ])
  );

export const OPERATIONS_ALERTS_RISKS_TRANSACTION_EXCEL_CLIENT_CONFIG: Partial<
  ExcelOptions<OperationsAlertsRisksExcelColumns>
> = {
  displayColumns: EXCEL_ALERTS_RISKS_TRANSACTION_CLIENT_COLUMNS,
  headerOptions: ALERTS_RISKS_TRANSACTION_EXCEL_CLIENT_HEADER_CONFIG,
  columnOptions: {
    ID: { width: 10 },
    marcaTarjeta:{ width: 10 },
    metodoPago:{ width: 20 },
    numTarjeta: { width: 20 },
    monto:{ width: 15 },
    fecha:{ width: 15 },
    hora:{ width: 15 },
    TipodeTransaccion:{ width: 25 },
    numAutorizacion:{ width: 20 },
    tipoTarjeta:{ width: 10 },
    tasaComisionEfevoopay:{ width: 20 },
    montoComisionEfevoopay:{ width: 20 },
    IVAComision:{ width: 20 },
    sobretasaEfevoopay:{ width: 20 },
    montoSobretasaEfevoopay:{ width: 20 },
    IVASobretasaEfevoopay:{ width: 20 },
    sucursal:{ width: 20 },
    producto:{ width: 20 },
    terminal:{ width: 30 },
    referencia:{ width: 20 },
    alerta:{ width: 20 },
    fechaAlerta:{ width: 20 },
  },
  itemOptions:{
    monto: { type: "number",format:"$#,##0.00" },
    montoComisionEfevoopay: { type: "number",format:"$#,##0.000" },
    IVAComision: { type: "number",format:"$#,##0.00" },
    montoSobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
    IVASobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
  },
};
