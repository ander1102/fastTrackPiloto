import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { UsersListResponse, Users, UserGetBody } from "@app/types/UsersList";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/usuarios/info";

export default async function getAll(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Users[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as UserGetBody;
  const GetReponse = await Call<UsersListResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: {...body, operacion: "U"},
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, [], (item) => item?.usuarios ?? []);
}
