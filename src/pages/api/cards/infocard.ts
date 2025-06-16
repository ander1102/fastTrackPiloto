import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CardInfoCardBody, CardInfoCardRequest,CardInfoCardRequestResponse,CardInfoCardRequestResponseCard } from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjeta/infocard";
export default async function infocard(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardInfoCardRequestResponseCard>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as CardInfoCardBody;
  const GetReponse = await Call<CardInfoCardRequest>(
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

  authJSONResponse(res, GetReponse, {},(item)=>item.response.card);
}
