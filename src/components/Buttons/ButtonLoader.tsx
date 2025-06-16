import { isPromiseLike } from "@app/common";
import React, { useState } from "react";
import Button from "./Button";
import { ButtonProps } from "primereact/button";
interface ButtonLoaderProps extends ButtonProps {
  customButton?: boolean;
}

export default function ButtonLoader({
  customButton,
  loading: propsLoading,
  ...props
}: ButtonLoaderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const showSpinner = propsLoading || loading;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.onClick) return;
    const change = props.onClick(e);
    if (isPromiseLike(change)) {
      if (propsLoading === undefined) setLoading(true);
      change.then(() => {
        if (propsLoading === undefined) setLoading(false);
      });
    }
  };

  if (customButton)
    return (
      <button
        {...props}
        onClick={handleClick}
        disabled={loading || props.disabled}
      >
        {showSpinner ? <i className="pi pi-spin pi-spinner" /> : props.children}
      </button>
    );

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={loading || props.disabled}
      loading={showSpinner}
    >
      {!showSpinner && props.children}
    </Button>
  );
}
