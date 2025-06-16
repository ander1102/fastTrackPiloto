import { Button } from "@app/components/Buttons";
import { InputNumber } from "primereact/inputnumber";

const InputAmount = ({ formik, name }: { formik: any; name: string }) => {
  const values = formik.values;
  const value = values && values["infoCotizacion"] ? values["infoCotizacion"][name] : null;
  const field = "infoCotizacion." + name;
  return (
    <div className="flex- flex-col m-1 max-w-[40px] b-1 mr-3 border border-solid border-primary">
      <Button
        text
        className="text-center w-full text-primary h-6"
        style={{ backgroundColor: "white" }}
        onClick={() => {
          formik.setFieldValue(field, value > 0 ? value - 1 : 0);
        }}
      >
        -
      </Button>
      <InputNumber
        size={1}
        max={100}
        min={0}
        value={+(value ?? 0)}
        inputStyle={{
          width: "37px",
          textAlign: "center",
          color: "#5840d1",
          border: "none",
          pointerEvents: "none",
        }}
        onChange={({ value }) => {
          formik.setFieldValue(field, +(value ?? 0));
        }}
      />
      <Button
        text
        className="text-center w-full text-primary h-6"
        style={{ backgroundColor: "white" }}
        onClick={() => {
          formik.setFieldValue(field, +(value ?? 0) + 1);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default InputAmount;
