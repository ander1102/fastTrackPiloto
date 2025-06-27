import React from "react";
import styles from "./Login.module.css";
import {ButtonLoader} from "@app/components/Buttons";
import Link from "next/link";

export function LoginLogo() {
  const handleCreateAccount = () => {
    return window.open("https://thunderpay.info/home", "_blank");
  };

  return (
    <div className={styles.LogoContainer}>
       <Link 
        href={'https://thunderpay.info/home'}
        className={styles.linkLandingPage}
      >
        thunderpay
      </Link>
      <ButtonLoader
        style={{
          paddingLeft: 46,
          paddingRight: 46,
          paddingTop: 13,
          paddingBottom: 13,
          textAlign: "center",
          justifyContent: "center",
          borderWidth: "1px",
          borderColor:'#FFF',
          borderRadius: 25,
          marginTop: 45,
          marginRight: 62,
        }}
        className="!bg-[transparent] text-light"
        onClick={handleCreateAccount}
      >
        Crear cuenta
      </ButtonLoader>
      <div className={`absoluteFill ${styles.LogoContainerBackground}`} />
    </div>
  );
}
