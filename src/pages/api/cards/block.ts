import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CardBlockBody, CardBlockRequest } from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjeta/bloqueo";
export default async function block(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardBlockRequest>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as CardBlockBody;
  const GetReponse = await Call<CardBlockRequest>(
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

  authJSONResponse(res, GetReponse, {});
}
