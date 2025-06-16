import { isEmptyObject } from "@app/common";
import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import { CheckoutLink, PaymentCommpanyInfoBody, PaymentCommpanyInfoResponse, PaymentGeneratorLinkBody, PreCheckoutPay, PreCheckoutPayResponse } from "@app/types/paymentGenerator";
import { AGREGADOR_API_URL } from "@app/constants";

export const PaymentControllers = {
    generateLink: (body: PaymentGeneratorLinkBody) =>
      Call<CheckoutLink>("/api/paymentsGenerator", {
        body,
        method: "POST",
    }),
    getComercioInfo: (body: PaymentCommpanyInfoBody) =>
      Call<PaymentCommpanyInfoResponse>("/api/paymentsGenerator/infoComercio", {
        body,
        method: "POST",
    }),
    getComercioImage: (body:any) =>
      Call(
        "/api/paymentsGenerator/getImg",
        {
          body,
          method: "POST",
        },
    ),
    getComercioPago: (body: PreCheckoutPay) =>
      Call<PreCheckoutPayResponse>("/api/paymentsGenerator/preCheckoutPay", {
        body,
        method: "POST",
    }),
};
