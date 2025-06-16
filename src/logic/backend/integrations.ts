import { isEmptyObject } from "@app/common";
import { Call } from "@app/common/fetch";
import {
  APIKeysIntegration,
  APIKeysIntegrationBody,
  IntegrationGenerateAPIKeys,
  IntegrationHistoryFilters,
  IntegrationHistoryResponse,
  IntegrationKPIs,
  IntegrationKPIsBody,
  IntegrationLink,
  IntegrationLinkDetailsBody,
  IntegrationLinkDetailsResponse,
  IntegrationLinkPagoBody,
  IntegrationLinkNegocioBody,
} from "@app/types/Integrations";
import { getTokenBearer } from "./middlewares";

export const IntegrationsControllers = {
  getApiKeys: (body: APIKeysIntegrationBody) =>
    Call<APIKeysIntegration>("/api/integrations/api/get", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  generateApiKeys: (body: { idagep_empresa: number }) =>
    Call<IntegrationGenerateAPIKeys>("/api/integrations/api/post", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  getKPIS: (body: IntegrationKPIsBody) =>
    Call<IntegrationKPIs>("/api/integrations/kpis", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  getHistory: (body: IntegrationHistoryFilters) =>
    Call<IntegrationHistoryResponse>("/api/integrations/history", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  getDetails: (body: IntegrationLinkDetailsBody) =>
    Call<IntegrationLinkDetailsResponse>("/api/integrations/details", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  getLinkPago: (body: IntegrationLinkPagoBody) =>
    Call<IntegrationLink>("/api/integrations/pago", {
      method: "POST",
      body,
      headers: getTokenBearer(),
      setError: (response) => {
        const r = response || {};
        return isEmptyObject(r);
      },
    }),
  getLinkNegocio: (body: IntegrationLinkNegocioBody) =>
    Call<IntegrationLink>("/api/integrations/negocio", {
      method: "POST",
      body,
      headers: getTokenBearer(),
      setError: (response) => {
        const r = response || {};
        return isEmptyObject(r);
      },
    }),
  excel: (body: IntegrationHistoryFilters) =>
    Call<[]>("/api/integrations/excel", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
};
