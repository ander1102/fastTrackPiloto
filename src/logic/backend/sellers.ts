import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import { AGREGADOR_API_URL } from "@app/constants";

export const SellersController = {
  getSellers: (body:any) =>
    Call<any>("/sellers/all", {
     method: "POST",
     body,
     headers: getTokenBearer(),
    },AGREGADOR_API_URL),
    getSellersKpi: (id:any) =>
    Call<any>(`/sellers/kpi?idagep_empresa=${id}`, {
     method: "GET",
     headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  createSeller: (body:any) => 
    Call<any>("/sellers", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  sendDocsSeller: (body:any) => 
    Call<any>("/sellers/documentos", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  detailSellerKpi: (id:any) => 
    Call<any>(`/sellers/kpi/detalle?idagep_seller=${id}`, {
      method: "GET",
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  detailSeller: (body:any) => 
    Call<any>(`/sellers/detalle`, {
      method: "POST",
      body,
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  catalogSeller: (id:any) => 
    Call<any>(`/leads/seller?idagep_usuarios=${id}`, {
      method: "GET",
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
    filterCatalogSeller: (id:any) => 
    Call<any>(`/leads/seller/gerentes?idagep_usuarios=${id}`, {
      method: "GET",
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  catalogAgent: (id:any) => 
    Call<any>(`/leads/seller/agente?referencia=${id}`, {
      method: "GET",
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  deleteAgent: (id:any) => 
    Call<any>(`/sellers/delete?idagep_seller=${id}`, {
      method: "GET",
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  getAgentCatalog: (id:any) => 
    Call<any>(`/seller/deposito/agentes?idagep_usuarios=${id}`, {
      method: "GET",
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  createDeposit: (body:any) => 
    Call<any>(`/sellers/deposito`, {
      method: "POST",
      body,
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
  getHistoryDeposit: (body:any) => 
    Call<any>(`/sellers/depositos/all`, {
      method: "POST",
      body,
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
    MassiveAssign: (body:any) => 
    Call<any>(`/leads/seller/asignar`, {
      method: "POST",
      body,
      headers: getTokenBearer(),
    },AGREGADOR_API_URL),
}