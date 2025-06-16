import * as Yup from "yup";
import { FormikCustomerType } from "@app/types/Clients";
import { FieldRenderType, FieldRenderTypeProps } from "@app/types/Form";
import { FormItemProps } from "@app/components/FormManager/FormItem"

export interface FormContextProps {
  formFields: Map<string, FormFieldData<FieldRenderType>>;
  disableds: Array<boolean>;
  activeTab: number;
  validationSchema: any;
  formMethods: any;
  formik:any;
}

export interface FormFieldProps {
  field: string;
}

export interface FormFieldData<IType extends FieldRenderType> {
  FormItemProps?:
    | Partial<FormItemProps>
    | ((props: any) => Partial<FormItemProps>);
  type: IType;
  inputProps:
    | FieldRenderTypeProps[IType]
    | ((props: any) => FieldRenderTypeProps[IType]);
}
