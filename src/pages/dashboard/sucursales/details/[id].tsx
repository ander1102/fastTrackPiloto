import { useState } from "react";
import { useRouter } from "next/router";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import useEffectAsync from "@app/hooks/useEffectAsync";
import PageLayout, { PageFormLayout } from "@app/layout/app/layout";
import { SubsidiaryControllers } from "@app/logic/backend/subsidiary";
import {
  DEFAULT_SUBSIDIARY_BODY,
  DEFAULT_SUBSIDIARY_INFO,
} from "@app/constants/subsidiary";
import { Subsidiary } from "@app/types/Subsidiary";
import SucursalesForm from "@app/layout/sucursales/form";
import useValueHandler from "@app/hooks/useValueHandler";
import EmptyDetailsComponent from "@app/components/EmptyTemplate/EmptyDetailsComponent";
import { execWithLoader } from "@app/utils/DOM";

const CONTEXT = "dashboard/sucursal/details";

function SucursalDetalles({ user, permission }: AppContextProps) {
  const [sucursal, setSucursal] = useState<Subsidiary | null>(null);
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffectAsync(async () => {
    const res = await execWithLoader(
      SubsidiaryControllers.get,
      [
        {
          ...DEFAULT_SUBSIDIARY_BODY(user),
          idagep_sucursal: Number(id),
        },
      ],
      CONTEXT,
      0.5
    );
    if (res.isSuccess && res.response?.length) {
      const suc = res.response[0];
      setIsSuccess(true);
      setSucursal({
        ...suc,
        infoContactos: Array.isArray(suc.infoContactos)
          ? suc.infoContactos
          : DEFAULT_SUBSIDIARY_INFO(user).infoContactos,
      });
    } else {
      setIsSuccess(false);
      setSucursal({} as Subsidiary);
    }
  }, []);

  if (isSuccess() === false)
    return (
      <EmptyDetailsComponent title="Ha ocurrido un error">
        La sucursal <b>{id}</b> no existe o no se encuentra disponible
      </EmptyDetailsComponent>
    );

  return (
    <>
      {sucursal && (
        <SucursalesForm
          title="Detalles de la sucursal"
          sucursal={sucursal}
          user={user}
          permission={permission}
        />
      )}
    </>
  );
}

export default withAppContext(SucursalDetalles, CONTEXT, {
  title: "Sucursal Detalles",
});
