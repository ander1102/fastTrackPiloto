import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { getKpiReserveFundResponse } from "@app/types/reserveFund";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getKpiReserveFund(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<any>>
){
  await initCors(req, res);
  const { authorization } = req.headers;
  const UpdateReponse = await Call(
    `/cliente/kpi/fondo/reserva?idagep_empresa=${req.body.idagep_empresa ?? 0}`,
    {
      method: "GET",
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );
  let response = {
    isSuccess: true,
    response: UpdateReponse.response,
    error: false,
    status: UpdateReponse.status,
    expire: UpdateReponse.expire,
  } as unknown as FetchClientResponse<string>
  authJSONResponse(res, response,{});
}
