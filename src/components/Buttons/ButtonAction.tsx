import React from "react";
import {
  ButtonProps 
} from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";

const ButtonAction = (props: ButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      className={`${styles.ButtonAction} ${props.className}`}
    />
  );
}
export default ButtonAction