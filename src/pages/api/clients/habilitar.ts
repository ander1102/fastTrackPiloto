import { NextApiRequest, NextApiResponse } from "next";
import { ClientsHabilitarResponse } from "@app/types/Clients";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { authJSONResponse } from "@app/logic/backend/utils";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/clientes/habilitar";

export default async function habilitar(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientsHabilitarResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;

  const GetReponse = await Call<ClientsHabilitarResponse>(
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
