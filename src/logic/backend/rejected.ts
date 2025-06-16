import { Call } from "@app/common/fetch";
// import { AGREGADOR_API_URL } from "@app/constants";
import {
  TransactionRejectedBody,
  TransactionRejectedResponse,
} from "@app/types/Rejected";
import { getTokenBearer } from "./middlewares";

//"/transacciones/rechazadas",
export const TransactionsRejectedControllers = {
  get: (body: TransactionRejectedBody) =>
    Call<TransactionRejectedResponse>(
      "/api/transactions/rejected",
      {
        method: "POST",
        body,
        headers: getTokenBearer(),
      }
    ),
};