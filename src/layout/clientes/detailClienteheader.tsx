import LeadCard from "@app/components/LeadCard";
import { modalManager } from "@app/components/ModalComponent";
import CreateDeposit from "@app/components/ModalComponent/modals/deposits/CreateDeposit";
import useCall from "@app/hooks/useCall";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { ClientsControllers } from "@app/logic/backend/clients";
import { PermissionProps ,User} from "@app/types/User";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { Client } from "@app/types/Clients";


interface ClienteoHeaderProps extends PermissionProps {
  nombre: string;
  id_company: any;
  saldo?: number;
  fondo?: number|any;
  user:User;
  client: Client;
}

export default function DetailClienteoHeader({id_company, client, nombre, saldo, fondo, user}: ClienteoHeaderProps) {
  const router = useRouter();
  const kpis = useCall(ClientsControllers, "kpis", () => ({
    initialParams: [
      {
        idagep_empresa: id_company ?? 0,
      },
    ] as [body: any],
  }));


  const handleDeposit = () => {
    modalManager.show(
      CreateDeposit,
      {
        client: id_company ?? 0,
        kpiReserveFund: fondo,
      },
      "dashboard/client/editclient"
    )
    .then();
  }

  const elcardStyle = {
    card: "bg-zinc-50 w-full max-h-[89px] h-[130%] min-h-[60px] px-4 flex justify-center rounded-xl flex flex-col border border-[#D4D5D5]",
    title: "text-base text-light-gray-500",
    text: "text-xl text-gray-800",
  };
  return (
    <section className="flex h-full flex-col pt-1">
      <div className="w-full flex flex-col h-3/5">
        <div className="w-full flex justify-between ">
          <div className="w-6/12 flex items-center">
            <div className="bg-[#6B3374] rounded-full h-16 w-16 flex justify-center items-center text-white">
              <p className="flex text-center align-middle text-4xl">
                {nombre && nombre.substring(0, 2)}
              </p>
            </div>
            <div className="mx-3">
              <p className="text-3xl">{nombre && nombre}</p>
              <p className="text-sm text-[#6A6D74]" >Fecha de creación: {client.fechaEnt && DateDDMMYYHHMMA(new Date(client.fechaEnt)) }</p>

            </div>
          </div>
          {client.idagep_catpago === 1 && (  
          <div>
            <Button style={{backgroundColor: '#343434', borderColor: 'transparent', padding: '10px 30px'}} onClick={() => handleDeposit()}> 
              <span style={{fontSize: 20, marginRight: 10}}>+</span>Nuevo depósito</Button>
          </div>
          )}
        </div>
        <p className={"text-2xl h-1/2 text-[#6A6D74] flex items-center mt-2 cursor-pointer "} onClick={() => router.back()}>
          <i
            className={"pi pi-arrow-left "}
            
          />
          &nbsp;Regresar
        </p>
      </div>
      <div className="w-full flex h-2/5 mt-9">
        <div className="w-1/5 pl-2 flex items-center">
          <LeadCard
            title="Saldo Thunderpay:"
            content={useTruncateAmout(saldo ?? 0)}
            cardStyles={elcardStyle}
          />
        </div>
        <div className="w-1/5 pl-2 flex items-center">
          <LeadCard
            title="Fondo de reserva:"
            content={useTruncateAmout(fondo ?? 0)}
            cardStyles={elcardStyle}
          />
        </div>
        <div className="w-1/5 pl-2 flex items-center">
          <LeadCard
            title="Terminales:"
            content={kpis.item?.TotalTerminales ?? 0}
            cardStyles={elcardStyle}
          />
        </div>
        <div className="w-1/5 pl-2 flex items-center">
          <LeadCard
            title="Monto TPV:"
            content={useTruncateAmout(kpis.item?.montoTPV ?? 0)}
            cardStyles={elcardStyle}
          />
        </div>
        <div className="w-1/5 pl-2 flex items-center">
          <LeadCard
            title="Ligas de pago:"
            content={
              kpis.item?.ecommerceEstatus == "Inactivo"
                ? "Inactivo"
                : useTruncateAmout(kpis.item?.montoEcommerce ?? 0)
            }
            cardStyles={elcardStyle}
          />
        </div>
      </div>
    </section>
  );
}