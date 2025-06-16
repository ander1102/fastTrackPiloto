import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { Terminal } from "@app/types/Terminal";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/terminales/sl";

export default async function getById(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Terminal | null>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<Terminal>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      setError: (res) => res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
      body,
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, null);
}
