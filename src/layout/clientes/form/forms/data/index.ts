import { FieldRenderType } from "@app/types/Form";
import setGeneralFieldData from "./general";
import setDireccionFieldData from "./direccion";
import setContactosFieldData from "./contactos";
import setOperacionesFieldData from "./operaciones";
import setRepresentantesFieldData from "./representantes";
import setCotizacionFieldData from "./cotizacion";
import { FormFieldData } from "@app/components/FormManager/types";

export const createClientFieldData = () => {
  const data = new Map<string, FormFieldData<FieldRenderType>>();
  setGeneralFieldData(data);
  setDireccionFieldData(data);
  setContactosFieldData(data);
  setOperacionesFieldData(data);
  setRepresentantesFieldData(data);
  setCotizacionFieldData(data)
  return data;
};

export default createClientFieldData;
