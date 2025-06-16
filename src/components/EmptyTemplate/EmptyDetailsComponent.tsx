import { PropsWithChildren } from "react";
import Image from "next/image";

interface EmptyDetailsComponentProps extends PropsWithChildren {
  title: string;
}

export default function EmptyDetailsComponent({
  title,
  children,
}: EmptyDetailsComponentProps) {
  return (
    <div className="w-full flex flex-col items-center text-center mt-10 h-full">
      <Image
        src="/Images/svg/Esperarinformacion.svg"
        height={200}
        width={200}
        alt=""
      />
      <div className="mt-3 text-2xl text-blue-400 font-light">{title}</div>
      {children && (
        <div className="text-lg text-slate-400 font-light">{children}</div>
      )}
    </div>
  );
}
