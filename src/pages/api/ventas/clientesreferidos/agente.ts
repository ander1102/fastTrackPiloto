import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientsReferralsAgenteResponseData,
  ClientsReferralsAgenteResponse
} from "@app/types/ClientsReferrals";
const CONTROLLER = "/leads/seller/agente";

export default async function agente(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientsReferralsAgenteResponseData[]>>//Objeto que manda el servicio
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { referencia } = req.body;
  const GetReponse = await Call<ClientsReferralsAgenteResponse>(
    CONTROLLER + `?referencia=${referencia ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {},(item)=>item.data);
}
