import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import {
  OperationsCatAlertasResponse,
  OperationsCatRiesgosResponse,
  OperationsFastTrackAllResponse,
  OperationsFastTrackAllBody,
  OperationsAlertsRisksAllBody,
  OperationsAlertsRisksAllResponse,
  OperationsParametersOperationalGetBody,
  OperationsParametersTransactionalGetBody,
  parametersAlertsGetBody,
  OperationalParameters,
  AlertsParameters,
  Parameters,
  TransactionalParameters,
  OperationsAlertsRisksSatusBody,
  OperationsAlertsRisksSatusResponse,
  OperationsCatAlertasBody,
  OperationsAlertsRisksTxnBody,
  OperationsAlertsRisksTxnResponse,
  OperationsAlertsRisksExcelBody,
  OperationsAlertsRisksExcelResponse,
} from "@app/types/Operations";

export const OperationsControllers = {
  //cats
  alertas: (body: OperationsCatAlertasBody) =>
    Call<OperationsCatAlertasResponse>("/api/operations/alertas", {
      headers: getTokenBearer(),
      body,
      method: "POST",
    }),
  riesgos: () =>
    Call<OperationsCatRiesgosResponse>("/api/operations/riesgos", {
      headers: getTokenBearer(),
      method: "POST",
    }),

  //parameters
  parametersOperationsOperationalGet: (
    body: OperationsParametersOperationalGetBody
  ) =>
    Call<OperationalParameters>(
      "/api/operations/parameters/operations/operational",
      {
        body,
        headers: getTokenBearer(),
        method: "POST",
      }
    ),
  parametersOperationsTransactionalGet: (
    body: OperationsParametersTransactionalGetBody
  ) =>
    Call<TransactionalParameters>(
      "/api/operations/parameters/operations/transactional",
      {
        body,
        headers: getTokenBearer(),
        method: "POST",
      }
    ),
  parametersAlertsGet: (body: parametersAlertsGetBody) =>
    Call<AlertsParameters>("/api/operations/parameters/alerts", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),

  parametersOperationsUpdate: (body: Parameters) =>
    Call<string>("/api/operations/parameters/update", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),

  parametersAlertsUpdate: (body: AlertsParameters) =>
    Call<string>("/api/operations/parameters/alerts/update", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
  //fasttrack
  fastTrackAll: (body: OperationsFastTrackAllBody) =>
    Call<OperationsFastTrackAllResponse>("/api/operations/fasttrack/all", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
  //alertsRisks
  alertsRisksAll: (body: OperationsAlertsRisksAllBody) =>
    Call<OperationsAlertsRisksAllResponse>("/api/operations/alertsrisks/all", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
  alertsRisksStatus: (body: OperationsAlertsRisksSatusBody) =>
    Call<OperationsAlertsRisksSatusResponse>(
      "/api/operations/alertsrisks/status",
      {
        body,
        headers: getTokenBearer(),
        method: "POST",
      }
    ),
  alertsRisksTxn: (body: OperationsAlertsRisksTxnBody) =>
    Call<OperationsAlertsRisksTxnResponse>("/api/operations/alertsrisks/txn", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),

  alertsRisksExcel: (body: OperationsAlertsRisksExcelBody) =>
    Call<OperationsAlertsRisksExcelResponse>(
      "/api/operations/alertsrisks/excel",
      {
        body,
        headers: getTokenBearer(),
        method: "POST",
      }
    ),
};
