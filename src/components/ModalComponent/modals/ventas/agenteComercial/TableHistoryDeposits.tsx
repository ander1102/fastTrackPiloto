import { DateDDMMYYHHMMA } from "@app/common/date"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable";
import Image from "next/image";
import { SetStateAction, useState } from "react";

export const TableHistoryDeposits = ({dataTable, onRefresh, isCalling, total} : any) => {
  const [canLazy, setCanLazy] = useState(true)
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    pagina: 1,
  });

  const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monto);
  };
  
  const DepositEmpty=() => {
    return(
      <div className="w-full flex flex-col items-center text-center mt-10 h-full">
        <Image
          src="/Images/svg/Esperardatos.svg"
          height={200}
          width={200}
          alt="esperardatos"
        />
        <div className={"text-2xl text-blue-400 font-light"}>
          En espera de datos
        </div>
        <div className=" text-lg text-slate-400 font-light">
          No se ha realizado ningún depósito
        </div>
      </div>
    )
  }
  const onPage = (event: any) => {    
    (event);
    onRefresh({ pagina:(event.page+1)})
  };

  return(
    <section className="mt-10">
      <DataTable
        value={dataTable ?? []}
        paginator
        onPage={onPage}
        className="datatable-custom"
        scrollHeight="90%"
        scrollable
        rows={5}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        dataKey="idagep_sellers_depositos"
        rowHover
        filterDisplay="menu"
        loading={isCalling}
        globalFilterFields={["ID"]}
        emptyMessage={DepositEmpty}
        currentPageReportTemplate=""
        totalRecords={total}
        first={lazyState.first}
        lazy={canLazy}
        style={{ background: "white" }}
      >
        <Column header="Fecha"   body={(item) => DateDDMMYYHHMMA(new Date(item.fecha))} />
        <Column header="Agente comercial" field="agente" />
        <Column header="Referencia" field="referencia" />
        <Column header="Monto" body={(item)=> (<span>{formatearMoneda(item.monto)}</span>)} />
      </DataTable>
    </section>

  )
}

