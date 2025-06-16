import { isDate } from "@app/common/format";
import { CURRENCY_FORMAT, DATE_TIME_FORMAT } from "@app/constants";
import { Transaction } from "@app/types/Transactions";

export const ResumeTransactionTotal = (item: Transaction) => (
  <>{CURRENCY_FORMAT.format(item.amount ?? 0)}</>
);