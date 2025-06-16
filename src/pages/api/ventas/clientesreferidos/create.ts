import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientsReferralsCreateResponse
} from "@app/types/ClientsReferrals";

const CONTROLLER = "/referido/crud";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<any>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<ClientsReferralsCreateResponse>(//Objeto que manda el servicio
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
