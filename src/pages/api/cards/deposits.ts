import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CardDepositsBody, CardDepositsRequestResponse,CardDepositsRequestResponseTransaction } from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjetas/depositos";
export default async function deposits(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardDepositsRequestResponseTransaction[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as CardDepositsBody;
  const GetReponse = await Call<CardDepositsRequestResponse>(
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

  authJSONResponse(res, GetReponse, {},(item)=>item.transacciones);
}
