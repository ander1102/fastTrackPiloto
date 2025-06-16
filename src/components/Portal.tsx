import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  id: string;
}

/**Crea un portal pasandole el componente que se desea renderizar en algun punto del DOM pasandole el id del contenedor */
export default function Portal(props: PropsWithChildren<PortalProps>) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(props.id);
    if (el) {
      setElement(el);
    }
  }, []);

  return element ? createPortal(<>{props.children}</>, element) : null;
}
