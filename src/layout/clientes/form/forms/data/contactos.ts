import { INIT_CLIENTS, INIT_INFO_CONTACTS } from "@app/constants/client";
import { FieldRenderType } from "@app/types/Form";
import { CSSProperties } from "react";
import { FormFieldData } from "@app/components/FormManager/types";
const DEFAULT_STYLES: CSSProperties = {
  width: "75%",
  height: 42,
  borderRadius: 6,
};

const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  INIT_INFO_CONTACTS.forEach((_, idx) => {
    const contactNumber = idx + 1;
    data.set(`infoContactos[${idx}].nombre`, {
      FormItemProps: {
        label: "Nombre completo contacto",
      },
      type: "text",
      inputProps(props) {
        return {
          placeholder: `Nombre completo contacto ${contactNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[`infoContactos[${idx}].nombre`] ?? true
              : props.disabled
          ),
          style: DEFAULT_STYLES,
        };
      },
    });
    data.set(`infoContactos[${idx}].email`, {
      FormItemProps: {
        label: "Correo electrónico de contacto",
      },
      type: "text",
      inputProps(props) {
        return {
          placeholder: `Correo electrónico de contacto ${contactNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[`infoContactos[${idx}].email`] ?? true
              : props.disabled
          ),
          style: DEFAULT_STYLES,
        };
      },
    });
    data.set(`infoContactos[${idx}].telefono`, {
      FormItemProps: {
        label: "Teléfono de contacto",
      },
      type: "text",
      inputProps(props) {
        return {
          placeholder: `Teléfono de contacto ${contactNumber}`,
          disabled: Boolean(
            props.activeTab == 99
              ? props.fulfillment[`infoContactos[${idx}].telefono`] ?? true
              : props.disabled
          ),
          style: DEFAULT_STYLES,
          onKeyPress: (e: any) => {
            const keyCode = e.keyCode || e.which;
            const char = String.fromCharCode(keyCode);
            if (!/[0-9]/.test(char)) {
              e.preventDefault();
            }
          },
        };
      },
    });
  });
};

export default setFieldData;
