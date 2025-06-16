import { CSSProperties, useEffect, useRef, useState } from "react";
import { User } from "@app/types/User";
import { OverlayPanel } from "primereact/overlaypanel";
import { NextRouter } from "next/router";
import { MenuItem, MenuItems } from "../Nav/MenuItems";
import UserAvatarImage from "./userAvatar";
import { ZENDDESK_EFEVOO_URL } from "@app/constants";

import styles from "./styles.module.css";

interface UserAvatarProps {
  user: User;
  router: NextRouter;
  visibleStyles: CSSProperties;
}

export default function UserAvatar({
  user,
  router,
  visibleStyles,
}: UserAvatarProps) {
  const [currentMenuItem, setCurrentMenuItem] = useState<
    MenuItem | undefined
  >();
  const ov = useRef<OverlayPanel | null>(null);

  useEffect(() => {
    const menuItem = MenuItems.find((item) =>
      router.pathname.endsWith(item.pathname ?? "")
    );
    if (menuItem) setCurrentMenuItem(menuItem);
  }, [router.pathname]);

  return (
    <header className="flex flex-col" style={visibleStyles}>
    {/*  <section className="flex justify-between bg-transparent px-8 pt-10 items-center z-10">
        <p className="text-3xl text-black">{currentMenuItem?.display}</p>
        {!currentMenuItem?.hideAvatar && (
          <div className="flex gap-5 items-center">
            <UserAvatarImage
              user={user}
              image={user.profileImage || undefined}
              onClick={(e) => ov.current?.toggle(e)}
            />
            <a href={ZENDDESK_EFEVOO_URL} target="_blank">
              Ayuda
            </a>
          </div>
        )}
        <OverlayPanel className={styles.overlay} ref={ov}>
          <section className="flex items-center w-full gap-3">
            <UserAvatarImage
              user={user}
              className={styles.overlayAvatar}
              image={user.profileImage || undefined}
              onClick={(e) => ov.current?.toggle(e)}
            />
            <div className="text-left">
              <p className="text-md text-ellipsis text-black">
                {user.persona?.nombre}
              </p>
              <p className="text-sm text-gray-400">{user.persona?.email}</p>
            </div>
          </section>
        </OverlayPanel>
      </section>

      */} 
       
      <section id="_nav_header_element" />
    </header>
  );
}
