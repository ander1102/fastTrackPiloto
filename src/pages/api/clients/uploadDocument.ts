import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { ClientDocumentResponse } from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cliente/documentos";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
}
export default async function uploadDocument(
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
