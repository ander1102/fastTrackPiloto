import { HTMLAttributes } from "react";

export enum SEVERITY {
  NONE = "none",
  CAUTION = "caution",
  WARNING = "warning",
  DANGER = "danger",
}

export enum TAG_VARIANTS {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  severity: SEVERITY;
  variant?: TAG_VARIANTS;
}

const stylesBySeverityAndVariant = {
  [`${SEVERITY.NONE}${TAG_VARIANTS.PRIMARY}`]: "bg-[#B6AFE2]",
  [`${SEVERITY.NONE}${TAG_VARIANTS.SECONDARY}`]:
    "border-[#A49ADB] bg-[#EFEDF9]",
  [`${SEVERITY.CAUTION}${TAG_VARIANTS.PRIMARY}`]: "bg-[#FFCC24]",
  [`${SEVERITY.CAUTION}${TAG_VARIANTS.SECONDARY}`]:
    "border-[#FFCC24] bg-[#FFF9E5]",
  [`${SEVERITY.WARNING}${TAG_VARIANTS.PRIMARY}`]: "bg-[#FFA44E]",
  [`${SEVERITY.WARNING}${TAG_VARIANTS.SECONDARY}`]:
    "border-[#FFA44E] bg-[#FFF6EB]",
  [`${SEVERITY.DANGER}${TAG_VARIANTS.PRIMARY}`]: "bg-[#FF5758]",
  [`${SEVERITY.DANGER}${TAG_VARIANTS.SECONDARY}`]:
    "border-[#FF5758] bg-[#FFEEEE]",
};

export const Tag = ({
  className,
  label,
  severity,
  variant = TAG_VARIANTS.PRIMARY,
  ...props
}: TagProps) => {
  return (
    <span
      className={`h-8 inline-flex items-center rounded-xl text-[#312F2F] text-sm leading-6 font-medium truncate ${
        variant === TAG_VARIANTS.SECONDARY
          ? "px-3 border border-solid"
          : "w-[88px] justify-center"
      } ${stylesBySeverityAndVariant[`${severity}${variant}`]} ${className}`}
      title={label}
      {...props}
    >
      {label}
    </span>
  );
};
