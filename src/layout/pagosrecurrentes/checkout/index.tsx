import { Button } from "@app/components/Buttons";
import { IMAGES_PATH } from "@app/constants/pagosRecurrentes";
import { ReactNode } from "react";
import {
  PagosRecurrentesCheckoutReadResponse,
  RECURRENCIA_TYPES,
} from "@app/types/PagosRecurrentes";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
export const PageContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES_PATH.BACKGROUND})`,
      }}
      className="w-screen h-screen bg-cover bg-no-repeat bg-center fixed"
    >
      <div className="overflow-y-scroll h-screen">
        <div
          style={{
            backgroundImage: `url(${IMAGES_PATH.DEGRADADO})`,
          }}
          className="bg-cover bg-cente h-1 absolute right-0 left-0 z-10 top-[-1px]"
        ></div>

        <div className="flex flex-col max-w-screen-sm md:max-w-screen-md  xl:max-w-screen-xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Card: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white flex flex-col items-center rounded-lg p-10 gap-5 relative ${className}`}
    >
      {children}
    </div>
  );
};
export const CardTitle: React.FC<{
  step: string;
  title: string;
  classColor: string;
}> = ({ step, title, classColor }) => {
  return (
    <>
      <div
        className={`absolute h-12 w-12 flex justify-center items-center text-white text-2xl rounded-full top-0 -mt-5 ${classColor}`}
      >
        {step}
      </div>

      <h4 className="text-xl font-semibold">{title}</h4>
    </>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cover bg-no-repeat bg-center w-full py-5 px-10 my-5 flex flex-wrap justify-between relative backdrop-blur gap-y-3">
      <div
        style={{
          backgroundImage: `url(${IMAGES_PATH.DEGRADADO})`,
        }}
        className="bg-cover bg-cente h-1 absolute bottom-0 right-0 left-0"
      ></div>

      <img src={IMAGES_PATH.EFEVOOPAY_WHITE} width={120} />

      <div className="flex flex-col gap-1">
        <div className="flex gap-3">
          <img src={IMAGES_PATH.TELEFONO} width={20} />
          <p className="text-white">81 8029 6220</p>
        </div>
        <div className="flex gap-3">
          <img src={IMAGES_PATH.UBICACION} width={20} />
          <p className="text-white">
            Prol. Los Soles S/N, San Pedro Garza García, NL, 66260
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 ">
          <a target="_bank" href="https://www.facebook.com/efevoopay">
            <img src={IMAGES_PATH.FACEBOOK} />
          </a>
          <a
            target="_bank"
            href="https://api.whatsapp.com/send?phone=5218123508042"
          >
            <img src={IMAGES_PATH.WHATSAPP} />
          </a>
          <a target="_bank" href="https://www.instagram.com/efevoopay">
            <img src={IMAGES_PATH.INSTAGRAM} />
          </a>
        </div>
        <a href="https://efevoopay.com" className="text-white">
          efevoopay.com
        </a>
      </div>
    </footer>
  );
};

export const CompraSegura: React.FC = () => {
  return (
    <div className="flex gap-3">
      <img src={IMAGES_PATH.EFEVOO_ICON} />
      <span className="text-white text-sm">Compra segura por EfevooPay</span>
      <img src={IMAGES_PATH.MASTERCARD} width={30} />
      <img src={IMAGES_PATH.VISA} width={30} />
    </div>
  );
};

export const CardSuccess: React.FC = () => {
  return (
    <Card className="animate-fadeIn">
      <h4 className="text-xl font-semibold">¡Pago relizado con éxito!</h4>
      <img src={IMAGES_PATH.SUCCESS} width={200} />
      <p>Gracias por confiar en Efevoo Pay.</p>
    </Card>
  );
};
export const CardDeclined: React.FC = () => {
  return (
    <div className="flex justify-center w-full animate-fadeIn">
      <Card className="w-full  sm:w-full  lg:max-w-screen-sm ">
        <h4 className="text-2xl font-semibold text-gray-dark">
          Pago Recurrente fue declinado
        </h4>
        <img src={IMAGES_PATH.DECLINED} width={200} />
        <p className="text-xl text-gray-dark">Tu pago no se realizó</p>
        <p className="text-xl text-center text-gray-dark">
          No te preocupes. Inténtalo otra vez
          <br /> siguiendo nuestras sugerencias
        </p>
        <ul className="flex  flex-col ml-10 gap-2 list-disc">
          <li className="text-gray-dark">Usar una tarjeta diferente.</li>
          <li className="text-gray-dark">Revisar la conexión de red Wi-Fi.</li>
          <li className="text-gray-dark">
            Revisar que los datos estén correctos.
          </li>
        </ul>
        <div className="flex justify-center my-2">
          <Button
            className="button-save !rounded-xl"
            onClick={() => {
              window.location.reload();
            }}
          >
            Intentar de nuevo
          </Button>
        </div>
      </Card>
    </div>
  );
};
export const CardNotFound: React.FC = () => {
  return (
    <div className="flex justify-center w-full animate-fadeIn">
      <Card className="w-full  sm:w-full  lg:max-w-screen-sm ">
        <h4 className="text-2xl font-semibold text-gray-dark">
          El Pago Recurrente no fue encontrado
        </h4>
        <img src={IMAGES_PATH.NOT_FOUND} width={200} />
        <p className="text-xl text-gray-dark">El enlace no fue encontrado.</p>
        <p className="text-xl text-gray-dark">
          No te preocupes. Inténtalo otra vez
          <br /> siguiendo nuestras sugerencias
        </p>
        <ul className="flex  flex-col ml-10 gap-2 list-disc">
          <li className="text-gray-dark">Revisa correctamente tu enlace.</li>
          <li className="text-gray-dark">Revisar la conexión de red Wi-Fi.</li>
          <li className="text-gray-dark">
            Revisar que los datos estén correctos
          </li>
        </ul>
        <div className="flex justify-center my-2">
          <Button
            className="button-save !rounded-xl"
            onClick={() => {
              window.location.reload();
            }}
          >
            Intentar de nuevo
          </Button>
        </div>
      </Card>
    </div>
  );
};

export const CardEmailSuccess: React.FC = () => {
  return (
    <div className="flex justify-center w-full animate-fadeIn">
      <Card className="w-full  sm:w-full  lg:max-w-screen-sm ">
        <h4 className="text-xl font-semibold">Pago Recurrente Cancelado</h4>
        <img src={IMAGES_PATH.SUCCESS} width={200} />
        <p className="text-lg text-center">
          Tu suscripción recurrente ha sido cancelada con éxito.
        </p>
        <p className="text-sm text-center">
          A partir de ahora, no se realizarán más cargos en tu cuenta.<br/>
          Puedes reactivar tu suscripción en cualquier momento.
          
        </p>
      </Card>
    </div>
  );
};

export const CardEmail: React.FC<{
  infoCheckout: PagosRecurrentesCheckoutReadResponse;
  email: string;
  loader: boolean;
  onCancelSubscribers: () => void;
}> = ({ infoCheckout, email, loader, onCancelSubscribers }) => {
  return (
    <div className="flex justify-center w-full animate-fadeIn ">
      <Card className="w-full  sm:w-full  lg:max-w-screen-sm ">
        <img src={IMAGES_PATH.DECLINED} width={120} />
        <h4 className="text-2xl font-semibold text-gray-dark">
          ¿Deseas cancelar tu suscripción?
        </h4>

        <div className="grid grid-cols-2 gap-2 my-3 ">
          <span className="text-gray-light">Pago Recurrente:</span>
          <span className="text-gray-light  text-right">
            {infoCheckout.pagoRecurrente}
          </span>
          <span className="text-gray-light">Recurrencia:</span>
          <span className="text-gray-light  text-right">
            {RECURRENCIA_TYPES[infoCheckout.recurrencia]}
          </span>
          <span className="text-gray-light">Importe:</span>
          <span className="text-gray-light  text-right">
            {useTruncateAmout(infoCheckout.monto)}
          </span>
          <span className="text-gray-light">Correo electrónico:</span>
          <span className="text-gray-light  text-right">{email}</span>
        </div>

        <p className="text-md text-center text-gray-dark">
          Al realizar esta acción se dejarán de emitir cobros a tu tarjeta.
          <br />
          Puedes volver a suscribirte cuando desees.
        </p>

        <div className="flex gap-10  my-2">
          <div className="flex justify-center my-2">
            <Button
              className="button-save !rounded-xl gap-2"
              loading={loader}
              onClick={onCancelSubscribers}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
