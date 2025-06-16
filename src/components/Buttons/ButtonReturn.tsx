import React from "react";
import { ButtonProps } from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";

const ButtonReturn = (props: ButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      label="Regresar"
      className={`${styles.ButtonReturn} ${props.className}`}
    />
  );
};
export default ButtonReturn;
