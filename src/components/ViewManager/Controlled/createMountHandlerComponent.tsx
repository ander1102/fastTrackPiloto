import React, { useEffect, ComponentType } from "react";
import { register } from "./create";

/**Registra un componente dentro de una coleccion donde se controla es estado de dicho componente, asignandole a un EventHandler
 * donde se pueden suscribir varios eventos
 */
export function createMountHandlerComponent<T extends JSX.IntrinsicAttributes>(
  ComponentWithRef: ComponentType<T>,
  key: string
): ComponentType<T> {
  if (!key)
    throw new Error(
      "No hay ninguna key asignada a este EventHandler, se necesita un identificador para manejar el estatus y los eventos a los que el componente esta suscrito"
    );
  return (props) => {
    useEffect(() => {
      register.registerComponent({
        key,
        status: "mounted",
      });

      return () => {
        register.changeStatus(key, "unmounted");
      };
    }, []);

    return <ComponentWithRef {...props} />;
  };
}
