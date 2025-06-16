import { SVG } from "@app/components/svg";
import React, { ReactElement, useMemo } from "react";

export interface EfevooCardProps {
  title1: string;
  title2: string;
  contentClassName?: string;
  leftChildren?: ReactElement;
  rightChildren?: ReactElement;
  icon?: keyof typeof SVG;
  imageUrl?: string;
}

export default function EfevooCard({
  icon,
  title1,
  title2,
  imageUrl,
  contentClassName,
  leftChildren,
  rightChildren,
}: EfevooCardProps) {
  const Icon = useMemo(() => icon && SVG[icon], [icon]);
  return (
    <div
      className={`rounded-lg flex justify-between items-center gap-5 px-7 py-5 ${
        contentClassName ?? ""
      }`}
    >
      {leftChildren && <div>{leftChildren}</div>}
      <div className="flex items-center gap-5 flex-[1]">
        {Icon && <Icon />}
        {imageUrl && <img src={imageUrl} className="w-[30px]" />}
        <div className="flex flex-col text-dark-gray-400">
          <p className="text-xs">{title1}</p>
          <p>{title2}</p>
        </div>
      </div>
      {rightChildren && <div>{rightChildren}</div>}
    </div>
  );
}
