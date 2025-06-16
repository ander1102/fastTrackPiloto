import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse, getFinalLoginHash } from "@app/logic/backend/utils";
import { User } from "@app/types/User";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/auth/login";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<User>>
) {
  await initCors(req, res);
  const { hash, email } = req.body;
  const LoginResponse = await Call<User>(
    CONTROLLER,
    {
      body: { hash: getFinalLoginHash(hash), usuario: "", contrasena: "", email },
      method: "POST",
      setError: (res) =>
        typeof res === "string" &&
        res.toLowerCase().includes("proceso rechazado"),
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, LoginResponse, "");
}
