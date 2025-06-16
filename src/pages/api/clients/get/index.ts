import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  Client,
  ClientGetBody,
  ClientGetResponse,
  ClientGetResponseOperaciones,
} from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import status from "../../cards/status";

const CONTROLLER = "/cliente/crud";
const CONTROLLER_OPERACIONES = "/cliente/operaciones";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Client>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as ClientGetBody;
  let GetReponse = await Call<ClientGetResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: { ...body, operacion: "R" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );


    //GetReponse
  const responseClient = GetReponse.response.data[0];

  let GetReponseOperations = await Call<ClientGetResponseOperaciones>(
    CONTROLLER_OPERACIONES,
    {
      headers: { authorization: authorization ?? "" },
      body: {
        idagep_empresa: body.idagep_empresa,
        idagep_usuarios: body.id_login,
        operacion: "R",
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );






  //GetReponseOperations
  const responseClientOperations = GetReponseOperations.response.empresa[0];

  const responseMerge = Object.assign(
    {},
    responseClientOperations,
    responseClient
  );
  const responseStatus = GetReponse.status;

  const response = {
    ...GetReponse,
    response: {
      status: responseStatus,
      response: responseMerge,
    },
  };

  authJSONResponse(res, response, {}, (item) => item.response);
}
