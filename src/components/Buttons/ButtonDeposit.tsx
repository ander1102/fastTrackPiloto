import React from "react";
import {
  ButtonProps 
} from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";

const ButtonDeposit = (props: ButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      label="Depositar"
      className={`${styles.ButtonDeposit} ${props.className}`}
    />
  );
}
export default ButtonDeposit