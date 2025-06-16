import React from "react";
import {
  ButtonProps 
} from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";

const ButtonDeny = (props: ButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      className={`${styles.ButtonDeny} ${props.className}`}
    />
  );
}
export default ButtonDeny