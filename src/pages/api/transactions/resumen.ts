import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  TransactionResumenResponse,
  TransactionResumenCall,
} from "@app/types/Transactions";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/transacciones/cliente/fechas/resumen";

export default async function resumen(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TransactionResumenResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<TransactionResumenCall>(
    CONTROLLER,
    {
      body: req.body,
      headers: { authorization: authorization ?? "" },
      setError: (res) => res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
//Ready
