import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/referido/kpi";
//TODO: Remove all any's
export default async function kpi(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<any>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { idagep_usuarios } = req.body;
  const GetReponse = await Call<any>(
    CONTROLLER + `?idagep_usuarios=${idagep_usuarios ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {});
}
