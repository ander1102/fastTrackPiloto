import FinanceTab from "@app/layout/clientes/FinanceTab";
import { useContext } from "react";
import { ClientFormContext } from "../../context";

export default function Content() {
  const { formProps } = useContext(ClientFormContext);
  const { client, finances, handleOnChangeFinaceCheck, handleOnFinance } =
    formProps;
  return (
    <FinanceTab
      client={client}
      finances={finances}
      onChangeFinaceCheck={handleOnChangeFinaceCheck}
      onClickFinance={handleOnFinance}
    />
  );
}
