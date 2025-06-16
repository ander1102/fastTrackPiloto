import { env } from "process";
import { infoCotizacion, resCotizacion, Clients } from "./types";

export const INFO_COTIZACION: infoCotizacion = {
  giro: "",
  familia: "",
  adquiriente: "",
  rollos: "",
  arrendamiento: "",
  ventaMensual: 0,
  ticketProm: 0,
  debito: 0,
  credito: 0,
  internacional: 0,
  prosa: 0,
  tasaDebito: 0,
  tasaCredito: 0,
  tasaInternacional: 0,
  tasaProsa: 0,
  rentaMini: 0,
  rentaD20: 0,
  rentaD30: 0,
  cantMini: 0,
  cantD20: 0,
  cantD30: 0,
  chipMini: 0,
  chipD20: 0,
  chipD30: 0,
  liquidacion: "",
  corteDia: "",
  ecommerce: "No",
  tarjeta: "No",
};

export const RES_COTIZACION: resCotizacion = {
  credito: 0,
  cuotaAdmin: 0,
  debito: 0,
  internacional: 0,
  margenConRED: 0,
  margenSinRED: 0,
  msgCredito: "",
  msgDebito: "",
  msgInternacional: "",
  msgProsa: "",
  msgRentaD20: "",
  msgRentaD30: "",
  msgRentaMini: "",
  msgTasaCredito: "",
  msgTasaDebito: "",
  msgTasaInternacional: "",
  msgTasaProsa: "",
  porcentajeConRED: 0,
  porcentajeSinRED: 0,
  prosa: 0,
  redComercial: 0,
  rentaD20: 0,
  rentaD30: 0,
  rentaMini: 0,
  tasaCredito: 0,
  tasaDebito: 0,
  tasaInternacional: 0,
  tasaProsa: 0,
  vobo: "",
};
export const INIT_CLIENT: Clients = {
  infoCotizacion: INFO_COTIZACION,
  resCotizacion: RES_COTIZACION,
  agente: '',
  gerente: '',
  nombre: '',
  razonSocial: ''
};

export enum VOBO_TYPE {
  ENVIAR_PARA_VOBO = "ENVIAR PARA VOBO",
  ENVIAR_VOBO_PARA_REVISION = "ENVIAR VOBO PARA REVISION",
  NEGADO = "NEGADO"
}
