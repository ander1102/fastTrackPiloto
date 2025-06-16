import * as Yup from "yup";
import { DropdownOptions } from "@app/types/Form";
import {
  PagosRecurrentesCheckoutReadResponse,
  PagosRecurrentesPaymentsCreateBody,
  RECURRENCIA_TYPES,
} from "@app/types/PagosRecurrentes";
import { DROPDOWN_ALL } from "./form";
import {
  EFEVOOPAY_BLACK_LOGO_PATH,
  EFEVOOPAY_WHITE_LOGO_PATH,
} from "@app/constants";
export const INIT_PAGOS_RECURRENTES: PagosRecurrentesPaymentsCreateBody = {
  idagep_usuario: 0,
  idagep_empresa: 0,
  nombre: "",
  descripcion: "",
  monto: undefined,
  referencia: "",
  recurrencia: undefined,
  fechaVigencia: "",
  estatus: 0,
};

export const VALIDATION_PAGOS_RECURRENTES = Yup.object({
  nombre: Yup.string().required("El campo nombre es obligatorio."),
  descripcion: Yup.string().required("El campo descripción es obligatorio."),
  monto: Yup.number().required("El campo monto es obligatorio."),
  referencia: Yup.string().required("El campo contrato es obligatorio."),
  recurrencia: Yup.string().required("El campo recurrencia es obligatorio."),
  fechaVigencia: Yup.string().required(
    "El campo fecha de vigencia es obligatorio."
  ),
});

export const RECURRENCIA_DIAS: DropdownOptions<number>[] = [
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Diario],
    value: RECURRENCIA_TYPES.Diario,
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Semanal],
    value: RECURRENCIA_TYPES.Semanal,
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Quincenal],
    value: RECURRENCIA_TYPES.Quincenal,
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Mensual],
    value: RECURRENCIA_TYPES.Mensual,
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Anual],
    value: RECURRENCIA_TYPES.Anual,
  },
];

export const RECURRENCIA_NOMBRE: DropdownOptions<string>[] = DROPDOWN_ALL(
  ""
).concat([
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Diario],
    value: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Diario],
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Semanal],
    value: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Semanal],
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Quincenal],
    value: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Quincenal],
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Mensual],
    value: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Mensual],
  },
  {
    label: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Anual],
    value: RECURRENCIA_TYPES[RECURRENCIA_TYPES.Anual],
  },
]);

export const CURRENT_YEAR = new Date().getFullYear();

export const YYYY_OPTIONS: DropdownOptions<string>[] = Array.from(
  { length: 10 },
  (_, i) => {
    const year = (CURRENT_YEAR + i).toString();
    const value = year.slice(-2);
    return { label: year, value: value };
  }
);

export const MM_OPTIONS: DropdownOptions<string>[] = Array.from(
  { length: 12 },
  (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return { label: month, value: month };
  }
);

export const PATH_PREFIX = "/Images/pagosRecurrentes/";
export const IMAGES_PATH = {
  DEGRADADO: `${PATH_PREFIX}degradado.svg`,
  BACKGROUND: `${PATH_PREFIX}background.png`,
  LINEA: `${PATH_PREFIX}linea.png`,
  EFEVOOPAY_WHITE: EFEVOOPAY_WHITE_LOGO_PATH,
  EFEVOO_WHITE: `${PATH_PREFIX}efevoo-white.svg`,
  EFEVOOPAY_BLACK: EFEVOOPAY_BLACK_LOGO_PATH,
  VISA: `${PATH_PREFIX}visa.svg`,
  MASTERCARD: `${PATH_PREFIX}mastercard.svg`,
  BLUR: `${PATH_PREFIX}blur.svg`,
  FACEBOOK: `${PATH_PREFIX}facebook_white.svg`,
  INSTAGRAM: `${PATH_PREFIX}instagram_white.svg`,
  WHATSAPP: `${PATH_PREFIX}whatsapp_white.svg`,
  TARJETA: `${PATH_PREFIX}tarjeta.svg`,
  EDITAR: `${PATH_PREFIX}editar.svg`,
  SUCCESS: `${PATH_PREFIX}success.svg`,
  DECLINED: `${PATH_PREFIX}declined.svg`,
  NOT_FOUND: `${PATH_PREFIX}not-found.svg`,
  LOADER: `${PATH_PREFIX}loader.svg`,
  TELEFONO: `${PATH_PREFIX}telefono.svg`,
  UBICACION: `${PATH_PREFIX}ubicacion.svg`,
  EFEVOO_ICON: `${PATH_PREFIX}efevoo-icon.svg`,
  TICKET: `${PATH_PREFIX}ticket.svg`,
  CHECKBOX_ACTIVO: `${PATH_PREFIX}checkbox-activo.svg`,
  CHECKBOX_INACTIVO: `${PATH_PREFIX}checkbox-inactivo.svg`,
} as const;
export const INIT_VALUE_PERSONAL = {
  nombre: "",
  telefono: "",
  email: "",
};
export const INIT_VALUE_INFO_CHECKOUT: PagosRecurrentesCheckoutReadResponse = {
  pagoRecurrente: "",
  recurrencia: 0,
  monto: 0,
  numPago: "",
  sigConbro: "",
  fechaVigencia: "",
  referencia: "",
  descripcion: "",
  infoEmp: "",
  infoPago: "",
  token: "",
  mensaje: "",
  estatus: 0,
};

export const VALIDATION_PERSONAL = Yup.object({
  nombre: Yup.string().required("El campo nombre es obligatorio."),
  telefono: Yup.string()
    .required("El campo teléfono es obligatorio")
    .matches(/^\d{10}$/, "El campo teléfono debe tener exactamente 10 dígitos"),
  email: Yup.string()
    .required("El campo correo electrónico es obligatorio.")
    .email("El campo correo electrónico no es válido."),
});

export const INITAL_VALUE_CARD = {
  tarjeta: "",
  cvv: "",
  mm: "",
  yy: "",
};
export const VALIDATION_CARD = Yup.object({
  tarjeta: Yup.string().required("El campo número de tarjeta es obligatorio."),
  cvv: Yup.string().required("El campo CVV es obligatorio."),
  mm: Yup.string().required("El campo mes es obligatorio."),
  yy: Yup.string().required("El campo año es obligatorio."),
});
