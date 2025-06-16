import { Call } from "@app/common/fetch";
import {
  ClientFulfillment,
  FulfillmentResponse,
  FulfillmentGet,
  FulfillmentExceptionalBodyRead,
  FulfillmentExceptionalResponseRead,
  FulfillmentExceptionalBodyUpdate,
  FulfillmentExceptionalResponseUpdate,
  DossiersAllResponse,
  DossiersFilters,
  DossiersAllKpis,
} from "@app/types/Dossiers";
import { getTokenBearer } from "./middlewares";
import { AGREGADOR_API_URL } from "@app/constants";

export const DossiersControllers = {
  all: (body: DossiersFilters) =>
    Call<DossiersAllResponse>("/api/dossiers/all", {
      headers: getTokenBearer(),
      body,
      method: "POST",
    }),
  getAllKpis: (body: DossiersFilters) =>
    Call<DossiersAllKpis>("/api/dossiers/allkpis", {
      headers: getTokenBearer(),
      body,
      method: "POST",
    }),
  get: (fulfillmentBody: FulfillmentGet) =>
    Call<FulfillmentResponse>("/api/dossiers/get", {
      headers: getTokenBearer(),
      body: fulfillmentBody,
      method: "POST",
    }),
  add: (fulfillmentBody: ClientFulfillment) =>
    Call<FulfillmentResponse>("/api/dossiers/add", {
      headers: getTokenBearer(),
      body: fulfillmentBody,
      method: "POST",
    }),
  update: (fulfillmentBody: ClientFulfillment) =>
    Call<FulfillmentResponse>("/api/dossiers/update", {
      headers: getTokenBearer(),
      body: fulfillmentBody,
      method: "POST",
    }),
  send: (fulfillmentBody: ClientFulfillment) =>
    Call<FulfillmentResponse>("/api/dossiers/send", {
      headers: getTokenBearer(),
      body: fulfillmentBody,
      method: "POST",
    }),
  documentos: (ruta: string) =>
    Call(
      // "/cumplimiento/get/documentos?ruta=" + ruta,
      "/api/dossiers/getDocument",
      {
        method: "POST",
        body: {ruta},
        headers: getTokenBearer(),
        checkAuth: false,
      },
    ),
  getExceptional: (body: FulfillmentExceptionalBodyRead) =>
    Call<FulfillmentExceptionalResponseRead>(
      "/api/dossiers/exceptional/get",
      {
        body,
        headers: getTokenBearer(),
        method: "POST",
      }
    ),
  updateExceptional: (body: FulfillmentExceptionalBodyUpdate) =>
    Call<FulfillmentExceptionalResponseUpdate>(
      "/api/dossiers/exceptional/update",
      {
        body,
        headers: getTokenBearer(),
        method: "POST",
      }
    ),
};
