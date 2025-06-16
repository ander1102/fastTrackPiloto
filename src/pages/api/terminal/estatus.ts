import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { Terminal, TerminalResponse } from "@app/types/Terminal";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/terminales/estatus/tpv";

export default async function estatus(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<any>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const AddResponse = await Call<TerminalResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
      body: { ...body },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, AddResponse, []);
}
