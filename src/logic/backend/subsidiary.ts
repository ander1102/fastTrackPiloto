import { Call } from "@app/common/fetch";
import {
  Subsidiary,
  SubsidiaryPost,
  SubsidiaryPostResponse,
  SubsidiaryQuery,
} from "@app/types/Subsidiary";
import { getTokenBearer } from "./middlewares";

export const SubsidiaryControllers = {
  get: (body: SubsidiaryQuery) =>
    Call<Subsidiary[]>("/api/subsidiary/get", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  add: (body: SubsidiaryPost) =>
    Call<SubsidiaryPostResponse>("/api/subsidiary/add", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  update: (body: SubsidiaryPost) =>
    Call<SubsidiaryPostResponse>("/api/subsidiary/update", {
      headers: getTokenBearer(),
      method: "PUT",
      body,
    }),
  getTotalRecords: (idagep_empresa: number, idagep_usuarios: number) =>
    Call<number>("/api/subsidiary/get/totalrecords", {
      headers: getTokenBearer(),
      querybody: { idagep_empresa, idagep_usuarios },
      checkAuth: false,
    }),
};
