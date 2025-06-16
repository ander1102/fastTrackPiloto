import { SellersGetBody } from "@app/types/Ventas";

export const DEFAULT_SELLER_BODY = (): SellersGetBody => ({
  vendedor: "",
  fechaIni:"",
  fechaFin: "",
  estatus:"nuevo",
  PageIndex: '1',
  PageSize:"25",
  tamano_pagina: 25
});