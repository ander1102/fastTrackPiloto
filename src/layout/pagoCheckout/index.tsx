import { PagoContainer } from "./pagoContainer";
import { PagoLogo } from "./pagoLogo";

interface checkoutProps {
  companyInfo: companyInfoProps;
  comercioImage: string;
  token: string;
  hash: string;
}

interface companyInfoProps {
  companyName?: string;
  address?: string;
  phone?: string;
  message?: string;
}

export function PagoLayout(props: checkoutProps) {
  return (
      <div
        className="flex flex-col md:flex-row min-h-screen bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(/Images/integrations/LinkDePagoFondo.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/*Lado izquierdo */}
        <PagoContainer
          companyInfo={props.companyInfo}
          comercioImage={props.comercioImage}
          token={props.token}
          hash={props.hash}
        />
        {/*Lado derecho */}
        <PagoLogo
          companyInfo={props.companyInfo}
          comercioImage={props.comercioImage}
        />
      </div>
  );
}
