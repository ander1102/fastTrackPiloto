import { NextApiRequest, NextApiResponse } from "next";
import { TransactionFirmaResponse } from "@app/types/Transactions";
import { authJSONResponse } from "@app/logic/backend/utils";
import { Call, FetchClientResponse } from "@app/common/fetch";
import { initCors } from "@app/utils/api";
import { AGREGADOR_API_URL } from "@app/constants";

const CONTROLLER = "/transacciones/firma";

export default async function firma(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<string>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<TransactionFirmaResponse>(
    `${CONTROLLER}?arqc=${req.body.ARQC}`,
    {
      headers: { authorization: authorization ?? "" },
      method: "GET",
      setError: (res) => res.mensaje?.code && res.mensaje.code === "1001",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item.firmaBase64);
}
