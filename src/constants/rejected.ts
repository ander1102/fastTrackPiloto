import { ExcelCell, ExcelOptions } from "@app/types/Excel";
import { DropdownOptions } from "@app/types/Form";
import { TransactionRejectedExcelColumns } from "@app/types/Rejected";
import { DROPDOWN_ALL } from "./form";
import { TRANSACTION_PRODUCT_OPTIONS } from "./transactions";

const setHeaders = (): Record<
  keyof TransactionRejectedExcelColumns,
  string
> => ({
  cliente: "Cliente",
  codigo: "CÓDIGO ERROR PROSA",
  descripcion: "DESCRIPCIÓN PROSA",
  device_id: "No. serie",
  fecha: "Fecha y hora",
  ID: "ID",
  mensaje: "MENSAJE DE ERROR “THUNDERPAY”",
  metodo: "Método de pago",
  monto: "Monto total",
  numTarjeta: "Número de tarjeta",
  producto: "Producto",
  tarjeta: "Tarjeta",
  tipoTransaccion: "Tipo de transacción",
  metodoTransaccion: "Método de transacción",
});

const setHeaderConfig = (defaultValue?: string) =>
  Object.fromEntries(
    Object.keys(setHeaders()).map((key) => [
      key,
      {
        height: 30,
        align: "left",
        alignVertical: "bottom",
        fontWeight: "bold",
        wrap: true,
        backgroundColor: "#f0effa",
        value: defaultValue,
      } as ExcelCell,
    ])
  );

export const createTransactionRejectedConfig = (): Partial<
  ExcelOptions<TransactionRejectedExcelColumns>
> => ({
  displayColumns: setHeaders(),
  headerOptions: setHeaderConfig(),
  columnOptions: {
    cliente: { width: 70 },
    codigo: { width: 20 },
    descripcion: { width: 20 },
    device_id: { width: 20 },
    fecha: { width: 20 },
    ID: { width: 20 },
    mensaje: { width: 20 },
    metodo: { width: 20 },
    metodoTransaccion: { width: 20 },
    monto: { width: 20 },
    numTarjeta: { width: 20 },
    producto: { width: 20 },
    tarjeta: { width: 20 },
    tipoTransaccion: { width: 20 },
  },
  /* mergedHeaders: {
    headers: [
      {
        ...setHeaderConfig(""),
        cliente: {
          height: 30,
          align: "left",
          alignVertical: "bottom",
          fontWeight: "bold",
          wrap: true,
          backgroundColor: "#f0effa",
          value:
            `IMAGEN("https://admin.efevoopay.com/_next/image?url=%2FImages%2Fmenu%2Fefevoopay.png&w=256&q=75", "logo", 0)` as string,
          type: "Formula",
        } as ExcelCell,
      },
    ],
    sorted: "start",
  },*/
});

export const TRANSACTION_REJECTED_TYPE_OPTIONS: DropdownOptions[] =
  DROPDOWN_ALL("").concat(TRANSACTION_PRODUCT_OPTIONS);
