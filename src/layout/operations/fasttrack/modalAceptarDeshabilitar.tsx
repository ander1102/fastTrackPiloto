import Image from "next/image";
import { Dialog } from "primereact/dialog";
import { Button } from "@app/components/Buttons";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
interface ModalAceptarDeshabilitarProps extends ViewProps {}

function modalAceptarDeshabilitar({
  show,
  visibleStyles,
  handleClose,
}: PageSizeModalProps<ModalAceptarDeshabilitarProps>) {
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
            Usuario deshabilitado
          </h2>
          <p className="mt-2 text-[#2E3339] text-base text-center font-light">
            El usuario ha sido deshabilitado de manera exitosa.
          </p>
        </div>

        <div className="max-w-[320px] w-full">
          <div className="flex justify-center mt-7 mb-4">
            <Button
              className="button-confirm"
              label="Regresar"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default withModalPageSize(modalAceptarDeshabilitar);
