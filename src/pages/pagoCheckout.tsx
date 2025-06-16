import { KeyboardEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import {PagoLayout} from "@app/layout/pagoCheckout";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import useEffectAsync from "@app/hooks/useEffectAsync";
import { PaymentControllers } from "@app/logic/backend/pagoCheckout";
import { arrayBufferToBase64 } from "@app/common/format";

export default function Home() {
  
  
  const [companyInfo, setCompanyInfo] = useState({companyName:'', address:'', phone:'', message:''})
  const [companyImage, setCompanyImage] = useState('')
  const [tokenHook, setToken] = useState('');
  const [hash, setHash] = useState('');

    
    useEffectAsync(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenUrl = urlParams.get('token') ?? "";
      const hashUrl = urlParams.get('Hash') ?? "";
      setHash(hashUrl.replace(/ /g, '+'))
      setToken(tokenUrl)
      if(hash !== '' && tokenHook !== '') {
        const comercio = await PaymentControllers.getComercioInfo({
            token:tokenHook,
            hash: hash
        });
        if (comercio.isSuccess){
            let comercioInfo = comercio.response.data ?? ""
            setCompanyInfo({
              companyName: comercioInfo?.nombre,
              address: comercioInfo?.calle + ' ' + comercioInfo?.numExt + ', ' + comercioInfo.ciudad + ', ' +comercioInfo.estado + ' ' + comercioInfo.codigoPostal,
              phone: comercioInfo.telefono,
              message: comercioInfo.mensaje,
            })
        } else {
          console.error("Fallo al obtener informacion del comercio")
        }
        const comercioImage = await PaymentControllers.getComercioImage({
          token:tokenHook,
          hash: hash
        });
        let image = '';
        if (comercioImage.isSuccess && comercioImage.response) {
          image = comercioImage.response;
          setCompanyImage("data:image/png;base64," + image)
        }
      }
    }, [hash]);

  return (
    <>
        <Head>
            <title>Centum Pay</title>
            <meta name="description" content="Efevoo Pay" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/images/mini2.png" />
        </Head>
        <PagoLayout token={tokenHook} hash={hash} companyInfo={companyInfo} comercioImage={companyImage}/>
    </>
  );
}
