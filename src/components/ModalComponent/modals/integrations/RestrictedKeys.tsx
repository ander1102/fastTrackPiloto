import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import Image from "next/image";

import styles from "@app/components/ModalComponent/modal.module.css";
import { Button } from "primereact/button";

interface ResitrictedKeysModalProps extends ViewProps {}

function ResitrictedKeysModal({
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<ResitrictedKeysModalProps>) {
  return (
    <Dialog
      visible={show}
      style={{ width: "50vw" }}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      draggable={false}
      onHide={() => handleClose()}
      dismissableMask
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/Images/svg/ecommerce.svg"
          height={275}
          width={275}
          alt=""
        />
        <h3 className="text-[#1C1B1B] text-[30px] text-center mt-5">
          Ligas de pago
        </h3>
        <p className="text-[#626262] text-[20px] text-center mt-3 mb-9">
          Por el momento no tienes acceso a<br />
          esta opción, contacta a tu asesor para
          <br />
          crear tus Ligas de pago.
        </p>
        <Button
          className="w-[185px] text-sm flex justify-center"
          style={{
            backgroundColor: "#5840D1",
            paddingTop: 13,
            paddingBottom: 13,
            paddingRight: 65,
            paddingLeft: 65,
            borderRadius: 7,
          }}
          onClick={handleClose}
        >
          Aceptar
        </Button>
      </div>
    </Dialog>
  );
}

export default withModalPageSize(ResitrictedKeysModal);
