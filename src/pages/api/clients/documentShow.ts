import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { ClientDocumentResponse } from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";


const CONTROLLER = "/cliente/documentos/show";

export default async function showDocuments(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<string>>
){
  await initCors(req, res);
  const { authorization } = req.headers;
  const UpdateReponse = await Call<ClientDocumentResponse>(
    CONTROLLER,
    {
      body: req.body,
      method: "POST",
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
