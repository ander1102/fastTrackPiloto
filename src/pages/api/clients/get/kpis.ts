import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  ClientKpisColumns,
  ClientGetResponseKpi,
} from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/clientes/kpis";

export default async function kpis(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientKpisColumns>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { idagep_empresa } = req.body;
  const GetReponse = await Call<ClientGetResponseKpi>(
    CONTROLLER + `?idagep_empresa=${idagep_empresa ?? 0}`,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item.data);
}
