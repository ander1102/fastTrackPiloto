import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesSubscribersAllBody,
  PagosRecurrentesSubscribersAllResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/suscriptores/sl";
export default async function all(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesSubscribersAllResponse>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;

  const GetReponse = await Call<PagosRecurrentesSubscribersAllResponse>(
    CONTROLLER,
    {
      body: req.body as PagosRecurrentesSubscribersAllBody,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
