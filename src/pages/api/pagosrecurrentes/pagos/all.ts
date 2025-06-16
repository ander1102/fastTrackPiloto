import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import { PagosRecurrentesPaymentsAllBody, PagosRecurrentesPaymentsAllResponse } from "@app/types/PagosRecurrentes";

const CONTROLLER = "/pagos/recurrentes/sl";
export default async function all(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<PagosRecurrentesPaymentsAllResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { idagep_usuario } = req.body as PagosRecurrentesPaymentsAllBody;
  const GetReponse = await Call<PagosRecurrentesPaymentsAllResponse>(
    CONTROLLER + "?idagep_usuario=" + idagep_usuario,
    {
      body: req.body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
 

  authJSONResponse(res, GetReponse, []);
}
