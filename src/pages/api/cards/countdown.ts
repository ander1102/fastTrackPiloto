import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
    CardCountdownRequest
} from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjeta/contador";

export default async function countdown(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardCountdownRequest>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { idagep_empresa } = req.body;
  const GetReponse = await Call<CardCountdownRequest>(
    CONTROLLER + `?idagep_empresa=${idagep_empresa ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}
