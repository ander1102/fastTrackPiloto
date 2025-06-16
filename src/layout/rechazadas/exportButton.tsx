import { ButtonExcel } from "@app/components/Buttons";
import { ExcelExportBody } from "@app/types/Excel";
import {
  TransactionRejected,
  TransactionRejectedExcelColumns,
} from "@app/types/Rejected";
import { createTransactionRejectedConfig } from "@app/constants/rejected";
import { useContext } from "react";
import { TransactionRejectedContext } from "./context";
import { TransactionsRejectedControllers } from "@app/logic/backend/rejected";

export default function ExcelExportButton({...props}) {
  const data = useContext(TransactionRejectedContext);

  const getItemAsync = async () => {
    const params = data.params();
    const call = await TransactionsRejectedControllers.get({
      ...(params![0] || {}),
      PageSize: String(data.item?.total),
    });
    return call.response?.data || [];
  };

  const getWorksheets = (
    transactions: TransactionRejected[]
  ): ExcelExportBody<TransactionRejectedExcelColumns> => {
    return {
      worksheets: [
        {
          name: "Transacciones",
          items: transactions.map(
            (x) =>
              ({
                ...x,
              } ?? [])
          ),
          options: createTransactionRejectedConfig(),
        },
      ],
    };
  };

  const getName = (items: TransactionRejected[]) => {
    const dateStart = items[0].fecha;
    return `Rechazadas_${new Date(dateStart)}`;
  };

  return (
    <ButtonExcel
      {...props}
      getItemAsync={getItemAsync}
      getWorksheets={getWorksheets}
      fileName={getName}
      disabled={data.isCalling || data.item?.data?.length === 0}
    />
  );
}
