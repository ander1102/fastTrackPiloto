import { GetElementType } from "@app/types";
import { ComponentType, Key, memo } from "react";

export interface MapChildrenProps<T extends any[], IProps> {
  item: GetElementType<T>;
  index: number;
  props: IProps;
}

interface MapProps<T extends any[], IProps> {
  items: T;
  children: ComponentType<MapChildrenProps<T, IProps>>;
  keyExtractor?: (item: GetElementType<T>) => Key | null | undefined;
  getProps?: () => IProps;
}

const MapComp = <T extends any[], IProps = {}>({
  items,
  children,
  keyExtractor,
  getProps,
}: MapProps<T, IProps>) => {
  if (!Array.isArray(items)) return null;
  const Render = children;
  return (
    <>
      {items.map((item, idx) => (
        <Render
          key={keyExtractor ? keyExtractor(item) : idx}
          item={item}
          index={idx}
          props={getProps ? getProps() : ({} as IProps)}
        />
      ))}
    </>
  );
};

/**Crea un mapeo de items renderizando un componente memorizado por cada item */
export const Map = memo(MapComp) as typeof MapComp;
