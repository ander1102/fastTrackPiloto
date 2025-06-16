import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
    TransactionRejectedResponse,
  } from "@app/types/Rejected";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/transacciones/rechazadas";
export default async function rejected(
   req: NextApiRequest,
   res: NextApiResponse<FetchClientResponse<TransactionRejectedResponse>>
 ){
   await initCors(req, res);
   const { authorization } = req.headers;
   const UpdateReponse = await Call<TransactionRejectedResponse>(
     CONTROLLER,
     {
       body: req.body,
       method: "POST",
       headers: { authorization: authorization ?? "" },
     },
     AGREGADOR_API_URL
   );
   authJSONResponse(res, UpdateReponse, {});
 }