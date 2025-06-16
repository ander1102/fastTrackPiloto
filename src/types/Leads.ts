import { PaginationBody } from ".";

export interface LeadsGetBody extends PaginationBody {
  busqueda: string;
  fechaIni: string;
  fechaFin: string;
  vendedor: string;
  estatus: string;
}

export interface LeadsStatusChange {
  idagep_leads: number;
  estatus: string;
}

export interface LeadsCollection {
  idagep_leads: number;
  nombre: string;
  email: string;
  nombreNegocio: string;
  giro: string;
  fecha: string;
  ubicacion: string;
  telefono: string;
  estatus: string;
  vendedor: string;
}

export interface LeadGetInfo {
  idagep_leads: number;
  operacion: string;
}

export interface Lead {
  nombre: string;
  nombreNegocio: string;
  persona: string;
  rfc?: string;
  estado: string;
  email: string;
  giro: string;
  telefono: string;
  calle?: string;
  numeroExt?: string;
  numeroInt?: string;
  colonia?: string;
  delegacion?: string;
  codigoPostal?: string;
  terminalD30: string;
  terminalD20: string;
  ecommerce: string;
  tarjeta: string;
  vendedor?: string;
  actividad: string;
  ticketAlto: string | number;
  horaInicio: Date | string;
  horaFin: Date | string;
  msi?: boolean;
  gerente?: {
    nombre: string;
    referencia: string;
  };
  agente?: {
    nombre: string;
    referencia: string;
  }
}

export interface Seguimiento {
  contactado: string;
  fecha: string;
  comentarios: string;
}
export interface MesesSinIntereses {
  msi: boolean;
  msi3: boolean;
  comision3: string | number;
  tasa3: string | number;
  msi6: boolean;
  comision6: string | number;
  tasa6: string | number;
  msi9: boolean;
  comision9: string | number;
  tasa9: string | number;
  msi12: boolean;
  comision12: string | number;
  tasa12: string | number;
  msi18: boolean;
  comision18: string | number;
  tasa18: string | number;
}
export interface LeadInfoStructure {
  idagep_leads: number;
  infoLead: [Lead];
  infoSeguimiento: [Seguimiento];
  infoCotizacion: [Cotizacion];
  infoProductos: [Productos];
  infoMeses?: [MesesSinIntereses];
  fecha: string;
  estatus: string;
}

export interface Cotizacion {
  giro: string;
  familia: string;
  adquiriente: string;
  rollos: string;
  arrendamiento: string;
  ventaMensual: number;
  ticketProm: number;
  debito: number;
  credito: number;
  internacional: number;
  prosa: number;
  tasaDebito: number;
  tasaCredito: number;
  tasaInternacional: number;
  tasaProsa: number;
  rentaMini: number;
  rentaD20: number;
  rentaD30: number;
  cantMini: number;
  cantD20: number;
  cantD30: number;
  chipMini: number;
  chipD20: number
  chipD30: number;
  liquidacion: string;
  corteDia: string;
  ecommerce: string;
  tarjeta: string;
  ventaEstimada?: string | number;
  ticketPromedio?: string | number;
  comisionD?: string | number;
  comisionC?: string | number;
  comisionI?: string | number;
}

export interface Productos {
  d20: string;
  d30: string;
  tarjeta: string;
  ecommerce: string;
}

export interface saveLeadBody {
  idagep_leads: number;
  infoSeguimiento: [Seguimiento];
  infoCotizacion: [Cotizacion];
  infoProductos: [Productos];
  fecha: string;
  estatus: string;
  operacion: string;
}

export interface LeadConfirmEstatus {
  newStatus: string;
}
