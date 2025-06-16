import exp from "constants";
import { number } from "prop-types";

export enum CardTransactionType {
  DEPOSIT,
  WITHDRAWAL,
  CANCELATION,
}

export enum CardPaymentType {
  TARJETA,
  SPEI
}

//Card Request
export interface CardRequestBody {}
export interface CardRequestRequest {
  idagep_empresa: string;
  nombre: string;
  fechaNacimiento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  curp: string;
  genero: string;
  rfc: string;
  direccion: string;
  colonia: string;
  municipio: string;
  codigoPostal: string;
  ocupacion: string;
  empresa: string;
  puesto: string;
  antiguedad: string;
  sueldoMensual: number | string; // Número solamente
  dependienteEconomico: string;
  nombreReferencia: string;
  contactoReferencia: string;
  terminos: boolean;
  buroCredito: boolean;
}

//Card Count
export interface CardCountdownBody {}
export interface CardCountdownRequest extends CardStatus {}

//Card Block
export interface CardBlockBody {
  idagep_empresa: number;
  card: number;
  action: string;
}
export interface CardBlockRequest {}

//Card Credit
export interface CardCreditBody {}

export interface CardCreditRequest {
  status: CardStatus;
  response: CardCreditResponse;
}
export interface CardCreditResponse {
  credit: CardCreditResponseCredit;
}
export interface CardCreditResponseCredit {
  credit_auth: number;
  credit_limit: string | number;
  min_payment: string | number;
  not_interest_payment: string | number;
  delay_amount: string | number;
  total_debt: string | number;
  cut_off_date: string;
  limit_date: string;
}

//Card Status
export interface CardStatusBody {}
export interface CardStatus {
  code: number;
  mensaje: string;
}

//Card Status Request
export interface CardStatusRequest {
  idagep_empresa: number;
  binCard: string;
  idEpaycard: number;
  estatus: string;
}
//card info
export interface CardInfoBody {}

export interface CardInfoRequest {
  status: CardStatus;
  response: CardInfoRequestResponse;
}
export interface CardInfoRequestResponse {
  cards: CardInfoRequestResponseCard[];
  client_id: number;
  cliente_info: CardInfoRequestResponseClienteInfo;
  tipoPago: CardPaymentType;
}
//Card info card
export interface CardInfoCardBody {
  idagep_empresa: number;
  card: number;
}
export interface CardInfoCardRequest {
  status: CardStatus;
  response: CardInfoCardRequestResponse;
}

export interface CardInfoCardRequestResponse {
  card: CardInfoCardRequestResponseCard;
}
export interface CardInfoCardRequestResponseCard {
  CLABE: string;
  CuentaInterna: string;
  account: string;
  balance: any;
  bin: string;
  company: string;
  creditCard: boolean;
  credit_limit: number | string;
  credit_remaining: number | string;
  credit_used: number | string;
  current_balance: number | string;
  expDate: string;
  ext: string;
  id: string;
  imagePNG: string;
  imageSVG: string;
  name: string;
  organization: string;
  product: string;
  status: string;
  stp: string;
  subproduct: number | string;
  supportPhone: string;
  type: string;
}
export interface CardInfoRequestResponseCard {
  id: number;
  product: number;
  subproduct: number;
  name: string;
  bin: string;
  status: string;
  expDate: string;
  type: string;
  coin: string;
  balance: number;
  ext: number;
  stp: string;
  creditCard: boolean;
  current_balance: number;
  credit_limit: number;
  credit_used: number;
  credit_remaining: number;
  cut_off_date: string;
  limit_date: string;
  company: string;
  supportPhone: string;
  imagePNG: string;
  imageSVG: string;
  organization: string;
}
export interface CardInfoRequestResponseClienteInfo {
  correo: string;
  nombre: string;
  address: string;
  telefono: string;
  nombreEmbozar: string;
  paisNacimiento: string;
  primerApellido: string;
  segundoApellido: string;
}

//CardTransactions
export interface CardTransactionsBody {
  idagep_empresa: number;
  card: number;
  fechaEnt: string;
  fechaFin: string;
}
export interface CardTransactionsRequest {
  response: CardTransactionsRequestResponse;
  status: CardStatus;
}

export interface CardTransactionsRequestResponse {
  transactions: CardTransactionsRequestResponseTransaction[];
}
export interface CardTransactionsRequestResponseTransaction {
  Autorizacion: string;
  ClaveMovimiento: string;
  Comercio: string;
  ConceptoMovimiento: string;
  Correo: string;
  DescripcionComercio: string;
  DescripcionPais: string;
  DescripcionPostOperacion: string;
  EstatusPostOperacion: string;
  FechaMovimiento: string;
  IDMovimiento: string;
  IdMovimiento: string;
  ImporteMovimiento: string;
  ImporteOrigenMovimiento: string;
  MCC: string;
  MedioAcceso: string;
  Moneda: string;
  MonedaMovimiento: string;
  MonedaOrigenMovimiento: string;
  Nombre: string;
  NumeroAfiliacionComercio: string;
  Observaciones: string;
  Organizacion: string;
  PaisComercio: string;
  PrimerApellido: string;
  Referencia: string;
  SaldoDespuesMovimiento: string;
  SegundoApellido: string;
  Tarjeta: string;
  TarjetaTransaccion: string;
  TipoMovimientoCargoAbono: string;
  TipoTransaccion: string;
  company: number;
}

//
export interface CardPayBody {
  idagep_empresa: number;
  card: number;
  montoTotal: number;
  transacciones: string;
}
export interface CardPayRequestResponse {
  idagep_empresa: string;
  card: number;
  montoTotal: string;
  transacciones: string;
}

// CardDeposits
export interface CardDepositsBody {
  idagep_empresa: string;
  operacion: string;
}
export interface CardDepositsRequestResponse {
  transacciones: CardDepositsRequestResponseTransaction[];
}
export interface CardDepositsRequestResponseTransaction {
  req_id: number;
  Empresa: string;
  Sucursal: string;
  tipotarj: string;
  redtarj: string;
  tipotxn: string;
  tipo: string;
  pan: string;
  fechaEnt: string;
  total: string;
  Comision: string;
  subtotal: string;
  acumulado: string;
}
//CardCVV
export interface CardCVVBody {}
export interface CardCVVRequest {
  response: CardCVVRequestResponse;
  status: CardStatus;
}
export interface CardCVVRequestResponse {
  cvv: string;
  expirationDateTime: string;
  expirationSeconds: number;
}
//CardNIP
export interface CardNIPBody {}
export interface CardNIPRequest {
  response: CardNIPRequestResponse;
  status: CardStatus;
}
export interface CardNIPRequestResponse {
  nip: string;
}
