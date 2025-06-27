import { useContext, useState } from "react";
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";
import { UserContextProps } from "@app/context";
import { useRouter } from "next/router";
import { Button } from "../Buttons";
import LogoutButton, { LogoutButtonProps } from "./LogoutButton";
import { MenuItem, MenuItems } from "./MenuItems";
import Portal from "../Portal";
import { EFEVOOPAY_LOGO_MINI_PATH } from "@app/constants";
import { ClientComponents } from "../Client";
import { ScrollPanel } from "primereact/scrollpanel";
import { PageSizeContext } from "@app/context/Size";

import styles from "./Nav.module.css";
import { ConfirmLogout } from "./modalLogOut";

interface MenuMiniProps extends LogoutButtonProps, UserContextProps {}

interface ItemProps {
  item: MenuItem;
  isSelected: boolean;
  handleConfirmLogout?: () => void;
}

const MenuItemComponent = ({ item, isSelected }: ItemProps) => {
  const tooltipClass = `nav_bar_mini_${item.keyname}`;
  return (
    <li
      key={item.keyname}
      title={item.nombre}
      className={`flex w-full justify-center`}
      style={isSelected ? { backgroundColor: 'var(--tertiary-color)', borderRadius: 10}: {cursor: 'pointer', color: '#FFF'}}
    >
      <Tooltip target={`.${tooltipClass}`} />
      {item.pathname ? (
        <Link
          href={item.pathname}
          className={`${tooltipClass} p-2 ml-0 text-center`}
          data-pr-tooltip={item.nombre}
          data-pr-position="right"
        >
          {item.Icon && <item.Icon selected={isSelected} />}
        </Link>
      ) : (
        <a
          className={tooltipClass}
          data-pr-tooltip={item.nombre}
          data-pr-position="right"
        >
          {item.Icon && <item.Icon selected={isSelected} />}
        </a>
      )}
    </li>
  );
};

export default function MenuMini({ user, onLogout }: MenuMiniProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const { fullScreen, visibleLeft, setVisibleLeft } =
    useContext(PageSizeContext);
  const router = useRouter();

  const toggleSidebarMenu = () => {
    setVisibleLeft(true);
  };

  if (visibleLeft) return null;

  return (
    <nav className="nav-mini">
      <aside>
        <div>
          <Button
            icon="pi pi-bars"
            onClick={toggleSidebarMenu}
            className="nav-mini-bars"
          />
          <Link href="/dashboard/resumen">
            <ClientComponents.Image
              alt="mini2"
              style={{marginTop:"20px"}}
              className="m-auto"
              src={EFEVOOPAY_LOGO_MINI_PATH}
              width={30}
              height={30}
            />
          </Link>
        </div>
        <ScrollPanel className="menu-mini-scroll">
          <ul>
            {MenuItems.filter((x) => !x.subRoute).map((item) => {
              if (item.hide && item.hide(user)) return;
              const isSelected =
                !!item.pathname && router.pathname.includes(item.pathname);
          
              return (
                <MenuItemComponent
                  key={item.nombre}
                  item={item}
                  isSelected={isSelected}
                />
              );
            })}
          </ul>
        </ScrollPanel>
        <div className="w-full">
          <div id="nav-bottom-mini" />
          <LogoutButton setVisible={setVisible} onLogout={onLogout} mini />
        </div>
      </aside>
      <ConfirmLogout visible={visible} setVisible={setVisible} onLogout={onLogout}/>
    </nav>
  );
}
