import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import { AGREGADOR_API_URL } from "@app/constants";

export const CatalogsController = {
  createProduct: (body: any) =>
    Call<any>("/catalago/producto", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
  indexProduct: (body: any) =>
    Call<any>("/catalago/productos/all", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
    crudCategories: (body: any) => 
      Call<any>("/catalago/productos/categorias", {
        body,
        method: "POST",
        headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
    crudInventario: (body: any) => 
      Call<any>("/catalago/inventario/all", {
        body,
        method: "POST",
        headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
    alertInventario: (body: any) => 
      Call<any>("/catalago/inventario", {
        body,
        method: "POST",
        headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
    detailInventario: (body: any) => 
      Call<any>("/catalago/inventario", {
        body,
        method: "POST",
        headers: getTokenBearer(),
    }, AGREGADOR_API_URL),
    paymentLink: (body: any) => 
      Call<any>("/catalago/productos/pago", {
        body,
        method: "POST",
        headers: getTokenBearer(),
    }, AGREGADOR_API_URL),

}