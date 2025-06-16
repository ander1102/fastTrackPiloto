import { NextApiRequest, NextApiResponse } from "next";
import {
  IntegrationLink,
  IntegrationLinkPagoResponse,
} from "@app/types/Integrations";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/integraciones/checkout";

export default async function pago(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<IntegrationLink>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<IntegrationLinkPagoResponse>(
    CONTROLLER,
    {
      body: {
        ...body,
        operacion: "C",
      },
      headers: { authorization: authorization ?? "" },
      setError(response) {
        const r = response || {};
        return (
          r.hasOwnProperty("code") ||
          (r?.status?.code && r?.status?.code !== "0")
        );
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {}, (item) => item.payload);
}
