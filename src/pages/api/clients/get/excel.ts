import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  ClientCollectionGetResponseExcel,
  ClientExcelColumns
} from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/clientes/excel";

export default async function excel(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientExcelColumns[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<ClientCollectionGetResponseExcel>(
    CONTROLLER,
    {
      body: req.body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, [], (item) => item.empresas);
}
