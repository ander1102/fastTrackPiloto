import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  OperationsAlertsRisksTxnBody,
  OperationsAlertsRisksTxnResponse,
} from "@app/types/Operations";

const CONTROLLER = "/controles/alertas/txn";

export default async function txn(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<OperationsAlertsRisksTxnResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as OperationsAlertsRisksTxnBody;
  const GetReponse = await Call<OperationsAlertsRisksTxnResponse>(
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
