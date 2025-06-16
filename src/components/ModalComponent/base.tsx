import React, { PropsWithChildren } from "react";
import { Dialog } from "primereact/dialog";
import { ViewProps } from "../ViewManager/View/comp";

interface ModalBaseProps extends ViewProps {}

export default function ModalBase({
  onClose,
  children,
}: PropsWithChildren<ModalBaseProps>) {
  return (
    <Dialog visible onHide={() => onClose(undefined)} dismissableMask>
      {children}
    </Dialog>
  );
}
