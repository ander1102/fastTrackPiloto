import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/clientes/get";


export default async function clientes(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}
