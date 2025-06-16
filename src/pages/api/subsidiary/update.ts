import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { SubsidiaryPostResponse } from "@app/types/Subsidiary";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/sucursales/crud";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<SubsidiaryPostResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const UpdateResponse = await Call<SubsidiaryPostResponse>(
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

  authJSONResponse(res, UpdateResponse, []);
}
