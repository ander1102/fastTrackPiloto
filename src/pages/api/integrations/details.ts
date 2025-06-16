import { NextApiRequest, NextApiResponse } from "next";
import {
  IntegrationLinkDetailsBody,
  IntegrationLinkDetailsResponse,
} from "@app/types/Integrations";
import { authJSONResponse } from "@app/logic/backend/utils";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/integraciones/all/info";

export default async function details(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<IntegrationLinkDetailsResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as IntegrationLinkDetailsBody;

  const GetReponse = await Call<IntegrationLinkDetailsResponse>(
    `${CONTROLLER}?idagep_integraciones_link_pago=${body.idagep_integraciones_link_pago}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {});
}
