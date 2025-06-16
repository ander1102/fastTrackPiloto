import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  Client,
  ClientAddResponse,
  ClientCRUDResponse,
} from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cliente/crud";
const CONTROLLER_OPERACIONES = "/cliente/operaciones";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientCRUDResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as Client;

  const UpdateReponse = await Call<ClientAddResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: { ...body, operacion: "U" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
   await Call<ClientAddResponse>(
    CONTROLLER_OPERACIONES,
    {
      headers: { authorization: authorization ?? "" },
      body: { ...body, operacion: "U" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );


  authJSONResponse(res, UpdateReponse, {}, (item) => ({
    status: item.status,
    mensaje: item.data[0]?.mensaje?.mensaje,
    idagep_empresa: item.data[0]?.mensaje?.idagep_empresa
  }));
}
