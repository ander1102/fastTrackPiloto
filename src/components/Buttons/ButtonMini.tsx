import { Button, ButtonProps } from "primereact/button";
import { SVG } from "../svg";
import styles from "./styles.module.css";

interface ButtonMiniProps extends ButtonProps {
  svgIcon?: keyof typeof SVG;
  primeIcon?: string;
}

const ButtonMini = ({ svgIcon, primeIcon, ...props }: ButtonMiniProps) =>{
  const SVGIcon = svgIcon && SVG[svgIcon];
  const hasIcon = !!(SVGIcon || primeIcon);
  return (
    <Button {...props} className={styles.miniButton}>
      {SVGIcon && <SVGIcon className={styles.miniButtonIcon} />}
      {primeIcon && (
        <i className={`pi ${primeIcon} ${styles.miniButtonPrimeIcon}`} />
      )}
      {!hasIcon && (
        <i className={`pi pi-question ${styles.miniButtonPrimeIcon}`} />
      )}
    </Button>
  );
}
export default ButtonMini;
