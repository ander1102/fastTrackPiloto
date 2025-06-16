import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ClientsReferralsSellerResponse,
  ClientsReferralsSellerResponseData,
} from "@app/types/ClientsReferrals";

const CONTROLLER = "/leads/seller";

export default async function seller(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<ClientsReferralsSellerResponseData[]>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { idagep_usuarios } = req.body;
  const GetReponse = await Call<ClientsReferralsSellerResponse>(
    CONTROLLER + `?idagep_usuarios=${idagep_usuarios ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {}, (item) => item.data);
}
