import React from "react";
import { Button as PrimerButton, ButtonProps } from "primereact/button";
import styles from "./styles.module.css";
import Image from "next/image";
const ButtonNew = (props: ButtonProps) => {
  return (
    <PrimerButton
      className={`${styles.ButtonNew} ${props.className}`}
      {...props}
      label={''}
    >
      <Image src="/Images/svg/ico/new.svg" width={15} height={12} alt="" />
      <span className="ml-1">{props.label ?? ""}</span>
    </PrimerButton>
  );
};
export default ButtonNew;
