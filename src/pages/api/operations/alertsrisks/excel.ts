import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  OperationsAlertsRisksExcelBody,
  OperationsAlertsRisksExcelResponse,
} from "@app/types/Operations";

const CONTROLLER = "/controles/alertas/excel";

export default async function excel(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<OperationsAlertsRisksExcelResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as OperationsAlertsRisksExcelBody;
  const GetReponse = await Call<OperationsAlertsRisksExcelResponse>(
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
