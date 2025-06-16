import { Button, ButtonProps } from "primereact/button";
import { SVG } from "../svg";
import Icon from "./Icon";
import styles from "./styles.module.css";

interface ButtonIconProps {
  imagePath?: string;
  svgIcon?: keyof typeof SVG;
  primeIcon?: string;
  imageClassName?: string;
  SVGClassName?: string;
  primeIconClassName?: string;
}

const ButtonIcon =({
  imagePath,
  primeIcon,
  svgIcon,
  SVGClassName,
  imageClassName,
  primeIconClassName,
  ...buttonProps
}: ButtonIconProps & ButtonProps) => {
  return (
    <Button
      {...buttonProps}
      icon={
        <Icon
          imagePath={imagePath}
          SVGClassName={SVGClassName}
          imageClassName={imageClassName}
          primeIcon={primeIcon}
          primeIconClassName={primeIconClassName}
          svgIcon={svgIcon}
        />
      }
      rounded
      className={`${styles.iconButton} ${buttonProps.className}`}
    />
  );
}
export default ButtonIcon;