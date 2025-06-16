import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse, clientJSONReponse } from "@app/logic/backend/utils";
import { HashResponse } from "@app/types/User";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/get/hash";

export default async function getHash(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<string>>
) {
  await initCors(req, res);
  const { email } = req.query;
  const HashResponse = await Call<HashResponse>(
    CONTROLLER,
    {
      querybody: { email },
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, HashResponse, [], (item) => item[0].mensaje);
}
