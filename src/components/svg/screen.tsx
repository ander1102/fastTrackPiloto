import { SVGProps } from "react";

export const Screen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill="#1A1A1A"
      d="M20.023 22.548H7.313a2.1 2.1 0 0 1-2.1-2.1v-7.79c0-1.16.94-2.1 2.1-2.1h12.71c1.16 0 2.1.94 2.1 2.1v7.79a2.1 2.1 0 0 1-2.1 2.1Zm-12.71-10.91c-.56 0-1.02.45-1.02 1.02v7.79c0 .56.46 1.01 1.02 1.01h12.71c.56 0 1.01-.45 1.02-1.01v-7.79c0-.56-.46-1.02-1.02-1.02H7.313Z"
    />
    <path
      fill="#1A1A1A"
      d="M13.333 15.907h-5.61c-.3 0-.54-.24-.54-.54 0-.3.24-.54.54-.54h5.62c.3 0 .54.24.54.54 0 .3-.24.54-.54.54h-.01Z"
    />
    <path
      stroke="#1A1A1A"
      strokeMiterlimit={10}
      strokeWidth={0.882}
      d="M25.56 1.071H1.776c-.693 0-1.254.562-1.254 1.254V26.11c0 .692.561 1.254 1.254 1.254H25.56c.692 0 1.254-.561 1.254-1.254V2.325c0-.692-.562-1.254-1.254-1.254ZM.522 5.202h26.292"
    />
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={0.882}
      d="M1.958 3.059h.237M3.771 3.059h.237M5.584 3.059h.237"
    />
  </svg>
);
