import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  ComissionReportData,
  ComissionReportDataResponse,
  ReportComissionBody,
} from "@app/types/Reports";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/reportes/empresas";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ComissionReportData[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as ReportComissionBody;
  const GetReponse = await Call<ComissionReportDataResponse>(
    CONTROLLER,
    {
      body,
      headers: { authorization: authorization ?? "" },
      setError(response) {
        const r = response || {};
        return r.hasOwnProperty?.("mensaje") || r.hasOwnProperty?.("code");
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item.usuarios);
}
