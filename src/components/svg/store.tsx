import { SVGProps } from "react";

export const Store = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M5 3a2 2 0 0 0-2 2v1.838l-1.51 4.53A2.001 2.001 0 0 0 3 13.963V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6.037a2.001 2.001 0 0 0 1.51-2.595L21 6.837V5a2 2 0 0 0-2-2H5Zm10 17h4v-6H5v6h4v-3a3 3 0 1 1 6 0v3Zm-4 0h2v-3a1 1 0 1 0-2 0v3Zm-7.613-8 1.334-4H6.32l-.667 4H3.387Zm4.293 0 .667-4H11v4H7.68ZM13 12V8h2.653l.667 4H13Zm5.347 0-.667-4h1.6l1.333 4h-2.266ZM19 5v1H5V5h14Z"
      clipRule="evenodd"
    />
  </svg>
);
