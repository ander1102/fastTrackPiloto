import React from "react";
import styles from "./Pago.module.css";

import PhoneIcon from "@app/layout/pagoCheckout/icons/phone";
import AddressIcon from "@app/layout/pagoCheckout/icons/address";
import LocationIcon from "@app/layout/pagoCheckout/icons/location";

interface checkoutProps {
  companyInfo: companyInfoProps;
  comercioImage: string;
}

interface companyInfoProps {
  companyName?: string;
  address?: string;
  phone?: string;
  message?: string;
}

export function PagoLogo(props: checkoutProps) {
  return (
    <div className="w-full md:w-1/2 p-4 md:p-8 bg-cover bg-no-repeat bg-center relative md:absolute bottom-4 md:bottom-[7.50rem] md:right-4 flex flex-col items-center md:items-end">
      <div className="flex-col w-full">
        <div className="flex justify-center md:justify-end">
          <div className="relative p-3 rounded-md w-3/4" 
          style={{background: "radial-gradient(97.57% 210.75% at 0.9% 2.98%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)", backdropFilter:"blur(21px)"}}>
            <h1 className="flex w-full text-white">
              ¡Muchas gracias por tu compra!
            </h1>
            <h1 className="flex w-full text-white">
              Esperamos tenerte de vuelta pronto.
            </h1>
            <p className="text-white flex w-full pt-6">
              <span className="mr-3">
                <PhoneIcon />
              </span>
              +52 81 1993 3760
            </p>
            <p className="flex w-full text-white">
              <span className="mr-3">
                <LocationIcon />
              </span>
              Av. Roble #660, S Torre Cytrus P3 NA 0, Colonia Valle del Campestre, C.P: 66265 San Pedro Garza García, Nuevo León, México.
            </p>
            <div
              className="h-1 rounded-b-md absolute bottom-0 left-0 right-0"
              style={{background: "#9950A6"}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
