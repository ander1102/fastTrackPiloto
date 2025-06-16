import { executeReturnedValue } from "@app/common/format";
import useValueHandler from "@app/hooks/useValueHandler";
import { PropsWithChildren, useLayoutEffect, useState } from "react";

interface ConditionItemProps extends PropsWithChildren {
  condition: boolean | (() => boolean);
}

enum MountedState {
  MOUNTED,
  UNMOUNTED,
}

let CONDITIONAL_ID_INCREMENT = 1;

/**Componente que hace un renderizado condicional a su `Children` pero los componentes no se desmontan cuando la condicion no se cumple
 * sino que quedan ocultos hasta que la condicion vuelva a cumplirse se vuelva a mostrar
 */
export default function ConditionalStoredChildrenRender({
  children,
  condition,
}: ConditionItemProps) {
  const [mountedState, setMountedState] = useState<MountedState | null>(null);
  const [id, setId] = useValueHandler<string | undefined>();

  useLayoutEffect(() => {
    const cn = executeReturnedValue(condition);
    const currId = id();

    if (!cn && !currId) {
      setMountedState(null);
    } else if (!cn && currId) {
      setMountedState(MountedState.UNMOUNTED);
    } else if (cn) {
      if (!currId)
        setId(`_conditional_component_${CONDITIONAL_ID_INCREMENT++}`);
      setMountedState(MountedState.MOUNTED);
    }
  }, [condition]);

  if (
    mountedState === MountedState.UNMOUNTED ||
    mountedState === MountedState.MOUNTED
  )
    return (
      <div
        id={id()}
        className={
          mountedState === MountedState.UNMOUNTED ? "hidden" : undefined
        }
      >
        {children}
      </div>
    );
  return null;
}
