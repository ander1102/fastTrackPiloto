import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sidebar } from "primereact/sidebar";
import styles from "../Nav.module.css";
import LogoutButton, { LogoutButtonProps } from "../LogoutButton";
import { UserContextProps } from "@app/context";
import MenuContainer from "./container";
import EFEVOOPAY_LOGO_PATH from "../../../../public/Images/sideNav/logo_thunderpay.png";
import { ClientComponents } from "@app/components/Client";
import { ScrollPanel } from "primereact/scrollpanel";
import { PageSizeContext } from "@app/context/Size";
import { ConfirmLogout } from "../modalLogOut";

interface MenuProps extends LogoutButtonProps, UserContextProps {}

export default function Menu({ mini, onLogout, ...ctxProps }: MenuProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const { visibleLeft, setVisibleLeft, fullScreen } =
    useContext(PageSizeContext);
  const router = useRouter();

  const onHideSidebar = () => {
    if (!fullScreen || !visibleLeft) return;
    setVisibleLeft(false);
  };

  return (
    <Sidebar
      visible={visibleLeft}
      modal={false}
      onHide={() => setVisibleLeft(false)}
      showCloseIcon={true}
      fullScreen={fullScreen}
      dismissable={false}
      id="mySidenav"
      className={styles.nav}
    >
      <article className="h-full flex flex-col justify-between">
        <section>
          <Link href="/dashboard/resumen">
            <div className={styles.logoContainer}>
              <ClientComponents.Image
                alt="logo"
                src={EFEVOOPAY_LOGO_PATH}
                width={120}
                height={50}
              />
            </div>
          </Link>
        </section>
        <ScrollPanel
          className="grow h-full w-full appbar"
          style={{ height: "200px" }}
          pt={{
            content: {
              style: {
                padding: "0 3px 20px 3px",
              },
            },
          }}
        >
          <MenuContainer
            router={router}
            onHideSidebar={onHideSidebar}
            {...ctxProps}
          />
        </ScrollPanel>
        <section>
          <div id="nav-bottom" />
          <LogoutButton setVisible={setVisible} nombre={ctxProps?.user?.persona?.nombre} img={ctxProps?.user?.profileImage && ctxProps?.user?.profileImage !== "" ? ctxProps?.user?.profileImage : ""}/>
        </section>
      </article>
      <ConfirmLogout visible={visible} setVisible={setVisible} onLogout={onLogout}/>
    </Sidebar>
  );
}
