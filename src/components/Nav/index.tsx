import React, {
  CSSProperties,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons 
import MenuMini from "./MenuMini";
import { excludePaths } from "@app/constants";
import dynamic from "next/dynamic";
import { UserContext } from "@app/context";
import { isEmptyObject, Sleep } from "@app/common";
import UserAvatar from "../Avatar";
import Menu from "./Menu";
import { AppLogic } from "@app/logic/app";
import Portal from "../Portal";
import { PageSizeContext } from "@app/context/Size";

import styles from "./Nav.module.css";
import { ConfirmLogout } from "./modalLogOut";

const ModalContainer = dynamic(() => import("@app/components/ModalComponent"), {
  ssr: false,
});

export default function Dashboard({ children }: PropsWithChildren) {
  const mainRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const { visibleStyles, styles: _styles } = useContext(PageSizeContext);

  const containerStyles: CSSProperties = useMemo(() => {
    const currStyles = _styles[router.pathname];
    return currStyles || {};
  }, [_styles, router.pathname]);

  const onLogout = () => {
    AppLogic.Logout(userCtx, router);
  };

  if (excludePaths.some((path) => router.pathname.endsWith(path)))
    return <>{children}</>;
  return (
    <main ref={mainRef} className="flex flex-col grow">
      {userCtx.user && !isEmptyObject(userCtx.user) && (
        <>
          <Portal id="navbar">
            <UserAvatar
              visibleStyles={visibleStyles}
              router={router}
              user={userCtx.user}
            />
          </Portal>
          <Menu {...userCtx} onLogout={onLogout}/>
          <MenuMini {...userCtx} onLogout={onLogout}/>
        </>
      )}
      <div
        className={styles.container}
        style={{
          ...visibleStyles,
          ...containerStyles,
        }}
      >
        <ModalContainer context />
        {children}
      </div>
    </main>
  );
}
