import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import {
  ClientsReferralsAdquierentesResponse,
  ClientsReferralsAllBody,
  ClientsReferralsCotizadorBody,
  ClientsReferralsCreateBody,
  ClientsReferralsCreateResponse,
  ClientsReferralsUpdateBody,
  ClientsReferralsUpdateResponse,
  ClientsReferralsReadBody,
  ClientsReferralsDocumentosResponse,
  ClientsReferralsDocumentosBody,
  ClientsReferralsDocumentosShowBody,
  ClientsReferralsDocumentosShowResponse,
  ClientsReferralsFamiliasBody,
  ClientsReferralsFamiliasResponse,
  ClientsReferralsGiroBody,
  ClientsReferralsGiroResponse,
  ClientsReferralsKpiBody,
  ClientsReferralsKpiRepsonse,
  ClientsReferralsEnviarBody,
  ClientsReferralsAllResponse,
  ClientsReferralsResQuotation,
  ClientsReferralsReadResponse,
  ClientsReferralsDeleteBody,
  ClientsReferralsDeleteResponse,
  ClientsReferralsEnviarResponse,
  ClientsReferralsSellerResponseData,
  ClientsReferralsSellerBody,
  ClientsReferralsAgenteResponseData,
  ClientsReferralsAgenteBody,
  
} from "@app/types/ClientsReferrals";
export const ClientsReferralsControllers = {
  adquirientes: () =>
    Call<ClientsReferralsAdquierentesResponse>(
      "/api/ventas/clientesreferidos/adquirientes",
      {
        method: "POST",
        headers: getTokenBearer(),
      }
    ),
  all: (body: ClientsReferralsAllBody) =>
    Call<ClientsReferralsAllResponse>("/api/ventas/clientesreferidos/all", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  cotizador: (body: ClientsReferralsCotizadorBody) =>
    Call<ClientsReferralsResQuotation>(
      "/api/ventas/clientesreferidos/cotizador",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
  create: (body: ClientsReferralsCreateBody) =>
    Call<ClientsReferralsCreateResponse>(
      "/api/ventas/clientesreferidos/create",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
  update: (body: ClientsReferralsUpdateBody) =>
    Call<ClientsReferralsUpdateResponse>(
      "/api/ventas/clientesreferidos/update",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),

  read: (body: ClientsReferralsReadBody) =>
    Call<ClientsReferralsReadResponse>("/api/ventas/clientesreferidos/read", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  documentos: (body: ClientsReferralsDocumentosBody) =>
    Call<ClientsReferralsDocumentosResponse>(
      "/api/ventas/clientesreferidos/documentos",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
  documentosShow: (body: ClientsReferralsDocumentosShowBody) =>
    Call<ClientsReferralsDocumentosShowResponse>(
      "/api/ventas/clientesreferidos/showdocumentos",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
  familias: (body: ClientsReferralsFamiliasBody) =>
    Call<ClientsReferralsFamiliasResponse>(
      "/api/ventas/clientesreferidos/familias",
      {
        method: "POST",
        headers: getTokenBearer(),
      }
    ),
  giro: (body: ClientsReferralsGiroBody) =>
    Call<ClientsReferralsGiroResponse>("/api/ventas/clientesreferidos/giro", {
      method: "POST",
      headers: getTokenBearer(),
    }),
  kpi: (body: ClientsReferralsKpiBody) =>
    Call<ClientsReferralsKpiRepsonse>("/api/ventas/clientesreferidos/kpi", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  enviar: (body: ClientsReferralsEnviarBody) =>
    Call<ClientsReferralsEnviarResponse>(
      "/api/ventas/clientesreferidos/enviar",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
  deletes: (body: ClientsReferralsDeleteBody) =>
    Call<ClientsReferralsDeleteResponse>(
      "/api/ventas/clientesreferidos/deletes",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
  agente: (body: ClientsReferralsAgenteBody) =>
    Call<ClientsReferralsAgenteResponseData[]>(
      "/api/ventas/clientesreferidos/agente",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
  seller: (body: ClientsReferralsSellerBody) =>
    Call<ClientsReferralsSellerResponseData[]>(
      "/api/ventas/clientesreferidos/seller",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
};
