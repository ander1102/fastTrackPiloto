import { NextApiRequest, NextApiResponse } from "next";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  OperationsCatRiesgos,
  OperationsCatRiesgosResponse,
} from "@app/types/Operations";

const CONTROLLER = "/controles/catriesgos";

export default async function riesgos(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<OperationsCatRiesgos[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetResponse = await Call<OperationsCatRiesgosResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetResponse, [], (item) => item.riesgos);
}
