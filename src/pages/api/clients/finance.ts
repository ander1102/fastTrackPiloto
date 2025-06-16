import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
    ClientFinance, ClientFinanceBody,
} from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/clientes/finanzas";

export default async function finance(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientFinance>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as ClientFinanceBody;
  const GetReponse = await Call<ClientFinance>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: { ...body },
      method: "POST",
    },
    AGREGADOR_API_URL
  );


  authJSONResponse(res, GetReponse, []);
}

