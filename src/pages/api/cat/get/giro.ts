import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { Giro, GiroGetResponse } from "@app/types/Categories";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/clientes/catgiro";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Giro[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<GiroGetResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, [], (item) => item.empresas);
}
