import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { IntegrationGenerateAPIKeys } from "@app/types/Integrations";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/integraciones/apis";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<IntegrationGenerateAPIKeys>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as { idagep_empresa: number };

  const GetReponse = await Call<IntegrationGenerateAPIKeys>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: body,
      // setError(response) {
      //   const r = response || {};
      //   return r.hasOwnProperty?.("code");
      // },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {}, (item) => item);
}
