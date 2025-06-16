import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { GeneralApiReponse } from "@app/types";
import { CRUDResponse } from "@app/types/Form";
import { SubsidiaryTotalRecordsResponse } from "@app/types/Subsidiary";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/sucursales/count";

export default async function totalRecords(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<number>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const queries = req.query;
  const TotalRecords = await Call<
    GeneralApiReponse<SubsidiaryTotalRecordsResponse>
  >(
    CONTROLLER,
    {
      body: queries,
      headers: { authorization: authorization ?? "" },
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(
    res,
    TotalRecords,
    0,
    (item) => item.data?.["Total de sucursales"]
  );
}
