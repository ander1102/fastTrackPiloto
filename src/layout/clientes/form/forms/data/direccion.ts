import { FieldRenderType } from "@app/types/Form";
import { FormFieldData } from "@app/components/FormManager/types";

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  data.set("infoDomicilio.calle", {
    FormItemProps: {
      label: "Calle",
      slg: 2,
      smd: 2,
      ssm: 1,
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Calle",
        style: { width: "87.5%", height: 42, borderRadius: 6 },
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.calle"] ?? true
            : props.disabled
        ),
      };
    },
  });
  data.set("infoDomicilio.colonia", {
    FormItemProps: {
      label: "Colonia",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Colonia",
        style: { width: "75%", height: 42, borderRadius: 6 },
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.colonia"] ?? true
            : props.disabled
        ),
      };
    },
  });
  data.set("infoDomicilio.numExt", {
    FormItemProps: {
      label: "Número Ext.",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Número Ext.",
        style: { width: "50%", height: 42, borderRadius: 6 },
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.numExt"] ?? true
            : props.disabled
        ),
      };
    },
  });
  data.set("infoDomicilio.numInt", {
    FormItemProps: {
      label: "Número Int.",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Número Int.",
        style: { width: "50%", height: 42, borderRadius: 6 },
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.numInt"] ?? true
            : props.disabled
        ),
      };
    },
  });
  data.set("infoDomicilio.municipio", {
    FormItemProps: {
      label: "Delegación",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Delegación",
        style: { width: "75%", height: 42, borderRadius: 6 },
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.municipio"] ?? true
            : props.disabled
        ),
      };
    },
  });
  data.set("infoDomicilio.codigoPostal", {
    FormItemProps: {
      label: "Código postal",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Código postal",
        style: { width: "75%", height: 42, borderRadius: 6 },
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.codigoPostal"] ?? true
            : props.disabled
        ),
      };
    },
  });
  data.set("infoDomicilio.ciudad", {
    FormItemProps: {
      label: "Ciudad",
    },
    type: "text",
    inputProps(props) {
      return {
        placeholder: "Ciudad",
        style: { width: "75%", height: 42, borderRadius: 6 },
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.ciudad"] ?? true
            : props.disabled
        ),
      };
    },
  });
  data.set("infoDomicilio.estado", {
    FormItemProps: {
      label: "Estado",
    },
    type: "states",
    inputProps(props) {
      return {
        country: props.values.infoDomicilio.pais ?? "",
        onChange: (e: any) => {
          props.setFieldValue("infoDomicilio.estado", e.target.value);
        },
        placeholder: "Estado",
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.estado"] ?? true
            : props.disabled
        ),
        filter: true,
        style: { width: "75%", height: 46, borderRadius: 6 },
      };
    },
  });
  data.set("infoDomicilio.pais", {
    FormItemProps: {
      label: "País",
    },
    type: "countries",
    inputProps(props) {
      return {
        onChange: ({ value }: any) =>
          props.setFieldValue("infoDomicilio.pais", value),
        placeholder: "País",
        filter: true,
        editable: true,
        disabled: Boolean(
          props.activeTab == 99
            ? props.fulfillment["infoDomicilio.pais"] ?? true
            : props.disabled
        ),
        style: { width: "75%", height: 42, borderRadius: 6 },
      };
    },
  });
};

export default setFieldData;
