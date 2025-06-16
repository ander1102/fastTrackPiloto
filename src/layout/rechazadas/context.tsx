import { createContext, PropsWithChildren, useContext } from "react";
import useCall, { UseCallResponse } from "@app/hooks/useCall";
import { TransactionsRejectedControllers } from "@app/logic/backend/rejected";
import {
  TransactionRejectedBody,
  TransactionRejectedResponse,
} from "@app/types/Rejected";
import { User } from "@app/types/User";
import { DateFormat } from "@app/common/format";
import { UserContext } from "@app/context";

type TransactionRejectContextType = UseCallResponse<
  typeof TransactionsRejectedControllers,
  "get",
  TransactionRejectedResponse,
  [body: TransactionRejectedBody]
>;

export const TransactionRejectedContext =
  createContext<TransactionRejectContextType>(
    undefined as unknown as TransactionRejectContextType
  );

const getInitialParams = (user: User): [body: TransactionRejectedBody] => {
  const date = new Date();
  const start = DateFormat.day.start(date, true);
  const end = DateFormat.day.end(date, true);
  return [
    {
      idagep_empresa: String(user.idagep_empresa ?? 0),
      fechaIni: start.toSimpleFormatString(),
      fechaFin: end.toSimpleFormatString(),
      motivo: "",
      PageIndex: 1,
      PageSize: 10,
      producto: "",
      tarjeta: "",
    },
  ];
};

export const TransactionRejectedContextProvider = ({
  children,
}: PropsWithChildren) => {
  const { user } = useContext(UserContext);
  const data = useCall(TransactionsRejectedControllers, "get", () => ({
    initialParams: getInitialParams(user),
    persistParams: true,
  }));
  return (
    <TransactionRejectedContext.Provider value={data}>
      {children}
    </TransactionRejectedContext.Provider>
  );
};
