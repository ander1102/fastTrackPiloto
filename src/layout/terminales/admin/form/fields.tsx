import { ChangeEvent } from "react";
import Grid from "@app/components/Grid";
import { Terminal, TerminalDisabled } from "@app/types/Terminal";
import { InputText } from "primereact/inputtext";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FormValue } from "@app/types/Form";
import { CatClientes, CatTerminalTypes } from "@app/components/Dropdowns";
import { DropdownChangeEvent } from "primereact/dropdown";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";

interface TerminalAdminFormFieldsProps extends FormValue<Terminal> {
  terminalDisabled: TerminalDisabled;
}

export function TerminalAdminFormFields({
  value,
  onChange,
  terminalDisabled,
}: TerminalAdminFormFieldsProps) {
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
    <div>
      <Grid sm={1} md={3} lg={3} gap={5}>
        <FormItem label="No. Serie *">
          <InputText
            onChange={handleChange("snTerminal")}
            keyfilter="alphanum"
            value={value.snTerminal}
            disabled={terminalDisabled.snTerminal}
            placeholder="Escribir no. de serie"
          />
        </FormItem>
        <FormItem label="Modelo *">
          <CatTerminalTypes
            onChange={handleChangeEmpresa("idagep_terminal_tipo", "Modelo")}
            value={value.idagep_terminal_tipo}
            disabled={terminalDisabled.Modelo}
            style={{borderRadius: 8}}
          />
        </FormItem>
      </Grid>

      <Grid className="mt-5" sm={1} md={3} lg={3} gap={5}>
        <FormItem label="Versión *">
          <InputText
            value={value.firmware}
            disabled={terminalDisabled.firmware}
            onChange={handleChange("firmware")}
            placeholder="Escribir versión"
          />
        </FormItem>
        <FormItem label="Cliente">
          <CatClientes
            onChange={handleChangeEmpresa("idEmpresa", "Empresa")}
            value={value.idEmpresa}
            disabled={terminalDisabled.Empresa}
            filter
            style={{borderRadius: 8}}
          />
        </FormItem>
      </Grid>
    </div>
  );
}
