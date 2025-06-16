import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientsReferrals,
  ClientsReferralsReadResponse,
} from "@app/types/ClientsReferrals";

const CONTROLLER = "/referido/crud";

export default async function read(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientsReferrals>> //Objeto que quiero (colocar afuera tambien)
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<ClientsReferralsReadResponse>(//Objeto que manda el servicio
    CONTROLLER,
    {
      body: body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);

}
