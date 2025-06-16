import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import {
    PagosRecurrentesSubscribersCreateBody,
  PagosRecurrentesSubscribersCreateResponse,
} from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/suscriptores/crud";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<PagosRecurrentesSubscribersCreateResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body: PagosRecurrentesSubscribersCreateBody = req.body;

  const GetReponse = await Call<PagosRecurrentesSubscribersCreateResponse>(
    CONTROLLER,
    {
      body: { ...body, operacion: "C" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );


  authJSONResponse(res, GetReponse, []);
}
