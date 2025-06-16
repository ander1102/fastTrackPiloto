import { HTMLAttributes, useState } from "react";
import { Button } from "../Buttons";

export interface OneLineAccordionProps extends HTMLAttributes<HTMLDivElement> {
  iconColor?: string;
  bgColor?: string;
}

export function OneLineAccordion({
  bgColor = "#000",
  children,
  className,
  iconColor = "#ccc",
  ...props
}: OneLineAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div
        {...props}
        className={`relative max-w-[400px] w-full h-[2px] ${className ?? ""}`}
        style={{ backgroundColor: bgColor, ...props.style }}
      >
        <Button
          className="!absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 !p-0 !rounded-full"
          style={{ backgroundColor: bgColor, color: iconColor }}
          onClick={() => setIsOpen((prevValue) => !prevValue)}
        >
          <i
            className={`pi pi-chevron-down transition-all ${
              isOpen ? "-rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      <div
        className={`w-full grid justify-center transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
