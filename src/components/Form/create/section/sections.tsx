import { SectionTab, TabContentProps } from "@app/types/Form";
import { useMemo } from "react";

export default function RenderSections({
  Content,
  tabIndex,
}: SectionTab & TabContentProps) {
  const Comp = useMemo(() => Content, []);
  return <>{Comp && <Comp tabIndex={tabIndex} />}</>;
}
