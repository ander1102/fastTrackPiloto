import { useRouter } from "next/router";
import { ButtonAction, ButtonPrimary } from "@app/components/Buttons";

import { useContext } from "react";
import { FormContext } from "@app/components/FormManager/FormContext";

export default function header() {
  const router = useRouter();
  const { formMethods } = useContext(FormContext);

  return (
    <>
      <section className="w-full h-full py-5 px-10">
        <div className="flex justify-between w-full mb-5">
          <div className="w-1/2">
            <p className="text-3xl text-black">Nuevo Cliente Referido</p>
          </div>
          <div className="w-1/2 flex justify-end items-center">
            <div className="bg-white py-2 px-3 rounded">
              <i className="pi pi-info-circle mr-2"></i>
              <span className="text-md">
                Es requerido llenar toda la información para poder enviar el
                Cliente Referido
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="w-1/2">
            <div
              className={
                "text-2xl h-1/2 text-[#6A6D74] flex items-center mt-3 cursor-pointer"
              }
              onClick={() => router.back()}
            >
              <i className={"pi pi-arrow-left mr-2"} />
              <span>Regresar</span>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="mr-1">
              <ButtonPrimary
                label="Enviar"
                disabled={formMethods.disabledSend}
                onClick={formMethods.handleSend}
              />
            </div>
            <div className="ml-2">
              <ButtonAction
                label="Guardar"
                disabled={formMethods.disabledSave}
                onClick={formMethods.handleSave}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
