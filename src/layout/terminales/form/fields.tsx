import { ChangeEvent } from "react";
import Grid from "@app/components/Grid";
import { Terminal, TerminalDisabled } from "@app/types/Terminal";
import { InputText } from "primereact/inputtext";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FormValue } from "@app/types/Form";
import { CatSucursal, CatTerminalTypes } from "@app/components/Dropdowns";
import { DropdownChangeEvent } from "primereact/dropdown";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";

interface TerminalFormFieldsProps extends FormValue<Terminal> {
  terminalDisabled: TerminalDisabled;
}

export default function TerminalFormFields({
  value,
  onChange,
  terminalDisabled,
}: TerminalFormFieldsProps) {
  const handleChange =
    (key: keyof Terminal) =>
    (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
      onChange((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleChangeEmpresa =
    (id: keyof Terminal, value: keyof Terminal) =>
    (e: CustomDropdownChangeEvent) => {
      const _id = e.value;
      const _value = e.label;
      onChange((prev) => ({
        ...prev,
        [id]: _id,
        [value]: _value,
      }));
    };

  return (
 
    
    <Grid sm={1} md={3} lg={3} gap={5}>
      <FormItem label="No. Serie">
        <InputText
          onChange={handleChange("snTerminal")}
          value={value.snTerminal}
          disabled={terminalDisabled.snTerminal}
        />
      </FormItem>
      <FormItem label="Versión">
        <InputText
          disabled={terminalDisabled.firmware}
          onChange={handleChange("firmware")}
          value={value.firmware}
        />
      </FormItem>
      <FormItem label="Modelo">
        <CatTerminalTypes
          className="w-full"
          onChange={handleChangeEmpresa("idagep_terminal_tipo", "Modelo")}
          value={value.idagep_terminal_tipo}
          disabled={terminalDisabled.Modelo}
        />
      </FormItem>
      <FormItem label="Sucursal">
        <CatSucursal
          className="w-full"
          value={value.idagep_sucursal}
          onChange={handleChange("idagep_sucursal")}
          disabled={terminalDisabled.Modelo}
        />
      </FormItem>
    </Grid>  

  );
}
