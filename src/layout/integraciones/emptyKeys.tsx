import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Button } from "primereact/button";
import { modalManager } from "@app/components/ModalComponent";
import RestrictedKeys from "@app/components/ModalComponent/modals/integrations/RestrictedKeys";
import { toast } from "react-toastify";
import { User } from "@app/types/User";
import { IntegrationsControllers } from "@app/logic/backend/integrations";
import { INTEGRATIONS_CONTEXT } from "@app/pages/dashboard/integraciones";

interface IEmptyIntegrationKeys {
  user: User;
  restrictGenerateKeys: boolean;
}

export const EmptyIntegrationKeys: FC<IEmptyIntegrationKeys> = ({
  user,
  restrictGenerateKeys,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRefresh = () => {
    router.reload();
  };

  const handleCreateEcommerce = async () => {
    if (restrictGenerateKeys) {
      return modalManager.show(RestrictedKeys, {}, INTEGRATIONS_CONTEXT);
    }
    setIsLoading(true);
    try {
      const res = await IntegrationsControllers.generateApiKeys({
        idagep_empresa: user.idagep_empresa ?? 0,
      });
      setIsLoading(false);
      if (res.response?.mensaje?.includes("generadas correctamente")) {
        await handleRefresh();
      }
    } catch (error:any) {
      toast.error(error)
    }

  };

  return (
    <section className="bg-white grow flex flex-col justify-center items-center gap-3">
      <img
        src="/Images/integrations/ecommerce_request.png"
        className="w-[90px] h-[90px]"
      />
      <h3>
        Aún no has generado <b>API Keys</b> para tu aplicación
      </h3>
      <Button
        className="w-56 !border-none !bg-primary-color justify-center hover:!opacity-80"
        loading={isLoading}
        onClick={handleCreateEcommerce}
      >
        {isLoading ? "" : "Crear ligas de pago"}
      </Button>
    </section>
  );
};
