import { NextApiRequest, NextApiResponse } from "next";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  TransactionalParameters,
  GetTransactionalResult,
} from "@app/types/Operations";

const CONTROLLER = "/controles/parametros";

export default async function getTransactionalParameters(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TransactionalParameters>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetResponse = await Call<GetTransactionalResult>(
    CONTROLLER,
    {
      body: { ...req.body, operacion: "R" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetResponse, [], (item) => item.parametros[0]);
}
