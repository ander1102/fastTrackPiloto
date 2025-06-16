import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { SVG } from "@app/components/svg";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";

import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "primereact/button";

function DeleteUserSuccessModal({
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<ViewProps<boolean>>) {
  return (
    <Dialog
      visible={show}
      className="shadow-none md:w-2/5 w-11/12"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      dismissableMask
    >
      <section className="flex flex-col items-center">
        <h2 className="text-black-200 text-center text-2xl mb-3" style={{fontSize: '27px', marginBottom: 25}}>
          Usuario eliminado
        </h2>
        <span className="text-center px-12" style={{color: '#6A6D74'}}>
          El usuario ha sido eliminado de manera exitosa.
        </span>
        <div style={{marginTop: 40}}>
          <Button onClick={() => handleClose(false)} className={styles.backIndexBtn}>Regresar</Button>
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(DeleteUserSuccessModal);
