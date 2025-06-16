import { NextApiRequest, NextApiResponse } from "next";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  OperationsAlertsRisksSatusBody,
  OperationsAlertsRisksSatusResponse,
} from "@app/types/Operations";

const CONTROLLER = "/controles/alertas/update";
export default async function status(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<OperationsAlertsRisksSatusBody>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetResponse = await Call<OperationsAlertsRisksSatusResponse>(
    CONTROLLER,
    {
      body: { ...req.body, operacion: "U" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetResponse, {});
}
