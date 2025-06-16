import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import { arrayBufferToBase64 } from "@app/common/format";

const CONTROLLER = "/integraciones/negocio/imagen";
// /integraciones/negocio/imagen?token="+token,

export default async function getimage(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<string>>
){
  await initCors(req, res);
  const { authorization } = req.headers;
  const UpdateReponse = await Call<ArrayBuffer>(
    CONTROLLER,
    {
      body: req.body,
      method: "POST",
      headers: { authorization: authorization ?? "" },
      setError: (response: ArrayBuffer) => response.byteLength <= 128,
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
