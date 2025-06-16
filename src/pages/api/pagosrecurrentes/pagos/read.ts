import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PagosRecurrentesPaymentsReadBody,
  PagosRecurrentesPaymentsReadResponse,
  PagosRecurrentesPaymentsReadResponsePagosRecurrentes
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/recurrentes/crud";
export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<
    FetchClientResponse<PagosRecurrentesPaymentsReadResponsePagosRecurrentes>
  >
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body: PagosRecurrentesPaymentsReadBody = req.body;

  const GetReponse = await Call<PagosRecurrentesPaymentsReadResponse>(
    CONTROLLER,
    {
      body: { ...body, operacion: "R" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [],(item)=>item.pagosRecurrentes[0]);
}
