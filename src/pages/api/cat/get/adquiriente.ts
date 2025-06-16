import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { GeneralApiReponse } from "@app/types";
import { Adquiriente } from "@app/types/Categories";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cliente/adquiriente";

export interface adquiriente {
  adquirientes: Adquiriente[];
}

export default async function adquiriente(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Adquiriente[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<adquiriente>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item.adquirientes);
}
