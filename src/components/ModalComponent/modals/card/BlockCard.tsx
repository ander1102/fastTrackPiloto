import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { ButtonLoader } from "@app/components/Buttons";

interface BlockCardModalProps extends ViewProps<boolean> {
  handleBlock: () => void;
  status: boolean;
  isCardDigital:boolean
}

function BlockCardModal({
  handleBlock,
  status,
  isCardDigital,
  visibleStyles,
  handleClose,
  show,
}: PageSizeModalProps<BlockCardModalProps>) {
  return (
    <Dialog
      visible={show}
      className="shadow-none sm:w-full md:w-1/2"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={false}
    >
      <section className="flex flex-col items-center">
        <div>
          <p className="text-2xl text-black-1 mb-3 text-center">
            ¿Quieres {status ? "desbloquear" : "bloquear"} tu Tarjeta {isCardDigital?"Digital":"Fisica"}?
          </p>
          <p className="text-lg text-grey-1 text-center mb-3 ">
            Al {status ? "desbloquear" : "bloquear"} tu tarjeta
            {status ? "" : " no"} podrás hacer retiros o <br /> comprar con tu
            tarjeta digital.
          </p>
          <p className="text-lg text-grey-1 text-center">
            Esta acción no genera nigún costo.
          </p>
        </div>
        <div className="flex justify-center mt-3">
          <ButtonLoader
            className="button-back-large"
            label="Cancelar"
            style={{ margin: "10px" }}
            onClick={async () => {
              await handleClose(false);
            }}
          />
          <ButtonLoader
            className="button-primary-large"
            label="Aceptar"
            style={{ margin: "10px" }}
            onClick={async () => {
              await handleBlock();
              await handleClose(false);
            }}
          />
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(BlockCardModal);
