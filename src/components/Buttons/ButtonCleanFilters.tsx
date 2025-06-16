import React from "react";
import {
  Button as PrimerButton,
  ButtonProps 
} from "primereact/button";
import styles from "./styles.module.css";

const ButtonCleanFilters = (props: ButtonProps) => {
  return (
    <PrimerButton
      {...props}
      className={`${styles.button} ${props.className}`}
    />
  );
}
export default ButtonCleanFilters