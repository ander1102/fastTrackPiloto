import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/referido/documentos/show";
//TODO: Remove all any's
export default async function documentosShow(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<any>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<any>(
    CONTROLLER,
    {
      body: body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {});
}