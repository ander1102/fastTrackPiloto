import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { Users, UsersCRUDReponse } from "@app/types/UsersList";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/usuarios";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<UsersCRUDReponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const userObj = req.body as Users;
  const UpdateReponse = await Call<UsersCRUDReponse>(
    CONTROLLER,
    {
      body: { ...userObj, operacion: "U" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, UpdateReponse, {});
}
