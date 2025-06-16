import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/depositos/devoluciones";

export default async function getDevolutionAmount(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<any>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  
  const GetReponse = await Call<any>(
    CONTROLLER + `?idagep_empresa=${req.body.idagep_empresa ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}

