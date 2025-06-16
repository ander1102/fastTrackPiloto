import { FieldRenderType } from "@app/types/Form";
import { FormFieldData } from "@app/components/FormManager/types";
import setGeneralFieldData from "../formFields/general";
import setDireccionFieldData from "../formFields/direccion";
import setContactosFieldData from "../formFields/contactos";
import setRepresentantesFieldData from "../formFields/representantes";
import setCotizacionFieldData from "../formFields/cotizacion";

const useFormFields = () => {
  const data = new Map<string, FormFieldData<FieldRenderType>>();
  setGeneralFieldData(data);
  setDireccionFieldData(data);
  setContactosFieldData(data);
  setRepresentantesFieldData(data);
  setCotizacionFieldData(data);
  return data;
};
export default useFormFields;
