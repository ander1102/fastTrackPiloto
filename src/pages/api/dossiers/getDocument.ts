import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/cumplimiento/get/documentos";

// export default async function getDocument(
//   req: NextApiRequest,
//   res: NextApiResponse<FetchClientResponse<ArrayBuffer>>
// ) {
//   await initCors(req, res);

//   const { authorization } = req.headers;
//   const { ruta } = req.body;
//   const documentResponse = await Call<ArrayBuffer>(
//     `${CONTROLLER}?ruta=${ruta}`,
//     {
//       method: "GET",
//       headers: { authorization: authorization ?? "" },
//       type: "arrayBuffer",
//     },
//     AGREGADOR_API_URL
//   );
//   // http://alphawlapitest.efevoopaylbda.com/api/apiv0/agrs/cumplimiento/get/documentos?ruta="wmx-alph-wl/test/cohetepay/documentos/8/rfc_8_OK.jpg"
//   authJSONResponse(res, documentResponse,{});
// }

export default async function getDocument(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<any>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { ruta } = req.body;
  const GetReponse = await Call<any>(
    `${CONTROLLER}?ruta=${ruta}`,
    {
      // method: "POST",
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, {});
}