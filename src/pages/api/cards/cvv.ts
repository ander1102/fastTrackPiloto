import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CardCVVBody, CardCVVRequest,CardCVVRequestResponse } from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjeta/cvv";
export default async function cvv(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardCVVRequestResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as CardCVVBody;
  const GetReponse = await Call<CardCVVRequest>(
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

  authJSONResponse(res, GetReponse, {},(item)=>item.response);
}
