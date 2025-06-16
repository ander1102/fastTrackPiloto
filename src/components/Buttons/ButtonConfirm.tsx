import React from "react";
import { ButtonProps } from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";

const ButtonConfirm = (props: ButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      label="Confirmar"
      className={`${styles.ButtonConfirm} ${props.className}`}
    />
  );
};
export default ButtonConfirm;
