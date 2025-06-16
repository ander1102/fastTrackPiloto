import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import QRCode from "react-qr-code";
import { PagosRecurrentesPaymentsAllResponsePagosRecurrentes } from "@app/types/PagosRecurrentes";
import { toast } from "react-toastify";
import { WhatsappShareButton, EmailShareButton } from "react-share";
import Image from "next/image";
import { useQRDownload } from "@app/components/QRDownload";

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Enlace copiado en portapapeles");
    })
    .catch((error) => {
      toast.error("Error al copiar en portapapeles");
    });
};

interface modalPaymentShareProps extends ViewProps {
  item: PagosRecurrentesPaymentsAllResponsePagosRecurrentes;
}

function modalPaymentShare({
  visibleStyles,
  handleClose,
  show,
  item,
}: PageSizeModalProps<modalPaymentShareProps>) {
  const { handleQRDownload, handleCopyQR, canvasDownloadRef, canvasQRRef } =
    useQRDownload();

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
      <section className="flex flex-col items-center gap-3">
        <img src={"/Images/modal/link.svg"} />
        <canvas ref={canvasDownloadRef} className="hidden" />
        <h2 className="text-[#2E3339] text-center text-2xl">
          ¡Link creado con éxito!
        </h2>
        <h2 className="text-primary text-center text-bold text-xl">
          Pago Recurrente <span>"{item.pagoNombre}"</span>
        </h2>

        <QRCode
          ref={canvasQRRef}
          size={256}
          style={{
            height: "180px",
            width: "180px",
          }}
          value={item.token}
          viewBox={`0 0 256 256`}
        />

        <div
          className=" flex bg-[#EFEDF9] justify-center items-center gap-3 h-10 w-60 my-5 cursor-pointer hover:opacity-70"
          onClick={() => copyToClipboard(item.token)}
        >
          <span className="text-primary">Copiar enlace</span>

          <img
            src={"/Images/integrations/payment_link_2.svg"}
            alt="Negocio"
            width={"20px"}
          />
        </div>

        <div className="flex my-5 flex-wrap justify-center gap-6">
          <div
            className="flex flex-col justify-center items-center gap-3 cursor-pointer hover:opacity-70"
            onClick={handleCopyQR}
          >
            <Image
              alt=""
              src={"/Images/pagosRecurrentes/copiar.svg"}
              width={25}
              height={25}
            />
            <span className="text-primary">Copiar QR</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 cursor-pointer hover:opacity-70">
            <Image
              alt=""
              src={"/Images/pagosRecurrentes/descargar.svg"}
              width={25}
              height={25}
              onClick={() => handleQRDownload()}
            />
            <span className="text-primary">Descargar</span>
          </div>

          <WhatsappShareButton
            url={item.token}
            className="flex flex-col justify-center items-center gap-3 cursor-pointer hover:opacity-70"
          >
            <Image
              alt=""
              src={"/Images/pagosRecurrentes/whatsapp.svg"}
              width={25}
              height={25}
            />
            <span className="text-primary">Whatsapp</span>
          </WhatsappShareButton>
          <EmailShareButton
            url={item.token}
            className="flex flex-col justify-center items-center gap-3 cursor-pointer hover:opacity-70"
          >
            <Image
              alt=""
              src={"/Images/pagosRecurrentes/correo.svg"}
              width={25}
              height={25}
            />
            <span className="text-primary">Correo</span>
          </EmailShareButton>
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(modalPaymentShare);
