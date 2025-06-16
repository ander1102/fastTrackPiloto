import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { FORM_INPUTS } from "@app/components/Form/create/inputs";
import { FormikCustomerType } from "@app/types/Clients";
import { FieldRenderType } from "@app/types/Form";
import { ClientPersona } from "../types";
import createClientFieldData from "./data";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FormFieldData } from "@app/components/FormManager/types";


import { executeReturnedValue } from "@app/common/format";
import { getValueByRoute } from "@app/common";
import { FormClientes } from "../../useFormClientes";
import { ClientFormLayoutProps } from "..";
import { VALIDATION_CLIENT_ALL } from "@app/constants/client";
import { toPath } from "@app/common/lodash";
import { FORM_EMPTY_VALUES } from "@app/constants/form";

interface ClientFieldProps {
  field: string;
}

interface ClientContext {
  /**Son todos los atributos y metodos del hook `useFormClientes` */
  formProps: FormClientes;
  /**Son todos los atributos y metodos exclusivos para manipular los fields del form de clientes */
  clientProps: FormikCustomerType;
  /**Son las props heredadas del form de clientes */
  formLayoutProps: ClientFormLayoutProps;
  /**Es la data de cada field mapeada para su render */
  fieldData: Map<string, FormFieldData<FieldRenderType>>;
  /**Tipo de cliente */
  type: ClientPersona;
}

export const ClientFormContext = createContext(
  undefined as unknown as ClientContext
);

export const ClientFormContextProvider = ({
  children,
  type,
  formLayoutProps,
  ...formProps
}: PropsWithChildren<
  FormClientes & Pick<ClientContext, "type" | "formLayoutProps">
>) => {
  const fieldData = useMemo(() => createClientFieldData(), []);

  const clientProps: FormikCustomerType = {
    activeTab: formProps.activeTab,
    canFulfillment: false,
    disabled: formProps.disabled[formProps.activeTab ?? 0],
    errors: formProps.formik.errors,
    fulfillment: formProps.clientFulfillment,
    handleChange: formProps.formik.handleChange,
    setFieldValue: formProps.formik.setFieldValue,
    setFulfillment: formProps.setClientFulfillment,
    values: formProps.formik.values,
    isNew: formProps.isNew,
    onDocumentChange: formProps.handleOnDocumentChange,
  };

  return (
    <ClientFormContext.Provider
      value={{ clientProps, fieldData, formProps, type, formLayoutProps }}
    >
      {children}
    </ClientFormContext.Provider>
  );
};

export const ClientField = ({ field }: ClientFieldProps) => {
  const { clientProps, fieldData, type, formProps } =
    useContext(ClientFormContext);

  const data = useMemo(() => fieldData.get(field), [field]);
  const Input = useMemo(
    () => data?.type && FORM_INPUTS[data.type],
    [data?.type]
  );

  const formItemProps = useMemo(
    () =>
      data?.FormItemProps &&
      executeReturnedValue(data.FormItemProps, clientProps, type),
    [clientProps, type]
  );
  const inputProps = useMemo(
    () =>
      data?.inputProps &&
      executeReturnedValue(data.inputProps, clientProps, type),
    [clientProps, type]
  );

  const value = useMemo(
    () => getValueByRoute(clientProps.values, field),
    [clientProps.values]
  );
  const error = useMemo(
    () => getValueByRoute(clientProps.errors, field),
    [clientProps.errors]
  );

  const isRequired: boolean = useMemo(() => {
    const fields = VALIDATION_CLIENT_ALL.describe().fields;
    const path = toPath(field);
    let currSchema = fields[path[0]];
    if (!currSchema) return false;
    let isNested = false;
    if (currSchema.type === "object") {
      isNested = true;
      currSchema = (currSchema as any).fields;
    } else if (currSchema.type === "array") {
      isNested = true;
      currSchema = (currSchema as any)?.innerType.fields;
    }
    const value = !isNested
      ? currSchema
      : getValueByRoute(currSchema || {}, path[path.length - 1]);
    return value?.optional !== undefined && !value.optional;
  }, [formProps.activeTab]);

  const baseInputProps = {
    name: field,
    value,
    onChange: clientProps.handleChange,
    className: error && "p-invalid",
    disabled: clientProps.disabled,
  };

  if (!formItemProps)
    return (
      <>{Input && <Input {...baseInputProps} {...(inputProps || {})} />}</>
    );
  return (
    <FormItem
      {...formItemProps}
      required={isRequired}
      error={error && FORM_EMPTY_VALUES.includes(value) ? error : undefined}
    >
      {Input && <Input {...baseInputProps} {...(inputProps || {})} />}
    </FormItem>
  );
};
