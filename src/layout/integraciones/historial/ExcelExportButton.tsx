import { ButtonExcelLocal } from "@app/components/Buttons";
import { ExcelExportBody } from "@app/types/Excel";
import {
  Transaction,
  TransactionExcelColumns,
  TransactionExcelClientColumns,
  TransaccionExcelBody,
  TransactionExcelResponse,
} from "@app/types/Transactions";
import {
  IntegrationExcelColumn,
  IntegrationHistoryFilters,
  IntegrationHistoryRecord,
} from "@app/types/Integrations";
import { IntegrationsControllers } from "@app/logic/backend/integrations";
import {
  TRANSACTION_EXCEL_CONFIG,
  TRANSACTION_EXCEL_CLIENT_CONFIG,
} from "@app/constants/transactions";
import { INTEGRATION_EXCEL_LINKS_CONFIG } from "@app/constants/integrations";

interface ButtonExcelProps {
  filters: IntegrationHistoryFilters;
  disabled?: boolean;
}

export const ExcelExportButton = ({ filters, disabled }: ButtonExcelProps) => {
  const getItemAsync = async () => {
    const links = await IntegrationsControllers.excel(filters);
    if (!links.isSuccess) return null;
    return links.response;
  };

  const getWorksheets = (
    links: IntegrationExcelColumn[]
  ): ExcelExportBody<IntegrationExcelColumn> => {
    return {
      worksheets: [
        {
          name: "Links",
          items: links.map(
            (x) =>
              ({
                idagep_integraciones_link_pago:
                  x.idagep_integraciones_link_pago,
                req_id: x.req_id,
                empresa: x.empresa,
                fechaCreacion: x.fechaCreacion,
                fechaPago: x.fechaPago,
                monto: x.monto,
                referencia: x.referencia,
                estatus: x.estatus,
              } ?? [])
          ),
          options: INTEGRATION_EXCEL_LINKS_CONFIG,
        },
      ],
    };
  };

  /* const getAdminWorksheets = (
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
                numTarjeta: x.numTarjeta?.replace("XXXX", "****"),
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
  }; */

  const getName = () => {
    const dateStart = filters.fechaInicio;
    return `Links_${new Date(dateStart)}`;
  };

  return (
    <ButtonExcelLocal
      getWorksheets={getWorksheets}
      getItemAsync={getItemAsync}
      fileName={getName}
      disabled={disabled}
    />
  );
};
