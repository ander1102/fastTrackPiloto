import useInputSearch from "@app/hooks/useInputSearch";
import { InputText, InputTextProps } from "primereact/inputtext";

export interface CustomInputTextProps
  extends InputTextProps,
    React.RefAttributes<HTMLInputElement> {
  /**Establece un delay cuando se llama al evento `onChange`, util para hacer consultas externas
   * Es recomendable que si se establece un delay el input no este controlado por un estado
   * en dado caso se puede usar el evento `onInput`
   */
  delayOnChange?: number;
}

export default function CustomInputText({
  delayOnChange,
  onChange,
  ...props
}: CustomInputTextProps) {
  const { handleChange } = useInputSearch();

  return (
    <InputText
      {...props}
      onChange={(e) => handleChange(e, onChange, delayOnChange)}
      style={{ borderRadius: 6, border: "1px solid #D4D5D5" }}
    />
  );
}
