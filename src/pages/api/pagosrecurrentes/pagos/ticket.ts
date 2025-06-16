import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesPaymentsTicketBody,
  PagosRecurrentesPaymentsTicketResponse
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/recibo/pdf";
export default async function ticket(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesPaymentsTicketResponse>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body: PagosRecurrentesPaymentsTicketBody = req.body;

  const GetReponse = await Call<PagosRecurrentesPaymentsTicketResponse>(
    `${CONTROLLER}?token=${body.token}&id=${body.id}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}
