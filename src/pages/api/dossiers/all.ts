import { NextApiRequest, NextApiResponse } from "next";
import { DossiersAllResponse, DossiersFilters } from "@app/types/Dossiers";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/cumplimiento/all";

export default async function all(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<DossiersAllResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as DossiersFilters;
  const GetReponse = await Call<DossiersAllResponse>(
    CONTROLLER,
    {
      body,
      headers: { authorization: authorization ?? "" },
      setError(response) {
        const r = response || {};
        return r.hasOwnProperty?.("code");
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {});
}