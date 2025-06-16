import { NextApiRequest, NextApiResponse } from "next";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  CreateAlertResult,
  AlertsParameters,
} from "@app/types/Operations";

const CONTROLLER = "/controles/alertas";

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<AlertsParameters>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetResponse = await Call<CreateAlertResult>(
    CONTROLLER,
    {
      body: { ...req.body, operacion: "R" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetResponse, []);
}
