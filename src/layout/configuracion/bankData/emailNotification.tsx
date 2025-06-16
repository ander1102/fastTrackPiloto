import { useContext, useState } from "react";
import LoaderCheckBox from "@app/components/Checkbox/LoaderCheckBox";
import { UserContext } from "@app/context";
import { CheckboxChangeEvent } from "primereact/checkbox";
import { DepositsControllers } from "@app/logic/backend/deposits";
import { toByte } from "@app/common/format";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";

export default function EmailNotificationConfiguration() {
  const userCtx = useContext(UserContext);
  const [enable, setEnable] = useState(
    () => !!userCtx.client.infoComercio?.correoDeposito
  );

  const onChange = async (e: CheckboxChangeEvent) => {
    setEnable(e.checked ?? false);
    const result = toByte(e.checked);
    const res = await DepositsControllers.depositEmail({
      idagep_empresa: userCtx.user.idagep_empresa ?? 0,
      avisoCorreo: result,
    });
    if (res.isSuccess && res.response?.mensaje) {
      toast.info(res.response.mensaje, DEFAULT_TOAST_CONFIGURATION);
      userCtx.setClient((prev) => ({
        ...prev,
        infoComercio: prev.infoComercio && {
          ...prev.infoComercio,
          correoDeposito: result,
        },
      }));
    }
  };
  return (
    <section className="flex items-center gap-10">
      <div className="flex flex-col">
        <span>Notificacion de depósitos</span>
        <span className="text-light-gray-300">
          Recibir correos cuando se deposite dinero en tu cuenta bancaria
        </span>
      </div>
      <div className="flex items-center gap-3 bg-light-blue-100 px-5 py-3 rounded">
        <LoaderCheckBox checked={enable} onChange={onChange} />
        <span>Habilitar</span>
      </div>
    </section>
  );
}
