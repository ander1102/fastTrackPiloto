import { isEmptyObject } from "@app/common";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { ReportGetBody, ReportResumeGraphicsInfo } from "@app/types/Reports";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/reportes/graficas";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ReportResumeGraphicsInfo>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as ReportGetBody;
  const GetReponse = await Call<ReportResumeGraphicsInfo>(
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

  authJSONResponse(res, GetReponse, []);
}
