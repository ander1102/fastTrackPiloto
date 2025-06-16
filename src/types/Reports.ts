import { DatePeriod } from "@app/common/date";
import { ItemManager } from "@app/hooks/useCall";
import { TransactionType } from "./Transactions";

export enum REPORT_TYPE {
  COMISION,
  RESUME,
}

export enum ENTITY_REPORT_TYPE {
  CLIENT,
  SUBSIDIARY,
}

export enum AMOUNT_REPORT_TYPE {
  DAILY,
  ENTITY,
}

export enum ZONE_REPORT_TYPE {
  NATIONAL,
  INTERNATIONAL,
}

export enum CARD_REPORT_TYPE {
  VISA,
  MASTERCARD,
}

export type ReportGetOperation = "MC" | "MD" | "MS";

export interface ReportGetBody {
  idagep_usuarios: number;
  idagep_empresa: number;
  filtroEmp: string;
  filtroSuc: number;
  filtroTarj: string;
  filtroNac: string;
  filtroTipo: TransactionType;
  fechaInicio: string;
  fechaFin: string;
  operacion: ReportGetOperation;
  origen: string;
}

export interface ReportComissionBody {
  idagep_usuarios: number;
  idagep_empresa: number;
  filtroEmp: string;
  filtroSuc: string;
  fechaInicio: string;
  fechaFin: string;
  operacion: "DS" | "DE";
  origen?: string;
}

export type ReportResumeEntity = { [entity: string]: ReportResumeEntityInfo };

export type ReportResumeDaily = {
  datos: ReportResumeTransaction[];
} & ReportResumeEntityValues;

export type ReportResumeEntityInfo = Omit<ReportResumeEntityValues, "name">;

export type ReportResumeGraphicsInfo = Pick<
  ReportResumeEntityValues,
  "countDUKPT" | "countTLS" | "countPR" | "countVisa" | "countMC" | "countD" | "countC"
> & {
  countNac: number;
  countInt: number;
  countTotalDukpt: number;
  countTotalTls: number;
  countTotalPr: number;
  countTotal: number;
  countTotalD: number;
  countTotalC: number;
  countTotalN: number;
  countTotalI: number;
};

export interface ReportResumeEntityValues {
  countDUKPT: number;
  countTLS: number;
  countPR: number;
  countVisa: number;
  countMC: number;
  sumTotal?: number;
  sumSubtotal?: number;
  sumComision?: number;
  name?: string;
  countD: number;
  countC: number;
  sumUtilidad: number;
  sumTasa: number;
}

export interface ReportResumeTransaction {
  req_id: number;
  empresa: string;
  sucursal: string;
  tipo: string;
  redtarj: string;
  nacionalidad: string;
  tipotarj: string;
  total: number;
  subtotal: number;
  comision: number;
  fecha: string;
  tasa: number;
  utilidad: number;
}

export interface ResumeReportKPIs {
  diasDIF: number | null;
  totalTransacciones: number | null;
  montoTotal: number | null;
  transaccionesProm: number | null;
  montoProm: number | null;
  comision: number;
  comisionProm: number;
  tasa: number;
  utilidad: number;
  porcentajeTasaProm: string;
}

export interface ResumeReportChartCall<IManager> {
  refresh: (args?: [body: ReportGetBody] | undefined) => void;
  itemManager: ItemManager<IManager>;
}

interface CHART_REPORT_TYPE {
  entity: ReportResumeEntity;
  daily: ReportResumeDaily;
}

export type ResumeReportChartRef = Partial<
  Record<
    keyof CHART_REPORT_TYPE,
    ResumeReportChartCall<CHART_REPORT_TYPE[keyof CHART_REPORT_TYPE]>
  >
>;

export type ResumeReportPeriodType = keyof DatePeriod;

export interface ResumeReportDailyPeriod {
  data: (ReportResumeTransaction & { period: DatePeriod })[];
}

export type ResumeReportEntityChart = [
  entity: string,
  info: ReportResumeGraphicsInfo
][];

export interface MasterComissionReportDataExcel {
  ID:number,
  adquiriente:string,
  Tarjeta:string,
  MetodoPago:string,
  numTarjeta:string,
  Tipo:string,
  fecha:string,
  hora:string,
  cliente:string,
  Monto:number,
  tasaComisionEfevoopay:string,
  montoComisionEfevoopay:number,
  IVAComision:number,
  montoComisionIVA:number,
  tasaComisionAdquiriente:string,
  montoComisionAdquiriente:number,
  IVAAdquiriente:number,
  tasaAdquirienteIVA:number,
  sobretasaEfevoopay:string,
  montoSobretasaEfevoopay:number,
  IVASobretasaEfevoopay:number,
  montoSobretasaEfevoopayIVA:number,
  sobretasaAdquiriente:string,
  montoSobretasaAdquiriente:number,
  IVASobretasaAdquiriente:number,
  montoSobretasaAdquirienteIVA:number,
  utilidadBruta:number,
  netoCliente:number
}

export type AdminComissionReportDataExcelResponse = {
  datos: MasterComissionReportDataExcel[];
};

export type MasterComissionReportExcelColumns = MasterComissionReportDataExcel;

export interface ComissionReportDataExcel {
  ID: number;
  Tarjeta: string;
  MetodoPago: string;
  numTarjeta: string;
  Tipo: string;
  FechaHora: string;
  Cliente: string;
  Monto: number;
  TasaComisionEfevoopay: string;
  ComisionEfevoopay: number;
  ivaComision: number;
  comisionIVA: number;
  TasaComisionBanorte: number;
  TasaBanorte: number;
  BanorteIVA: number;
  TasaBaorteIVA: number;
  utilidad: number;
  Neto: number;
  Sucursal: string;
  porcentajeTasa: string | number;
  sobretasa: string | number;
  sobretasaIVA:string | number;
  adquiriente: string;
}

export type ComissionReportData = Pick<
  ComissionReportDataExcel,
  | "ID"
  | "Monto"
  | "comisionIVA"
  | "TasaBaorteIVA"
  | "utilidad"
  | "porcentajeTasa"
> & { cliente: string; sucursal: string };

export type ComissionReportDataResponse = {
  usuarios: ComissionReportData[];
};

export interface ReportChartPaginator {
  first: number;
  rows: number;
}

export type ComissionReportDataResponseExcel = {
  datos: ComissionReportDataExcel[];
};

export interface ReportCallback {
  id: string;
  cb: () => void;
}

export type ReportEvents = "success" | "loading";

export interface ReportResponseEvents {
  requestSuccess: () => void;
  setSuccessCb: (id: string, cb: () => void) => void;
  setLoadingCb: (id: string, cb: () => void) => void;
}

export interface ReportChildrenProps<IEntity> {
  filter: IEntity;
  onChange: <IKey extends keyof IEntity>(
    key: IKey,
    newValue: IEntity[IKey]
  ) => void;
  onChangeByObj: (newObj: Partial<IEntity>) => void;
  successListenner: ReportResponseEvents;
}

export type ComissionReportExcelColumns = Omit<
  ComissionReportDataExcel,
  "Cliente" | "Sucursal"
> &
  Partial<Pick<ComissionReportDataExcel, "Cliente" | "Sucursal">>;

export interface ResumeShowValues {
  getValue?: (value: number) => string;
}
