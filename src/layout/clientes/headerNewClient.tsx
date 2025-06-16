import { useRouter } from "next/router";

export default function ClientesHeader() {
  const router = useRouter();
  return (
    <>
      <section className="flex justify-between w-full h-full py-5">
        <div className="w-full">
          <p className="text-3xl text-black">Nuevo cliente</p>
          <p className={"text-2xl h-1/2 text-[#6A6D74] flex items-center mt-5 cursor-pointer"} onClick={() => router.back()}>
            <i
              className={"pi pi-arrow-left cursor-pointer"}
            />
            &nbsp;Regresar
          </p>
        </div>
      </section>
    </>
  );
}
