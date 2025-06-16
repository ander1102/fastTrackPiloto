import { Call } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { DepositsGet, Deposit, SendDepositsBody } from "@app/types/Deposits";
import { CRUDResponse } from "@app/types/Form";
import { getTokenBearer } from "./middlewares";

export const DepositsControllers = {
  getAllDeposits: (body: DepositsGet) =>
    Call<Deposit[]>("/api/deposits/get", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  postDeposit: (body: DepositsGet) =>
    Call<Deposit[]>("/api/deposits/post", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  depositEmail: (body: SendDepositsBody) =>
    Call<CRUDResponse<string>>(
      "/depositos/avisocorreo",
      {
        body,
        method: "POST",
        headers: getTokenBearer(),
      },
      AGREGADOR_API_URL
    ),
  getAllTransactions: (body:any) =>
    Call<any>(
      "/api/deposits/post",
      {
        body,
        method: "POST",
        headers: getTokenBearer(),
      },
    ),
  getDevolutionAmount: (body:any) =>
    Call<any>(
      // `/depositos/devoluciones?idagep_empresa=${body}`,
      "/api/deposits/devoluciones",
    {
      body: {idagep_empresa: body},
      method: "POST",
      headers: getTokenBearer(),
    },
    ),
  getLiquidacion: (body:any) =>
    Call<any>(
      // /liquidaciones/get
      "/api/deposits/liquidacion/get",
      {
        body,
        method: "POST",
        headers: getTokenBearer(),
      },
    ),
    detailLiquidation: (body:any) =>
      Call<any>(
        // /liquidaciones/crud
        "/api/deposits/liquidacion/excel",
        {
          body,
          method: "POST",
          headers: getTokenBearer(),
        },
      ),
      getExcelDetail: (body:any) =>
        Call<any>(
          // /liquidaciones/crud H
          "/api/deposits/liquidacion/excelH",
          {
            body,
            method: "POST",
            headers: getTokenBearer(),
          },
        ),
        getExcelDetail2: (body:any) =>
          Call<any>(
            // "/liquidaciones/excel"
            "/api/deposits/liquidacion/excelMassive",
            {
              body,
              method: "POST",
              headers: getTokenBearer(),
            },
          ),

};
