import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "@app/components/Buttons";

interface ModalQuestionRemoveSubscriptionProps extends ViewProps {
  onRemoveSubscription: () => void;
}

function ModalQuestionRemoveSubscription({
  visibleStyles,
  handleClose,
  show,
  onRemoveSubscription,
}: PageSizeModalProps<ModalQuestionRemoveSubscriptionProps>) {
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
          ¿Desea eliminar la suscripción?
        </h2>
        <p className="text-[#2E3339] text-center text-md mb-5">
          Al realizar esta acción se eliminarán todos los datos <br /> asociados
          al tarjetahabiente. Esta acción es permanente.
        </p>

        <div className="flex gap-10">
          <Button
            className="button-secondary"
            label="Regresar"
            onClick={() => handleClose(true)}
          />

          <Button
            className="button-delete"
            label="Eliminar"
            onClick={() => {
              onRemoveSubscription();
              handleClose(false);
            }}
          />
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(ModalQuestionRemoveSubscription);
