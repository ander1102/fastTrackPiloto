import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesCheckoutCreateBody,
  PagosRecurrentesCheckoutCreateResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/checkout";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesCheckoutCreateResponse>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body: PagosRecurrentesCheckoutCreateBody = req.body;

  const GetReponse = await Call<PagosRecurrentesCheckoutCreateResponse>(
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
