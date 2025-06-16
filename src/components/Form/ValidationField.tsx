import { useMemo } from "react";
import { FormRecordResult } from "@app/types/Form";

export default function ValidationFields<T, K extends keyof T>({
  selectValidateValue,
  id,
  display,
  validate,
  value,
}: Partial<FormRecordResult<T, K>> & {
  id?: string;
  value: T[K];
  display: (selector: any) => string;
}) {
  const isValid = useMemo(
    () => validate && validate(value, selectValidateValue),
    [value, selectValidateValue]
  );
  if (!selectValidateValue) return null;
  return (
    <small className={`${!isValid ? "p-error" : ""}`} id={id}>
      {display(selectValidateValue)}
    </small>
  );
}
