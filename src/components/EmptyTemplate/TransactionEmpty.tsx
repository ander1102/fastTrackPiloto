import Image from "next/image";

export default function TransactionEmpty() {
  return (
    <div className="w-full flex flex-col items-center text-center mt-10 h-full">
      <Image
        src="/Images/svg/Esperardatos.svg"
        height={200}
        width={200}
        alt=""
      />
      <div className={"text-2xl text-blue-400 font-light"}>
        En espera de datos
      </div>
      <div className=" text-lg text-slate-400 font-light">
        No se ha realizado ninguna transacción
      </div>
    </div>
  );
}
