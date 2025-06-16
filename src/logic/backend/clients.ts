import { Call } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { GeneralApiReponse, GeneralStatusResponse } from "@app/types";
import {
  Client,
  ClientBankDataBody,
  ClientCollection,
  ClientCreateBody,
  ClientCRUDResponse,
  ClientDocumentResponse,
  ClientDocumentsBody,
  ClientGetBody,
  ClientUpdateBody,
  ClientExcelColumns,
  ClientKpisColumns,
  ClientFinance,
  ClientFinanceBody,
  ClientFinanceCheckBody,
  ClientFinanceCheck,
  ClientGetExcelParams,
  ClientsKpis,
  ClientsHabilitarResponse,
  ClientsHabilitarBody,
  ClientsFilters,
  ClientCollectionGetResponse,
  ClientsAllKpis,
} from "@app/types/Clients";
import {
  CreateReserveFundBody,
  CreateReserveFundResponse,
  getKpiReserveFundResponse,
} from "@app/types/reserveFund";
import { getTokenBearer } from "./middlewares";
import { ResumeGetByDate } from "@app/types/Resume";
export const ClientsControllers = {
  all: (body: ClientsFilters) =>
    Call<ClientCollectionGetResponse>("/api/clients/get/all", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
  getAllKpis: (body: ClientsFilters) =>
    Call<ClientsAllKpis>("/api/clients/allkpis", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  getKpis: (body: { idagep_empresa: number }) =>
    Call<ClientsKpis>("/api/clients/kpis", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  get: (clientBody: ClientGetBody) =>
    Call<Client>("/api/clients/get", {
      headers: getTokenBearer(),
      body: clientBody,
      method: "POST",
    }),
  add: (addBody: ClientCreateBody) =>
    Call<ClientCRUDResponse>("/api/clients/add", {
      headers: getTokenBearer(),
      body: addBody,
      method: "POST",
    }),
  update: (updateBody: ClientUpdateBody) =>
    Call<ClientCRUDResponse>("/api/clients/update", {
      headers: getTokenBearer(),
      body: updateBody,
      method: "POST",
    }),
  operationsAdd: (addBody: ClientCreateBody) =>
    Call<ClientCRUDResponse>("/api/clients/operationsAdd", {
      headers: getTokenBearer(),
      body: addBody,
      method: "POST",
    }),
  operationsUpdate: (updateBody: ClientUpdateBody) =>
    Call<ClientCRUDResponse>("/api/clients/operationsUpdate", {
      headers: getTokenBearer(),
      body: updateBody,
      method: "POST",
    }),
  delete: (deleteBody: ClientCreateBody) =>
    Call("/api/clients/delete", {
      headers: getTokenBearer(),
      body: deleteBody,
      method: "POST",
    }),
  uploadDocuments: (body: ClientDocumentsBody) =>
    Call<GeneralApiReponse<{ mensaje: string }>>(
      // /cliente/documentos
      "/api/clients/uploadDocument",
      {
        headers: getTokenBearer(),
        body,
        method: "POST",
        checkAuth: false,
      },
    ),
  showDocuments: (body: Pick<Client, "idagep_empresa" & "id_login">) =>
    Call(
      "/api/clients/documentShow",
      {
        headers: getTokenBearer(),
        body,
        method: "POST",
        checkAuth: false,
      },
    ),
  changeBankData: (body: ClientBankDataBody) =>
    Call<GeneralStatusResponse>(
      "/usuarios/datosbanco",
      {
        body,
        method: "POST",
        headers: getTokenBearer(),
      },
      AGREGADOR_API_URL
    ),
  createReserveFund: (body: CreateReserveFundBody) =>
    Call("/api/clients/fondoReserva",
      {
        body,
        method: "POST",
        headers: getTokenBearer(),
        checkAuth: false,
      },
    ),
    getKpiReserveFund: (idagep_empresa: number) =>
      Call<getKpiReserveFundResponse>(
        // `/cliente/kpi/fondo/reserva?idagep_empresa=${idagep_empresa ?? 0}`,
        "/api/clients/fondo",
        {
          method: "POST",
          body: {idagep_empresa},
          headers: getTokenBearer(),
          checkAuth: false,
        },
      ),
  excel: (body: ClientGetExcelParams) =>
    Call<ClientExcelColumns[]>("/api/clients/get/excel", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),

  kpis: (body: Pick<ResumeGetByDate, "idagep_empresa">) =>
    Call<ClientKpisColumns>("/api/clients/get/kpis", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  finance: (body: ClientFinanceBody) =>
    Call<ClientFinance>("/api/clients/finance", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  getCheck: (body: ClientFinanceCheckBody) =>
    Call<ClientFinanceCheck>("/api/clients/check", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  updateCheck: (body: ClientFinanceCheckBody) =>
    Call<ClientFinanceCheck>("/api/clients/check/update", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  updateStatus: (body: ClientsHabilitarBody) =>
    Call<ClientsHabilitarResponse>("/api/clients/habilitar", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
    getStatusAmex: (body: any) =>
      Call<any>("/api/clients/get/getStatusSupport", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
    updateStatusAmex: (body: any) =>
      Call<any>("/api/clients/support", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
};
