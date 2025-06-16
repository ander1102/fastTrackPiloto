import { NextApiRequest, NextApiResponse } from "next";
import { IntegrationKPIs, IntegrationKPIsBody } from "@app/types/Integrations";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/integraciones/kpi";

export default async function kpis(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<IntegrationKPIs>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as IntegrationKPIsBody;
  const GetReponse = await Call<IntegrationKPIs>(
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
