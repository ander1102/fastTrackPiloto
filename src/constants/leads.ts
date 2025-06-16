import {
  Cotizacion,
  Lead,
  LeadInfoStructure,
    LeadsGetBody,
    Productos,
    Seguimiento,
    MesesSinIntereses
  } from "@app/types/Leads";
  import { User } from "@app/types/User";
  
  export const DEFAULT_LEADS_BODY = (): LeadsGetBody => ({
    busqueda:"",
    fechaIni:"",
    fechaFin: "",
    estatus:"nuevo",
    vendedor: "",
    PageIndex:"1",
    PageSize:"25"
  });

  export const INIT_LEAD: LeadInfoStructure = {
    idagep_leads: 0,
    infoLead: [{ nombre: "", nombreNegocio: "", persona: "", rfc: "", email: "", giro: "", telefono: "", estado: "", calle: "", numeroExt: "", numeroInt: "", colonia: "", delegacion: "", codigoPostal: "", terminalD30: "", terminalD20: "", ecommerce: "", tarjeta: "", vendedor: "", ticketAlto: "", horaInicio: "", horaFin: "", actividad: "", msi: false, gerente: {nombre: '', referencia: ""}, agente:{nombre: '', referencia: ""} }],
    infoSeguimiento: [{ contactado: '', fecha: '', comentarios: '' }],
    infoCotizacion: [{
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
      ecommerce: "",
      tarjeta: "",
    }],
    infoProductos: [{ d20: '', d30: '', tarjeta: '', ecommerce: '', }],
    fecha: "",
    estatus: "Nuevo"
  };

  export const DEFAULT_LEAD_GENERAL = (): Lead => ({ 
    nombre: "", 
    nombreNegocio: "",
    persona: "",
    rfc: "", 
    email: "", 
    giro: "", 
    telefono: "", 
    calle: "", 
    numeroExt: "", 
    numeroInt: "", 
    colonia: "",
    estado: "", 
    delegacion: "", 
    codigoPostal: "", 
    terminalD30: "", 
    terminalD20: "", 
    ecommerce: "", 
    tarjeta: "",
    vendedor: "",
    ticketAlto: 0.00,
    actividad: "",
    horaInicio: "", 
    horaFin: "",
    msi: false,
    gerente: {
      nombre: '', referencia: ""
    },
    agente: {
      nombre: '', referencia: ""
    },
  });

  export const DEFAULT_LEAD_SEGUIMIENTO = (): Seguimiento => ({ 
    contactado: '', 
    fecha: '', 
    comentarios: ''
  });

  export const DEFAULT_LEAD_MSI = (): MesesSinIntereses => ({ 
    msi: false,
    msi3: false,
    comision3: "",
    tasa3: "",
    msi6: false,
    comision6: "",
    tasa6: "",
    msi9: false,
    comision9: "",
    tasa9: "",
    msi12: false,
    comision12: "",
    tasa12: "",
    msi18: false,
    comision18: "",
    tasa18: "",
  });

  export const DEFAULT_LEAD_COTIZACION = (): Cotizacion => ({ 
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
    ecommerce: "",
    tarjeta: "",
  });

  export const DEFAULT_LEAD_PRODUCTOS = (): Productos => ({ 
    d20: '',
    d30: '',
    tarjeta: 'No',
    ecommerce: 'No',
  });