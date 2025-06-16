import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { ButtonLoader } from "@app/components/Buttons";
import {
  CardInfoRequestResponseCard,
  CardCVVRequestResponse,
  CardNIPRequestResponse,
} from "@app/types/Card";
import { useMemo, useState, useEffect } from "react";
import { timeFormat } from "@app/common/format";
import { copyToClipboard } from "@app/utils/DOM";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
interface DetailsCardModalProps extends ViewProps<boolean> {
  infoCard: CardInfoRequestResponseCard;
  getCvv: (card: number) => Promise<CardCVVRequestResponse>;
  getNip: (card: number) => Promise<CardNIPRequestResponse>;
}
function DetailsCardModal({
  getCvv,
  getNip,
  infoCard,
  visibleStyles,
  handleClose,
  show,
}: PageSizeModalProps<DetailsCardModalProps>) {
  const [cvv, setCvv] = useState("***");
  const [nip, setNip] = useState("****");
  const [expirationSeconds, setExpirationSeconds] = useState(0);
  const hiddenCvv: boolean = useMemo(() => cvv == "***", [cvv]);
  const hiddenNip: boolean = useMemo(() => nip == "****", [nip]);
  const isCardDigital = useMemo(() => infoCard?.type == "V", [infoCard]);

  useEffect(() => {
    if (!hiddenCvv) {
      const interval = setInterval(() => {
        if (expirationSeconds > 0) {
          setExpirationSeconds(expirationSeconds - 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [expirationSeconds]);

  return (
    <Dialog
      visible={show}
      className="shadow-none sm:w-full md:w-1/2"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      header={false}
      closable={false}
      dismissableMask
    >
      <section className="flex flex-col items-center">
        <div className="w-full">
          <div className="relative flex justify-center w-full">
            <div
              className="bg-black-3 w-full h-32"
              style={{ marginBottom: "130px" }}
            ></div>

            <div className="absolute top-3">
              <p className="text-white text-2xl text-center	mb-3">
                {isCardDigital ? "Tarjeta Digital" : "Tarjeta Física"}
              </p>
              <div className="relative">
                <img
                  alt="card"
                  src={
                    "data:image/png;base64," + infoCard?.imagePNG ??
                    "/Images/cards/card.png"
                  }
                  className="w-72 h-44"
                />

                <p
                  className="text-white absolute"
                  style={{ left: "70px", bottom: "78px" }}
                >
                  ****{infoCard?.bin.substring(infoCard?.bin?.length - 4)}
                </p>
                <p
                  className="text-white absolute"
                  style={{ right: "40px", bottom: "78px" }}
                >
                  {infoCard?.expDate}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-10/12">
          <div className="flex justify-between	mb-3">
            <div>
              <p className="text-lg text-grey-1">Número de tarjeta</p>
              <p className="text-lg text-black-1">{infoCard?.bin}</p>
            </div>
            <div className="mt-3">
              <button
                className="bg-secondary text-primary py-1 px-5 rounded-xl"
                onClick={() => {
                  copyToClipboard(infoCard?.bin);
                  toast.success(
                    "Número de tarjeta copiado correctamente",
                    DEFAULT_TOAST_CONFIGURATION
                  );
                }}
              >
                Copiar
              </button>
            </div>
          </div>
          <div className=" flex flex-col	mb-3">
            <p className="text-lg  text-grey-1">Fecha de vencimiento </p>
            <p className="text-lg text-black-1">{infoCard?.expDate}</p>
          </div>
          {isCardDigital ? (
            <div className="flex justify-between  mb-3">
              <div>
                <p className="text-lg text-grey-1">CVV</p>
                <p className="text-lg text-black-1">{cvv}</p>
              </div>
              <div className="mt-3">
                <ButtonLoader
                  style={{ border: "1px solid #5740d1" }}
                  customButton={true}
                  className="text-primary py-1 px-5 rounded-xl"
                  onClick={async () => {
                    if (hiddenCvv) {
                      const currentCvv = await getCvv(infoCard?.id);
                      if (currentCvv?.cvv) {
                        setCvv(currentCvv.cvv);
                        setExpirationSeconds(currentCvv.expirationSeconds);
                      } else {
                        toast.error(
                          "Ha ocurrido un error al obtener CVV",
                          DEFAULT_TOAST_CONFIGURATION
                        );
                        setExpirationSeconds(0);
                      }
                    } else {
                      setCvv("***");
                      setExpirationSeconds(0);
                    }
                  }}
                >
                  {hiddenCvv ? "Solicitar" : "Ocultar"}
                </ButtonLoader>
              </div>
            </div>
          ) : (
            <div className="flex justify-between  mb-3">
              <div>
                <p className="text-lg text-grey-1">NIP</p>
                <p className="text-lg text-black-1">{nip}</p>
              </div>
              <div className="mt-3">
                <ButtonLoader
                  style={{ border: "1px solid #5740d1" }}
                  customButton={true}
                  className="text-primary py-1 px-5 rounded-xl"
                  onClick={async () => {
                    if (hiddenNip) {
                      const currentNip = await getNip(infoCard?.id);
                      if (currentNip?.nip) {
                        setNip(currentNip.nip);
                      } else {
                        toast.error(
                          "Ha ocurido un error al obtener el NIP",
                          DEFAULT_TOAST_CONFIGURATION
                        );
                      }
                    } else {
                      setNip("****");
                    }
                  }}
                >
                  {hiddenCvv ? "Solicitar" : "Ocultar"}
                </ButtonLoader>
              </div>
            </div>
          )}
        </div>
        {isCardDigital && (
          <div className="flex justify-between bg-grey-2 w-full mb-3 px-5 py-3">
            <div className="flex items-center">
              <p className="text-sm text-grey-1">
                Tu código de seguridad CVV <br />
                será valido solo por 5 minutos
              </p>
            </div>

            <div
              style={{ height: "45px", width: "45px", borderRadius: "50%" }}
              className="text-primary  text-sm  bg-white flex justify-center items-center"
            >
              {timeFormat(expirationSeconds)}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <ButtonLoader
            className="button-primary-large"
            label="Listo"
            onClick={() => handleClose(false)}
          />
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(DetailsCardModal);
