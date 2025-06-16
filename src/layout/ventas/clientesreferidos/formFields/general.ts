import { CSSProperties } from "react";
import { FieldRenderType } from "@app/types/Form";
import { FormFieldData } from "@app/components/FormManager/types";
import { ClientsReferrals } from "@app/types/ClientsReferrals";

const DEFAULT_STYLES: CSSProperties = {
  width: "75%",
  height: 42,
  borderRadius: 6,
};

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  data.set("nombre", {
    FormItemProps: (props) => ({
      label: props.values.persona == 'moral' ? 'Nombre comercial' : "Nombre del negocio",
    }),
    type: "text",
    inputProps: (props) => ({
      placeholder: props.values.persona == 'moral' ? 'Nombre comercial' : "Nombre del negocio",
      style: DEFAULT_STYLES,
    })
  });
  data.set("infoComercio.razonSocial", {
    FormItemProps: (props) => ({
      label: props.values.persona == 'moral' ? 'Nombre / Denominación o Razón social' : "Nombre completo",
    }),
    type: "text",
    inputProps: (props) => ({
      placeholder: props.values.persona == 'moral' ? 'Nombre / Denominación o Razón social' : "Nombre completo",
      style: DEFAULT_STYLES,
    })
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
  data.set("idagep_catgiro", {
    FormItemProps: {
      label: "Giro del negocio",
    },
    type: "giroById",
    inputProps(props) {
      return {
        onChange: ({ value }: any) => props.setFieldValue("idagep_catgiro", value),
        placeholder: "Giro",
        style: DEFAULT_STYLES,
        filter: true,
        virtualScrollerOptions: { itemSize: 40 },
      };
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
    inputProps() {
      return {
        placeholder: "Teléfono del corporativo",
        onKeyPress: (e: any) => {
          const keyCode = e.keyCode || e.which;
          const char = String.fromCharCode(keyCode);
          if (!/[0-9]/.test(char)) {
            e.preventDefault();
          }
        },
        style: DEFAULT_STYLES,
      };
    },
  });
  data.set("infoComercio.paisConst", {
    FormItemProps: {
      label: "País de constitución",
    },
    type: "countries",
    inputProps(props) {
      return {
        onChange: ({ value }: any) =>
          props.setFieldValue("infoComercio.paisConst", value),
        editable: true,
        placeholder: "País de constitución",
        style: DEFAULT_STYLES,
        filter: true,
      };
    },
  });
  data.set("infoComercio.rfc", {
    FormItemProps: {
      label: "RFC",
    },
    type: "text",
    inputProps: {
      placeholder: "RFC ",
      style: DEFAULT_STYLES,
    },
  });
  data.set("infoComercio.email", {
    FormItemProps: {
      label: "Correo electrónico de la empresa",
    },
    type: "text",
    inputProps: {
      placeholder: "Correo electrónico",
      style: DEFAULT_STYLES,
    },
  });
};

export default setFieldData;
