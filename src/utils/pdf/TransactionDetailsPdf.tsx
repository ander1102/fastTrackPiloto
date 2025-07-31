import { forwardRef, useMemo } from "react";
import { Transaction } from "@app/types/Transactions";
import { User } from "@app/types/User";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { maskText } from "@app/common/format";
import { DATE_TIME_FORMAT, DATE_TIME_FORMAT_SHORT } from "@app/constants";
import { assetsConfig } from "../../../assets.config";

interface ITransactionDetailsPdf {
  firma: string;
  transaction: Transaction;
  user: User;
}

// Create Document Component
const TransactionDetailsPdf = forwardRef<
  HTMLDivElement,
  ITransactionDetailsPdf
>(({ firma, transaction, user }, ref) => {
  const isMaster = user.userType === "master";
  const isFirma = firma && isMaster;

  const text = useMemo(
    () => ({
      base: isFirma ? "text-base" : "text-lg",
      lg: isFirma ? "text-lg" : "text-xl",
      xl: isFirma ? "text-xl" : "text-2xl",
      "2xl": isFirma ? "text-2xl" : "text-3xl",
      lead4: isFirma ? "leading-4" : "leading-5",
      lead5: isFirma ? "leading-5" : "",
      lead6: isFirma ? "leading-6" : "",
    }),
    [isFirma]
  );

  return (
    <article
      className="bg-white flex flex-col items-center p-4 place-content-center"
      ref={ref}
    >
      <div className="w-[500px] h-[1000px] flex flex-col py-4 px-9 bg-center bg-cover"
      style={{
        backgroundImage: `url(${assetsConfig.transaccion.ticketTemplate})`,
      }}
      >
        <picture className="flex justify-center">
          <img alt="" src={assetsConfig.transaccion.logo_ticket} height={70} width={130} />
        </picture>

        <h1 className={`text-center font-bold mt-2 ${text["2xl"]}`}>
          {transaction.EMP}
        </h1>

        <span className={`text-center ${text.lead5} ${text.lg}`}>
          {transaction.direccion}
        </span>

        <div className="mt-2 flex flex-col gap-1">
          <h2 className={`m-0 text-center font-bold ${text.xl}`}>
            Venta {transaction.ID}
          </h2>
          <span className={`text-center -mt-2 ${text.lg}`}>
            {DATE_TIME_FORMAT.format(new Date(transaction.datcr))}
          </span>
        </div>

        <div className="mt-2 flex flex-col">
          <h2 className={`text-center ${text.xl}`}>Número de tarjeta</h2>
          <span className={`text-center ${text.base}`}>
            {maskText(transaction.pan, 4)}
          </span>
          <span className={`text-center ${text.lg}`}>
            {transaction.tarjeta}
          </span>
        </div>

        <hr className={`border border-black ${isFirma ? "my-4" : "my-6"}`} />

        <div className="w-full flex justify-between">
          <p className={`font-medium ${text.xl}`}>Consumo:</p>
          <span className={text.lg}>
            {useTruncateAmout(transaction.amount - transaction.propina)} MXN
          </span>
        </div>
        <div className="w-full flex justify-between">
          <p className={`font-medium ${text.xl}`}>Propina:</p>
          <span className={text.lg}>
            {useTruncateAmout(transaction.propina)} MXN
          </span>
        </div>
        <div className="w-full flex justify-between mt-3">
          <p className={`font-medium ${text.xl}`}>Total:</p>
          <span className="font-bold text-4xl">
            {useTruncateAmout(transaction.amount)}
          </span>
        </div>

        {isFirma ? (
          <>
            <hr className="border border-black w-full my-2" />

            <p className="text-xl mb-2">Firma:</p>

            <section className="relative justify-center w-full mb-8">
              <p className="text-[#3378FA] text-center text-3xl font-sans opacity-50">
                {DATE_TIME_FORMAT_SHORT.format(new Date(transaction.datcr))}
              </p>
              <p className="text-[#3378FA] text-center text-3xl font-sans opacity-50">
                APROBADA {transaction.numAut}
              </p>

              <picture className="absolute inset-0 top-5 flex justify-center items-center">
                <img
                  alt=""
                  className="max-h-48 max-w-sm object-contain"
                  src={`data:image/png;base64,${firma}`}
                />
              </picture>
            </section>
          </>
        ) : null}

        <hr className={`border border-black ${isFirma ? "my-4" : "my-6"}`} />

        <section
          className={`flex flex-col items-center ${
            isFirma ? "gap-4" : "gap-5"
          }`}
        >
          <p className="flex flex-col items-center gap-1">
            <span className={`text-2xl font-bold ${text.lead6}`}>
              Aprobada {transaction.numAut}
            </span>
            <span className="text-xl leading-6">
              {isMaster ? "Comercio" : "Copia Cliente"}
            </span>
          </p>

          <hr className="w-20 border border-black" />

          <p className="flex flex-col items-center gap-1">
            <span className={`text-2xl font-bold ${text.lead6}`}>
              Comercio {transaction.afiliacion}
            </span>
            <div style={{textAlign: 'center'}}>
              <span className="text-xl leading-6">{transaction.entrada}</span>
            </div>
          </p>

          <hr className="w-20 border border-black" />

          <div>
            <p className={`text-center text-xl ${text.lead5}`}>
              Núm. SERIE {maskText(transaction.device_id, 5)}
            </p>

            <p className={`text-center text-xl ${text.lead5}`}>
              AID {maskText(transaction.AID, 4)}
            </p>

            <p className={`text-center text-xl ${text.lead5}`}>
              ARQC {maskText(transaction.ARQC, 4)}
            </p>
          </div>

          <p className={`text-center ${text.base} ${text.lead4}`}>
            Por este pagaré me obligo incondicionalmente a pagar a la orden del
            banco acreditante el importe de este título. Este pagaré procede del
            contrato de apertura de crédito que el banco acreditante y el
            tarjetahabiente tienen celebrado.
          </p>
        </section>
      </div>
    </article>
  );
});

export default TransactionDetailsPdf;
