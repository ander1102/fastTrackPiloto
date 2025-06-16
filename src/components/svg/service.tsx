import { SVGProps } from "react";

export const Service = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill="#1A1A1A"
      d="M21.736 15.012h-2.851L15.89 10.02a.524.524 0 0 0-.9.54l2.672 4.457h-7.595l2.672-4.458a.525.525 0 1 0-.9-.54l-2.993 4.994H5.993a.524.524 0 1 0-.001 1.05h.656l1.773 6.202a1.584 1.584 0 0 0 1.513 1.14h7.864a1.579 1.579 0 0 0 1.513-1.14l1.773-6.205h.652a.524.524 0 1 0 .001-1.049v.002Zm-3.435 6.967a.528.528 0 0 1-.504.38H9.933a.528.528 0 0 1-.504-.38l-1.69-5.917h12.253l-1.69 5.917H18.3Z"
    />
    <path
      stroke="#1A1A1A"
      strokeMiterlimit={10}
      strokeWidth={0.882}
      d="M25.74 1.115H1.956c-.692 0-1.254.562-1.254 1.254v23.784c0 .693.562 1.254 1.254 1.254H25.74c.692 0 1.254-.561 1.254-1.254V2.369c0-.692-.562-1.254-1.254-1.254ZM.702 5.246h26.292"
    />
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={0.882}
      d="M2.138 3.103h.237M3.952 3.103h.237M5.765 3.103h.237"
    />
  </svg>
);
