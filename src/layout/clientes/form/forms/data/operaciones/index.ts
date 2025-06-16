import { FieldRenderType } from "@app/types/Form";
import { FormFieldData } from "@app/components/FormManager/types";
import setOperacionesFieldData from "./operaciones";
import setVentaLineaFieldData from "./ventaLinea";
import setVentaLineaAmexFieldData from "./ventaLineaAmex";
import setTerminalesFieldData from "./terminales";
import setTerminalesAmexFieldData from "./terminalesAmex";



const setFieldData = (data: Map<string, FormFieldData<FieldRenderType>>) => {
  setOperacionesFieldData(data);
  setVentaLineaFieldData(data);
  setVentaLineaAmexFieldData(data);
  setTerminalesFieldData(data);
  setTerminalesAmexFieldData(data);
};

export default setFieldData;
