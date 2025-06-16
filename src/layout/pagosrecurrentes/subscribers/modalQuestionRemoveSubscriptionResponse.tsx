import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "@app/components/Buttons";

interface ModalQuestionRemoveSubscriptionResponseProps extends ViewProps {
  isSuccess: boolean;
}

function ModalQuestionRemoveSubscriptionResponse({
  visibleStyles,
  handleClose,
  show,
  isSuccess,
}: PageSizeModalProps<ModalQuestionRemoveSubscriptionResponseProps>) {
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
          {isSuccess
            ? "¡La suscripción ha sido eliminado!"
            : "Error al eliminar suscripción"}
        </h2>
        <p className="text-[#2E3339] text-center text-md mb-5">
          {isSuccess
            ? "La suscripción ha sido eliminado de manera exitosa."
            : "Ha ocurrido un error al intentar eliminar la suscripción."}
        </p>

        <Button
          label="Cerrar"
          className="button-confirm"
          onClick={() => handleClose(true)}
        />
      </section>
    </Dialog>
  );
}

export default withModalPageSize(ModalQuestionRemoveSubscriptionResponse);
