import React from "react";
import { ButtonProps } from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";

const ButtonReturnLight = (props: ButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      label="Regresar"
      className={`${styles.ButtonReturnLight} ${props.className}`}
    />
  );
};
export default ButtonReturnLight;
