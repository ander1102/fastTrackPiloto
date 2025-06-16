import Image from "next/image";

export default function TerminalEmpty() {
  return (
    <div className="w-full flex flex-col items-center text-center mt-10 h-full">
      <Image
        src="/Images/svg/Esperarinformacion.svg"
        height={200}
        width={200}
        alt=""
      />
      <div className={"text-2xl text-blue-400 font-light"}>
        En espera de datos
      </div>
      <div className=" text-lg text-slate-400 font-light">
        No hay ninguna terminal disponible
      </div>
    </div>
  );
}
