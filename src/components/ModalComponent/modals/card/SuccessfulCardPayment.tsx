import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";

import styles from "@app/components/ModalComponent/modal.module.css";
import { ButtonPrimary } from "@app/components/Buttons";

function SuccessfulCardPaymentModal({
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
      dismissableMask
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={true}
    >
      <section className="flex flex-col items-center">
        <img
          alt="request"
          src="/Images/cards/success.svg"
          className="w-56 h-48"
        />
        <h2 className="text-dark-gray-100 text-center text-[26px] mb-5 mt-3">
          Pago a tarjeta exitoso
        </h2>
        <span className="text-center text-[18px] text-light-gray-200 px-12 mb-5">
        Tu pago a tarjeta ha sido completado con éxito
        </span>
        <ButtonPrimary
            className="button-primary-large"
            label="Aceptar"
            onClick={() => handleClose(false)}
          />
      </section>
    </Dialog>
  );
}

export default withModalPageSize(SuccessfulCardPaymentModal);
