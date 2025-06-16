import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { Terminal, TerminalResponse } from "@app/types/Terminal";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/terminales/crud";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Terminal[]>>
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
      body: { ...body, operacion: "C" },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, AddResponse, [], (item) => item.terminales);
}
