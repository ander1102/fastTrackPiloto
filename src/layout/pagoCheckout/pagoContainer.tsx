import { ClientComponents } from "@app/components/Client";
import {
  EFEVOOPAY_WHITE_LOGO_PATH,
} from "@app/constants";
import React, { useEffect, useState } from "react";
import { PaymentControllers } from "@app/logic/backend/pagoCheckout";
import { ButtonLoader } from "@app/components/Buttons";
import { InputNumber } from "primereact/inputnumber";
import { FormItem } from "@app/components/FormManager/FormItem";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import Image from "next/image";

interface checkoutProps {
  companyInfo?: companyInfoProps;
  comercioImage: string;
  hash: string;
  token: string;
}

interface companyInfoProps {
  companyName?: string;
  address?: string;
  phone?: string;
  message?: string;
}

export function PagoContainer(props: checkoutProps) {
  const [monto, setMonto] = useState(0);
  const [concepto, setConepto] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const sendInfo = async () => {
    setLoading(true);
    setDisabled(true);
    if (concepto.trim() !== "" && monto > 0.0 && props.hash !== "" && props.token !== "") {
      const response = await PaymentControllers.getComercioPago({
        token: props.token,
        hash: props.hash,
        concepto: concepto,
        monto: monto,
      });

      if (response.isSuccess && response.response?.payload.token) {
        toast.success("Se ha generado su link de pago exitosamente, será redirigido en 3 segundos");
        setLoading(false);
        setTimeout(() => {
          window.location.assign(response.response.payload.token);
        }, 3000);
      } else {
        toast.error("Algo salió mal, por favor inténtalo de nuevo");
        setLoading(false);
        setDisabled(false);
      }
    } else {
      toast.error("Por favor llena todos los campos");
      setLoading(false);
      setDisabled(false);
    }
  };

  return (
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full md:w-3/4 flex flex-col justify-center items-center">
          <div className="mb-4 flex justify-center">
            {props.comercioImage !== "" ? (
              <div
                className="bg-no-repeat bg-center bg-cover rounded-full "
                style={{
                  backgroundImage: `url('${props.comercioImage}')`,
                  width: "80px",
                  height: "80px",
                }}
              ></div>
            ) : (
              <div
                className="bg-[#6B3374] rounded-full flex justify-center items-center text-[#FFF] text-2xl"
                style={{ width: "50px", height: "50px" }}
              >
                <p className="flex text-center align-middle text-md ">
                  {props?.companyInfo?.companyName?.substring(0, 2)}
                </p>
              </div>
            )}
          </div>
          <span className="mb-6 text-2xl">
            {props?.companyInfo?.companyName}
          </span>

          <p className="text-lg mb-6 text-center">
            Completa la siguiente información para realizar tu <br /> pago con
            tarjeta de crédito o débito de manera fácil <br />y segura.
          </p>
          <FormItem label="Monto" className="mt-6 w-3/5">
            <InputNumber
              min={0}
              maxFractionDigits={2}
              minFractionDigits={2}
              inputId="currency-us"
              placeholder="$0.00 MXN"
              value={monto === 0 ? null : monto}
              onChange={(e) => setMonto(e.value != null ? e.value : 0)}
              mode="currency"
              currency="USD"
              locale="en-US"
              className="w-full rounded"
              disabled={disabled}
            />
          </FormItem>
          <FormItem label="Concepto" className="mt-6 w-3/5">
            <InputText
              placeholder={"Concepto"}
              value={concepto}
              className="w-full rounded"
              onChange={(e) => setConepto(e.target.value)}
              disabled={disabled}
            />
          </FormItem>
          <div className="flex justify-center w-full mt-9">
            <ButtonLoader
              className="w-3/5 flex justify-center items-center !bg-[#6B3374] rounded text-white font-bold h-12"
              loading={loading}
              disabled={disabled}
              onClick={() => sendInfo()}
            >
              Pagar con&nbsp;&nbsp;{" "}
              {/* <img src={EFEVOOPAY_WHITE_LOGO_PATH} width={60} height={10} /> */}
              <Image alt="fj" src="/Images/svg/botonCheckOut.svg" width={70} height={20}/>
            </ButtonLoader>
          </div>
          <div className="mt-9 flex-col justify-center">
            <p className="text-center text-[#6A6D74]">
              {new Date().getFullYear()} Thunderpay. Derechos Reservados.
            </p>
            {/* <a
              href="https://efevoopay.com/AvisoDePrivacidad"
              target="_bank"
              className="text-center text-[#6A6D74]"
              style={{ display: "block" }}
            >
              Aviso de privacidad
            </a> */}
          </div>
        </div>
      </div>
  );
}
