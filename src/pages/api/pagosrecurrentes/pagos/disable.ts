import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesPaymentsDisableBody,
  PagosRecurrentesPaymentsDisableResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/recurrentes/crud";
export default async function all(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesPaymentsDisableResponse>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body: PagosRecurrentesPaymentsDisableBody = req.body;
  const GetReponse = await Call<PagosRecurrentesPaymentsDisableResponse>(
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
