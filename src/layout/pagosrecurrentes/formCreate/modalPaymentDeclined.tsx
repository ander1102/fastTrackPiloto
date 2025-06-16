import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "@app/components/Buttons";

function modalPaymentDeclined({
  visibleStyles,
  handleClose,
  show,
}: PageSizeModalProps<ViewProps<boolean>>) {
  return (
    <Dialog
      visible={show}
      className="shadow-none w-[95%]  md:w-[80%]  xl:w-[50%] max-w-[800px] "
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={true}
    >
      <section className="flex flex-col items-center gap-5">
        <img src={"/Images/modal/shopDelete.svg"} />
        <h2 className="text-[#2E3339] text-center text-2xl">
          Pago Recurrente rechazado
        </h2>
        <p className="text-[#2E3339] text-center text-md mb-5">
          El Pago Recurrente no ha sido creado.
        </p>

        <Button className="button-confirm" label="Cerrar" onClick={() => handleClose(true)} />
      </section>
    </Dialog>
  );
}

export default withModalPageSize(modalPaymentDeclined);
