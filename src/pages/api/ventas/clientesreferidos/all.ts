import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientsReferralsAllResponse,
} from "@app/types/ClientsReferrals";
const CONTROLLER = "/referido/all";
export default async function all(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientsReferralsAllResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<ClientsReferralsAllResponse>(
    CONTROLLER,
    {
      body: req.body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}
