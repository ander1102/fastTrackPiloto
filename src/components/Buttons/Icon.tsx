import { SVG } from "../svg";

interface ButtonIconProps {
    imagePath?: string;
    svgIcon?: keyof typeof SVG;
    primeIcon?: string;
    imageClassName?: string;
    SVGClassName?: string;
    primeIconClassName?: string;
  }
  
const Icon = ({
    imagePath,
    primeIcon,
    svgIcon,
    SVGClassName,
    imageClassName,
    primeIconClassName,
  }: ButtonIconProps) => {
    const SVGIcon = svgIcon && SVG[svgIcon];
    return (
      <>
        {imagePath && (
          <img
            src={imagePath}
            className={imageClassName}
            height={35}
            width={35}
            alt=""
          />
        )}
        {SVGIcon && <SVGIcon className={SVGClassName} />}
        {primeIcon && (
          <i className={`pi ${primeIcon} ${primeIconClassName ?? ""}`} />
        )}
      </>
    );
  };

  export default Icon;