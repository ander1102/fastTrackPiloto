import { PropsWithChildren } from "react";
import Image from "next/image";

interface EmptyDetailsComponentProps extends PropsWithChildren {
  title: string;
  subtitle: string
}

export default function ModalDepositEmpty({
  title,
  subtitle,
}: EmptyDetailsComponentProps) {
  return (
    <div className="w-full flex flex-col items-center text-center mt-10 h-full">
      <Image
        src="/Images/svg/Esperardatos.svg"
        height={200}
        width={200}
        alt=""
      />
      <div className={"text-2xl text-blue-400 font-light"}>
        {title}
      </div>
      <div className=" text-lg text-slate-400 font-light">
        {subtitle}
      </div>
    </div>
  );
}
