import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  OperationsAlertsRisksAllBody,
  OperationsAlertsRisksAllResponse,
} from "@app/types/Operations";
const CONTROLLER = "/controles/alertas/sl";
export default async function all(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<OperationsAlertsRisksAllResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as OperationsAlertsRisksAllBody;
  const GetReponse = await Call<OperationsAlertsRisksAllResponse>(
    CONTROLLER,
    {
      body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
