import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { ButtonConfirm, ButtonReturn, Button } from "@app/components/Buttons";
import { TransactionDetailsPdf } from "@app/utils/pdf";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";

import { TRANSACTION_PRODUCT, Transaction } from "@app/types/Transactions";
import { User } from "@app/types/User";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { ResumeControllers } from "@app/logic/backend/resume";
import { TransactionsControllers } from "@app/logic/backend/transactions";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { isDate } from "@app/common/format";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";

const CIRCLE = [...Array(7)];

interface TransactionDetailsModalProps extends ViewProps {
  item: Transaction;
  user: User;
  onRefresh: () => void;
  permitReverse: boolean;
}

function TransactionDetailsModal({
  item,
  visibleStyles,
  user,
  show,
  handleClose,
  onRefresh,
  permitReverse,
}: PageSizeModalProps<TransactionDetailsModalProps>) {
  const [firma, setFirma] = useState("");
  const [disbledDownload, setDisabledDownload] = useState(true)
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState(item.referencia ?? "");
  const referenceColor = useMemo(
    () => (reference.length > 0 ? "#4aac39" : "#838383"),
    [reference]
  );
  const [referenceLoading, setReferenceLoading] = useState<boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // calculate how many days has passed since transfer being made
  const transactionDate = new Date(item.datcr);
  const today = new Date(moment().format());
  const timeDifference = today.getTime() - transactionDate.getTime();
  const daysSinceTransfer = timeDifference / (1000 * 3600 * 24);
  const canRefund = useMemo(() => {
    if (!permitReverse) return false;
    if (item.tipo === TRANSACTION_PRODUCT["Pagos recurrentes"]) return false;
    if (["CAN", "DEV", "REV"].includes(item.tipotxn)) return false;
    if (item.cancela || item.devolucion || item.reverso) return false;
    if (daysSinceTransfer < 1 || daysSinceTransfer > 90) return false;
    return true;
  }, [item]);
  const canReverse = useMemo(() => {
    if (!permitReverse) return false;
    if (item.tipo === TRANSACTION_PRODUCT["Pagos recurrentes"]) return false;
    if (["CAN", "DEV", "REV"].includes(item.tipotxn)) return false;
    if (item.cancela || item.devolucion || item.reverso) return false;
    if (daysSinceTransfer >= 1) return false;
    return true;
  }, [item]);

  const firstDetails = {
    Cliente: item.EMP,
    "Monto total": useTruncateAmout(item.amount),
    ID: `#${item.ID}`,
    "Método de pago": item.tipotarj,
    "Fecha y hora": isDate(item.datcr)
      ? DateDDMMYYHHMMA(new Date(item.datcr))
      : null,
    "Tipo de transacción": item.Transaccion,
  };

  const secondDetails = {
    Producto: TRANSACTION_PRODUCT[item.tipo],
    "Número de tarjeta": `**** ${item.pan?.slice(-4)}`,
    "Comisión (Sin IVA)": useTruncateAmout(item.ganancia),
    "IVA de Comisión": useTruncateAmout(item.iva),
    Propina: useTruncateAmout(item.propina),
    "Tipo de tarjeta": item.redtarj,
  };

  const [showRefundConfirmation, setShowRefundConfirmation] = useState(false);
  const [showReverseConfirmation, setShowReverseConfirmation] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handlePrint = useReactToPrint({
    documentTitle: `transaccion_#${item.ID}`,
    content: () => componentRef.current,
  });

  const handleRefund = () => setShowRefundConfirmation(!showRefundConfirmation);

  const handleReverse = () =>{
    setShowReverseConfirmation(!showReverseConfirmation);
  }

  const handleSendEmail = () => {
    setIsLoading(true);
    ResumeControllers.postTransactionEmail({
      idagep_empresa: user.idagep_empresa ?? 0,
      idTransaccion: item.ID,
      email: email,
      tipo: item.tipo,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.isSuccess) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            setEmail("");
          }, 3000);
          toast.success(
            "Correo enviado con éxito",
            DEFAULT_TOAST_CONFIGURATION
          );
        }
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error(`Error:`, res.response?.mensaje?.msg ?? "");
      });
  };

  const handleSendRefund = () => {
    setIsLoading(true);
    ResumeControllers.postTransactionRefund({
      id: item.ID,
      tipotxn: item.tipo === 'DUKPT' ? "DEV" : "CAN",
      tipo: item.tipo,
    })
      .then((res) => {
        setIsLoading(false);
        return new Promise((resolve, reject) => {
          
          if(item.tipo === 'DUKPT'){
            if (res.isSuccess && res.response == "00") {
              setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(false);
                setShowRefundConfirmation(false);
                handleClose();
                onRefresh();
              }, 1000);
              toast.success(
                "Devolución realizada con exito",
                DEFAULT_TOAST_CONFIGURATION
              );
              resolve("Éxito");
            } else {
              reject(new Error("Error"));
            }
          } else {
            if (res.isSuccess && res.response.codigo == "00") {
              setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(false);
                setShowRefundConfirmation(false);
                handleClose();
                onRefresh();
              }, 1000);
              toast.success(
                "Devolución realizada con exito",
                DEFAULT_TOAST_CONFIGURATION
              );
              resolve("Éxito");
            } else {
              reject(new Error("Error"));
            }
          }
        });
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error("Error: Hubo un problema al realizar la devolución");
        setShowRefundConfirmation(false);
        handleClose();
      });
  };

  const handleSendReverse = () => {
    setIsLoading(true);
    ResumeControllers.postTransactionReverse({
      id: item.ID,
      tipotxn: "DES",
      tipo: item.tipo,
    })
      .then((res) => {
        setIsLoading(false);
        return new Promise((resolve, reject) => {

          if(item.tipo === 'DUKPT'){
            if (res.isSuccess && res.response == "00") {
              setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(false);
                setShowReverseConfirmation(false);
                handleClose();
                onRefresh();
              }, 1000);
              toast.success(
                "Reverso se ha realizada con exito",
                DEFAULT_TOAST_CONFIGURATION
              );
              resolve("Éxito");
            } else {
              reject(new Error("Error"));
            }
          } else {
            if (res.isSuccess && res.response.codigo == "00") {
              setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(false);
                setShowReverseConfirmation(false);
                handleClose();
                onRefresh();
              }, 1000);
              toast.success(
                "Reverso se ha realizada con exito",
                DEFAULT_TOAST_CONFIGURATION
              );
              resolve("Éxito");
            } else {
              reject(new Error("Error"));
            }
          }
        });
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error("Error: Hubo un problema al realizar el reverso");
        setShowRefundConfirmation(false);
        handleClose();
      });
  };

  const handleReference = () => {
    if (reference.trim()) {
      setReferenceLoading(true);
      TransactionsControllers.reference({
        idagep_empresa: user.idagep_empresa ?? 0,
        idTransaccion: item.ID,
        referencia: reference,
        tipo: item.tipo.toLocaleLowerCase(),
        operacion: "u",
      })
        .then((res) => {
          toast.success(
            "Referencia guarda con éxito",
            DEFAULT_TOAST_CONFIGURATION
          );
          setReferenceLoading(false);
          handleClose();
        })
        .catch((err) => {
          setReferenceLoading(false);
          toast.error("Error: Hubo un problema al guardar la referencia");
        })
        .finally(() => {
          onRefresh();
        });
    }
  };

  const callFirma = async () => {
    const { ARQC } = item;
    const { response } = await TransactionsControllers.firma({ ARQC });
    if (response) {
      setFirma(response)
    };
    setDisabledDownload(false)
  };

  useEffect(() => {
    callFirma();
  }, []);

  return (
    <Dialog
      className="mx-auto max-h-full pr-14 lg:p-0 md:p-0"
      dismissableMask
      draggable={false}
      maskClassName={!showRefundConfirmation ? "modalTransaction" : ""}
      maskStyle={visibleStyles}
      visible={show}
      onHide={handleClose}
    >
      {/* Transaction details PDF should be mounted in DOM in order to download it, just hide it */}
      <div className="hidden">
        <TransactionDetailsPdf
          ref={componentRef}
          firma={firma}
          transaction={item}
          user={user}
        />
      </div>

      {showRefundConfirmation || showReverseConfirmation ? (
        <center className="dialog-alert">
          <p className="dialog-subtitle">¿Deseas continuar?</p>
          <p className="dialog-description">
            El monto de la transacción será reembolsado a la tarjeta utilizada.
          </p>
          <div className="dialog-actions">
            {showRefundConfirmation && (
              <>
                <ButtonReturn onClick={handleRefund} />
                <ButtonConfirm onClick={handleSendRefund} loading={isLoading} />
              </>
            )}

            {showReverseConfirmation && (
              <>
                <ButtonReturn onClick={handleReverse} />
                <ButtonConfirm
                  onClick={handleSendReverse}
                  loading={isLoading}
                />
              </>
            )}
          </div>
        </center>
      ) : (
        <article className="max-w-xl">
          <div className="flex justify-center mb-2">
            <Image
              alt=""
              src="/Images/transactions/check.svg"
              width={50}
              height={50}
            />
          </div>

          <h2 className="text-2xl text-center text-primary-color mb-2">
            Detalle de la transacción
          </h2>

          <div className="bg-white p-5 relative mb-8">
            <div>
              {Object.entries(firstDetails).map(([label, value]) =>
                value ? (
                  <Detail key={label} label={label} value={value} />
                ) : null
              )}

              <div className="w-full border-t border-dashed border-1 border-thin border-[#B8DAD7] my-3" />

              {Object.entries(secondDetails).map(([label, value]) => (
                <Detail key={label} label={label} value={value} />
              ))}

              <div className="flex gap-3 items-center mt-5 mb-8">
                <div
                  className="relative border border-solid border-gray-light rounded-lg flex flex-row"
                  style={{ borderColor: referenceColor }}
                >
                  <InputText
                    className="!h-10 bg-transparent border-none !rounded-lg placeholder:text-sm"
                    placeholder="Núm. de Referencia"
                    style={{ color: referenceColor }}
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                  <Button
                    autoFocus
                    className="absolute -right-px -top-px -bottom-px w-10 p-0 flex justify-center items-center rounded-lg transform"
                    loading={referenceLoading}
                    style={{ backgroundColor: referenceColor }}
                    onClick={handleReference}
                  >
                    {!referenceLoading && (
                      <Image
                        src="/Images/transactions/save.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                    )}
                  </Button>
                </div>

                <Button
                  className="!p-0 !px-1 flex flex-col gap-1 justify-center items-center hover:!bg-transparent hover:!opacity-80"
                  onClick={handlePrint}
                  disabled={disbledDownload}
                >
                  <Image
                    alt=""
                    src="/Images/transactions/download.svg"
                    height={22}
                    width={22}
                  />
                  <span className="text-sm text-[#757A85]">Descargar</span>
                </Button>

                {canRefund ? (
                  <Button
                    className="!p-0 !px-1 flex flex-col gap-2 justify-center items-center hover:!bg-transparent hover:!opacity-80"
                    onClick={handleRefund}
                  >
                    <Image
                      alt=""
                      src="/Images/transactions/arrow.svg"
                      width={18}
                      height={18}
                    />
                    <span className="text-sm text-[#757A85]">Devolución</span>
                  </Button>
                ) : (
                  canReverse && (
                    <Button
                      className="!p-0 !px-1 flex flex-col gap-2 justify-center items-center hover:!bg-transparent hover:!opacity-80"
                      onClick={handleReverse}
                    >
                      <Image
                        alt=""
                        src="/Images/transactions/arrow.svg"
                        width={18}
                        height={18}
                      />
                      <span className="text-sm text-[#757A85]">Reverso</span>
                    </Button>
                  )
                )}
              </div>
            </div>
            <div
              className="flex justify-between absolute w-full left-0 right-0 bottom-neg-25"
              style={{ transform: "scale(1.1)" }}
            >
              {CIRCLE.map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-3xl bg-[#F0F0F0]"></div>
              ))}
            </div>
          </div>

          <div className="px-5 flex justify-between gap-5 mt-1">
            <InputText
              className="bg-transparent placeholder:text-sm"
              placeholder="Correo eléctronico"
              value={email}
              style={{borderColor: '#838383', borderRadius: 4}}
              onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
            />
            <Button
              className="px-8 !bg-[#343434] hover:!opacity-80"
              disabled={!email.match(validEmailRegex)}
              label={isSuccess ? "Enviado" : "Enviar"}
              loading={isLoading}
              onClick={handleSendEmail}
            />
          </div>
        </article>
      )}
    </Dialog>
  );
}

export default withModalPageSize(TransactionDetailsModal);

interface DetailProps {
  label: string;
  value: string;
}
function Detail({ label, value }: DetailProps) {
  return (
    <div className="py-1 flex justify-between">
      <span className="text-sm text-[#5A5A5A]">{label}</span>
      <span className="text-sm text-primary-color font-[500]">{value}</span>
    </div>
  );
}
