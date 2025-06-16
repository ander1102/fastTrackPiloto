import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  APIKeysIntegration,
  APIKeysIntegrationBody,
} from "@app/types/Integrations";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/integraciones/get/apis";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<APIKeysIntegration>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as APIKeysIntegrationBody;

  const GetReponse = await Call<APIKeysIntegration>(
    CONTROLLER,
    {
      body,
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
