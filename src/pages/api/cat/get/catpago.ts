import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import { MetPago } from "@app/types/Categories";
const CONTROLLER = "/clientes/catpago";

export interface pagos {
  pagos: MetPago[];
}

export default async function clientes(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<MetPago[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<pagos>(
    `${CONTROLLER}?idagep_empresa=${body.idagep_empresa}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item.pagos);
}
