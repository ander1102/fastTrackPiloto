import Image from "next/image";

export default function EmptyTemplate() {
  return (
    <div className="w-full text-center mt-10">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/Images/svg/Enesperardatos.svg"
          style={{ marginBottom: "40px" }}
          width={200}
          height={200}
          alt=""
        />
        <div className={"text-2xl text-blue-400 font-light"}>
          En espera de datos
        </div>
        <div className=" text-lg text-slate-400 font-light">
          La información se actualizará automáticamente
        </div>
      </div>
    </div>
  );
}
