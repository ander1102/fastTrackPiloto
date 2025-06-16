import React from "react";
import { Button as ButtonProps, Button } from "primereact/button";
import styles from "./styles.module.css";
import Image from "next/image";
import router from "next/router";

interface PropsForButton {
  destino: string;
  data?:any;
}

const ButtonDetailsLeads = (props: PropsForButton) => {
  return (
    <Button className={`${styles.leadsDetailButton}`} onClick={()=>
      router.push({pathname: props.destino, query: props.data ? { nombre: props.data.nombre } : {}} )} >
        <Image
        src="/Images/svg/ico/arrowRight.svg"
        width={20}
        height={20}
        alt=""
        />
    </Button>
  );
};
export default ButtonDetailsLeads;
