import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import { AGREGADOR_API_URL } from "@app/constants";
import { LeadGetInfo, LeadInfoStructure, LeadsGetBody, LeadsStatusChange, saveLeadBody } from "@app/types/Leads";

export const LeadsControllers = {

  getLeads: (body: LeadsGetBody) =>
    Call<any>("/api/leads/get", {
     method: "POST",
     body,
     headers: getTokenBearer(),
    }),
  
  updateLeadStatus: (body:LeadsStatusChange) => 
    Call<any>("/api/leads/updateStatus", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  getLeadInfo: (body: LeadGetInfo) =>
    Call<LeadInfoStructure>("/api/leads/get/info", {
     method: "POST",
     body,
     headers: getTokenBearer(),
    }),
  saveLeadInfo: (body: saveLeadBody) =>
    Call<any>("/api/leads/get/info", {
     method: "POST",
     body,
     headers: getTokenBearer(),
    }),
  getSellers: (body:any) => 
    Call<any>("/leads/seller", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
  newSellers: (body: any) =>
  Call<any>("/leads/seller", {
    method: "POST",
    body,
    headers: getTokenBearer(),
  }, AGREGADOR_API_URL),
  createLead: (body:any) => 
    Call<any>("/cliente/crudCrea", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
  getGiros: () => 
    Call<any>("/clientes/giros", {
      method: "GET",
    }, AGREGADOR_API_URL),
  checkReference: (ref:any) =>
    Call<any>(`/leads/referencia/valida?referencia=${ref}`, {
      method: "GET",
  }, AGREGADOR_API_URL),
};
