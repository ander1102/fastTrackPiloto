import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { Terminal, TerminalResponse } from "@app/types/Terminal";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/terminales/sucursal";

export default async function assignAdmin(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Terminal[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const UpdateResponse = await Call<TerminalResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
      body: { ...body, operacion: "U" },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, UpdateResponse, [], (item) => item.terminales);
}
