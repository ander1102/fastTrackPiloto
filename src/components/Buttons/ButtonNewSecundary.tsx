import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Button as PrimerButton, ButtonProps } from "primereact/button";
const ButtonNewSecundary = (props: ButtonProps) => {
  return (
    <PrimerButton
      className={`${styles.ButtonNewSecundary} ${props.className}`}
      {...props}
      label={''}
    >
      <Image src="/Images/svg/ico/new.svg" width={15} height={12} alt=""  />
      <span className="ml-2">{props.label ?? ""}</span>
    </PrimerButton>
  );
};
export default ButtonNewSecundary;
