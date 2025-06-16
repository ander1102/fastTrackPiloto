import { Button } from "@app/components/Buttons";
import { Deposit } from "@app/types/Deposits";
import { modalManager } from "@app/components/ModalComponent";
import DepositDetailsModal from "@app/components/ModalComponent/modals/deposits/DepositDetails";
import { SVG } from "@app/components/svg";

import { DEPOSIT_CONTEXT } from "@app/pages/dashboard/depositos";

export const ButtonDetails = (item: Deposit) => {
  const showDetails = async () => {
    await modalManager.show(DepositDetailsModal, { item }, DEPOSIT_CONTEXT);
  };

  return (
    <Button
      onClick={showDetails}
      style={{ background: "transparent", color: "#60A5FA", border: "none" }}
      className="bg-transparent text-blue-400 cursor-pointer"
    >
      <SVG.ArrowRight width={20} />
    </Button>
  );
};
