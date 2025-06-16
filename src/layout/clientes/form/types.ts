import { FormikCustomerType } from "@app/types/Clients";
import { FieldRenderType, FieldRenderTypeProps } from "@app/types/Form";
import {FormContextProps} from "@app/components/FormManager/types"
//import { FormItemFulfillmentProps } from "../templates";

export type ClientPersona = "fisica" | "moral";


/*export interface ClientFieldData<IType extends FieldRenderType> {
  FormItemProps?:
    | Partial<FormItemFulfillmentProps>
    | ((
        props: FormikCustomerType,
        type: ClientPersona
      ) => Partial<FormItemFulfillmentProps>);
  type: IType;
  inputProps:
    | FieldRenderTypeProps[IType]
    | ((
        props: FormikCustomerType,
        type: ClientPersona
      ) => FieldRenderTypeProps[IType]);
}
*/
