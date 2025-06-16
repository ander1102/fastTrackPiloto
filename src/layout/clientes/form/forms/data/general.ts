import { CSSProperties } from "react";
import { ORIGEN_OPTIONS } from "@app/constants/client";
import { FieldRenderType } from "@app/types/Form";
import { FormFieldData } from "@app/components/FormManager/types";

const DEFAULT_STYLES: CSSProperties = {
  width: "75%",
  height: 42,
  borderRadius: 6,
};

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  data.set("nombre", {
    FormItemProps: (props) => ({
      label:
        props.values.persona === "moral"
          ? "Nombre Comercial"
          : "Nombre del negocio",
    }),
    type: "text",
    inputProps: {
      placeholder: "Nombre comercial",
      style: DEFAULT_STYLES,
    },
  });
  data.set("infoComercio.razonSocial", {
    FormItemProps: (props) => ({
      label:
        props.values.persona === "moral"
          ? "Nombre / Denominación o Razón social"
          : "Nombre Completo",
    }),
    type: "text",
    inputProps: {
      placeholder: "Razón social",
      style: DEFAULT_STYLES,
    },
  });
  data.set("email", {
    FormItemProps: {
      label: "Correo electrónico",
    },
    type: "text",
    inputProps: {
      placeholder: "Correo electrónico",
      style: DEFAULT_STYLES,
    },
  });
  data.set("Giro", {
    FormItemProps: {
      label: "Giro del negocio",
    },
    type: "giro",
    inputProps(props) {
      return {
        emptyMessage: "No se encontraron resultados.",
        emptyFilterMessage: "No se encontraron resultados.",
        filter: true,
        placeholder: "Giro",
        style: DEFAULT_STYLES,
        virtualScrollerOptions: { itemSize: 40 },
        onChange: ({ value }: any) => props.setFieldValue("Giro", value),
      };
    },
  });
 
  data.set("infoComercio.rfc", {
    FormItemProps: {
      label: "RFC o Número de Identificación fiscal",
    },
    type: "text",
    inputProps: {
      placeholder: "RFC o Número de Identificación fiscal",
      style: DEFAULT_STYLES,
    },
  });
  data.set("infoComercio.fechaConst", {
    FormItemProps: {
      label: "Fecha de constitución",
    },
    type: "calendar",
    inputProps(props) {
      return {
        value:
          props.values.infoComercio.fechaConst &&
          new Date(props.values.infoComercio.fechaConst),
        onChange: ({ value }: any) =>
          props.setFieldValue("infoComercio.fechaConst", value ?? ""),
        placeholder: "DD/MM/AAAA",
        className: "myCalendarButton",
        style: DEFAULT_STYLES,
        dateFormat: "dd/mm/yy",
        maxDate: new Date(),
        showIcon: true,
        showButtonBar: true,
      };
    },
  });
  data.set("infoComercio.telefono", {
    FormItemProps: {
      label: "Teléfono del corporativo",
    },
    type: "text",
    inputProps(props) {
      return {
        maxLength: 10,
        placeholder: "Teléfono del corporativo",
        onKeyPress: (e: any) => {
          const keyCode = e.keyCode || e.which;
          const char = String.fromCharCode(keyCode);
          if (!/[0-9]/.test(char)) {
            e.preventDefault();
          }
        },
        style: DEFAULT_STYLES,
        disabled:
          props.activeTab == 99
            ? !!props.fulfillment["infoComercio.telefono"]
            : !!props.disabled,
      };
    },
  });
  data.set("infoComercio.origen", {
    FormItemProps: {
      label: "Origen del Cliente",
    },
    type: "dropdown",
    inputProps: (props) => ({
      options: ORIGEN_OPTIONS,
      onChange: ({ value }: any) =>
        props.setFieldValue("infoComercio.origen", value),
      optionLabel: "label",
      placeholder: "Seleccionar",
      style: { width: "75%", height: 42, borderRadius: 6 },
    }),
  });
};

export default setFieldData;
