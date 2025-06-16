import { useContext,useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import TransactionEmpty from "@app/components/EmptyTemplate/TransactionEmpty";
import { Transaction,TransactionFilters } from "@app/types/Transactions";
import { UserContext } from "@app/context";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { eliminarAcentos } from "@app/common/format";
import { NUMBER_FORMAT } from "@app/constants";
import { ShowDetailsButton } from "./ShowDetailsButton";

const amountTemplate = (item: Transaction) => {
  const truncateDecimals = (number: number) => {
    return Math[number < 0 ? "ceil" : "floor"](number);
  };
  const aux = item.amount;
  const truncated = truncateDecimals(aux * 100) / 100;
  const isComission =
    eliminarAcentos(item.Transaccion ?? "").toLocaleLowerCase() === "comision";
  const isCancel =
    eliminarAcentos(item.Transaccion ?? "").toLocaleLowerCase() ===
    "cancelacion";

  const isRefund =
    eliminarAcentos(item.Transaccion ?? "").toLocaleLowerCase() ===
    "devolucion";

    const isReverse =
    eliminarAcentos(item.Transaccion ?? "").toLocaleLowerCase() ===
    "reverso";

  const final =
    isComission || isCancel || ((isRefund || isReverse) && truncated > 0)
      ? -truncated
      : truncated;
  const isGrey = isComission;
  return (
    <span className={isGrey ? "text-light-gray-100" : ""}>
      {NUMBER_FORMAT.format(final)}
    </span>
  );
};

type DataTableStateType = Pick<DataTableStateEvent, "first" | "rows" | "page">;
interface TransactionBodyProps {
  loader: boolean;
  transactions: Transaction[];
  onRefresh: (filters: Partial<TransactionFilters>) => void;
  onRefreshDefault: () => void;
  setIsWs: (value: boolean) => void;
  totalRecords: number;
}
export function TransactionBody({
  transactions,
  loader,
  onRefresh,
  onRefreshDefault,
  setIsWs,
  totalRecords
}: TransactionBodyProps) {
  const { user, client } = useContext(UserContext);
  const isMaster = user.userType === "master";
  const [lazyState, setLazyState] = useState<DataTableStateType>({
    first: 0,
    rows: 10,
    page: 1,
  });

  const onPage = (event: DataTableStateEvent) => {
    setLazyState(event);
    onRefresh({ pagina: event.page ? event.page + 1 : 1 });
    setIsWs(false);
  };

  return (
    <section className="container-body">
      <DataTable
        value={transactions ?? []}
        paginator
        className="datatable-custom"
        scrollHeight="90%"
        scrollable
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        rowHover
        filterDisplay="menu"
        responsiveLayout="scroll"
        loading={loader}
        globalFilterFields={["ID"]}
        emptyMessage={TransactionEmpty}
        currentPageReportTemplate=""
        style={{ background: "white" }}
        onPage={onPage}
        lazy={true}
        totalRecords={totalRecords}
        first={lazyState.first}
      >
        <Column header="ID" body={(item) => `#${item.ID}`} className="left" />
        {isMaster && <Column className="left" field="EMP" header="Cliente" />}
        {!isMaster && <Column className="left" field="SUC" header="Sucursal" />}
        <Column className="left min-w-[5rem]" field="tipotarj" header="Método de pago" />
        <Column className="left" field="redtarj" header="Tarjeta" />
        <Column
          className="left"
          field="Transaccion"
          header="Tipo de transacción"
        />
        <Column
          className="min-w-[5.5rem]"
          header="Número de tarjeta"
          body={(item: Transaction) => `**** ${item.pan?.slice(-4)}`}
          />
        <Column
          className="min-w-[6rem]"
          header="Fecha y hora"
          body={(item) => DateDDMMYYHHMMA(new Date(item.datcr))}
        />
        <Column header="Monto" body={amountTemplate} />
        <Column
          body={(item) => (
            <ShowDetailsButton
              item={item}
              transactions={transactions}
              user={user}
              client={client}
              onRefresh={onRefreshDefault}
            />
          )}
        />
      </DataTable>
    </section>
  );
}
