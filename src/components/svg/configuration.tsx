import { SVGProps } from "react";

interface ConfigurationProps extends SVGProps<SVGSVGElement> {
  gStroke?: string;
}

export const Configuration = ({ gStroke, ...props }: ConfigurationProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24.25}
    height={24.25}
    {...props}
  >
    <g
      fill="none"
      stroke={gStroke ?? "#9cb7f8"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      data-name="settings (4)"
      transform="translate(.125 .125)"
    >
      <path
        d="M23.5 14.3V9.7L21 9.08a9.43 9.43 0 0 0-.59-1.41l1.31-2.18-3.21-3.25-2.18 1.31A9.43 9.43 0 0 0 14.92 3L14.3.5H9.7L9.08 3a9.43 9.43 0 0 0-1.41.59L5.49 2.24 2.24 5.49l1.31 2.18A9.43 9.43 0 0 0 3 9.08L.5 9.7v4.6l2.5.62a9.43 9.43 0 0 0 .59 1.41l-1.35 2.18 3.25 3.25 2.18-1.31a9.43 9.43 0 0 0 1.41.55l.62 2.5h4.6l.62-2.5a9.43 9.43 0 0 0 1.41-.59l2.18 1.31 3.25-3.25-1.31-2.18a9.43 9.43 0 0 0 .55-1.37Z"
        data-name="Trazado 57521"
      />
      <circle
        cx={5.5}
        cy={5.5}
        r={5.5}
        data-name="Elipse 18423"
        transform="translate(6.5 6.5)"
      />
    </g>
  </svg>
);
