import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  TransactionKpisCall,
  TransactionKpisResponse,
} from "@app/types/Transactions";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/transacciones/kpi";

export default async function kpi(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TransactionKpisResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<TransactionKpisCall>(
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
