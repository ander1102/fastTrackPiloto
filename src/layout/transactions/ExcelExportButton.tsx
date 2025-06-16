import { ButtonExcelLocal } from "@app/components/Buttons";
import { TRANSACTION_EXCEL_CONFIG,TRANSACTION_EXCEL_CLIENT_CONFIG } from "@app/constants/transactions";
import { TransactionsControllers } from "@app/logic/backend/transactions";
import { ExcelExportBody } from "@app/types/Excel";
import {
  Transaction,
  TransactionExcelColumns,TransactionExcelClientColumns,
  TransaccionExcelBody,
  TransactionExcelResponse,
} from "@app/types/Transactions";
import useCall from "@app/hooks/useCall";
import moment from "moment";
interface ButtonExcelProps {
  isMaster: boolean;
  filters: TransaccionExcelBody;
  disabled?:boolean
}

export const ExcelExportButton = ({
  filters,
  isMaster,
  disabled
}: ButtonExcelProps) => {
  const getItemAsync = async () => {
    const clients = await TransactionsControllers.excel(filters);
    if (!clients.isSuccess) return null;
    return clients.response;
  };

  const getClientWorksheets = (
    transactions: TransactionExcelResponse[]
  ): ExcelExportBody<TransactionExcelClientColumns> => {
    return {
      worksheets: [
        {
          name: "Transacciones",
          items: transactions.map(
            (x) =>
              ({
                ID: x.ID,
                marcaTarjeta: x.marcaTarjeta,
                metodoPago: x.metodoPago,
                numTarjeta:  x.numTarjeta?.replace("XXXX","****"),
                monto: x.monto,
                fecha: x.fecha,
                hora: x.hora,
                TipodeTransaccion: x.TipodeTransaccion,
                numAutorizacion: x.numAutorizacion,
                tipoTarjeta: x.tipoTarjeta,
                tasaComisionEfevoopay: x.tasaComisionEfevoopay,
                montoComisionEfevoopay: x.montoComisionEfevoopay,
                IVAComision: x.IVAComision,
                sobretasaEfevoopay: x.sobretasaEfevoopay,
                montoSobretasaEfevoopay: x.montoSobretasaEfevoopay,
                IVASobretasaEfevoopay: x.montoSobretasaEfevoopay,
                sucursal: x.sucursal,
                producto: x.producto,
                terminal: x.terminal,
                referencia: x.referencia,
              } ?? [])
          ),
          options: TRANSACTION_EXCEL_CLIENT_CONFIG,
        },
      ],
    };
  }

  const getAdminWorksheets = (
    transactions: TransactionExcelResponse[]
  ): ExcelExportBody<TransactionExcelColumns> => {
    return {
      worksheets: [
        {
          name: "Transacciones",
          items: transactions.map(
            (x) =>
              ({
                ID: x.ID,
                adquiriente: x.adquiriente,
                afiliacion: x.afiliacion,
                FIID: x.FIID,
                cliente: x.cliente,
                marcaTarjeta: x.marcaTarjeta,
                metodoPago: x.metodoPago,
                numTarjeta:  x.numTarjeta?.replace("XXXX","****"),
                monto: x.monto,
                fecha: x.fecha,
                hora: x.hora,
                TipodeTransaccion: x.TipodeTransaccion,
                numAutorizacion: x.numAutorizacion,
                modoEntrada: x.modoEntrada,
                metodoTH: x.metodoTH,
                ECI: x.ECI,
                tipoTarjeta: x.tipoTarjeta,
                tasaComisionEfevoopay: x.tasaComisionEfevoopay,
                montoComisionEfevoopay: x.montoComisionEfevoopay,
                IVAComision: x.IVAComision,
                sobretasaEfevoopay: x.sobretasaEfevoopay,
                montoSobretasaEfevoopay: x.montoSobretasaEfevoopay,
                IVASobretasaEfevoopay: x.IVASobretasaEfevoopay,
                sucursal: x.sucursal,
                producto: x.producto,
                terminal: x.terminal,
                referencia: x.referencia,
              } ?? [])
          ),
          options: TRANSACTION_EXCEL_CONFIG,
        },
      ],
    };
  };

  const getName = (items: TransactionExcelResponse[]) => {
    const dateStart = filters.fechaInicio;
    return `Transacciones${new Date(dateStart)}`;
  };

  return (<>
    {isMaster && (
    <>
    <ButtonExcelLocal
      getWorksheets={getAdminWorksheets}
      getItemAsync={getItemAsync}
      fileName={getName}
      disabled={disabled}
    />
    </>)
    }
    {!isMaster && (
    <>
    <ButtonExcelLocal
      getWorksheets={getClientWorksheets}
      getItemAsync={getItemAsync}
      fileName={getName}
      disabled={disabled}
    />
    </>)
    }
    </>
  );
};
