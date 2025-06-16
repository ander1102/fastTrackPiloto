import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { ClientCollectionGetResponse } from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientCollectionGetResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;
  const GetReponse = await Call<any>(
    `/ctes/amex/solicitud/get?idagep_empresa=${body}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
    },
    AGREGADOR_API_URL
  );
  console.log(GetReponse)
  authJSONResponse(res, GetReponse, []);
}