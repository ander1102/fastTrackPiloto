import { Call } from "@app/common/fetch";
import {
  CardRequestBody,
  CardRequestRequest,
  CardStatusBody,
  CardStatusRequest,
  CardCountdownBody,
  CardCountdownRequest,
  CardBlockBody,
  CardBlockRequest,
  CardCreditBody,
  CardCreditRequest,
  CardInfoBody,
  CardInfoRequest,
  CardInfoCardBody,
  CardInfoCardRequest,
  CardTransactionsBody,
  CardTransactionsRequest,
  CardCVVBody,
  CardCVVRequest,
  CardInfoRequestResponse,
  CardInfoCardRequestResponseCard,
  CardNIPBody,
  CardNIPRequest,
  CardDepositsBody,
  CardDepositsRequestResponse,
  CardPayBody,
  CardPayRequestResponse
} from "@app/types/Card";
import { getTokenBearer } from "./middlewares";

export const CardsController = {
  request: (body: CardRequestBody) =>
    Call<CardRequestRequest>("/api/cards/request", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  status: (body: CardStatusBody) =>
    Call<CardStatusRequest>("/api/cards/status", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),



    
  countdown: (body: CardCountdownBody) =>
    Call<CardCountdownRequest>("/api/cards/countdown", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  block: (body: CardBlockBody) =>
    Call<CardBlockRequest>("/api/cards/block", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  credit: (body: CardCreditBody) =>
    Call<CardCreditRequest>("/api/cards/credit", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  info: (body: CardInfoBody) =>
    Call<CardInfoRequestResponse>("/api/cards/info", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  infocard: (body: CardInfoCardBody) =>
    Call<CardInfoCardRequestResponseCard>("/api/cards/infocard", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  transactions: (body: CardTransactionsBody) =>
    Call<CardTransactionsRequest>("/api/cards/transactions", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  deposits: (body: CardDepositsBody) =>
    Call<CardDepositsRequestResponse>("/api/cards/deposits", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  pay: (body: CardPayBody) =>
    Call<CardPayRequestResponse>("/api/cards/pay", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  cvv: (body: CardCVVBody) =>
    Call<CardCVVRequest>("/api/cards/cvv", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
  nip: (body: CardNIPBody) =>
    Call<CardNIPRequest>("/api/cards/nip", {
      body,
      method: "POST",
      headers: getTokenBearer(),
    }),
};
