import { CSSProperties } from "react";
import { FieldRenderType } from "@app/types/Form";
import { FormFieldData } from "@app/components/FormManager/types";
import { SINO, LIQUIDACION } from "@app/constants/form";

const DEFAULT_STYLES: CSSProperties = {
  //maxWidth: "150px",
};

const getInputPropsStyles = (message: string): CSSProperties => {
  switch (message) {
    case "TASA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ddf7d9",
        borderColor: "green",
      }; //green
    case "RENTA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ddf7d9",
        borderColor: "green",
      }; //green
    case "RENTA MENOR A LA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ffeeee",
        borderColor: "red",
      }; //red
    case "TASA MENOR A LA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ffeeee",
        borderColor: "red",
      }; //red
    default:
      return { ...DEFAULT_STYLES };
  }
};
const getFormItemPropsStyles = (message: string) => {
  switch (message) {
    case "TASA PERMITIDA":
      return false; //green
    case "RENTA PERMITIDA":
      return false; //green
    case "RENTA MENOR A LA PERMITIDA":
      return true; //red
    case "TASA MENOR A LA PERMITIDA":
      return true; //red
    default:
      return undefined;
  }
};

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  data.set("infoCotizacion.giro", {
    FormItemProps: () => ({
      label: "Giro",
    }),
    type: "giroReferrals",
    inputProps(props) {
      return {
        className: "w-full",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.giro", value),
        placeholder: "Giro",
      };
    },
  });

  data.set("infoCotizacion.familia", {
    FormItemProps: () => ({
      label: "Familia",
    }),
    type: "familiasReferrals",
    inputProps(props) {
      return {
        className: "w-full",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.familia", value),
        placeholder: "Familia",
      };
    },
  });

  data.set("infoCotizacion.adquiriente", {
    FormItemProps: () => ({
      label: "Adquiriente",
    }),
    type: "adquirientesReferrals",
    inputProps(props) {
      return {
        className: "w-full",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.adquiriente", value),
        placeholder: "Adquiriente",
      };
    },
  });

  data.set("infoCotizacion.rollos", {
    FormItemProps: () => ({
      label: "Rollos regalados",
    }),
    type: "dropdown",
    inputProps(props) {
      return {
        options: SINO,
        className: "w-full",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.rollos", value),
        placeholder: "Rollos regalados",
      };
    },
  });

  data.set("infoCotizacion.ventaMensual", {
    FormItemProps: () => ({
      label: "Venta estimada mensual",
    }),
    type: "number",
    inputProps(props) {
      return {
        className: "w-full",
        placeholder: "Venta estimada mensual",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.ventaMensual", +value),
        prefix: "$",
      };
    },
  });

  data.set("infoCotizacion.ticketProm", {
    FormItemProps: () => ({
      label: "Ticket promedio",
    }),
    type: "number",
    inputProps(props) {
      return {
        className: "w-full",
        placeholder: "Ticket promedio",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.ticketProm", +value),
        prefix: "$",
      };
    },
  });

  data.set("infoCotizacion.liquidacion", {
    FormItemProps: () => ({
      label: "Liquidación",
    }),
    type: "dropdown",
    inputProps(props) {
      return {
        options: LIQUIDACION,
        className: "w-full",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.liquidacion", value),
        placeholder: "Liquidación",
      };
    },
  });

  data.set("infoCotizacion.corteDia", {
    FormItemProps: () => ({
      label: "Corte día natural",
    }),
    type: "dropdown",
    inputProps(props) {
      return {
        options: SINO,
        className: "w-full",
        onChange: ({ value }: any) =>
          props.setFieldValue("infoCotizacion.corteDia", value),
        placeholder: "Corte día natural",
      };
    },
  });

  data.set("infoCotizacion.debito", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgDebito
      );
      return {
        label: "% Débito",
        labelError: labelError,
        style: { maxWidth: "100px" },
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgDebito
      );
      return {
        placeholder: "% Débito",
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.debito", +value);
        },
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });

  data.set("resCotizacion.debito", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });

  data.set("infoCotizacion.credito", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgCredito
      );
      return {
        label: "% Credito",

        labelError: labelError,
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgCredito
      );
      return {
        placeholder: "% Credito",
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.credito", +value);
        },
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });

  data.set("resCotizacion.credito", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });

  data.set("infoCotizacion.internacional", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgInternacional
      );
      return {
        label: "% Internacional",
        labelError: labelError,
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgInternacional
      );
      return {
        placeholder: "% Internacional",
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.internacional", +value);
        },
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });

  data.set("resCotizacion.internacional", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });

  data.set("infoCotizacion.prosa", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgProsa
      );
      return {
        label: "% MSI PROSA",

        labelError: labelError,
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgProsa
      );
      return {
        placeholder: "% MSI PROSA",
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.prosa", +value);
        },
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });
  data.set("resCotizacion.prosa", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });

  data.set("infoCotizacion.tasaDebito", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgTasaDebito
      );
      return {
        label: "Tasa Débito",
        labelError: labelError,
        inputStyle: DEFAULT_STYLES,
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgTasaDebito
      );
      return {
        placeholder: "Tasa Débito",
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.tasaDebito", +value);
        },
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });

  data.set("resCotizacion.tasaDebito", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });

  data.set("infoCotizacion.tasaCredito", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgTasaCredito
      );
      return {
        label: "Tasa Credito",
        labelError: labelError,
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgTasaCredito
      );
      return {
        placeholder: "Tasa Credito",
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.tasaCredito", +value);
        },
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });

  data.set("resCotizacion.tasaCredito", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });

  data.set("infoCotizacion.tasaInternacional", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgTasaInternacional
      );
      return {
        label: "Tasa Internacional",

        labelError: labelError,
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgTasaInternacional
      );
      return {
        placeholder: "Tasa Internacional",
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.tasaInternacional", +value);
        },
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });

  data.set("resCotizacion.tasaInternacional", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });

  data.set("infoCotizacion.tasaProsa", {
    FormItemProps: (props) => {
      const labelError = getFormItemPropsStyles(
        props.values.resCotizacion.msgTasaProsa
      );
      return {
        label: "Tasa Promedio Ventas MSI",

        labelError: labelError,
      };
    },
    type: "number",
    inputProps: (props) => {
      const inputStyle = getInputPropsStyles(
        props.values.resCotizacion.msgTasaProsa
      );
      return {
        onChange: ({ value }: any) => {
          props.setFieldValue("infoCotizacion.tasaProsa", +value);
        },
        placeholder: "Tasa Promedio Ventas MSI",
        max: 1000,
        inputStyle,
        suffix: "%",
      };
    },
  });
  data.set("resCotizacion.tasaProsa", {
    FormItemProps: () => ({
      label: "Sugerencia",
    }),
    type: "number",
    inputProps: {
      placeholder: "Sugerencia",
      readOnly: true,
      suffix: "%",
      inputStyle: DEFAULT_STYLES,
    },
  });
};

export default setFieldData;
