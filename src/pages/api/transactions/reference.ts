import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  TransactionReferenceResponse,
  TransactionReferenceCall,
} from "@app/types/Transactions";
const CONTROLLER = "/transacciones/referencia";
//Respuesta del servidor


export default async function reference(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TransactionReferenceResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<TransactionReferenceCall>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      setError: (res) => res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
      body,
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, null);
}
//Ready