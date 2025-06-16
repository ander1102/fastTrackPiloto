import React, { useContext, useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import ConditionalStoredChildrenRender from "@app/components/Conditional/ConditionalChildrenRender";
import Operaciones from "./operaciones";

import VentaLina from "./ventaLinea";
import Terminal from "./terminal";

import Portal from "@app/components/Portal";
import { TabContentProps } from "@app/types/Form";
import { Button } from "@app/components/Buttons";
import buttonStyles from "@app/components/Buttons/styles.module.css";

enum OPERATION_TYPE {
  TERMINAL,
  VENTA_LINEA,
}

const ITEMS = [
  { name: "Terminal", value: OPERATION_TYPE.TERMINAL },
  { name: "Venta en linea", value: OPERATION_TYPE.VENTA_LINEA },
];

export default function Content({ tabIndex }: TabContentProps) {
  const [type, setType] = useState<OPERATION_TYPE | null>(null);
  return (
    <>
      <Portal id={`_ClientTitleTabLeftChildren_${tabIndex}`}>
        {type !== null && (
          <Button
            onClick={() => setType(null)}
            className={`${buttonStyles.iconButton} text-2xl !text-light-gray-300`}
          >
            <i className="pi pi-arrow-left cursor-pointer" />
          </Button>
        )}
      </Portal>
      <Portal id={`_ClientTitleTabSection_${tabIndex}`}>
        <SelectButton
          value={type}
          onChange={(e) => setType(e.value)}
          optionLabel="name"
          options={ITEMS}
          pt={{
            button: { className: "!py-1" },
          }}
        />
      </Portal>
      <ConditionalStoredChildrenRender condition={type === null}>
        <Operaciones />
      </ConditionalStoredChildrenRender>

      {/* Nuevas Tabs*/}

      <ConditionalStoredChildrenRender
        condition={type === OPERATION_TYPE.TERMINAL}
      >
        <Terminal />
      </ConditionalStoredChildrenRender>

      <ConditionalStoredChildrenRender
        condition={type === OPERATION_TYPE.VENTA_LINEA}
      >
        <VentaLina />
      </ConditionalStoredChildrenRender>
    </>
  );
}
