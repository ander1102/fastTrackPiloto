import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import { Sucursales, MetPago,Adquiriente,Tasas } from "@app/types/Categories";

export const CatControllers = {
  clientes: () =>
    Call("/api/cat/get/clientes", {
      headers: getTokenBearer(),
      method: "POST",
    }),
  clientesDeposits: () =>
    Call("/api/cat/get/clientesDeposits", {
      headers: getTokenBearer(),
      method: "POST",
    }),
  sucursales: (body: { idagep_empresas: number, idagep_usuarios: number }) =>
    Call<Sucursales[]>("/api/cat/get/sucursales", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  pagos: (body: { idagep_empresa: number }) =>
    Call<MetPago[]>("/api/cat/get/catpago", {
      headers: getTokenBearer(),
      method: "POST",
      body,
    }),
  tasa: () =>
    Call<Tasas[]>("/api/cat/get/tasa", {
      headers: getTokenBearer(),
      method: "POST",
    }),
  adquiriente: () =>
    Call<Adquiriente[]>("/api/cat/get/adquiriente", {
      headers: getTokenBearer(),
      method: "POST",
    }),
};
