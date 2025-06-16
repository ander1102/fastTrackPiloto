import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import { CheckoutLink, PaymentGeneratorLinkBody, PaymentLinkGeneratorResponse } from "@app/types/paymentGenerator";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const CONTROLLER = "/integraciones/negocio/checkout";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<CheckoutLink>>
) {
    await initCors(req, res);
    const body = req.body as PaymentGeneratorLinkBody;
    const GetReponse = await Call<PaymentLinkGeneratorResponse>(
        CONTROLLER,
        {
        body: {
            ...body,
        },
        method: "POST",
        setError: (res) =>
            typeof res === "string" &&
            res.toLowerCase().includes("proceso rechazado"),
        },
        AGREGADOR_API_URL
    );

  authJSONResponse(res, GetReponse, {}, (item) =>item.payload);
}
