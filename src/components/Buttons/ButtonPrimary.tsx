import React from "react";
import {
  ButtonProps 
} from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";

const ButtonPrimary = (props: ButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      className={`${styles.ButtonPrimary} ${props.className}`}
    />
  );
}
export default ButtonPrimary