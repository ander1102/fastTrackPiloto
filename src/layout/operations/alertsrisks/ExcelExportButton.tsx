import { ButtonExcelLocal } from "@app/components/Buttons";
import { ExcelExportBody } from "@app/types/Excel";
import { TableAlertsRisksState } from "./useTableAlertsRisks";
import { OperationsControllers } from "@app/logic/backend/operations";
import { OperationsAlertsRisksExcelColumns, OperationsAlertsRisksExcelResponseAlertas } from "@app/types/Operations";
import { OPERATIONS_ALERTS_RISKS_TRANSACTION_EXCEL_CLIENT_CONFIG } from "@app/constants/operations";

interface ButtonExcelProps {
  filters: TableAlertsRisksState['filters'];
  disabled?: boolean;
}

export const ExcelExportButton = ({ filters, disabled }: ButtonExcelProps) => {

  const getItemAsync = async () => {
    const clients = await OperationsControllers.alertsRisksExcel(filters);
    if (!clients.isSuccess) return null;
    return clients.response.alertas;
  };

  const getClientWorksheets = (
    alertas: OperationsAlertsRisksExcelResponseAlertas[]
  ): ExcelExportBody<OperationsAlertsRisksExcelColumns> => {
    return {
      worksheets: [
        {
          name: "Transacciones",
          items: alertas.map(
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
                alerta:x.alerta,
                fechaAlerta:x.fechaAlerta
              } ?? [])
          ),
          options: OPERATIONS_ALERTS_RISKS_TRANSACTION_EXCEL_CLIENT_CONFIG,
        },
      ],
    };
  };

  const getName = () => {
    return `Alertas-y-Riesgos`;
  };

  return (
    <ButtonExcelLocal
      getWorksheets={getClientWorksheets}
      getItemAsync={getItemAsync}
      fileName={getName}
      disabled={disabled}
    />
  );
};
