import { NextApiRequest, NextApiResponse } from "next";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { UpdateParametersResult } from "@app/types/Operations";

const CONTROLLER = "/controles/parametros";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<string>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetResponse = await Call<UpdateParametersResult>(
    CONTROLLER,
    {
      body: { ...req.body, operacion: "U" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetResponse, {}, (item) => item.parametros[0].mensaje);
}
