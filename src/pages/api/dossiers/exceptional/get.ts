import { Call, FetchResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { FulfillmentExceptionalResponseRead } from "@app/types/Dossiers";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cumplimiento/excepcional";

export default async function read(
  req: NextApiRequest,
  res: NextApiResponse<FetchResponse<FulfillmentExceptionalResponseRead>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<FulfillmentExceptionalResponseRead>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: {
        ...req.body,
        operacion: "R",
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {});
}
