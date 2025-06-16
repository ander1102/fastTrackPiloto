import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import {
  TerminalTotal,
  TerminalTotalRecordsResponse,
} from "@app/types/Terminal";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/terminales/count";

export default async function totalRecords(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TerminalTotal>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const TotalRecords = await Call<any>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
      body,
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, TotalRecords, 0, (item) => {
    const total = item.count[0];
    return {
      total: total["total"] ?? 0,
      totalAssign: total["asignadas"] ?? 0,
      totalAssignD20: total["asignadasD20"] ?? 0,
      totalAssignD30: total["asignadasD30"] ?? 0,
      totalAssignQPSMini: total["asignadasMini"] ?? 0,
      totalAvailable: total["disponibles"] ?? 0,
      totalAvailableD20: total["disponiblesD20"] ?? 0,
      totalAvailableD30: total["disponiblesD30"] ?? 0,
      totalAvailableQPSMini: total["disponiblesMini"] ?? 0,
    };
  });
}
