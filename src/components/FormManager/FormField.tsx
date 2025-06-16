import { useContext, useEffect, useMemo } from "react";
import { executeReturnedValue } from "@app/common/format";
import { getValueByRoute } from "@app/common";
import { FormItem } from "@app/components/FormManager/FormItem";
import { toPath } from "@app/common/lodash";
import { FORM_INPUTS } from "@app/components/Form/create/inputs";
import { FormContext } from "@app/components/FormManager/FormContext";
import { FormFieldProps } from "@app/components/FormManager/types";
import { FORM_EMPTY_VALUES } from "@app/constants/form";

export const FormField = ({ field }: FormFieldProps) => {
  const { disableds, activeTab, formik, formFields, validationSchema } =
    useContext(FormContext);

  const data = useMemo(() => formFields.get(field), [field]);

  const Input = useMemo(
    () => data?.type && FORM_INPUTS[data.type],
    [data?.type]
  );

  const formItemProps = useMemo(
    () => data?.FormItemProps && executeReturnedValue(data.FormItemProps, formik),
    [formik]
  );
  const inputProps = useMemo(
    () => data?.inputProps && executeReturnedValue(data.inputProps, formik),
    [formik]
  );

  const disabled = useMemo(() => disableds[activeTab], [activeTab, disableds]);

  const value = useMemo(
    () => getValueByRoute(formik.values, field),
    [formik.values]
  );
  const error = useMemo(
    () => getValueByRoute(formik.errors, field),
    [formik.errors]
  );


  const isRequired: boolean = useMemo(() => {
    const fields = validationSchema.describe().fields;
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
  }, [activeTab]);


 

  const baseInputProps = {
    name: field,
    value,
    className: error && "p-invalid",
    disabled,
    onChange: formik.handleChange,
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
