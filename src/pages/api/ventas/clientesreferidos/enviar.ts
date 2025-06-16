import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientsReferralsEnviarResponse,
} from "@app/types/ClientsReferrals";
const CONTROLLER = "/referido/enviar";
//TODO: Remove all any's
export default async function enviar(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientsReferralsEnviarResponse>>//Objeto que manda el servicio
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { idagep_referido } = req.body;
  const GetReponse = await Call<any>(
    CONTROLLER + `?idagep_referido=${idagep_referido ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {});
}
