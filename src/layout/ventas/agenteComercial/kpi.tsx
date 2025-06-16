import React from 'react';
import LeadCard from '@app/components/LeadCard';
import useTruncateAmout from '@app/hooks/useTruncateAmount';

export const KpiComercial = ({...kpi}:any) => {
  const {total, comisionesTotal, montoTotal} = kpi;
  const elcardStyle = {card:"bg-zinc-50 w-full h-[89px] px-4 flex justify-center rounded-xl flex flex-col border border-[#B8AFE6]", title:"text-base text-light-gray-500", text:"text-xl text-gray-800"}
  return(
    <div style={{display: 'flex', justifyContent: 'space-between', width: "100%"}}>
      <div style={{margin: "0px 10px"}}>
        <LeadCard title="Agentes comerciales totales" content={total} cardStyles={elcardStyle}/>
      </div>
      <div style={{margin: "0px 10px"}}>
        <LeadCard title="Monto Transaccionado Total" content={useTruncateAmout(montoTotal)} cardStyles={elcardStyle}/>
      </div>
      <div style={{margin: "0px 10px"}}>
        <LeadCard title="Comisiones Totales Generadas" content={useTruncateAmout(comisionesTotal)} cardStyles={elcardStyle}/>
      </div>
    </div>
  )
}