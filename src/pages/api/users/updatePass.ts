import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/usuarios/updatepass";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CRUDResponse<any>>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const userObj = req.body;
  const UpdateReponse = await Call<CRUDResponse<any>>(
    CONTROLLER,
    {
      body: { ...userObj },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, UpdateReponse, {});
}
