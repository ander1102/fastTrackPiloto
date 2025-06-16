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
    `/ctes/amex/solicitud`,
    {
      method: "POST",
      body: req.body,
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, UpdateReponse,{});
}