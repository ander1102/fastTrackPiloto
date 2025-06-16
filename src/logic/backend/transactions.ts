import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import {
  TransactionDateCall,
  TransactionDateBody,
  TransactionResumenCall,
  TransactionResumenBody,
  TransactionReferenceBody,
  TransactionReferenceCall,
  TransactionSaldoEfevoopayBody,
  TransactionSaldoEfevoopayCall,
  TransactionKpisBody,
  TransactionKpisCall,
  TransaccionExcelBody,
  TransactionExcelResponse,
  TransactionFirmaBody,
} from "@app/types/Transactions";

export const TransactionsControllers = {
  date: (body: TransactionDateBody) =>
    Call<TransactionDateCall>("/api/transactions/date", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  resumen: (body: TransactionResumenBody) =>
    Call<TransactionResumenCall>("/api/transactions/resumen", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  reference: (body: TransactionReferenceBody) =>
    Call<TransactionReferenceCall>("/api/transactions/reference", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  saldoefevoopay: (body: TransactionSaldoEfevoopayBody) =>
    Call<TransactionSaldoEfevoopayCall>("/api/transactions/saldoefevoopay", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),

  kpi: (body: TransactionKpisBody) =>
    Call<TransactionKpisCall>("/api/transactions/kpi", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  excel: (body: TransaccionExcelBody) =>
    Call<TransactionExcelResponse[]>("/api/transactions/excel", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  firma: (body: TransactionFirmaBody) =>
    Call<string>("/api/transactions/firma", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
};
//Ready
