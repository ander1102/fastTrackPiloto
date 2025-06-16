import { SVGProps } from "react";

export const ArrowLeft = (props?: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m7 16-4-4m0 0 4-4m-4 4h18" />
  </svg>
);
