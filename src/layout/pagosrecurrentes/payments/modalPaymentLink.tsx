import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "@app/components/Buttons";
import { modalManager } from "@app/components/ModalComponent";
import modalPaymentShare from "./modalPaymentShare";
import {
  PagosRecurrentesPaymentsAllResponsePagosRecurrentes,
} from "@app/types/PagosRecurrentes";
interface modalPaymentLinkProps extends ViewProps {
  item: PagosRecurrentesPaymentsAllResponsePagosRecurrentes
}

function modalPaymentLink({
  visibleStyles,
  handleClose,
  show,
  item,
}: PageSizeModalProps<modalPaymentLinkProps>) {
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
        <img src={"/Images/modal/userDelete.svg"} />
        <h2 className="text-[#2E3339] text-center text-2xl">
          ¿Desea compartir el link de Pago Recurrente?
        </h2>
        <p className="text-[#2E3339] text-center text-md mb-5">
          Al realizar esta acción se creará un link de Pago Recurrente <br />
          asociado al Plan de Pago seleccionado.
        </p>

        <div className="flex gap-10">
          <Button
            className="button-secondary !w-48"
            label="Regresar"
            onClick={() => handleClose(true)}
          />

          <Button
            className="button-save !rounded-xl"
            label="Crear"
            onClick={() => {
              handleClose(false);
              modalManager.show(modalPaymentShare,{item});
            }}
          />
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(modalPaymentLink);
