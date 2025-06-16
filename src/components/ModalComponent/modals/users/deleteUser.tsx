import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { SVG } from "@app/components/svg";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";

import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "primereact/button";

function DeleteUserConfirmModal({
  visibleStyles,
  onClose,
  handleClose,
  show,
}: PageSizeModalProps<ViewProps<boolean>>) {
  return (
    <Dialog
      visible={show}
      className="shadow-none md:w-2/5 w-11/12"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
    >
      <section className="flex flex-col items-center">
        <SVG.DeleteUser className="mb-2" />
        <h2 className="text-light-blue-200 text-center text-3xl mb-3">
          ¿Estás seguro?
        </h2>
        <span className="text-center">
          ¿Estás seguro de eliminar este usuario? <br /> Al realizar esta acción
          se eliminarán <br /> todos los datos asociados a este usuario. <br />
          Esta acción es permanente.
        </span>
        <div className="mt-7 flex flex-col gap-3">
          <Button
            className={styles.modalDangerButton}
            onClick={() => onClose(true)}
          >
            Eliminar usuario
          </Button>
          <Button
            className={`${styles.modalOutlineButton} justify-center`}
            onClick={() => handleClose(false)}
          >
            Cancelar
          </Button>
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(DeleteUserConfirmModal);
