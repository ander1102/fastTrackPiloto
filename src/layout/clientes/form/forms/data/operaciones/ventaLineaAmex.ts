import { FieldRenderType } from "@app/types/Form";
import { getNameField } from "../../../utils";
import { toByte } from "@app/common/format";
import { CSSProperties } from "react";
import { FormFieldData } from "@app/components/FormManager/types";

const DEFAULT_STYLES: CSSProperties = {
  width: "75%",
  height: 42,
  borderRadius: 6,
};

const FIELD_AMEX = getNameField("ventaLineaAMEX");

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  data.set(FIELD_AMEX.IDAGEP_ADQUIRIENTE, {
    FormItemProps: {
      label: "Adquiriente",
    },
    type: "adquiriente",
    inputProps(props) {
      return {
        placeholder: "Adquiriente",
        style: DEFAULT_STYLES,
        disabled: props.disabled,
        onChange: ({ value }: any) =>
          props.setFieldValue(FIELD_AMEX.IDAGEP_ADQUIRIENTE, value),
      };
    },
  });

  data.set(FIELD_AMEX.IDAGEP_TIPO_TASA, {
    FormItemProps: {
      label: "Tipo de tasa",
    },
    type: "tasas",
    inputProps(props) {
      return {
        placeholder: "Tipo de tasa",
        style: DEFAULT_STYLES,
        disabled: props.disabled,
        onChange: ({ value }: any) =>
          props.setFieldValue(FIELD_AMEX.IDAGEP_TIPO_TASA, value),
      };
    },
  });
  data.set(FIELD_AMEX.AFILIACION, {
    FormItemProps: {
      label: "Afiliación",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Afiliación",
        style: DEFAULT_STYLES,
        disabled: props.disabled,
        onChange: (e:any) =>
          props.setFieldValue(FIELD_AMEX.AFILIACION, e.target.value)
        
      };
    },
  });

  data.set(FIELD_AMEX.FIID, {
    FormItemProps: {
      label: "Sub Afiliado (FIID)",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Sub Afiliado (FIID)",
        style: DEFAULT_STYLES,
        disabled: props.disabled,
        onChange: (e: any) =>
          props.setFieldValue(FIELD_AMEX.FIID, e.target.value),
      };
    },
  });

  //debito
  data.set(FIELD_AMEX.COMISION_TD, {
    FormItemProps: {
      label: "Comisión tarjeta de débito",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_TD, value),
      placeholder: "Comisión tarjeta de débito",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_TD, {
    FormItemProps: {
      label: "Tasa débito",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_TD, value),
      placeholder: "Tasa débito",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  //credito
  data.set(FIELD_AMEX.COMISION_TC, {
    FormItemProps: {
      label: "Comisión tarjeta de crédito",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_TC, value),
      placeholder: "Comisión tarjeta de crédito",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_TC, {
    FormItemProps: {
      label: "Tasa crédito",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_TC, value),
      placeholder: "Tasa crédito",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  //internacional
  data.set(FIELD_AMEX.COMISION_TI, {
    FormItemProps: {
      label: "Comisión tarjeta internacional",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_TI, value),
      placeholder: "Comisión tarjeta internacional",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_TI, {
    FormItemProps: {
      label: "Tasa internacional",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_TI, value),
      placeholder: "Tasa internacional",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      style: DEFAULT_STYLES,
    }),
  });

  //PLAZO A MESES
  data.set(FIELD_AMEX.MSI, {
    type: "efevoo_checkbox",
    inputProps: (props) => {
      return {
        icon: "Screen",
        title1: "Pago a",
        title2: "Meses sin intereses",
        contentClassName: "my-5 bg-[white]",
        checked: !!props.values.ventaLineaAMEX.msi,
        onChange: (e: any) => {
          props.setFieldValue("ventaLineaAMEX.msi", toByte(e.checked));
          if (e.target.checked === false) {
            props.setFieldValue(FIELD_AMEX.MSI_3, 0);
            props.setFieldValue(FIELD_AMEX.MSI_6, 0);
            props.setFieldValue(FIELD_AMEX.MSI_9, 0);
            props.setFieldValue(FIELD_AMEX.MSI_12, 0);
            props.setFieldValue(FIELD_AMEX.MSI_18, 0);
            props.setFieldValue(FIELD_AMEX.MSI_24, 0);

            props.setFieldValue(FIELD_AMEX.COMISION_3, undefined);
            props.setFieldValue(FIELD_AMEX.COMISION_6, undefined);
            props.setFieldValue(FIELD_AMEX.COMISION_9, undefined);
            props.setFieldValue(FIELD_AMEX.COMISION_12, undefined);
            props.setFieldValue(FIELD_AMEX.COMISION_18, undefined);

            props.setFieldValue(FIELD_AMEX.INTERCAMBIO_3, undefined);
            props.setFieldValue(FIELD_AMEX.INTERCAMBIO_6, undefined);
            props.setFieldValue(FIELD_AMEX.INTERCAMBIO_9, undefined);
            props.setFieldValue(FIELD_AMEX.INTERCAMBIO_12, undefined);
            props.setFieldValue(FIELD_AMEX.INTERCAMBIO_18, undefined);
          }
        },
      };
    },
  });
  //MSI 3
  data.set(FIELD_AMEX.MSI_3, {
    type: "switch",
    inputProps: (props) => {
      return {
        value: undefined,
        checked: !!props.values.ventaLineaAMEX.msi3,
        onChange: ({ value }: any) =>
          props.setFieldValue(FIELD_AMEX.MSI_3, toByte(value)),
        disabled: Boolean(props.disabled || !props.values.ventaLineaAMEX.msi),
      };
    },
  });
  data.set(FIELD_AMEX.COMISION_3, {
    FormItemProps: {
      label: "Comisión",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_3, value),
      placeholder: "Comisión",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        props.disabled ||
          !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi3
      ),
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_3, {
    FormItemProps: {
      label: "Subtasa",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_3, value),
      placeholder: "Subtasa",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi3 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  // MSI 6
  data.set(FIELD_AMEX.MSI_6, {
    type: "switch",
    inputProps: (props) => ({
      value: undefined,
      checked: !!props.values.ventaLineaAMEX.msi6,
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.MSI_6, toByte(value)),
      disabled: Boolean(!props.values.ventaLineaAMEX.msi || props.disabled),
    }),
  });
  data.set(FIELD_AMEX.COMISION_6, {
    FormItemProps: {
      label: "Comisión",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_6, value),
      placeholder: "Comisión",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi6 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_6, {
    FormItemProps: {
      label: "Subtasa",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_6, value),
      placeholder: "Subtasa",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi6 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  //MSI 9
  data.set(FIELD_AMEX.MSI_9, {
    type: "switch",
    inputProps: (props) => ({
      value: undefined,
      checked: !!props.values.ventaLineaAMEX.msi9,
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.MSI_9, toByte(value)),
      disabled: Boolean(!props.values.ventaLineaAMEX.msi || props.disabled),
    }),
  });
  data.set(FIELD_AMEX.COMISION_9, {
    FormItemProps: {
      label: "Comisión",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_9, value),
      placeholder: "Comisión",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi9 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_9, {
    FormItemProps: {
      label: "Subtasa",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_9, value),
      placeholder: "Subtasa",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi9 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  //MSI 12
  data.set(FIELD_AMEX.MSI_12, {
    type: "switch",
    inputProps: (props) => ({
      value: undefined,
      checked: !!props.values.ventaLineaAMEX.msi12,
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.MSI_12, toByte(value)),
      disabled: Boolean(!props.values.ventaLineaAMEX.msi || props.disabled),
    }),
  });
  data.set(FIELD_AMEX.COMISION_12, {
    FormItemProps: {
      label: "Comisión",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_12, value),
      placeholder: "Comisión",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi12 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_12, {
    FormItemProps: {
      label: "Subtasa",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_12, value),
      placeholder: "Subtasa",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi12 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  //MSI 18
  data.set(FIELD_AMEX.MSI_18, {
    type: "switch",
    inputProps: (props) => ({
      value: undefined,
      checked: !!props.values.ventaLineaAMEX.msi18,
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.MSI_18, toByte(value)),
      disabled: Boolean(!props.values.ventaLineaAMEX.msi || props.disabled),
    }),
  });
  data.set(FIELD_AMEX.COMISION_18, {
    FormItemProps: {
      label: "Comisión",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_18, value),
      placeholder: "Comisión",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi18 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_18, {
    FormItemProps: {
      label: "Subtasa",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_18, value),
      placeholder: "Subtasa",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi18 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  //MSI 24
  data.set(FIELD_AMEX.MSI_24, {
    type: "switch",
    inputProps: (props) => ({
      value: undefined,
      checked: !!props.values.ventaLineaAMEX.msi24,
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.MSI_24, toByte(value)),
      disabled: Boolean(!props.values.ventaLineaAMEX.msi || props.disabled),
    }),
  });
  data.set(FIELD_AMEX.COMISION_24, {
    FormItemProps: {
      label: "Comisión",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.COMISION_24, value),
      placeholder: "Comisión",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi24 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
  data.set(FIELD_AMEX.INTERCAMBIO_24, {
    FormItemProps: {
      label: "Subtasa",
    },
    type: "number",
    inputProps: (props) => ({
      onChange: ({ value }: any) =>
        props.setFieldValue(FIELD_AMEX.INTERCAMBIO_24, value),
      placeholder: "Subtasa",
      locale: "es-Mx",
      maxFractionDigits: 2,
      minFractionDigits: 2,
      min: 0,
      disabled: Boolean(
        !props.values.ventaLineaAMEX.msi ||
          !props.values.ventaLineaAMEX.msi24 ||
          props.disabled
      ),
      style: DEFAULT_STYLES,
    }),
  });
};

export default setFieldData;
