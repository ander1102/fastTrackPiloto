import { beginUppercase } from "@app/common/format";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FormField, FormValue } from "@app/types/Form";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { ChangeEvent } from "react";

interface ControllerFieldsProps<T> extends FormValue<T> {
  fields: FormField<T>[];
}

export default function ControllerFields<T>({
  value,
  onChange,
  fields,
}: ControllerFieldsProps<T>) {
  const handleChange =
    (key: keyof T) =>
    (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
      onChange((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  return (
    <>
      {fields.map((field) => {
        const key = field.key as string;
        const display = field.display || key;
        return (
          <FormItem
            label={`${beginUppercase(display)}${field.required ? "*" : ""}`}
            key={field.key as string}
          >
            <div className="flex items-center w-full mr-5">
              {field.options ? (
                <Dropdown
                  options={field.options}
                  id={key}
                  value={value[field.key]}
                  onChange={handleChange(field.key)}
                  className="flex-1"
                />
              ) : (
                <InputText
                  value={value[field.key] as unknown as string}
                  id={key}
                  onChange={handleChange(field.key)}
                  className="flex-1"
                />
              )}
            </div>
          </FormItem>
        );
      })}
    </>
  );
}
