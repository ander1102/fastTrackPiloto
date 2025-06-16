import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { ClientCollectionGetResponse } from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/clientes/all";

export default async function getAll(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientCollectionGetResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<ClientCollectionGetResponse>(
    CONTROLLER,
    {
      body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}
