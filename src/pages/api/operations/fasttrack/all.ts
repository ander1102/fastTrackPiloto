import { NextApiRequest, NextApiResponse } from "next";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { OperationsFastTrackAllResponse } from "@app/types/Operations";

const CONTROLLER = "/controles/empresas";

export default async function all(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<OperationsFastTrackAllResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetResponse = await Call<OperationsFastTrackAllResponse>(
    CONTROLLER,
    {
      body: req.body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetResponse, {});
}
