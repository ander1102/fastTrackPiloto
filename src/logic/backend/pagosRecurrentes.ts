import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import {
  PagosRecurrentesCheckoutReadBody,
  PagosRecurrentesCheckoutReadResponse,
  PagosRecurrentesCheckoutCreateBody,
  PagosRecurrentesCheckoutCreateResponse,
  PagosRecurrentesPaymentsAllBody,
  PagosRecurrentesPaymentsAllResponse,
  PagosRecurrentesPaymentsCreateBody,
  PagosRecurrentesPaymentsCreateResponse,
  PagosRecurrentesSubscribersCreateBody,
  PagosRecurrentesSubscribersCreateResponse,
  PagosRecurrentesSubscribersAllBody,
  PagosRecurrentesSubscribersAllResponse,
  PagosRecurrentesPaymentsDisableBody,
  PagosRecurrentesPaymentsDisableResponse,
  PagosRecurrentesSubscribersPagosResponse,
  PagosRecurrentesSubscribersPagosBody,
  PagosRecurrentesSubscribersDisableBody,
  PagosRecurrentesSubscribersDisableResponse,
  PagosRecurrentesPaymentsReadBody,
  PagosRecurrentesPaymentsReadResponsePagosRecurrentes,
  PagosRecurrentesSubscribersCancelBody,
  PagosRecurrentesSubscribersCancelResponse,
  PagosRecurrentesPaymentsTicketBody,
  PagosRecurrentesPaymentsTicketResponse,
} from "@app/types/PagosRecurrentes";

export const PagosRecurrentesController = {
  allPayments: (body: PagosRecurrentesPaymentsAllBody) =>
    Call<PagosRecurrentesPaymentsAllResponse>(
      "/api/pagosrecurrentes/pagos/all",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  createPayments: (body: PagosRecurrentesPaymentsCreateBody) =>
    Call<PagosRecurrentesPaymentsCreateResponse>(
      "/api/pagosrecurrentes/pagos/create",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  readPayments: (body: PagosRecurrentesPaymentsReadBody) =>
    Call<PagosRecurrentesPaymentsReadResponsePagosRecurrentes>(
      "/api/pagosrecurrentes/pagos/read",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  ticketPayments: (body: PagosRecurrentesPaymentsTicketBody) =>
    Call<PagosRecurrentesPaymentsTicketResponse>(
      "/api/pagosrecurrentes/pagos/ticket",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  disablePayments: (body: PagosRecurrentesPaymentsDisableBody) =>
    Call<PagosRecurrentesPaymentsDisableResponse>(
      "/api/pagosrecurrentes/pagos/disable",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),

  createSubscribers: (body: PagosRecurrentesSubscribersCreateBody) =>
    Call<PagosRecurrentesSubscribersCreateResponse>(
      "/api/pagosrecurrentes/suscriptores/create",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  disableSubscribers: (body: PagosRecurrentesSubscribersDisableBody) =>
    Call<PagosRecurrentesSubscribersDisableResponse>(
      "/api/pagosrecurrentes/suscriptores/disable",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  cancelSubscribers: (body: PagosRecurrentesSubscribersCancelBody) =>
    Call<PagosRecurrentesSubscribersCancelResponse>(
      "/api/pagosrecurrentes/suscriptores/cancel",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  allSubscribers: (body: PagosRecurrentesSubscribersAllBody) =>
    Call<PagosRecurrentesSubscribersAllResponse>(
      "/api/pagosrecurrentes/suscriptores/all",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  pagosSubscribers: (body: PagosRecurrentesSubscribersPagosBody) =>
    Call<PagosRecurrentesSubscribersPagosResponse>(
      "/api/pagosrecurrentes/suscriptores/pagos",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  readCheckout: (body: PagosRecurrentesCheckoutReadBody) =>
    Call<PagosRecurrentesCheckoutReadResponse>(
      "/api/pagosrecurrentes/checkout",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
  createCheckout: (body: PagosRecurrentesCheckoutCreateBody) =>
    Call<PagosRecurrentesCheckoutCreateResponse>(
      "/api/pagosrecurrentes/checkout/create",
      {
        headers: getTokenBearer(),
        method: "POST",
        body,
      }
    ),
};
