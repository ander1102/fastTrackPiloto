import { INIT_INFO_REPRESENTATIVES } from "@app/constants/client";
import { FieldRenderType } from "@app/types/Form";
import { CSSProperties } from "react";
import { FormFieldData } from "@app/components/FormManager/types";
const DEFAULT_STYLES: CSSProperties = {
  width: "75%",
  height: 42,
  borderRadius: 6,
};

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  INIT_INFO_REPRESENTATIVES.forEach((_, idx) => {
    const representanteNumber = idx + 1;
    data.set(`infoRepresentantes[${idx}].nombre`, {
      FormItemProps: (props) => ({
        label: "Nombre completo",
      }),
      type: "text",
      inputProps(props) {
        return {
          placeholder: `Nombre completo representante ${representanteNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[`infoRepresentantes[${idx}].nombre`] ?? true
              : props.disabled
          ),
          style: { width: "100%", height: 42, borderRadius: 6 },
        };
      },
    });
    data.set(`infoRepresentantes[${idx}].fechaNacimiento`, {
      FormItemProps: {
        label: "Fecha de nacimiento",
      },
      type: "calendar",
      inputProps(props) {
        const fechaNacimiento =
          props.values.infoRepresentantes[idx].fechaNacimiento;
        return {
          value: fechaNacimiento && new Date(fechaNacimiento),
          onChange: ({ value }: any) =>
            props.setFieldValue(
              `infoRepresentantes[${idx}].fechaNacimiento`,
              value ?? ""
            ),
          placeholder: "DD/MM/AAAA",
          className: "myCalendarButton",
          dateFormat: "dd/mm/yy",
          maxDate: new Date(),
          showIcon: true,
          showButtonBar: true,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[
                  `infoRepresentantes[${idx}].fechaNacimiento`
                ] ?? true
              : props.disabled
          ),
          style: { width: "100%", height: 42, borderRadius: 6 },
        };
      },
    });
    data.set(`infoRepresentantes[${idx}].rfc`, {
      FormItemProps: {
        label: "RFC o número de identificación fiscal",
      },
      type: "text",
      inputProps(props) {
        return {
          placeholder: `RFC del representante ${representanteNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[`infoRepresentantes[${idx}].rfc`] ?? true
              : props.disabled
          ),
          style: { width: "100%", height: 42, borderRadius: 6 },
        };
      },
    });
    data.set(`infoRepresentantes[${idx}].curp`, {
      FormItemProps: {
        label: "CURP",
      },
      type: "text",
      inputProps(props) {
        return {
          placeholder: `CURP del representante ${representanteNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[`infoRepresentantes[${idx}].curp`] ?? true
              : props.disabled
          ),
          style: { width: "100%", height: 42, borderRadius: 6 },
        };
      },
    });
    data.set(`infoRepresentantes[${idx}].pais`, {
      FormItemProps: {
        label: "País de nacimiento",
      },
      type: "countries",
      inputProps(props) {
        return {
          onChange: ({ value }: any) =>
            props.setFieldValue(`infoRepresentantes[${idx}].pais`, value),
          editable: true,
          filter: true,
          placeholder: `País de nacimiento del representante ${representanteNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[`infoRepresentantes[${idx}].pais`] ?? true
              : props.disabled
          ),
          style: { width: "100%", height: 42, borderRadius: 6 },
        };
      },
    });
    data.set(`infoRepresentantes[${idx}].numeroAcreditacion`, {
      FormItemProps: {
        label: "Registro Público del Poder notariado del Representante Legal",
      },
      type: "text",
      inputProps(props) {
        return {
          placeholder: `Registro Público ${representanteNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[
                  `infoRepresentantes[${idx}].numeroAcreditacion`
                ] ?? true
              : props.disabled
          ),
          style: { width: "100%", height: 42, borderRadius: 6 },
        };
      },
    });
  });
};

export default setFieldData;
