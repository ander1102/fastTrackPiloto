import { isPromiseLike } from "@app/common";
import {
  Checkbox,
  CheckboxChangeEvent,
  CheckboxProps,
} from "primereact/checkbox";
import React, { useState } from "react";

export default function LoaderCheckBox(props: CheckboxProps) {
  const [loading, setLoading] = useState(false);

  const handleChange = (e: CheckboxChangeEvent) => {
    if (!props.onChange) return;
    const change = props.onChange(e);
    if (isPromiseLike(change)) {
      setLoading(true);
      change.then(() => {
        setLoading(false);
      });
    }
  };

  if (loading) return <i className="pi pi-spin pi-spinner" />;
  return <Checkbox {...props} onChange={handleChange} />;
}
