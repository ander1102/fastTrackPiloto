import { useRef } from "react";
import { Dialog } from "primereact/dialog"
import QRCode from "react-qr-code";
import Image from "next/image";
import {WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon} from "react-share";
import { copyToClipboard } from "@app/utils/DOM";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { toBlob, toPng } from "html-to-image";

export const ModalLinkCheckOut = ({visible, onHide, linkQR}:any) => {
  const qrCodeRef = useRef(null);
  const canvasQRRef = useRef(null);
  const canvasDownloadRef = useRef<HTMLCanvasElement | null>(null);

  const generateDownloadCanvas = () =>{
    const node = qrCodeRef.current;
    if (!node) return;
    
    toPng(node).then((dataURL) => {
      const canvasElement = canvasDownloadRef.current;
      if (!canvasElement) return;
      canvasElement.width = 540;
      canvasElement.height = 760;
      canvasElement.style.display = "none";
      const ctx = canvasElement.getContext("2d");
      if (!ctx) {
        console.log("No hay contexto")
        toast.error("No hay contexto");
        return
      }

      const background = new (window as any).Image();
      const qrCode = new (window as any).Image();

      background.src = "/Images/QRDownload/background.png";
      qrCode.src = dataURL;

      let imagesLoaded = 0;

      const checkImagesLoaded = () => {
        imagesLoaded += 1;
        if (imagesLoaded === 2) {
          drawImages();
        }
      };

      background.onload = checkImagesLoaded;
      qrCode.onload = checkImagesLoaded;

      const drawImages = () => {
        ctx.drawImage(background, 0, 0, canvasElement.width, canvasElement.height);
        ctx.drawImage(qrCode, 180, 168, 180, 180);
      };
      setTimeout(() => {
        const dataURL2 = canvasElement.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL2;
        link.download = "qrcode_template.png";
        link.click();
        link.remove();
        toast.success(
          "El QR con el template se ha descargado correctamente.",
          DEFAULT_TOAST_CONFIGURATION
        );
      }, 1000)

    });
  }

  const handleCopy = async () => {
    const node = qrCodeRef.current;
    if (node) {
      toBlob(node).then(async function (fileBlob) {
        if (fileBlob) {
          await navigator.clipboard
            .write([new ClipboardItem({ [fileBlob.type]: fileBlob })])
            .then(() => {
              toast.success(
                "El QR se ha copiado correctamente",
                DEFAULT_TOAST_CONFIGURATION
              );
            })
            .catch((err) => {
              toast.error(
                "Ha ocurrido un error al copiar el QR",
                DEFAULT_TOAST_CONFIGURATION
              );
            });
        }
      });
    }
  };

  return (
    <>
      <Dialog
        className="h-[760px] sm:w-[500px] sm:h-[800px] 2xl:w-[540px] 2xl:h-[840px] bg-[#f6f5f0] bg-center bg-cover bg-[url('/Images/integrations/Base_figuras.svg')]"
        visible={visible}
        onHide={()=>onHide()}
        style={{ width: "50vw", borderRadius:10, maxWidth: '470px', padding: 0}}
        draggable={false}
        focusOnShow={false}
        headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor:"#F6F5F0"}}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9, paddingBottom: 40}}
        contentClassName="!pt-5 !bg-transparent flex flex-col justify-center items-center gap-2"
        headerClassName="!bg-transparent"
      >
          <div style={{display:'flex', justifyContent: 'center', marginBottom: '30px'}}>
            <div style={{backgroundColor: '#FFF', padding: '15px', borderRadius: '50px'}}>
              <Image src={"/Images/svg/linkCatalogos.svg"} alt="" width={40} height={40} />
            </div>
          </div>

          <div style={{textAlign: 'center'}}>
            <h1 style={{color: '#2E3339', fontSize: '27px', fontWeight: 400}}>¡Link creado con éxito!</h1>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
            <div style={{width: 180, height: 180}} ref={qrCodeRef}>
              <canvas ref={canvasDownloadRef} className="hidden" />
              <QRCode
                ref={canvasQRRef}
                size={256}
                level="H"
                style={{ height: "auto", maxWidth: "100%", width: "100%", }}
                value={linkQR ?? ""}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
          <div  style={{display:'flex', justifyContent: 'center', marginBottom: '30px', marginTop: '30px', cursor: 'pointer'}}
            onClick={() => {
                    copyToClipboard( linkQR ?? "");
                    toast.success(
                      "Enlace de pago copiado",
                      DEFAULT_TOAST_CONFIGURATION
                    );
                  }}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: '10px 30px', borderRadius: '7px'}}>
              <span style={{color: '#5840D1', marginRight: '10px'}}>Copiar enlace</span>
              <Image src={"/Images/svg/linkCatalogos.svg"} alt="LinkIcon" width={20} height={20} />
            </div>
          </div>

          <div  style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '2.5rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{cursor: 'pointer'}} onClick={() => handleCopy()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
                  <path d="M13.3704 0.419922H2.20279C1.95825 0.419744 1.71608 0.467776 1.49012 0.561273C1.26417 0.65477 1.05886 0.791896 0.885952 0.964809C0.713039 1.13772 0.575913 1.34303 0.482416 1.56898C0.388919 1.79494 0.340886 2.03711 0.341065 2.28164V15.311H2.20279V2.28164H13.3704V0.419922ZM16.1623 4.142H5.92487C5.68033 4.14183 5.43816 4.18986 5.21221 4.28336C4.98625 4.37685 4.78095 4.51398 4.60803 4.68689C4.43512 4.8598 4.298 5.06511 4.2045 5.29106C4.111 5.51702 4.06297 5.75919 4.06315 6.00373V19.0331C4.06297 19.2776 4.111 19.5198 4.2045 19.7457C4.298 19.9717 4.43512 20.177 4.60803 20.3499C4.78095 20.5228 4.98625 20.6599 5.21221 20.7534C5.43816 20.8469 5.68033 20.895 5.92487 20.8948H16.1623C16.6555 20.8941 17.1282 20.6975 17.4765 20.3484C17.8248 19.9993 18.0203 19.5262 18.0199 19.0331V6.00373C18.0203 5.51056 17.8248 5.03744 17.4765 4.68833C17.1282 4.33923 16.6555 4.14273 16.1623 4.142ZM16.1623 19.0331H5.92487V6.00373H16.1623V19.0331Z" fill="#5840D1"/>
                </svg>
              </div>
              <span style={{color: '#5840D1', marginTop: '10px'}}>Copiar QR</span>
            </div>
            <div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{cursor: 'pointer'}} onClick={() => {generateDownloadCanvas()} }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0039 0.419922C14.341 0.419922 14.6749 0.486367 14.9863 0.615459C15.2977 0.744552 15.5807 0.93376 15.819 1.17227C16.0573 1.41078 16.2462 1.69391 16.375 2.00548C16.5038 2.31704 16.5699 2.65094 16.5696 2.98808V8.88351C16.5696 9.56398 16.2993 10.2166 15.8181 10.6977C15.3369 11.1789 14.6843 11.4492 14.0039 11.4492H12.6779C12.4511 11.4492 12.2336 11.3591 12.0732 11.1987C11.9128 11.0383 11.8227 10.8208 11.8227 10.594C11.8227 10.3672 11.9128 10.1496 12.0732 9.98924C12.2336 9.82885 12.4511 9.73874 12.6779 9.73874H14.0039C14.2307 9.73874 14.4482 9.64864 14.6086 9.48825C14.769 9.32786 14.8591 9.11033 14.8591 8.88351V2.98808C14.8591 2.76126 14.769 2.54373 14.6086 2.38334C14.4482 2.22295 14.2307 2.13285 14.0039 2.13285L3.39852 2.13285C3.1717 2.13285 2.95416 2.22295 2.79378 2.38334C2.63339 2.54373 2.54329 2.76126 2.54329 2.98808V8.88351C2.54329 9.11033 2.63339 9.32786 2.79378 9.48825C2.95416 9.64864 3.1717 9.73874 3.39852 9.73874H4.72326C4.95009 9.73874 5.16762 9.82885 5.328 9.98924C5.48839 10.1496 5.5785 10.3672 5.5785 10.594C5.5785 10.8208 5.48839 11.0383 5.328 11.1987C5.16762 11.3591 4.95009 11.4492 4.72326 11.4492H3.39729C2.71682 11.4492 2.06423 11.1789 1.58307 10.6977C1.1019 10.2166 0.831591 9.56398 0.831591 8.88351V2.98808C0.831591 2.30762 1.1019 1.65502 1.58307 1.17386C2.06423 0.6927 2.71682 0.422386 3.39729 0.422386L14.0039 0.419922Z" fill="#5840D1"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70009 7.20752C8.58778 7.20752 8.47657 7.22964 8.37281 7.27262C8.26905 7.3156 8.17477 7.3786 8.09535 7.45801C8.01594 7.53743 7.95294 7.63171 7.90996 7.73547C7.86698 7.83923 7.84486 7.95044 7.84486 8.06275V18.2109L3.57733 14.3316C3.4095 14.1789 3.18791 14.0992 2.96131 14.11C2.73472 14.1207 2.52167 14.221 2.36904 14.3889C2.21641 14.5567 2.1367 14.7783 2.14744 15.0049C2.15819 15.2315 2.25851 15.4445 2.42634 15.5972L7.90155 20.5758C8.12634 20.781 8.41973 20.8948 8.72412 20.8948C9.02851 20.8948 9.3219 20.781 9.5467 20.5758L14.9763 15.5947C15.0603 15.5191 15.1285 15.4277 15.1769 15.3256C15.2254 15.2235 15.2531 15.1128 15.2585 15C15.264 14.8871 15.247 14.7743 15.2085 14.6681C15.1701 14.5618 15.111 14.4642 15.0347 14.3809C14.9583 14.2977 14.8662 14.2303 14.7637 14.1829C14.6611 14.1354 14.5502 14.1087 14.4373 14.1043C14.3244 14.1 14.2117 14.118 14.1059 14.1575C14 14.1969 13.9029 14.2569 13.8204 14.334L9.55656 18.2442V8.06398C9.55672 7.95147 9.53468 7.84002 9.49169 7.73604C9.44871 7.63205 9.38563 7.53757 9.30607 7.45801C9.2265 7.37845 9.13202 7.31537 9.02804 7.27238C8.92405 7.2294 8.81261 7.20736 8.70009 7.20752Z" fill="#5840D1"/>
                  </svg>
                </div>
                <span style={{color: '#5840D1', marginTop: '10px'}}>Descargar</span>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: '30px', gap: '2.5rem'}}>
          <div>
            <EmailShareButton
              url={linkQR}
              subject={"Link de pago"}
              body="Continúa con tu compra segura a través de Efevoo Pay"
              style={{backgroundColor: "#F6F5F0", display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            > 
                <EmailIcon size={32} round bgStyle={{fill: "#5840D1"}} iconFillColor={"#F6F5F0"}/>
                <span style={{color: '#5840D1'}}>Correo</span>
              </EmailShareButton>
            </div>
            <div>
              <WhatsappShareButton
                url={linkQR}
                title={"Efevoopay link de pago"}
                separator=""
                style={{backgroundColor: "#F6F5F0", display: 'flex', flexDirection: 'column', alignItems: 'center'}}
              >
                <WhatsappIcon size={35} round bgStyle={{fill: "#F6F5F0"}} iconFillColor={"#5840D1"} />
                <span style={{color: '#5840D1'}}>Whatsapp</span>
              </WhatsappShareButton>
            </div>
          </div>
      </Dialog>
    </>
  )
}