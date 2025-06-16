
import { Dropdown } from "primereact/dropdown";
import { Button } from "@app/components/Buttons";
import { TERMINAL_TYPE_OPTIONS } from "@app/constants/form";

const InputDropChip = ({
    formik,
    name,
    arrendamiento,
  }: {
    formik: any;
    name: string;
    arrendamiento: string;
  }) => {
    const { values } = formik;
    const value = values && values["infoCotizacion"] ? values["infoCotizacion"][name] : null;
    const field = "infoCotizacion." + name;
    return (
      <div className="flex flex-col   mr-3">
        <Dropdown
          value={"Renta"}
          placeholder="Seleccionar"
          options={TERMINAL_TYPE_OPTIONS}
          className="mb-2 h-10"
        />
        <Button
          className="w-full h-8 mb-2 cursor-pointer"
          style={{
            backgroundColor: value ? "#5840d1" : "#5840d180",
          }}
          onClick={() => {
            formik.setFieldValue("infoCotizacion.arrendamiento", arrendamiento);
            formik.setFieldValue(field, !value ? 1 : 0);
          }}
          label="Chip 3G"
        />
      </div>
    );
  }

  export default InputDropChip