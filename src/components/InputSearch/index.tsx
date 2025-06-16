import { forwardRef } from "react";
import useInputSearch from "@app/hooks/useInputSearch";
import { InputText } from "primereact/inputtext";
import { CustomInputTextProps } from "../Inputs/LeadsInputText";

const InputSearch = forwardRef<HTMLInputElement | null, CustomInputTextProps>(
  ({ onChange, delayOnChange, ...props }, ref) => {
    const { handleChange } = useInputSearch();
    return (
      <div className="p-input-search p-input-icon-right">
        <InputText
          ref={ref}
          {...props}
          onChange={(e) => handleChange(e, onChange, delayOnChange)}
        />
        <i className="pi pi-search" />
      </div>
    );
  }
);

export default InputSearch;
