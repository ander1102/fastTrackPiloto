import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { ResumeGetResponse } from "@app/types/Resume";
import { Transaction } from "@app/types/Transactions";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/transacciones/cliente";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Transaction[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const { cliente } = req.query;
  const GetReponse = await Call<ResumeGetResponse>(
    CONTROLLER,
    {
      querybody: { cliente },
      headers: { authorization: authorization ?? "" },
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, [], (item) => item.transacciones);
}
