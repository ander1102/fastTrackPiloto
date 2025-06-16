import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientsReferralsDeleteResponse,
} from "@app/types/ClientsReferrals";
const CONTROLLER = "/referido/delete";

export default async function deletes(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientsReferralsDeleteResponse>>//Objeto que manda el servicio
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { idagep_referido } = req.body;
  const GetReponse = await Call<ClientsReferralsDeleteResponse>(
    CONTROLLER + `?idagep_referido=${idagep_referido ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {});
}
