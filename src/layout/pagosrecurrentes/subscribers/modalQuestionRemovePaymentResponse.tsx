import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "@app/components/Buttons";
import { useRouter } from "next/router";

interface modalQuestionRemovePaymentResponseProps extends ViewProps {
  isSuccess: boolean;
}

function modalQuestionRemovePaymentResponse({
  visibleStyles,
  handleClose,
  show,
  isSuccess,
}: PageSizeModalProps<modalQuestionRemovePaymentResponseProps>) {
  const router = useRouter();

  const onClose = async () => {
    await handleClose(true);
    router.back();
  };
  return (
    <Dialog
      visible={show}
      className="shadow-none w-[95%]  md:w-4/5  xl:w-1/2 max-w-[800px] "
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={onClose}
      closable={true}
    >
      <section className="flex flex-col items-center gap-5">
        <img src={"/Images/modal/userDelete.svg"} />
        <h2 className="text-[#2E3339] text-center text-2xl">
          {isSuccess ? "¡Pago Recurrente eliminado!" : "Error al eliminar Pago Recurrente"}
        </h2>
        <p className="text-[#2E3339] text-center text-md mb-5">
          {isSuccess
            ? "El Pago Recurrente ha sido eliminado de manera exitosa."
            : "Ha ocurrido un error al intentar eliminar el pago recurrente."}
        </p>

        <Button className="button-confirm" label="Cerrar" onClick={onClose} />
      </section>
    </Dialog>
  );
}

export default withModalPageSize(modalQuestionRemovePaymentResponse);
