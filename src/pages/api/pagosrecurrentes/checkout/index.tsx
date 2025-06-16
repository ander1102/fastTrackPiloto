import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesCheckoutReadBody,
  PagosRecurrentesCheckoutReadResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/info/checkout";
export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<PagosRecurrentesCheckoutReadResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body: PagosRecurrentesCheckoutReadBody = req.body;

  const GetReponse = await Call<PagosRecurrentesCheckoutReadResponse>(
    CONTROLLER + "/?token=" + body.token,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}
