import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { GeneralApiReponse } from "@app/types";
import { TerminalType, TerminalTypeResponse } from "@app/types/Terminal";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/terminales/tipo";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<TerminalType[]>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const GetReponse = await Call<GeneralApiReponse<TerminalTypeResponse>>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
    },
    AGREGADOR_API_URL
  );
  authJSONResponse(res, GetReponse, [], (item:any) => item.tipos);
}
