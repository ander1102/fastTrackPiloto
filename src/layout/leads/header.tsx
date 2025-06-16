import { PermissionProps } from "@app/types/User";
import LeadCard from "@app/components/LeadCard";


interface LeadsHeaderProps extends PermissionProps {
  total: number;
  nuevos: number;
  calificados: number;
  contactados: number;
  convertidos: number;
  nocalificados: number;
}

export default function LeadsHeader({
  permission,
  total,
  nuevos,
  calificados,
  contactados,
  convertidos,
  nocalificados,
}: LeadsHeaderProps) {
  
  const elcardStyle = {card:"bg-zinc-50 w-full h-[89px] px-4 flex justify-center rounded-xl flex flex-col border border-[#B8AFE6]", title:"text-base text-light-gray-500", text:"text-xl text-gray-800"}
  const elnewLStyle = {card:"bg-zinc-50 w-full h-[89px] px-4 flex justify-center rounded-xl flex flex-col border border-[#1AB8AB]", title:"text-base text-[#1AB8AB]", text:"text-xl text-[#1AB8AB]"}

  return (
    <section className="flex justify-between w-full h-3/5 py-5">
      <div className="w-[10%] flex items-center">
        <p className="text-3xl text-black">Leads</p>
      </div>
      <div className="w-[14%] pl-2 flex items-center">
        <LeadCard
          title="Total de leads"
          content={`${total}`}
          cardStyles={elcardStyle}
        />
      </div>
      <div className="w-[14%] pl-2 flex items-center">
        <LeadCard
          title="Nuevos"
          content={nuevos > 0 ?`+${nuevos}` :0}
          cardStyles={nuevos > 0 ?elnewLStyle :elcardStyle}
        />
      </div>
      <div className="w-[14%] pl-2 flex items-center">
        <LeadCard
          title="Calificados"
          content={`${calificados}`}
          cardStyles={elcardStyle}
        />
      </div>
      <div className="w-[14%] pl-2 flex items-center">
        <LeadCard
          title="Contactados"
          content={`${contactados}`}
          cardStyles={elcardStyle}
        />
      </div>
      <div className="w-[14%] pl-2 flex items-center">
        <LeadCard
          title="Convertidos"
          content={`${convertidos}`}
          cardStyles={elcardStyle}
        />
      </div>
      <div className="w-[14%] pl-2 flex items-center">
        <LeadCard
          title="No calificado"
          content={`${nocalificados}`}
          cardStyles={elcardStyle}
        />
      </div>
    </section>
  );
}
