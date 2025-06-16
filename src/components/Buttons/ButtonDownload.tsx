import React from "react";
import { ButtonProps } from "primereact/button";
import ButtonLoader from "./ButtonLoader";
import styles from "./styles.module.css";
import Image from "next/image";
const ButtonDownload = (props: ButtonProps) => {
  return (
    <ButtonLoader
      className={`${styles.ButtonDownload} ${props.className}`}
      {...props}
    >
      <Image src="/Images/svg/ico/export.svg" width={15} height={12} alt="" />
      {!props.label && <span className="ml-1">Descargar</span>}
    </ButtonLoader>
  );
};
export default ButtonDownload;
