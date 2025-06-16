import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesSubscribersPagosBody,
  PagosRecurrentesSubscribersPagosResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/suscriptores/pagos";

export default async function pagos(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesSubscribersPagosResponse>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;

  const GetReponse = await Call<PagosRecurrentesSubscribersPagosResponse>(
    CONTROLLER,
    {
      body: req.body as PagosRecurrentesSubscribersPagosBody,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
