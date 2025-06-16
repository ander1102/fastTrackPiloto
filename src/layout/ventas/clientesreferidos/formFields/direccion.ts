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
    inputProps() {
      return {
        placeholder: "Calle",
        style: { width: "87.5%", height: 42, borderRadius: 6 },
      };
    },
  });
  data.set("infoDomicilio.colonia", {
    FormItemProps: {
      label: "Colonia",
    },
    type: "text",
    inputProps() {
      return {
        placeholder: "Colonia",
        style: { width: "75%", height: 42, borderRadius: 6 },
      };
    },
  });
  data.set("infoDomicilio.numExt", {
    FormItemProps: {
      label: "Número Ext.",
    },
    type: "text",
    inputProps() {
      return {
        placeholder: "Número Ext.",
        style: { width: "50%", height: 42, borderRadius: 6 },
      };
    },
  });
  data.set("infoDomicilio.numInt", {
    FormItemProps: {
      label: "Número Int.",
    },
    type: "text",
    inputProps() {
      return {
        placeholder: "Número Int.",
        style: { width: "50%", height: 42, borderRadius: 6 },
      };
    },
  });
  data.set("infoDomicilio.municipio", {
    FormItemProps: {
      label: "Delegación",
    },
    type: "text",
    inputProps() {
      return {
        placeholder: "Delegación",
        style: { width: "75%", height: 42, borderRadius: 6 },
      };
    },
  });
  data.set("infoDomicilio.codigoPostal", {
    FormItemProps: {
      label: "Código postal",
    },
    type: "text",
    inputProps() {
      return {
        placeholder: "Código postal",
        style: { width: "75%", height: 42, borderRadius: 6 },
      };
    },
  });
  data.set("infoDomicilio.ciudad", {
    FormItemProps: {
      label: "Ciudad",
    },
    type: "text",
    inputProps() {
      return {
        placeholder: "Ciudad",
        style: { width: "75%", height: 42, borderRadius: 6 },
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
        filter: true,
        style: { width: "75%", height: 42, borderRadius: 6 },
      };
    },
  });

};

export default setFieldData;
