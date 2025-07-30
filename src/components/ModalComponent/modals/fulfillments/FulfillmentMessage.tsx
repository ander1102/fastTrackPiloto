import Grid from "@app/components/Grid";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Deposit } from "@app/types/Deposits";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import Image from "next/image";
import { Button } from "@app/components/Buttons";
import { useRouter } from "next/router";
import { assetsConfig } from "../../../../../assets.config";

interface FulfillmentMessageProps extends ViewProps {}
function FulfillmentMessage({
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<FulfillmentMessageProps>) {
  const router = useRouter();

  return (
    <Dialog
      header=""
      visible={show}
      style={{ maxWidth: "600px" }}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      draggable={false}
      onHide={() => handleClose()}
      dismissableMask
    >
      <div className="flex flex-col items-center">
        <Image
          alt=""
          src={assetsConfig.resumen.cumplimientoImg}
          width={350}
          height={200}
        />
        <p style={{ color: "#1C1B1B", fontSize: "30px" }}>Expediente</p>
        <p
          className="mt-3"
          style={{ color: "#626262", fontSize: "20px", textAlign: "center" }}
        >
          Te invitamos a completar tu perfil en la sección de expediente.
        </p>
        <div className="mt-5">
          <Button
            label="Más tarde"
            style={{
              backgroundColor: "#83858A",
              border: "none",
              padding: "10px 50px",
              margin: "10px",
            }}
            onClick={handleClose}
          />
          <Button
            label="Completar"
            style={{
              backgroundColor: "var(--primary-color)",
              border: "none",
              padding: "10px 50px",
              margin: "10px",
            }}
            onClick={() => {
              handleClose();
              router.push("/dashboard/configuracion");
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default withModalPageSize(FulfillmentMessage);
