import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesSubscribersDisableBody,
  PagosRecurrentesSubscribersDisableResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/suscriptores/crud";
export default async function disable(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesSubscribersDisableResponse>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body: PagosRecurrentesSubscribersDisableBody = req.body;
  const GetReponse = await Call<PagosRecurrentesSubscribersDisableResponse>(
    CONTROLLER,
    {
      body: { ...body, operacion: "D" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
