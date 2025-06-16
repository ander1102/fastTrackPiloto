import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { SVG } from "@app/components/svg";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";

import styles from "@app/components/ModalComponent/modal.module.css";

function DepositNotificationModal({
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<ViewProps>) {
  return (
    <Dialog
      visible={show}
      style={{ width: "40%", boxShadow: "none" }}
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose()}
      dismissableMask
    >
      <section className="flex flex-col items-center">
        <SVG.PopUp className="mb-2" />
        <h2 className="text-light-blue-200 text-center text-3xl mb-3">
          Se ha recibido tu información bancaria
        </h2>
        <span className="text-center px-12">
          En breve será validada y te comunicaremos vía correo electrónico en
          cuanto se realice el cambio.
        </span>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(DepositNotificationModal);
