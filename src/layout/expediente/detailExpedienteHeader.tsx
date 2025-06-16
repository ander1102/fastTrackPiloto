import { PermissionProps } from "@app/types/User";

interface DetailExpedienteHeaderProps extends PermissionProps {
    nombre: string;
    person: string;
}

export function DetailExpedienteHeader({person, ...item}: DetailExpedienteHeaderProps) {
    let renamePersonType:any = {
      "moral": "Moral",
      "fisica": "Física"
    }
  return (
    <section className="flex h-full pt-1 justify-between">
      <div className="flex flex-col">
        <div className="">
            <div className="flex items-center">
            <div className="bg-[#6B3374] rounded-full h-16 w-16 flex justify-center items-center text-white">
                <p className="flex text-center align-middle text-4xl">
                {item.nombre && item.nombre.substring(0, 2)}
                </p>
            </div>
            <div className="mx-3">
                <p className="text-3xl">{item.nombre && item.nombre}</p>
            </div>
            </div>
        </div>
        <p className={"text-2xl h-1/2 text-[#6A6D74] flex items-center mt-5 cursor-pointer"} onClick={()=>window.location.href = window.location.origin+"/dashboard/expediente"}>
            <i className={"pi pi-arrow-left cursor-pointer "}/>
            &nbsp;Regresar
        </p>
      </div>
      <div style={{fontSize: 24}}>
        Tipo de persona: <span style={{color:"#6B3374"}}>{renamePersonType[person]}</span>
      </div>
    </section>
  );
}
