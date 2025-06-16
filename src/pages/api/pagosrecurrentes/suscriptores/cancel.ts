import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesSubscribersCancelBody,
  PagosRecurrentesSubscribersCancelResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/suscriptorBaja";
export default async function disable(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesSubscribersCancelResponse>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;

  const { token, email } =
    req.body as PagosRecurrentesSubscribersCancelBody;

  const GetReponse = await Call<PagosRecurrentesSubscribersCancelResponse>(
    CONTROLLER + "/?token=" + token + "&correoSuscriptor=" + email,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
