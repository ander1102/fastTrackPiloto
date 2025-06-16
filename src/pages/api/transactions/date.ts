import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  TransactionDateResponse,
  TransactionDateCall,
} from "@app/types/Transactions";

const CONTROLLER = "/transacciones/cliente/fechas";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TransactionDateResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<TransactionDateCall>(
    CONTROLLER,
    {
      body,
      headers: { authorization: authorization ?? "" },
      setError: (res) => res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
//Ready
