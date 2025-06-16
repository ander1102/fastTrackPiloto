import { ButtonLoader } from "../Buttons";
import { ButtonProps as PrimerButtonProps } from "primereact/button";
import { SVG } from "../svg";
import styles from "./styles.module.css";

const ButtonPdf = (props: PrimerButtonProps) => {
  return (
    <ButtonLoader
      {...props}
      type="button"
      className={`flex items-center gap-2 ${styles.customButton}`}
    >
      <span>Exportar</span>
      <SVG.Export className="w-7 h-7" />
    </ButtonLoader>
  );
};
export default ButtonPdf;
