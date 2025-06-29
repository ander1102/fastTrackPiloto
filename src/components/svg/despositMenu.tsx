import { SVGProps } from "react";

interface DepositMenuProps extends SVGProps<SVGSVGElement> {
  gFill?: string;
}

export const DepositMenu = ({ gFill, ...props }: DepositMenuProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27.718}
    height={17.643}
    {...props}
  >
    <g fill={gFill ?? "#9cb7f8"} data-name="credit-card (2)">
      <path
        d="M27.719 2.944A2.947 2.947 0 0 0 24.775 0H2.944A2.947 2.947 0 0 0 0 2.944v11.754a2.947 2.947 0 0 0 2.944 2.944h21.83a2.947 2.947 0 0 0 2.944-2.944Zm-1.18 11.754a1.768 1.768 0 0 1-1.766 1.766H2.944a1.768 1.768 0 0 1-1.766-1.766V2.944a1.768 1.768 0 0 1 1.766-1.762h21.83a1.768 1.768 0 0 1 1.765 1.762Z"
        data-name="Trazado 27604"
      />
      <path
        d="M9.413 2.562a3.69 3.69 0 0 0-1.566.351 3.718 3.718 0 1 0 0 6.734 3.716 3.716 0 1 0 1.569-7.084ZM3.744 6.283a2.543 2.543 0 0 1 2.54-2.544 2.578 2.578 0 0 1 .393.033 3.7 3.7 0 0 0 0 5.015 2.58 2.58 0 0 1-.391.032 2.539 2.539 0 0 1-2.542-2.536ZM9.41 8.821a2.541 2.541 0 1 1 2.54-2.54 2.543 2.543 0 0 1-2.537 2.54Zm3.129 3.94H3.444a.589.589 0 1 0 0 1.178h9.1a.589.589 0 0 0 0-1.178Zm10.824-2.9h-5.79a.589.589 0 1 0 0 1.178h5.79a.589.589 0 1 0 0-1.178Zm0 2.9h-5.79a.589.589 0 1 0 0 1.178h5.79a.589.589 0 1 0 0-1.178Z"
        data-name="Trazado 27605"
      />
    </g>
  </svg>
);
