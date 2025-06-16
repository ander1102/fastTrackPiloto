import { CardTransactionType } from "@app/types/Card";
import { ContextProps } from "@app/types/Context";
import { createContext, PropsWithChildren, useState } from "react";

export interface ICardTransactionsContext {
  operation: CardTransactionType | null;
  fechaEnt: Date | string;
  fechaFin: Date | string;
}

export const CardTransactionsContext = createContext<
  ContextProps<ICardTransactionsContext>
>(undefined as unknown as ContextProps<ICardTransactionsContext>);

const INITIAL: ICardTransactionsContext = {
  operation: null,
  fechaEnt: "",
  fechaFin: "",
};

export const CardTransactionsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [filter, setFilter] = useState(() => INITIAL);

  const onChange = <IKey extends keyof ICardTransactionsContext>(
    key: IKey,
    newValue: ICardTransactionsContext[IKey]
  ) => {
    setFilter((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  return (
    <CardTransactionsContext.Provider value={{ filter, onChange }}>
      {children}
    </CardTransactionsContext.Provider>
  );
};
