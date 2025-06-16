import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DepositEmpty from "@app/components/EmptyTemplate/DepositEmpty";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { removeMXN } from "@app/common";
import { Button } from "primereact/button";
import { SVG } from "@app/components/svg";
import LiquidacionDetailsModal from "@app/components/ModalComponent/modals/liquidacion/modalDetails";

export const BodyLiquidacion = ({liquidaciones, onRefresh, isCalling, totalRecord, filters, user}:any) => {
  const [show, setShow] = useState<boolean>(false)
  const [itemSelect, setItemSelect] = useState({});

  const [canLazy, setCanLazy] = useState(true)
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
  });
  
  const onPage = (event: any) => {
    setlazyState(event);
    onRefresh({ pagina:(event.page+1).toString()})
  };

  return(
    <>
      <section className="container-body">
        <DataTable
          value={liquidaciones ?? []}
          paginator
          className="datatable-custom"
          scrollHeight="90%"
          scrollable
          rows={15}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
          dataKey="idagep_liquidaciones_emp"
          rowHover
          filterDisplay="menu"
          responsiveLayout="scroll"
          loading={isCalling}
          globalFilterFields={["ID"]}
          emptyMessage={DepositEmpty}
          currentPageReportTemplate=""
          style={{ background: "white" }}
          onPage={onPage}
          lazy={canLazy}
          totalRecords={totalRecord}
          first={lazyState.first}
        >
          <Column header="ID" field="idagep_liquidaciones_emp"/>
          <Column header="Nombre de Usuario" field="nombreUsuario"/>
          <Column header="Fecha y hora" body={(item) => DateDDMMYYHHMMA(new Date(item.fecha))}/>
          <Column header="Clientes Liquidados" field="clientes"/>
          <Column header="Monto Total Liquidado" body={(item) => `${item.monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`}></Column>
          <Column
            body={(item) =>
            <Button
              onClick={() => {setShow(true); setItemSelect(item)}}
              style={{ background: "transparent", color: "#60A5FA", border: "none" }}
              className="bg-transparent text-blue-400 cursor-pointer"
            >
              <SVG.ArrowRight className="w-[20px] h-[20px] text-purple-light" />
            </Button>}
          />
        </DataTable>
      </section>
      <LiquidacionDetailsModal user={user} filters={filters} visible={show} onHide={setShow} item={itemSelect}/>
    </>
  )
}