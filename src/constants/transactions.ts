import { separateString } from "@app/common/format";
import { WS_Options, WS_URLOptions } from "@app/hooks/useWSClient";
import { CARD_TYPE } from "@app/types";
import { ExcelCell, ExcelOptions } from "@app/types/Excel";
import { DropdownOptions } from "@app/types/Form";
import { Transaction, TransactionExcelColumns,TransactionExcelClientColumns, TRANSACTION_PRODUCT } from "@app/types/Transactions";
import { User } from "@app/types/User";
import { AGREGADOR_TRANSACTION_WS } from ".";
import { DROPDOWN_ALL } from "./form";

export const TRANSACTION_CARD_TYPE_URL: Record<CARD_TYPE, string> = {
  mastercard: "/Images/cards/mastercard.png",
  mc: "/Images/cards/mastercard.png",
  visa: "/Images/cards/visa.png",
};

const EXCEL_TRANSACTION_COLUMNS: Record<keyof TransactionExcelColumns, string> =
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
    referencia:"Referencia"
  };

const TRANSACTION_EXCEL_HEADER_CONFIG = Object.fromEntries(
  Object.keys(EXCEL_TRANSACTION_COLUMNS).map((key) => [
    key,
    {
      height: 30,
      align: "left",
      alignVertical: "bottom",
      fontWeight: "bold",
      wrap: true,
    } as ExcelCell,
  ])
);

export const TRANSACTION_EXCEL_CONFIG: Partial<
  ExcelOptions<TransactionExcelColumns>
> = {
  displayColumns: EXCEL_TRANSACTION_COLUMNS,
  headerOptions: TRANSACTION_EXCEL_HEADER_CONFIG,
  columnOptions: {
    ID: { width: 10 },
    adquiriente: { width: 20 },
    afiliacion: { width: 20 },
    FIID: { width: 20 },
    cliente:{ width: 30 },
    marcaTarjeta:{ width: 10 },
    metodoPago:{ width: 20 },
    numTarjeta: { width: 20 },
    monto:{ width: 15 },
    fecha:{ width: 15 },
    hora:{ width: 15 },
    TipodeTransaccion:{ width: 25 },
    numAutorizacion:{ width: 20 },
    modoEntrada:{ width: 15 },
    metodoTH:{ width: 60 },
    ECI:{ width: 15 },
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
  },
  itemOptions:{
    monto: { type: "number",format:"$#,##0.00" },
    montoComisionEfevoopay: { type: "number",format:"$#,##0.000" },
    IVAComision: { type: "number",format:"$#,##0.00" },
    montoSobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
    IVASobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
  }
};

const EXCEL_TRANSACTION_CLIENT_COLUMNS: Record<keyof TransactionExcelClientColumns, string> =
  {
    ID:"ID",
    marcaTarjeta:"Marca de Tarjeta",
    metodoPago:"Método de Pago",
    numTarjeta:"Número de Tarjeta",
    monto:"Monto",
    fecha:"Fecha",
    hora:"Hora",
    TipodeTransaccion:"Tipo de Transacción",
    numAutorizacion:"Número de autorización",
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
    referencia:"Referencia"
  };

const TRANSACTION_EXCEL_CLIENT_HEADER_CONFIG = Object.fromEntries(
  Object.keys(EXCEL_TRANSACTION_CLIENT_COLUMNS).map((key) => [
    key,
    {
      height: 30,
      align: "left",
      alignVertical: "bottom",
      fontWeight: "bold",
      wrap: true,
    } as ExcelCell,
  ])
);

export const TRANSACTION_EXCEL_CLIENT_CONFIG: Partial<
  ExcelOptions<TransactionExcelClientColumns>
> = {
  displayColumns: EXCEL_TRANSACTION_CLIENT_COLUMNS,
  headerOptions: TRANSACTION_EXCEL_CLIENT_HEADER_CONFIG,
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
  },
  itemOptions:{
    monto: { type: "number",format:"$#,##0.00" },
    montoComisionEfevoopay: { type: "number",format:"$#,##0.000" },
    IVAComision: { type: "number",format:"$#,##0.00" },
    montoSobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
    IVASobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
  },
};

export const TRANSACTION_TYPE_TRANSACTION_OPTIONS: DropdownOptions[] = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Pago",
    value: "Pago",
  },
  {
    label: "Comisión",
    value: "Comision",
  },
  {
    label: "Cancelación",
    value: "cancelacion",
  },
  {
    label: "Devolución de comisión",
    value: "devolucion de comision",
  },
  {
    label: "Devolución",
    value: "devolucion",
  },

  {
    label: "Reverso",
    value: "reverso",
  },
];

export const TRANSACTION_PRODUCT_OPTIONS: DropdownOptions[] = [
  {
    label: TRANSACTION_PRODUCT[TRANSACTION_PRODUCT.Terminal],
    value: TRANSACTION_PRODUCT.Terminal,
  },
  {
    label: TRANSACTION_PRODUCT[TRANSACTION_PRODUCT["Ligas de pago"]],
    value: TRANSACTION_PRODUCT["Ligas de pago"],
  },
];

export const TRANSACTION_PRODUCT_OPTIONS_ALL: DropdownOptions[] = DROPDOWN_ALL(
  "all"
).concat(TRANSACTION_PRODUCT_OPTIONS);

export const TRANSACTION_CLIENT_DEFAULT_SELECT: DropdownOptions<null>[] = [
  {
    label: "Ver todos",
    value: null,
  },
];

export const WS_TRANSACTIONS_URL_CONFIGURATION = (
  user: User
): WS_URLOptions => ({
  base: AGREGADOR_TRANSACTION_WS,
  queryParams: {
    entrada: user.persona.idagep_usuarios ?? 0,
  },
  subRoutes: ["all", "reporte"],
});

export const WS_TRANSACTION_OPTIONS: WS_Options<Transaction[]> = {
  update: (prev, next) => prev.length !== next?.length,
  onGetMessage: (client, message) => {
    if (
      typeof message === "string" &&
      message.toLowerCase().startsWith("welcome")
    ) {
      const token = separateString(message)[1].slice(0, -1);
      if (token) client.send(token);
      return true;
    }
    return false;
  },
};
