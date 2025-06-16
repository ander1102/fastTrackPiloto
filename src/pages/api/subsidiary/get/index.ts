import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { GeneralApiReponse } from "@app/types";
import { Subsidiary, SubsidiaryGetResponse } from "@app/types/Subsidiary";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/sucursales/crud";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Subsidiary[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<GeneralApiReponse<SubsidiaryGetResponse>>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      setError: (res) =>
        (res.mensaje?.code && res.mensaje.code === "1001") ||
        (res.data &&
          Array.isArray(res.data) &&
          !res.data[0].mensaje?.sucursales),
      method: "POST",
      body: { ...body, operacion: "R" },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(
    res,
    GetReponse,
    [],
    (item) => item.data[0].mensaje.sucursales
  );
}
