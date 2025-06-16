import { Byte, FormRecord } from "./Form";
import { User, UserPermissions } from "./User";
import { FormikErrors } from "formik";
import { OnChangeParams } from "@app/components/InputFile";
import { ClientFulfillment } from "@app/types/Dossiers";
import { ClientPersona } from "@app/layout/clientes/form/types";
import { SVG } from "@app/components/svg";
import {
  ClientsReferralsQuotation,
  ClientsReferralsResQuotation,
} from "@app/types/ClientsReferrals";

export enum ESTATUS_TYPE {
  ACTIVO = "Activo",
  INACTIVO = "Inactivo",
  SIN_MOVIMIENTO = "Sin movimiento",
  DESHABILITADO = "Deshabilitado",
  CONFIGURAR = "Configurar",
}

export enum ESTATUS_EXPEDIENTE {
  VALIDAR = "Validar",
  PENDIENTE = "Pendiente",
  TERMINADO = "Terminado",
}

export enum ORIGEN_CLIENT_TYPE {
  VENTAS_DIGITALES = "Ventas Digitales",
  RED_COMERCIAL = "Red Comercial",
  VENTA_INTERNA = "Venta Interna",
  USO_INTERNO = "Uso Interno",
  POR_DEFINIR = "Por Definir",
}

export interface ClientOperations {
  ventaMensual: number | undefined;
  ticketPromedio: number | undefined;
  ticketAlto: number | undefined;
  horarioI: string;
  horarioF: string;
  banco: string;
  cuenta: string;
  clabe: string;
  titular: string;
  reverso: string;
}

export interface ClientAddress {
  calle: string;
  numExt: string;
  numInt: string;
  colonia: string;
  ciudad: string;
  municipio: string;
  codigoPostal: string;
  estado: string;
  pais: string;
}

export interface ClientCommerce {
  razonSocial: string;
  rfc: string;
  fechaConst: string;
  giroSocial: string;
  paisConst: string;
  telefono: string;
  email: string;
  banco: string;
  cuenta: string;
  clabe: string;
  titular: string;
  correoDeposito: number;
  persona: string;
  origen: ORIGEN_CLIENT_TYPE | "";
}

export interface ClientContacts {
  nombre: string;
  telefono: string;
  email: string;
}

export interface ClientRepresents {
  nombre: string;
  fechaNacimiento: string;
  rfc: string;
  curp: string;
  pais: string;
  acreditacion: string;
  numeroAcreditacion: string;
  documents: ClientDocuments[];
}

export interface ClientCollection extends Client {
  empresa: string;
}
export interface ClientFinance {
  monto: number;
  comision: number;
  tasa: number;
  utilidad: number;
  saldoefevoo: number;
  reserva: number;
}

export interface ClientFinanceBody {
  idagep_empresa: number;
  fechaInicio: string;
  fechaFin: string;
}

export interface ClientFinanceCheckBody {
  idagep_empresa: number;
  estatus?: number;
}

export interface ClientFinanceCheck {
  idagep_empresa: number;
  estatus: number;
}
export interface ClientAdquiriente {
  idagep_tipo_tasa: number | undefined;
  idagep_cat_producto: number;
  idagep_adquiriente: number | undefined;
  afiliacion: string;
  fiid: string;
  intercambioTD: number | undefined;
  intercambioTC: number | undefined;
  intercambioTI: number | undefined;
  comisionTD: number | undefined;
  comisionTC: number | undefined;
  comisionTI: number | undefined;
  msi: 0 | 1;
  msi3: 0 | 1;
  msi6: 0 | 1;
  msi9: 0 | 1;
  msi12: 0 | 1;
  msi18: 0 | 1;
  msi24: 0 | 1;
  intercambio3: number | undefined;
  intercambio6: number | undefined;
  intercambio9: number | undefined;
  intercambio12: number | undefined;
  intercambio18: number | undefined;
  intercambio24: number | undefined;
  comision3: number | undefined;
  comision6: number | undefined;
  comision9: number | undefined;
  comision12: number | undefined;
  comision18: number | undefined;
  comision24: number | undefined;
  minimo3: number | undefined;
  minimo6: number | undefined;
  minimo9: number | undefined;
  minimo12: number | undefined;
  minimo18: number | undefined;
  minimo24: number | undefined;
  estatus: 0 | 1;
}

export interface Client {
  idagep_catpago: number;
  idagep_empresa: number;
  idagep_usuarios: number;
  idagep_catgiro: number;
  id_login?: number;
  nombre: string;
  descripcion: string;
  email: string;
  infoComercio: ClientCommerce;
  infoDomicilio: ClientAddress;
  infoContactos: ClientContacts[];
  infoRepresentantes: ClientRepresents[];
  infoOperaciones: ClientOperations;
  infoCotizacion: ClientsReferralsQuotation;
  terminal: ClientAdquiriente;
  terminalAMEX: ClientAdquiriente;
  ventaLinea: ClientAdquiriente;
  ventaLineaAMEX: ClientAdquiriente;
  resCotizacion: ClientsReferralsResQuotation;
  tasa: number | undefined;
  "3DS": number;
  minimo3DS: number | undefined;
  ticketPromedioMensual: number | undefined;
  msi: number;
  plazosMsi: number;
  plazosMci: number;
  fechaEnt: string;
  fechaMod: string;
  estatus: number | string;
  Giro: string;
  fondoActivo: 0 | 1;
  porcetaje: number | undefined;
  documents: ClientDocuments[];
  estado?: string;
  montoliquidar?: number | string;
  saldoefevoo?: number;
  kpiReserveFund: number | undefined;
  refreshReserveFund: number | undefined;
  cumplimiento?: string | undefined;
  persona: ClientPersona;
  ecommerce: Byte;
}

export interface ClientsFilters {
  cumplimiento: string;
  estatus: string;
  fechaInicio: string;
  fechaFin: string;
  idagep_empresa: string;
  origen: string;
  pagina: number;
  tamano_pagina: number;
}

export interface ClientsAllKpis {
  TotalClientes: number;
  Activo: number;
  sin_movimiento: number;
  Inactivo: number;
  Deshabilitado: number;
  Configurar: number;
}

export interface ClientsKpis {
  TotalClientes: number;
  Activo: number;
  sin_movimiento: number;
  Inactivo: number;
  Deshabilitado: number;
  Configurar: number;
  Terminados: number;
  Pendientes: number;
  Validar: number;
}

export interface ClientsKpisResponse {
  status: number;
  data: ClientsKpis;
}

export interface ClientsHabilitarBody {
  estatus: "Activo" | "Deshabilitar";
  idagep_empresa: number;
  idagep_usuario: number;
}
export interface ClientsHabilitarResponse {
  mensaje: string;
  idagep_empresa: number;
}

export type ClientDisable = Record<keyof Client, boolean>;

interface ClientExtraData {
  emailUsuario: string | null;
  id3DS: number;
  nombreUsuario: string | null;
}

export type ClientCreateBody = Omit<
  Client,
  | "idagep_catpago"
  | "idagep_empresa"
  | "3DS"
  | "fechaEnt"
  | "fechaMod"
  | "tasa"
  | "idagep_catgiro"
  | "documents"
  | "infoRepresentantes"
> & {
  infoRepresentantes: Omit<ClientRepresents, "documents">[];
  accesos: UserPermissions[];
} & ClientExtraData;

export type ClientUpdateBody = Omit<
  Client,
  "3DS" | "fechaEnt" | "fechaMod" | "tasa" | "documents" | "infoRepresentantes"
> & {
  infoRepresentantes: Omit<ClientRepresents, "documents">[];
} & ClientExtraData;

export interface ClientGetResponse {
  status: number;
  data: [
    {
      mensaje: {
        empresa: Client[];
      };
    }
  ];
}

export interface ClientGetResponseOperaciones {
  status: number;
  empresa: Client[];
}

export interface ClientGetResponseKpi {
  status: number;
  data: ClientKpisColumns;
}

export interface ClientAddResponse {
  status: number;
  data: [
    {
      mensaje: {
        mensaje: string;
        idagep_empresa: number;
      };
    }
  ];
}

export interface ClientGetBody {
  idagep_empresa: number;
  id_login?: number;
}

export interface ClientCollectionGetResponse {
  empresas: ClientCollection[];
  totalRegistros: number;
}
export interface ClientCollectionGetResponseExcel {
  empresas: ClientExcelColumns[];
}

export interface ClientCRUDResponse extends Pick<Client, "idagep_empresa"> {
  status: number | null;
  mensaje: string | undefined;
}

export interface ClientDocuments {
  documentoTipo: string;
  extension: string;
  docBase64: string;
  filename: string;
  display: string;
  accept: string;
  required: boolean;
  tab: number;
}
export interface ClientDocumentsBody extends Pick<User, "idagep_empresa"> {
  infoDocumentos: ClientDocuments[];
}

export interface ClientDocument {
  idagep_empresas: number;
  nombre: string;
  ruta: string;
  descripcion: string;
  estatus: 1 | 0;
}

export interface ClientDocumentResponse {
  docs: ClientDocument[];
}

export type ClientValidationOmit = Omit<
  Client,
  | "infoComercio"
  | "infoDomicilio"
  | "infoContactos"
  | "infoRepresentantes"
  | "documents"
>;

interface s {
  value: string;
}

export type ClientValidation = Partial<
  FormRecord<ClientValidationOmit> & {
    infoComercio: Partial<FormRecord<ClientCommerce>>;
    infoDomicilio: Partial<FormRecord<ClientAddress>>;
    infoContactos: Partial<FormRecord<ClientContacts>>;
    infoRepresentantes: Partial<FormRecord<ClientRepresents>>;
    documents: Partial<FormRecord<ClientDocuments>>;
  }
>;

export interface ClientBankDataBody {
  idagep_empresa: number;
  titular: string;
  cuenta: string;
  clabe: string;
  banco: string;
  operacion: string;
}

export interface FormikCustomerType {
  values: Client;
  errors: FormikErrors<Client>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any;
  onDocumentChange?: (value: OnChangeParams) => void;
  disabled: boolean;
  fulfillment: ClientFulfillment;
  setFulfillment: React.Dispatch<React.SetStateAction<ClientFulfillment>>;
  canFulfillment: boolean;
  activeTab: number | undefined;
  isNew?: boolean;
  person?: string;
}

export interface FormItemInputFileType
  extends Omit<
    FormikCustomerType,
    "handleChange" | "handleChange" | "setFieldValue"
  > {
  fileNames: string[];
  additionalFiles?: number;
}

export interface useFromClientesType {
  client: Client;
}

//excel
export interface ClientExcelColumns {
  banco: string;
  clabe: string;
  cuentaInterbancaria: string;
  email: string;
  estado: string;
  fechaIncorporacion: string;
  id: string | number;
  montoliquidar: string | number;
  nombreComercial: string;
  razonSocial: string;
  origen: string;
}

export interface ClientKpisColumns {
  TotalTerminales: number;
  terminalesD30: number;
  terminalesD20: number;
  montoTPV: number;
  montoEcommerce: number;
  ecommerceEstatus: string;
  tarjetaEstatus: string;
}

export interface ClientTypeObj {
  value: ClientPersona;
  name: string;
  icon: keyof typeof SVG;
  color: string;
}

export interface ClientGetExcelParams
  extends Pick<
    ClientsFilters,
    "cumplimiento" | "estatus" | "origen" | "fechaInicio" | "fechaFin"
  > {}
