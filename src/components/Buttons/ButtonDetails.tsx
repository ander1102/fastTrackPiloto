import React from "react";
import { Button as PrimerButton, ButtonProps } from "primereact/button";
import styles from "./styles.module.css";
import { SVG } from "../svg";

const ButtonDetails = (props: ButtonProps) => {
  return (
    <PrimerButton
      {...props}
      className={`${styles.ButtonDetails} ${props.className}`}
    >
      <SVG.ArrowRight className="w-[20px] h-[20px] text-purple-light" />
    </PrimerButton>
  );
};
export default ButtonDetails;
