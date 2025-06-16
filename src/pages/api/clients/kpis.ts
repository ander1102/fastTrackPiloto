import { NextApiRequest, NextApiResponse } from "next";
import { ClientsKpis, ClientsKpisResponse } from "@app/types/Clients";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { authJSONResponse } from "@app/logic/backend/utils";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/clientes/kpis";

export default async function kpis(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientsKpis>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;

  const GetReponse = await Call<ClientsKpisResponse>(
    `${CONTROLLER}?idagep_empresa=${body.idagep_empresa}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item.data);
}
