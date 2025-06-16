import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CheckoutLink, CommpanyInfo, PaymentCommpanyInfoBody, PaymentCommpanyInfoResponse } from "@app/types/paymentGenerator";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/integraciones/negocio/mensaje/checkout";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CommpanyInfo>>
) {
    await initCors(req, res);
    const { authorization } = req.headers;
    const body = req.body as PaymentCommpanyInfoBody;
    const GetReponse = await Call<PaymentCommpanyInfoResponse>(
        CONTROLLER,
        {
        body,
        method: "POST",
        headers: { authorization: authorization ?? "" },
        setError: (res) =>
            typeof res === "string" &&
            res.toLowerCase().includes("proceso rechazado"),
        },
        AGREGADOR_API_URL
    );

  authJSONResponse(res, GetReponse, {});
}
