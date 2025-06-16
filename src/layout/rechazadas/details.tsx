import { ButtonDetails } from "@app/components/Buttons";
import { modalManager } from "@app/components/ModalComponent";
import TransactionRejectedDetailsModal from "@app/components/ModalComponent/modals/transactions/TransactionRejectedDetails";
import { CONTEXT } from "@app/pages/dashboard/rechazadas";
import { TransactionRejected } from "@app/types/Rejected";

interface ButtonDetailsProps {
  item: TransactionRejected;
}

export const ShowDetailsButton = ({ item }: ButtonDetailsProps) => {
  const showDetails = async () => {
    modalManager
      .show(
        TransactionRejectedDetailsModal,
        {
          item,
        },
        CONTEXT
      )
      .then();
  };

  return <ButtonDetails onClick={showDetails} />;
};
