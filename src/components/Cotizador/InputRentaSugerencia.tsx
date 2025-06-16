import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const InputRentaSugerencia = ({
  formik,
  name,
}: {
  formik: any;
  name: string;
}) => {
  const values = formik.values;
  const value =
    values && values["infoCotizacion"] ? values["infoCotizacion"][name] : 0;
  const valueResponse =
    values && values["resCotizacion"] ? values["resCotizacion"][name] : 0;
  const field = "infoCotizacion." + name;
  return (
    <div className="flex flex-col">
      <label className="text-primary">Renta</label>
      <InputNumber
        size={10}
        className="boder-primary"
        inputStyle={{ height: "25px", border: "1px solid #A79FDE" }}
        mode="decimal"
        maxFractionDigits={2}
        value={value ?? 0}
        prefix="$"
        onChange={({ value }) => {
          formik.setFieldValue(field, +(value ?? 0));
        }}
      />
      <label className="text-primary">Sugerencia</label>
      <InputText
        size={10}
        readOnly
        className="boder-primary"
        value={"$ " + (valueResponse ?? "0")}
        style={{ height: "30px", border: "1px solid #A79FDE" }}
      />
    </div>
  );
};

export default InputRentaSugerencia;
