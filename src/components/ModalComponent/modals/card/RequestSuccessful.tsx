import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";

import styles from "@app/components/ModalComponent/modal.module.css";

function RequestSuccessfulCardModal({
  visibleStyles,
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
      closable={false}
    >
      <section className="flex flex-col items-center">
        <img
          alt="request"
          src="/Images/cards/success.svg"
          className="w-52 h-45"
        />
        <h2 className="text-dark-gray-100 text-center text-[26px] mb-3">
          ¡Felicidades!
        </h2>
        <span className="text-center text-light-gray-200 px-12">
          Tu solicitud fue recibida con éxito.
        </span>
        <span className="text-center text-light-blue-300 my-5 px-12">
          ¡Gracias por confiar en Efevoo pay!
        </span>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(RequestSuccessfulCardModal);
