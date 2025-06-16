import { ClientComponents } from "@app/components/Client";
import { EFEVOOPAY_BLACK_LOGO_PATH } from "@app/constants";
import React, { PropsWithChildren } from "react";
import styles from "./Login.module.css";

export function LoginContainer({ children }: PropsWithChildren) {
  return (
    <div className={styles.LoginContainer}>
      <section>
        <div className="flex items-center gap-4">
          <ClientComponents.Image
            alt="logo"
            className="login-image"
            src={EFEVOOPAY_BLACK_LOGO_PATH}
            width={120}
            height={63}
          />
        </div>
        <div>{children}</div>
      </section>
    </div>
  );
}
