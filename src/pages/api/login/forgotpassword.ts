import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { GeneralStatusResponse } from "@app/types";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/usuarios/password";

export default async function forgotpass(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<GeneralStatusResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const UpdateReponse = await Call<GeneralStatusResponse>(
    CONTROLLER,
    {
      body: req.body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, UpdateReponse, {});
}
