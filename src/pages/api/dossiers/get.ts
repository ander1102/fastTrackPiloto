import { Call, FetchResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  FulfillmentResponse,
  ClientFulfillment
} from "@app/types/Dossiers";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cumplimiento/info/valida";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchResponse<FulfillmentResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as ClientFulfillment;
  const idagep_empresa = body.idagep_empresa;

  const getReponse = await Call<ClientFulfillment>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: {
        idagep_empresa,
        operacion: "R",
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  
  authJSONResponse(res, getReponse, {});
}
