import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  TransactionExcelCall,
  TransactionExcelResponse
} from "@app/types/Transactions";

const CONTROLLER = "/transacciones/cliente/fechas/excel";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TransactionExcelResponse[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<TransactionExcelCall>(
    CONTROLLER,
    {
      body,
      headers: { authorization: authorization ?? "" },
      setError: (res) => res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [],(item)=>item.transacciones);
}
//Ready
