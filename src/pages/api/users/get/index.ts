import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { UserCRUD, UsersCRUDReponse } from "@app/types/UsersList";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/usuarios";

export default async function getByEmail(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<UserCRUD>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { email } = req.body;
  const GetReponse = await Call<UsersCRUDReponse>(
    CONTROLLER,
    {
      body: { email, operacion: "R" },
      headers: { authorization: authorization ?? "" },
      method: "POST",
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {}, (item) => item.mensaje);
}
