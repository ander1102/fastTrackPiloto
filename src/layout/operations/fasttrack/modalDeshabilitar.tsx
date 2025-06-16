import Image from "next/image";
import { useContext, useState } from "react";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import { Button } from "@app/components/Buttons";
import modalAceptarDeshabilitar from "./modalAceptarDeshabilitar";
import { modalManager } from "@app/components/ModalComponent";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";

import { ClientsControllers } from "@app/logic/backend/clients";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { UserContext } from "@app/context";

interface ModalDeshabilitarProps extends ViewProps {
  idagep_empresa: number;
}

function modalDeshabilitar({
  idagep_empresa,
  show,
  visibleStyles,
  handleClose,
}: PageSizeModalProps<ModalDeshabilitarProps>) {
  const userCtx = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDisableUser: (
    handleClose: (close: boolean) => void
  ) => void = async (handleClose) => {
    setLoading(true);

    const response = await ClientsControllers.updateStatus({
      idagep_usuario: userCtx.user.persona.idagep_usuarios,
      idagep_empresa,
      estatus: "Deshabilitar",
    });

    setLoading(false);
    handleClose(false);
    if (
      ["Ya deshabilitado", "Cliente Deshabilitado"].includes(
        response?.response?.mensaje
      )
    ) {
      await modalManager.show(modalAceptarDeshabilitar);
    } else {
      toast.error(
        "Ha ocurrido un error. Por favor, intente más tarde.",
        DEFAULT_TOAST_CONFIGURATION
      );
    }
  };

  return (
    <Dialog
      className="w-1/2 max-w-2xl"
      draggable={false}
      focusOnShow={false}
      maskStyle={visibleStyles}
      visible={show}
      onHide={() => handleClose(false)}
    >
      <div className="flex flex-col items-center justify-center max-w-lg m-auto">
        <div className="flex flex-col items-center gap-5 mb-4">
          <Image
            alt=""
            height={80}
            width={80}
            src="/Images/svg/ico/DeshabilitarUsuario.svg"
          />
          <h2 className="text-[#2E3339] text-3xl text-center font-normal leading-6">
            ¿Desea deshabilitar a este usuario?
          </h2>
          <p className="mt-2 text-[#2E3339] text-base text-center font-light">
            Al realizar esta acción, se deshabilitará la transaccionalidad y
            accesos del cliente. Esta acción es reversible.
          </p>
        </div>

        <div className="max-w-[320px] w-full flex flex-col gap-3">
          <div className="flex justify-center gap-8 mt-7 mb-4">
            <Button
              className="button-secondary"
              label="Regresar"
              onClick={handleClose}
            />
            <Button
              className="button-delete"
              disabled={loading}
              loading={loading}
              label="Deshabilitar"
              onClick={() => handleDisableUser(handleClose)}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default withModalPageSize(modalDeshabilitar);
