import { PropsWithChildren } from "react";
import { LoginContainer } from "./LoginContainer";
import { LoginLogo } from "./LoginLogo";
import styles from "./Login.module.css";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <LoginContainer>{children}</LoginContainer>
      <LoginLogo />
    </div>
  );
}
