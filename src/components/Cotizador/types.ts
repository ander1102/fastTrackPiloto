export interface CheckedState {
    cantMini: boolean;
    cantD20: boolean;
    cantD30: boolean;
    ecommerce: boolean;
    tarjeta: boolean;
  }
  export interface Clients{
    infoCotizacion: infoCotizacion; 
    resCotizacion:resCotizacion;
    agente: string;
    gerente: string;
    nombre: string;
    razonSocial:string;
  }

  export interface infoCotizacion {
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
    chipD20: number;
    chipD30: number;
    liquidacion: string;
    corteDia: string;
    ecommerce: string;
    tarjeta: string;
  }

  export interface resCotizacion {
    credito: number;
    cuotaAdmin: number;
    debito: number;
    internacional: number;
    margenConRED: number;
    margenSinRED: number;
    msgCredito: string;
    msgDebito: string;
    msgInternacional: string;
    msgProsa: string;
    msgRentaD20: string;
    msgRentaD30: string;
    msgRentaMini: string;
    msgTasaCredito: string;
    msgTasaDebito: string;
    msgTasaInternacional: string;
    msgTasaProsa: string;
    porcentajeConRED: number;
    porcentajeSinRED: number;
    prosa: number;
    redComercial: number;
    rentaD20: number;
    rentaD30: number;
    rentaMini: number;
    tasaCredito: number;
    tasaDebito: number;
    tasaInternacional: number;
    tasaProsa: number;
    vobo: string;
  }