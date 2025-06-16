import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CardTransactionsBody, CardTransactionsRequest,CardTransactionsRequestResponseTransaction } from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjeta/transacciones";
export default async function transactions(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardTransactionsRequestResponseTransaction[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as CardTransactionsBody;
  const GetReponse = await Call<CardTransactionsRequest>(
    CONTROLLER,
    {
      body: {
        ...body
      },
      headers: { authorization: authorization ?? "" },
      setError(response) {
        const r = response || {};
        return r.hasOwnProperty?.("code");
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {},(item)=>item.response.transactions);
}
