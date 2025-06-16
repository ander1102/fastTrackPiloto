import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { Users, UsersCRUDReponse } from "@app/types/UsersList";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import { CRUDResponse } from "@app/types/Form";

const CONTROLLER = "/ajustes/perfil/imagen";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
}

export default async function uploadProfileImage(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CRUDResponse<string>>>
){
  await initCors(req, res);
  const { authorization } = req.headers;
  
  const UpdateReponse = await Call<CRUDResponse<string>>(
    CONTROLLER,
    {
      body: req.body,
      method: "POST",
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, UpdateReponse, {});
}
