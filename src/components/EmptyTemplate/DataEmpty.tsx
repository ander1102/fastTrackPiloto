import Image from "next/image";

export function DataEmpty() {
  return (
    <div className="w-full flex flex-col items-center text-center mt-10 h-full">
      <Image
        src="/Images/svg/Esperarinformacion.svg"
        height={200}
        width={200}
        alt=""
      />
      <div className="mt-3 text-2xl text-blue-400 font-light">Sin datos</div>
      <div className="text-lg text-slate-400 font-light">
        No se encontraron registros que cumplan con los criterios de búsqueda.
      </div>
    </div>
  );
}
