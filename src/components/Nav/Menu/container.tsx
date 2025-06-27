import { NextRouter } from "next/router";
import Link from "next/link";
import { UserContextProps } from "@app/context";
import { MenuItem, MenuItems } from "../MenuItems";

import styles from "../Nav.module.css";
import Portal from "@app/components/Portal";
import { useEffect, useMemo, useState } from "react";

interface MenuContainerProps extends UserContextProps {
  router: NextRouter;
  onHideSidebar: () => void;
}

interface ItemProps {
  item: MenuItem;
  isSelected: boolean;
  isShowDrop: boolean;
  onClick: () => void;
}

const MenuItemComponent = ({
  item,
  isSelected,
  onClick,
  isShowDrop,
}: ItemProps) => {
  const isLink = item.pathname && !item.isDrop && !item.subRoute;
  const isDrop = item.pathname && item.isDrop && !item.subRoute;
  const isSubLink = item.pathname && item.isDrop && item.subRoute;

  if(isSubLink && !isShowDrop) return null
 
  return (
    <li
      className={`justify-between flex py-[5px]`}
      style={isSelected ? 
        { backgroundColor: 'var(--tertiary-color)', borderRadius: 10, marginTop: isSubLink && isShowDrop ? 5 : 0 }
          : 
        {cursor: 'pointer', color: 'var(--white-color)'}}
      key={item.keyname}
    >
      {isLink && (
        <>
          <Link
            href={item.pathname ?? ""}
            className={styles.itemsTitle}
            onClick={onClick}
          >
            <div className={styles.pathLessContainerIcon}>
              {item.Icon && <item.Icon selected={isSelected} />}
            </div>
            <span
              className={
                !isSelected
                  ? styles.navMenuItemTitle
                  : styles.navMenuItemTitleActive
              }
            >
              {item.nombre}
            </span>
          </Link>
        </>
      )}

      {isDrop && (
        <>
          <div className={styles.itemsTitle} onClick={onClick} style={{cursor: 'pointer'}}>
            <div className={styles.pathLessContainerIcon}>
              {item.Icon && <item.Icon selected={isSelected} />}
            </div>
            <span
              className={
                !isSelected
                  ? styles.navMenuItemTitle
                  : styles.navMenuItemTitleActive
              }
            >
              {item.nombre}
            </span>
          </div>
        </>
      )}

      {isSubLink && isShowDrop && (
        <>
          <Link
            onClick={onClick}
            href={item.pathname ?? ""}
            className={"flex justify-start w-full p-2 pl-5 ml-[20px]"}
          >
            <span
              className={`w-2 h-2 mt-1 m-2 ${
                !isSelected ? "bg-[#bca3c0]" : "bg-[#FFF]"
              }`}
            ></span>
            <span
              className={`text-sm
                ${!isSelected ? "text-[#bca3c0]" : "text-[#FFF]"}`}
            >
              {item.nombre}
            </span>
          </Link>
        </>
      )}
    </li>
  );
};

const getModuleName = (value: string | undefined) => {
  if (!value) return "";
  const valueArray = value.split("/");
  return valueArray.length > 2 ? valueArray[2] : "";
};

const MenuItemsFiltered = MenuItems.filter((x) => !x.subRoute || x.isDrop);
const ShowKeyNames: { [key: string]: boolean } = MenuItemsFiltered.filter(
  (x) => !x.subRoute
).reduce((acc, x) => ({ ...acc, [x.keyname]: false }), {});

export default function MenuContainer({
  router,
  user,
  onHideSidebar,
}: MenuContainerProps) {
  const [showDrops, setShowDrops] = useState(ShowKeyNames);

  return (
    <ul className={styles.itemsContainer}>
      {MenuItemsFiltered.map((item) => {
        if (item.hide && item.hide(user)) return;

        const isSelected =
          (!!item.pathname && router.pathname.includes(item.pathname)) ||
          getModuleName(router.pathname) === item.keyname;

        const isShowDrop = !!(item.subRoute && showDrops?.[item.subRoute]);

        return (
          <MenuItemComponent
            key={item.keyname}
            item={item}
            isSelected={isSelected}
            isShowDrop={isShowDrop}
            onClick={() => {
              onHideSidebar();
              setShowDrops((prev) => ({
                ...prev,
                [item.keyname]: !prev[item.keyname],
              }));
            }}
          />
        );
      })}
    </ul>
  );
}
