import { ButtonDetails } from "@app/components/Buttons";
import { modalManager } from "@app/components/ModalComponent";
import TransactionDetailsModal from "@app/components/ModalComponent/modals/transactions/TransactionDetails";
import { TRANSACTION_CONTEXT } from "@app/pages/dashboard/transacciones";
import { CONTEXT } from "@app/pages/dashboard/resumen";
import { Transaction } from "@app/types/Transactions";
import { User } from "@app/types/User";
import { Client } from "@app/types/Clients";
import { ClientsControllers } from "@app/logic/backend/clients";
import { useState } from "react";
interface ButtonDetailsProps {
  item: Transaction;
  transactions: Transaction[];
  user: User;
  client?: Client;
  isResume?: boolean;
  onRefresh: () => void;
  disabled?: boolean;
  onLoading?: (isLoading:Boolean) => void;
  canReverse?:boolean
}

export const ShowDetailsButton = ({
  item,
  transactions,
  user,
  client,
  isResume = false,
  onRefresh,
  disabled = false,
  onLoading,
}: ButtonDetailsProps) => {
  const showDetails = async () => {
    const infoOperacionesReverse = client?.infoOperaciones?.reverso;
    await modalManager.show(
      TransactionDetailsModal,
      {
        item:
          item.Transaccion === "COMISIÓN"
            ? transactions.find(
                (ele) => ele.ID === item.ID && ele.Transaccion === "PAGO"
              ) ?? item
            : item,
        user,
        permitReverse: infoOperacionesReverse == "si",
        onRefresh: onRefresh,
      },
      isResume ? CONTEXT : TRANSACTION_CONTEXT
    );
  };

  return <ButtonDetails disabled={disabled} onClick={showDetails}  />;
};
