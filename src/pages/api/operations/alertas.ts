import { NextApiRequest, NextApiResponse } from "next";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  OperationsCatAlertas,
  OperationsCatAlertasBody,
  OperationsCatAlertasResponse,
} from "@app/types/Operations";

const CONTROLLER = "/controles/catalertas";

export default async function alertas(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<OperationsCatAlertas[]>>
) {
  await initCors(req, res);
  const body = req.body as OperationsCatAlertasBody;
  const range = body.range.split(",").map(Number);
  const { authorization } = req.headers;
  const GetResponse = await Call<OperationsCatAlertasResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetResponse, [], (item) =>
    item.alertas.filter(
      (item) =>
        item.idagep_catalerta >= range[0] && item.idagep_catalerta <= range[1]
    )
  );
}
