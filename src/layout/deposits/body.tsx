import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import DepositEmpty from "@app/components/EmptyTemplate/DepositEmpty";
import { Deposit } from "@app/types/Deposits";
import { ShowDetailsButton } from "./ShowDetailsButton";
import { DateDDMMYYHHMMA } from "@app/common/date";
import {removeMXN} from "@app/common"
interface DepositsBodyProps {
  deposits: Deposit[] | null;
  originalItem: () => Deposit[] | null;
  loader: boolean;
  isAdmin: boolean;
}

export default function DepositsBody({
  deposits,
  originalItem,
  loader,
  isAdmin,
}: DepositsBodyProps) {
  return (
    <section className="container-body">
      <DataTable
        value={deposits ?? []}
        paginator
        className="datatable-custom"
        scrollHeight="90%"
        scrollable
        rows={25}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        dataKey="idDeposito"
        rowHover
        filterDisplay="menu"
        responsiveLayout="scroll"
        loading={loader}
        globalFilterFields={["ID"]}
        emptyMessage={DepositEmpty}
        currentPageReportTemplate=""
        style={{ background: "white" }}
      >
        {isAdmin && <Column header="Cliente" field="nombre" />}
        <Column header="Fecha"   body={(item) => DateDDMMYYHHMMA(new Date(item.FechaHora))} />
        <Column header="Transacción" field="descripcion" />

        <Column header="Referencia" field="referencia" />
        <Column header="Monto" body={(item)=> removeMXN(item.monto)} />
        <Column
          body={ShowDetailsButton}
        />
      </DataTable>
    </section>
  );
}
