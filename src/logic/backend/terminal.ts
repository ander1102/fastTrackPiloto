import { Call } from "@app/common/fetch";
import {
  Terminal,
  TerminalAssignAdmin,
  TerminalAssignClient,
  TerminalByIdBody,
  TerminalFilters,
  TerminalTotal,
  TerminalResponse,
  TerminalUnassignAdmin,
} from "@app/types/Terminal";
import { getTokenBearer } from "./middlewares";
import { AGREGADOR_API_URL } from "@app/constants";

export const TerminalControllers = {
  get: (body: TerminalFilters) =>
    Call<TerminalResponse>("/api/terminal/get", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  getById: (body: TerminalByIdBody) =>
    Call<Terminal | null>("/api/terminal/get/id", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  getTotalRecords: (body: TerminalFilters) =>
    Call<TerminalTotal>("/api/terminal/get/totalrecords", {
      headers: getTokenBearer(),
      body,
      method: "POST",
      checkAuth: true,
    }),
  add: (body: TerminalFilters) =>
    Call("/api/terminal/add", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  assignAdmin: (body: TerminalAssignAdmin) =>
    Call("/api/terminal/assign/admin", {
      headers: getTokenBearer(),
      method: "PUT",
      body,
    }),
  assignClient: (body: TerminalAssignClient) =>
    Call("/api/terminal/assign/client", {
      headers: getTokenBearer(),
      method: "PUT",
      body,
    }),
  unassignClient: (body: TerminalUnassignAdmin) =>
    Call("/api/terminal/assign/admin", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  actionTerminal: (body: any) =>
    Call(
      "/api/terminal/estatus",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      },
    ),
};
