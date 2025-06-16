import { TooltipOptions } from "primereact/tooltip/tooltipoptions";
import { ToastOptions } from "react-toastify";
import { DataTableQuery } from "@app/types";
// TEST URL
export const AGREGADOR_API_URL = "https://alphawlapitest.efevoopaylbda.com/api/apiv0/agrs";

// PROD URL
// export const AGREGADOR_API_URL = "https://alphawlapi.efevoopaylbda.com/api/apiv0/agrs";

//API DE TES DE DEVOLUCIONES
export const BALACER_API_URL = "https://efevoopayloadbalancer-ecommerce.com";

export const ZENDDESK_EFEVOO_URL = "https://centroefevoopay.zendesk.com/hc/es-419";

export const AGREGADOR_TRANSACTION_WS = "wss://test-agrswss.efevoo.app/api0";

export const EFEVOOPAY_LOGO_PATH = "/Images/menu/efevoopay.png";

export const EFEVOOPAY_WHITE_LOGO_PATH = "/Images/menu/efevoopay-white.png";

export const EFEVOOPAY_LOGO_MINI_PATH = "/Images/menu/thunderPayMini.png";

export const EFEVOOPAY_BLACK_LOGO_PATH = "/Images/thunderpaylogin.png";

export const MASTERCARD_LOGO_PATH = "/Images/paymentLogos/Master.svg";

export const VISA_LOGO_PATH = "/Images/paymentLogos/Visa.svg";

export const PCI_LOGO_PATH = "/Images/paymentLogos/PCI.svg";

export const CNBV_LOGO_PATH = "/Images/paymentLogos/CNBV.svg";

export const COUNTRY_REST_API = "https://restcountries.com/v3.1";

export const APP_TITLE = "Thunderpay";

export const excludePaths = ["/", "/forgotpassword", "/pagoCheckout","pagosRecurrentes","pagosRecurrentesPdf"] ;

export const NOT_ACCESS_LOGIN = "Usuario sin acceso al sistema";

export const INTEGRATION_DOC_VERSION = "1.02";

export const USER_ADMINS = [1];

export const DEFAULT_TOAST_CONFIGURATION: ToastOptions = {
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: false,
};

export const DATA_TABLE_QUERY: DataTableQuery = {
  first: 0,
  rows: 10,
  page: 1,
  totalRecords: 0,
  currRecords: 0,
};

export const COMMON_TOOLTIP_OPTIONS: TooltipOptions = {
  position: "top",
  pt: {
    text: {
      style: {
        borderColor: "#E5E5E5",
        color: "#626262",
        fontSize: 12,
      },
    },
    root: {
      style: {
        background: "#FCFCFC",
      },
    },
    arrow: {
      hidden: true,
    },
  },
};

export const TIME_FORMAT = new Intl.DateTimeFormat("es-MX", {
  timeStyle: "short",
});
export const DATE_FORMAT = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "long",
});
export const DATE_FORMAT_SHORT = new Intl.DateTimeFormat("es-MX", {
  month: "short",
  day: "numeric",
});
export const DATE_TIME_FORMAT = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "long",
  timeStyle: "short",
  hour12: true,
  hourCycle: "h23",
});

export const DATE_TIME_FORMAT_SHORT = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "short",
  timeStyle: "short",
});

export const MONTH_FORMAT = new Intl.DateTimeFormat("es-MX", {
  month: "long",
});

export const CURRENCY_FORMAT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const NUMBER_FORMAT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const HOUR_FORMAT = Intl.DateTimeFormat("es-MX", {
  hour: "numeric",
  hourCycle: "h12",
});

export const MODULE_KEYS = {
  RESUMEN: "resumen",
  CLIENTES: "clientes",
  CLIENTES_ADD: "clientes_add",
  CLIENTES_DETAILS: "clientes_details",
  CUMPLIMIENTO: "cumplimiento",
  CUMPLIMIENTO_DETAILS: "cumplimiento_details",
  LEADS: "leads",
  LEADS_DETAILS: "leads_details",
  USUARIOS: "usuarios",
  USUARIOS_ADD: "ususarios_add",
  USUARIOS_DETAILS: "ususarios_details",
  DEPOSITOS: "depositos",
  TRANSACCIONES: "transacciones",
  TERMINALES: "terminales",
  TERMINALES_DETAILS: "terminales_details",
  TERMINALES_ADMIN: "terminales_admin",
  TERMINALES_ADD_ADMIN: "terminales_add_admin",
  TERMINALES_DETAILS_ADMIN: "terminales_details_admin",
  SUCURSALES: "sucursales",
  SUCURSALES_ADD: "sucursales_add",
  SUCURSALES_DETAILS: "sucursales_details",
  CONFIGURACION: "configuracion",
  OPERACIONES: "operaciones",
  PARAMETROS: "parametros",
  REPORTES: "reportes",
  TARJETA: "tarjeta",
  INTEGRACION: "integracion",
  INTEGRACION_ACTUAL: "integracion_actual",
  INTEGRACION_DOCUMENTATION: "integracion_documentation",
  INTEGRACION_PAYMENT_LINK: "integracion_payment_link",
  INTEGRACION_PAYMENT_NEGOCIO: "integracion_payment_negocio",
  INTEGRACION_HISTORIAL: "integracion_historial",
  RECHAZADAS: "rechazadas",
  VENTAS: "ventas",
  CLIENTES_REFERIDOS: "clientes_referidos",
  CLIENTES_REFERIDOS_ADD: "clientes_referidos_add",
  CLIENTES_REFERIDOS_DETAIL: "clientes_referidos_detail",
  AGENTE_COMERCIAL: "agente_comercial",
  AGENTE_COMERCIAL_DETAILS: "agente_comercial_details",
  AGENTE_COMERCIAL_ADD: "agente_add_comercial",
  PAGOS_RECURRENTES: "pagos_recurrentes",
  CATALOGOS:"catalogos",
  PRODUCTOS: "productos",
  PRODUCTOS_ADD: "productos_add",
  PRODUCTOS_DETAIL: "productos_detail",
  INVENTARIO: "inventario",
  INVENTARIO_DETAIL: "inventario_detail",
  ALERTAS_RIESGOS:"alertas_riesgos",
  FAST_TRACK:"fast_track"

};
