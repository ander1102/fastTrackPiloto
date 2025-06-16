import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
    ClientFinanceCheck, ClientFinanceCheckBody,
} from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/clientes/finanzas/liquidar";

export default async function check(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientFinanceCheckBody>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as ClientFinanceCheckBody;
  const GetReponse = await Call<ClientFinanceCheck>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: { ...body,operacion:'R' },
      method: "POST",
    },
    AGREGADOR_API_URL
  );


  authJSONResponse(res, GetReponse, []);
}

