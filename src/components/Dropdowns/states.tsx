import { useEffect, useState } from "react";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { InputText, InputTextProps } from "primereact/inputtext";
import states_mx from "@app/constants/states/mx_states.json";
import { DropdownOptions } from "@app/types/Form";

type TextProps = InputTextProps & React.RefAttributes<HTMLInputElement>;

type Props = DropdownProps | TextProps;

export type StatesDropdownProps = Props & {
  country: string | undefined;
};

enum StatesDropdownType {
  DROPDOWN = 0,
  TEXT = 1,
}

export default function StatesDropdown({
  country,
  ...props
}: StatesDropdownProps) {
  const [type, setType] = useState<StatesDropdownType>(StatesDropdownType.TEXT);
  const [options, setOptions] = useState<DropdownOptions[]>([]);

  useEffect(() => {
    if (country === "MX") {
      setType(StatesDropdownType.DROPDOWN);
      setOptions(
        states_mx.map((x) => ({
          label: x.nombre,
          value: x.abreviatura,
        }))
      );
    } else {
      setType(StatesDropdownType.TEXT);
      setOptions([]);
    }
  }, [country]);

  if (type === StatesDropdownType.TEXT)
    return <InputText {...(props as TextProps)} />;
  return <Dropdown {...(props as DropdownProps)} options={options} editable />;
}
