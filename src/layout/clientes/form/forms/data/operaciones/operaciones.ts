import { FieldRenderType } from "@app/types/Form";
import { CSSProperties } from "react";

import { FormFieldData } from "@app/components/FormManager/types";
import { DateToTimeString, TimeStringToDate } from "@app/common/date";

const DEFAULT_STYLES: CSSProperties = {
  width: "75%",
  height: 42,
  borderRadius: 6,
};

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  data.set("infoOperaciones.ventaMensual", {
    FormItemProps: {
      label: "Venta estimada mensual",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue("infoOperaciones.ventaMensual", value),
      placeholder: "Venta estimada mensual",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  data.set("infoOperaciones.ticketPromedio", {
    FormItemProps: {
      label: "Ticket promedio",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue("infoOperaciones.ticketPromedio", value),
      placeholder: "Ticket promedio",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  data.set("infoOperaciones.ticketAlto", {
    FormItemProps: {
      label: "Ticket alto",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue("infoOperaciones.ticketAlto", value),
      placeholder: "Ticket alto",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  data.set("infoOperaciones.horarioI", {
    type: "calendar",
    inputProps: (props) => ({
      className: "flex-1",
      hourFormat: "24",
      placeholder: "Horario de entrada",
      readOnlyInput: true,
      showTime: true,
      timeOnly: true,
      value:
        props.values.infoOperaciones.horarioI &&
        props.values.infoOperaciones.horarioI.length === 8
          ? TimeStringToDate(props.values.infoOperaciones.horarioI)
          : null,
      onChange: (e: any) =>
        props.setFieldValue(
          "infoOperaciones.horarioI",
          DateToTimeString(e.value as Date)
        ),
    }),
  });
  data.set("infoOperaciones.horarioF", {
    type: "calendar",
    inputProps: (props) => ({
      className: "flex-1",
      hourFormat: "24",
      placeholder: "Horario de salida",
      readOnlyInput: true,
      showTime: true,
      timeOnly: true,
      value:
        props.values.infoOperaciones.horarioF &&
        props.values.infoOperaciones.horarioF.length === 8
          ? TimeStringToDate(props.values.infoOperaciones.horarioF)
          : null,
      onChange: (e: any) =>
        props.setFieldValue(
          "infoOperaciones.horarioF",
          DateToTimeString(e.value as Date)
        ),
    }),
  });
  //FONDO RESERVA Y 3DS
  data.set("3DS", {
    type: "switch",
    inputProps: (props) => ({
      value: undefined,
      checked: Boolean(props.values["3DS"]),
      onChange: ({ value }: any) => props.setFieldValue("3DS", value),
    }),
  });
  data.set("fondoActivo", {
    type: "switch",
    inputProps: (props) => ({
      value: undefined,
      checked: !!props.values.fondoActivo,
      onChange: ({ value }: any) => props.setFieldValue("fondoActivo", value),
    }),
  });
  data.set("minimo3DS", {
    FormItemProps: (props) => ({
      disabled: Boolean(!props.values["3DS"] || props.disabled),
      label: "Monto mínimo",
    }),
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) => props.setFieldValue("minimo3DS", value),
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      placeholde: "Monto mínimo",
      disabled: Boolean(!props.values["3DS"] || props.disabled),
      style: Boolean(!props.values["3DS"] || props.disabled)
        ? {
            width: "75%",
            height: 42,
            borderRadius: 6,
            backgroundColor: "#EFEFEF",
          }
        : DEFAULT_STYLES,
    }),
  });
  data.set("porcetaje", {
    FormItemProps: (props) => ({
      disabled: Boolean(!props.values.fondoActivo || props.disabled),
      label: "Porcentaje a retener",
    }),
    type: "number",
    inputProps: (props) => ({
      locale: "es-Mx",
      onChange: ({ value }: any) =>
        props.setFieldValue("porcetaje", value as number),
      placeholder: "Porcentaje a retener",
      disabled: Boolean(!props.values.fondoActivo || props.disabled),
      style: Boolean(!props.values.fondoActivo || props.disabled)
        ? {
            width: "75%",
            height: 42,
            borderRadius: 6,
            backgroundColor: "#EFEFEF",
          }
        : DEFAULT_STYLES,
    }),
  });
  data.set("idagep_catpago", {
    FormItemProps: {
      label: "Método de Pago",
    },
    type: "pago",
    inputProps(props) {
      return {
        onChange: ({ value }: any) =>
          props.setFieldValue("idagep_catpago", value),
        placeholder: "Selecciona una opción",
        style: DEFAULT_STYLES,
        args: { idagep_empresa: props.values.idagep_empresa },
      };
    },
  });
  //BANCO
  data.set("infoOperaciones.banco", {
    FormItemProps: {
      label: "Banco",
    },
    type: "text",
    inputProps: {
      placeholder: "Banco",
      style: DEFAULT_STYLES,
    },
  });
  data.set("infoOperaciones.cuenta", {
    FormItemProps: {
      label: "Cuenta",
    },
    type: "text",
    inputProps: {
      placeholder: "Cuenta",
      keyfilter: "int",
      style: DEFAULT_STYLES,
    },
  });
  data.set("infoOperaciones.clabe", {
    FormItemProps: {
      label: "Clabe interbancaria",
    },
    type: "text",
    inputProps: {
      placeholder: "Clabe interbancaria",
      keyfilter: "int",
      style: DEFAULT_STYLES,
    },
  });
  data.set("infoOperaciones.titular", {
    FormItemProps: {
      label: "Titular",
    },
    type: "text",
    inputProps: {
      placeholder: "Titular",
      style: DEFAULT_STYLES,
    },
  });
};

export default setFieldData;
