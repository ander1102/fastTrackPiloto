import React from "react";
import styles from "./Login.module.css";
import {ButtonLoader} from "@app/components/Buttons";
import Link from "next/link";
import { assetsConfig } from "../../../assets.config";

export function LoginLogo() {
  const handleCreateAccount = () => {
    return window.open(assetsConfig.login.link, "_blank");
  };

  return (
    <div className={styles.LogoContainer}>
       <Link 
        href={assetsConfig.login.link}
        className={styles.linkLandingPage}
      >
        {assetsConfig.login.showlink}
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
      <div className={`absoluteFill ${styles.LogoContainerBackground}`} style={{backgroundImage: `url(${assetsConfig.login.imagen})`}} />
    </div>
  );
}
