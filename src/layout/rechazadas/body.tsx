import { useContext, useState } from "react";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import TransactionEmpty from "@app/components/EmptyTemplate/TransactionEmpty";
import { Column } from "primereact/column";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { NUMBER_FORMAT } from "@app/constants";
import { ShowDetailsButton } from "./details";
import { TransactionRejectedContext } from "./context";
import { TransactionRejected } from "@app/types/Rejected";

const amountTemplate = (item: TransactionRejected) => {
  const truncateDecimals = (number: number) => {
    return Math[number < 0 ? "ceil" : "floor"](number);
  };
  const aux = item.monto;
  const truncated = truncateDecimals(aux * 100) / 100;
  return <span>{NUMBER_FORMAT.format(truncated)}</span>;
};

export default function RechazadasBody() {
  const data = useContext(TransactionRejectedContext);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
  });

  const onPage = (event: DataTableStateEvent) => {
    setlazyState({
      first: event.first,
      page: event.page ?? 0,
      rows: event.rows,
    });
    data.refresh([{ PageIndex: ((event.page ?? 0) + 1).toString() }]);
  };

  return (
    <section className="container-body">
      <DataTable
        value={data.item?.data ?? []}
        paginator
        className="datatable-custom"
        scrollHeight="90%"
        scrollable
        rows={lazyState.rows}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        rowHover
        filterDisplay="menu"
        responsiveLayout="scroll"
        globalFilterFields={["ID"]}
        loading={data.isCalling}
        emptyMessage={TransactionEmpty}
        currentPageReportTemplate=""
        style={{ background: "white" }}
        totalRecords={data.item?.total}
        onPage={onPage}
        first={lazyState.first}
        lazy
      >
        <Column
          header="ID"
          body={(item: TransactionRejected) => `#${item.ID}`}
          className="left"
        />
        <Column className="left" field="cliente" header="Cliente" />
        <Column className="left" field="metodo" header="Método de pago" />
        <Column className="left" field="tarjeta" header="Tarjeta" />
        <Column className="left" field="tipoTransaccion" header="Tipo de transacción" />
        <Column
          className="left"
          field="numTarjeta"
          header="Número de tarjeta"
          body={(item: TransactionRejected) => `**** ${item.numTarjeta?.slice(-4)}`}
        />
        <Column
          header="Fecha y hora"
          body={(item: TransactionRejected) =>
            DateDDMMYYHHMMA(new Date(item.fecha))
          }
        />
        <Column header="Monto" body={amountTemplate} />
        <Column
          header="CÓDIGO ERROR PROSA"
          className="left"
          body={(item: TransactionRejected) => (
            <div className="flex items-center gap-3 justify-evenly">
              <span>{item.codigo}</span>
              <ShowDetailsButton item={item} />
            </div>
          )}
        />
      </DataTable>
    </section>
  );
}
