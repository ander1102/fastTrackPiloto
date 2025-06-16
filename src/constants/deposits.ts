import { CARD_TYPE } from "@app/types";
import { DepositExcelColumns, DepositTransExcelColumns } from "@app/types/Deposits";

export const TRANSACTION_CARD_TYPE_URL: Record<CARD_TYPE, string> = {
  mastercard: "/Images/cards/mastercard.png",
  mc: "/Images/cards/mastercard.png",
  visa: "/Images/cards/visa.png",
};

export const EXCEL_DEPOSIT_COLUMNS: Record<keyof DepositExcelColumns, string> =
  {
    FechaHora: "Fecha y hora",
    descripcion: "Descripción",
    idDeposito: "ID Depósito",
    idagep_empresa: "ID Empresa",
    monto: "Monto",
    nombre: "Nombre",
    referencia: "Referencia",
  };


  export const EXCEL_DEPOSIT_TRANSACTION_COLUMNS: Record<keyof DepositTransExcelColumns, string> =
  {
    idDeposito: "ID",
    Sucursal: "Sucursal",
    tipotarj: 'Método de pago',
    FechaHora: "Fecha y hora",
    monto: "Monto Total",
    comision: "Comisión",
    iva: "IVA de Comisión",
    saldo: "Saldo Thunderpay",
    acumulado: 'Saldo Thunderpay Acumulado'
  };


