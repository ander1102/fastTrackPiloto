import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CardRequestRequest, CardRequestBody } from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjeta/solicitar";
export default async function request(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardRequestRequest>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as CardRequestBody;
  const GetReponse = await Call<CardRequestRequest>(
    CONTROLLER,
    {
      body: {
        ...body,
        operacion: "C",
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
