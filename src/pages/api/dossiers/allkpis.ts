import { NextApiRequest, NextApiResponse } from "next";
import { DossiersAllKpis } from "@app/types/Dossiers";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { authJSONResponse } from "@app/logic/backend/utils";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/cumplimiento/all/kpi";

export default async function allkpis(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<DossiersAllKpis>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<DossiersAllKpis>(
    CONTROLLER,
    {
      body,
      headers: { authorization: authorization ?? "" },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, []);
}
