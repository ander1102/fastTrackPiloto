import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CardCreditBody, CardCreditRequest,CardCreditResponseCredit} from "@app/types/Card";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/tarjeta/credito";
export default async function credit(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CardCreditResponseCredit>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as CardCreditBody;
  const GetReponse = await Call<CardCreditRequest>(
    CONTROLLER,
    {
      body: {
        ...body
      },
      headers: { authorization: authorization ?? "" },
      setError(response) {
        const r = response || {};
        return r.hasOwnProperty?.("code");
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );

  authJSONResponse(res, GetReponse, {},(item)=>item.response.credit);
}
