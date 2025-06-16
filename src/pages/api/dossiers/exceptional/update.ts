import { Call, FetchResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { FulfillmentExceptionalResponseUpdate } from "@app/types/Dossiers";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cumplimiento/excepcional";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse<FetchResponse<FulfillmentExceptionalResponseUpdate>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<FulfillmentExceptionalResponseUpdate>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: {
        ...req.body,
        operacion: "U",
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {});
}
