import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { GeneralApiReponse } from "@app/types";
import { Tasas } from "@app/types/Categories";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cliente/tasas";

export interface tasa {
  tasas: Tasas[];
}

export default async function tasa(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Tasas[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<tasa>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, [], (item) => item.tasas);
}
