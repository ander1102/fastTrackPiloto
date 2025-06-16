import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CRUDResponse } from "@app/types/Form";
import { DepositsGetResponse, Deposit } from "@app/types/Deposits";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/liquidaciones/get";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<Deposit[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body;

  const GetReponse = await Call<DepositsGetResponse>(
    CONTROLLER,
    {
      method: "POST",
      body,
      headers: { authorization: authorization ?? "" },
      setError: (res: CRUDResponse<any>) =>
        res.mensaje?.code && res.mensaje.code === "1001",
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, []);
}