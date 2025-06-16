import { ButtonDetails } from "@app/components/Buttons";
import { Deposit } from "@app/types/Deposits";
import { modalManager } from "@app/components/ModalComponent";
import DepositDetailsModal from "@app/components/ModalComponent/modals/deposits/DepositDetails";

import { DEPOSIT_CONTEXT } from "@app/pages/dashboard/depositos";

export const ShowDetailsButton = (item: Deposit) => {
  const showDetails = async () => {
    await modalManager.show(DepositDetailsModal, { item }, DEPOSIT_CONTEXT);
  };

  return <ButtonDetails onClick={showDetails} />;
};
