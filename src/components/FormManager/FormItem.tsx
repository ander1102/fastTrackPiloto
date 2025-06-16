import Grid, { type ItemProps } from "@app/components/Grid";
import { PropsWithChildren, CSSProperties } from "react";
//Usar este Form FormItem e ir dejando de usar los demas 
export interface FormItemProps extends ItemProps {
  label?: string;
  labelClassName?: string;
  validate?: boolean;
  error?: boolean | string;
  info?: string;
  childrenClassName?:string;
  infoClassName?: string; //
  required?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}

export const FormItem = ({
  children,
  disabled = false,
  required = false,
  className = "w-full",
  validate = false,
  error = false,
  label = "",
  labelClassName = "",
  info,
  infoClassName = "",
  childrenClassName="item-default",
  style,
}: PropsWithChildren<FormItemProps>) => {
  const currentLabelClassName = ["text-md", "mb-2"];
  if (disabled) {
    currentLabelClassName.push("txt-disabled");
  }
  if (label == "") {
    currentLabelClassName.push("opacity-0");
  }
  if (validate) {
    currentLabelClassName.push("text-[#60b650]");
    childrenClassName = "item-validate";
  }
  if (error) {
    currentLabelClassName.push("text-[#FF5758]");
    childrenClassName = "item-error";
  }
  if (!validate && !error) {
    if (labelClassName) {
      currentLabelClassName.push(labelClassName);
    } else {
      currentLabelClassName.push("text-gray-800");
    }
  }

  return (
    <Grid.Item className={className} style={style}>
      <div className="flex flex-col md:gap-1 md:flex-row md:items-center mr-3">
        <p className={currentLabelClassName.join(" ")}>
          {label && <span>{label}</span>}
          {required && <span className="pb-4">*</span>}
        </p>
        {error && <small className={"p-error"}>{error}</small>}
      </div>
      <div className={childrenClassName}>{children}</div>
      {info && <small className={infoClassName}>{info}</small>}
    </Grid.Item>
  );
};
