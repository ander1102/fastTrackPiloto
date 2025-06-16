import { isClientSide, isEmptyObject, omit } from "@app/common";
import {
  CSSProperties,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ContainerStyle = { [key: string]: CSSProperties };

export interface PageSizeContextProps {
  visibleStyles: CSSProperties;
  visibleLeft: boolean;
  setVisibleLeft: Dispatch<SetStateAction<boolean>>;
  fullScreen: boolean;
  styles: ContainerStyle;
  setContainerStyles: (key: string, styles: CSSProperties) => void;
}

export const PageSizeContext = createContext(
  undefined as unknown as PageSizeContextProps
);

const MAX_WIDTH = 1024;

export const PageSizeContextProvider = ({ children }: PropsWithChildren) => {
  const [visibleLeft, setVisibleLeft] = useState<boolean>(true);
  const [styles, setStyles] = useState<ContainerStyle>({});

  const fullScreen = useMemo(
    () => visibleLeft && isClientSide() && window.innerWidth <= MAX_WIDTH,
    [visibleLeft]
  );

  const hasStyles = (key: string) =>
    !isEmptyObject(styles[key]) && !!styles[key];

  const setContainerStyles = (key: string, _styles: CSSProperties) => {
    if (hasStyles(key)) return;
    setStyles((prev) => ({
      ...prev,
      [key]: _styles,
    }));
  };

  useEffect(() => {
    const resizeChange = () => {
      if (window.innerWidth <= MAX_WIDTH && visibleLeft) {
        setVisibleLeft(false);
      } else if (window.innerWidth > MAX_WIDTH && !visibleLeft) {
        setVisibleLeft(true);
      }
    };
    window.addEventListener("resize", resizeChange);

    return () => {
      window.removeEventListener("resize", resizeChange);
    };
  }, [visibleLeft]);

  const visibleStyles: CSSProperties = useMemo(
    () => ({
      marginLeft: visibleLeft ? "15rem" : "3.5rem",
    }),
    [visibleLeft]
  );

  return (
    <PageSizeContext.Provider
      value={{
        visibleLeft,
        setVisibleLeft,
        visibleStyles,
        fullScreen,
        styles,
        setContainerStyles,
      }}
    >
      {children}
    </PageSizeContext.Provider>
  );
};
