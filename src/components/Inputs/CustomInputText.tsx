import useValueHandler from "@app/hooks/useValueHandler";
import { InputText, InputTextProps } from "primereact/inputtext";
import React, { ChangeEvent } from "react";

interface CustomInputTextProps
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
  ...props
}: CustomInputTextProps) {
  const [timer, setTimer] = useValueHandler<NodeJS.Timeout | number>(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!props.onChange) return;
    if (delayOnChange) {
      clearInterval(timer());
      setTimer(
        setTimeout(() => {
          props.onChange!(e);
        }, delayOnChange)
      );
      return;
    }
    props.onChange(e);
  };

  return <InputText {...props} onChange={handleChange} />;
}
