import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { clientJSONReponse, getFinalHash } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/auth/v4";

export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<string>>
) {
  await initCors(req, res);
  const { email, hash } = req.body;
  const AuthResponse = await Call(
    CONTROLLER,
    {
      body: { email, hash, usuario: "", contrasena: "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  const json = clientJSONReponse<string, string>(AuthResponse, "");

  res.json(json);
}
