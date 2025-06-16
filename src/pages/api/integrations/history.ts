import { NextApiRequest, NextApiResponse } from "next";
import { IntegrationHistoryResponse } from "@app/types/Integrations";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/integraciones/all";

export default async function history(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<IntegrationHistoryResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<IntegrationHistoryResponse>(
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
