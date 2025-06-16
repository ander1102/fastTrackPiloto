import Image from "next/image";
import PageLayout, { FormTitle } from "@app/layout/app/layout";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { IntegrationsApiKeys } from "@app/layout/integraciones/documentacion";

export const DOCUMENTATION_CONTEXT = "dashboard/integraciones/documentacion";

function IntegrationsDocumentation({ user }: AppContextProps) {
  return (
    <PageLayout>
      <section className="container-header-view">
        <FormTitle title="Llaves de API" />
      </section>

      <section className="p-4 sm:p-10 bg-white">
        <div className="p-4 sm:p-14 bg-beige rounded-md">
          <section className="relative p-4 pt-14 sm:p-16 sm:pt-20 bg-white flex flex-col items-center gap-5">
            <picture
              className="h-20 w-20 rounded-full bg-[#B8EDD3] flex justify-center items-center
                absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                alt=""
                src="/Images/integrations/documentacion.svg"
                height={60}
                width={60}
              />
            </picture>

            <h2 className="text-2xl font-medium">Documentación</h2>

            <div className="w-full h-[2px] bg-[#65C986]"></div>

            <p className="px-5 text-dark-gray-200 text-center">
              Accede a toda la documentación requerida para la integración del
              motor de pagos para comercio electrónico en tu negocio.
            </p>

            <IntegrationsApiKeys user={user} />
          </section>
        </div>
      </section>
    </PageLayout>
  );
}

export default withAppContext(
  IntegrationsDocumentation,
  DOCUMENTATION_CONTEXT,
  {
    title: "Integraciones documentación",
  }
);
