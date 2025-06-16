import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL,BALACER_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/matriz/cancelacion/tls";
const CONTROLLER_DUKPT = "/matriz/cancelacion/dukpt";

export default async function refund(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  let endpoint = body.tipo === 'DUKPT' ? CONTROLLER_DUKPT: CONTROLLER

  const GetReponse = await Call<[]>(
    endpoint,
    {
      method: "POST",
      body,
      headers: { authorization: authorization ?? "" },
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
    },
    BALACER_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item);
}
