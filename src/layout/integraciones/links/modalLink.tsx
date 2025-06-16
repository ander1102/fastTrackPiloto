import Image from "next/image";
import { useContext } from "react";
import { Dialog } from "primereact/dialog";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import { toast } from "react-toastify";
import { Button } from "@app/components/Buttons";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";

import { copyToClipboard } from "@app/utils/DOM";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { UserContext } from "@app/context";
import { useQRDownload } from "@app/components/QRDownload";
import QRCode from "react-qr-code";

interface ModalLinkProps extends ViewProps {
  isLinkPago: boolean;
  concepto: string;
  monto: number;
  mensaje: string;
  token: string;
  tokenQR: string;
}

function modalLink({
  isLinkPago,
  concepto,
  monto,
  mensaje,
  token,
  tokenQR,
  show,
  visibleStyles,
  handleClose,
}: PageSizeModalProps<ModalLinkProps>) {
  const { handleQRDownload, handleCopyQR, canvasDownloadRef, canvasQRRef } =
    useQRDownload();
  const { client } = useContext(UserContext);
  const linkType = isLinkPago ? "Pago" : "Negocio";
  const linkPath = linkType.toLocaleLowerCase();
  const textClass = isLinkPago ? "text-[#FFF]" : "text-[#FFF]";
  const emailBody = isLinkPago
    ? `${concepto}: $${monto.toFixed(2)}`
    : `${mensaje}`;

  const copyLink = () => {
    if (!token) return;

    copyToClipboard(token);
    toast.success(
      `El Link de ${linkType} se ha copiado correctamente.`,
      DEFAULT_TOAST_CONFIGURATION
    );
  };

  return (
    <Dialog
      className="h-[760px] sm:w-[500px] sm:h-[800px] 2xl:w-[540px] 2xl:h-[840px] bg-[#f0f0f0] bg-center bg-[url('/Images/integrations/Base_figuras.svg')]"
      contentClassName="!bg-transparent"
      draggable={false}
      style={{backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right'}}
      headerClassName="!bg-transparent"
      maskStyle={visibleStyles}
      visible={show}
      onHide={() => handleClose(false)}
    >
      <div className="mx-auto sm:w-[448px] flex flex-col justify-center items-center gap-5 sm:gap-10">
        <canvas ref={canvasDownloadRef} className="hidden" />
        <picture
          className={`w-16 h-16 p-3 rounded-full flex justify-center bg-[#6b3374]`}
        >
          <Image
            alt=""
            height={40}
            width={40}
            src={`/Images/integrations/payment_${
              isLinkPago ? "link" : "negocio"
            }.svg`}
          />
        </picture>
        <h2 className="text-center text-2xl 2xl:text-3xl">
          ¡Link de {linkType} creado con éxito!
        </h2>
        <picture className="relative flex justify-center">
          <QRCode
          ref={canvasQRRef}
          size={200}
          level="H"
          style={{ height: "auto", maxWidth: "100%", width: "100%", }}
          viewBox={`0 0 256 256`}
            value={token ?? ""}
          />
        </picture>

        <Button
          className="w-56 h-12 !p-0 !bg-[#6b3374] text-[#FFF] !rounded-md flex justify-center items-center gap-3 enabled:hover:opacity-80"
          onClick={copyLink}
        >
          <span className={`text-lg ${textClass}`}>Copiar enlace</span>
          <Image
            alt=""
            height={20}
            width={20}
            src={`/Images/integrations/copy_link_${linkPath}.svg`}
          />
        </Button>

        <div className={`grid grid-cols-2 gap-10 ${textClass}`}>
          <Button
            className="h-14 !p-0 flex flex-col items-center !justify-between hover:!bg-transparent hover:opacity-75"
            text
            onClick={handleCopyQR}
          >
            <Image
              alt=""
              src={`/Images/integrations/copiar_${linkPath}.svg`}
              width={18}
              height={18}
            />
            <span className="text-[#1C1C1C]">Copiar QR</span>
          </Button>

          <Button
            className="h-14 !p-0 flex flex-col items-center !justify-between hover:!bg-transparent hover:opacity-75"
            text
            onClick={handleQRDownload}
          >
            <Image
              src={`/Images/integrations/download_${linkPath}.svg`}
              alt=""
              width={18}
              height={18}
            />
            <span className="text-[#1C1C1C]">Descargar</span>
          </Button>

          <EmailShareButton
            className="h-14 flex flex-col items-center justify-between hover:opacity-75"
            subject={`${client.nombre} te ha compartido ${
              isLinkPago ? "un" : "su"
            } Link de ${linkType}`}
            body={`${client.nombre}\n\n${emailBody}\n\n${token}\n\n\n`}
            url="Continúa con tu compra segura a través de Thunderpay."
          >
            <Image
              alt=""
              height={22}
              width={22}
              src={`/Images/integrations/correo_${linkPath}.svg`}
            />
            <span className="text-[#1C1C1C]">Correo</span>
          </EmailShareButton>

          <WhatsappShareButton
            className="h-14 flex flex-col items-center justify-between hover:opacity-75"
            title={`*${client.nombre}* te ha compartido ${
              isLinkPago ? "un" : "su"
            } Link de ${linkType}:\n\n`}
            url={token}
          >
            <Image
              alt=""
              src={`/Images/integrations/whatsapp_${linkPath}.svg`}
              width={22}
              height={22}
            />
            <span className="text-[#1C1C1C]">WhatsApp</span>
          </WhatsappShareButton>
        </div>
      </div>
    </Dialog>
  );
}

export default withModalPageSize(modalLink);
