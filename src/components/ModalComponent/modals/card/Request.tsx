import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { ButtonLoader } from "@app/components/Buttons";

interface RequestCardModalProps extends ViewProps<boolean> {
  openRequestBusinessCardModal: () => void;
}

function RequestCardModal({
  openRequestBusinessCardModal,
  visibleStyles,
  onClose,
  handleClose,
  show,
}: PageSizeModalProps<RequestCardModalProps>) {
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
          className="w-52 h-45"
        />
        <h2 className="text-dark-gray-100 text-[26px] text-center mb-3">
          Solicita tu tarjeta de <br /> crédito empresarial
        </h2>
        <span className="text-center text-light-gray-200 px-12">
          ¡Estás muy cerca de disfrutar de todos
          <br /> los beneficios de tu cuenta!
        </span>
        <div className="mt-7 flex flex-col gap-3">
          <ButtonLoader
            className="button-primary-large"
            onClick={() => {
              handleClose(false);
              openRequestBusinessCardModal()
            }}
            label="Solicitar tarjeta"
          />
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(RequestCardModal);
