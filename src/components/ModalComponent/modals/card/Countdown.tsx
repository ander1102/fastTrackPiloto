import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";

interface CountdownModalProps extends ViewProps<boolean> {
  value: string;
}

function CountdownModal({
  value,
  visibleStyles,
  handleClose,
  show,
}: PageSizeModalProps<CountdownModalProps>) {
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
          src="/Images/cards/request.png"
          className="w-56 h-48 m-3"
        />
        <h2 className="text-black-1 text-center text-3xl mb-2">
          Falta poco para tener tu tarjeta
        </h2>
        <span className="text-center text-md text-grey-1 px-12 mb-5">
          El tiempo avanza cada día que realices transacciones.
        </span>

        <span className="text-center text-md text-secondary mb-3">
          Días restantes
        </span>

        <div className="text-center text-3xl bg-secondary text-white rounded-xl px-10 py-3 mb-5 ">
          {value}
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(CountdownModal);
