import {
  ComponentType,
  forwardRef,
  LegacyRef,
  ReactElement,
  Ref,
  useMemo,
} from "react";
import { ScrollPanel, ScrollPanelProps } from "primereact/scrollpanel";

import styles from "./styles.module.css";

export interface SectionItem<T> {
  title?: string;
  items: T[];
}

export interface SectionProps<T> extends ScrollPanelProps {
  items: SectionItem<T>[];
  RenderItem: ComponentType<{ item: T }>;
  keyExtractor?: (item: T) => string | number;
  RenderHeader?: ComponentType<Pick<SectionItem<T>, "title">>;
  Separator?: ComponentType<{ item: T }>;
  headerSticky?: boolean;
}

const SectionListComponent = <T,>(
  {
    items,
    RenderItem,
    RenderHeader,
    keyExtractor,
    Separator,
    headerSticky,
    ...props
  }: SectionProps<T>,
  ref: LegacyRef<ScrollPanel>
) => {
  if (!RenderItem) throw new Error("RenderItem required");
  const finalItems = useMemo(
    () => (Array.isArray(items) ? items : []),
    [items]
  );

  return (
    <ScrollPanel ref={ref} {...props}>
      {finalItems.map((x, i) => {
        return (
          <section key={i}>
            {x.title && (
              <header className={headerSticky ? styles.TitleSticky : undefined}>
                {RenderHeader ? <RenderHeader title={x.title} /> : x.title}
              </header>
            )}
            {x.items.map((item, i) => {
              const key = keyExtractor ? keyExtractor(item) : i;
              return (
                <div id={`section_item_${i}_${key}`} key={key}>
                  <RenderItem item={item} />
                  {Separator && <Separator item={item} />}
                </div>
              );
            })}
          </section>
        );
      })}
    </ScrollPanel>
  );
};

const SectionList = forwardRef(SectionListComponent) as <T>(
  p: SectionProps<T> & { ref?: Ref<ScrollPanel> }
) => ReactElement;

export default SectionList;
