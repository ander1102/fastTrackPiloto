import { Checkbox, CheckboxProps } from "primereact/checkbox";
import React from "react";
import EfevooCard, { EfevooCardProps } from "../Efevoo/Card";

export interface EfevooCheckBoxProps
  extends Omit<EfevooCardProps, "leftChildren" | "rightChildren">,
    Omit<CheckboxProps, "icon"> {}

export default function EfevooCheckBox({
  title1,
  title2,
  icon,
  contentClassName,
  ...checkBoxProps
}: EfevooCheckBoxProps) {
  return (
    <EfevooCard
      title1={title1}
      title2={title2}
      icon={icon}
      contentClassName={contentClassName}
      leftChildren={<Checkbox {...checkBoxProps} />}
    />
  );
}
