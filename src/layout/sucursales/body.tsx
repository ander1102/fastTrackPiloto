import { Dispatch, SetStateAction, useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import TerminalEmpty from "@app/components/EmptyTemplate/TerminalEmpty";
import { PermissionProps } from "@app/types/User";
import { DetailsTemplate } from "@app/layout/app/layout";
import { Subsidiary, SubsidiaryQuery } from "@app/types/Subsidiary";
import { DataTableQuery } from "@app/types";
import { SubsidiaryRepresentativeTemplate } from "./templates";
import { DEFAULT_SUBSIDIARY_ROWS } from "@app/constants/subsidiary";

interface SurcursalesBodyProps extends PermissionProps {
  sucursales: Subsidiary[] | null;
  onRefresh: (body: Partial<SubsidiaryQuery>) => void;
  query: DataTableQuery;
  setQuery: Dispatch<SetStateAction<DataTableQuery>>;
  loader: boolean;
}

export default function SurcursalesBody({
  permission,
  sucursales,
  loader,
  onRefresh,
  query,
  setQuery,
}: SurcursalesBodyProps) {

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
  });

  const onPage = (e: any) => {
    setlazyState(e)
    onRefresh({ pagina:(e.page+1)})
  };

  return (
    <section className="container-body">
      <DataTable
        value={sucursales ?? []}
        lazy
        paginator
        className="datatable-custom p-datatable-transacciones h-full myCustomBg flex justify-between flex-col"
        rows={DEFAULT_SUBSIDIARY_ROWS}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        dataKey="idagep_terminal"
        rowHover
        first={lazyState.first}
        responsiveLayout="scroll"
        loading={loader}
        onPage={onPage}
        totalRecords={query.totalRecords}
        emptyMessage={TerminalEmpty}
        currentPageReportTemplate=""
        style={{ background: "white" }}
      >
        <Column field="idagep_sucursal" header="ID" />
        <Column field="nombre" header="Sucursal" />
        <Column header="Responsable" body={SubsidiaryRepresentativeTemplate} />
        {permission.update && (
          <Column
            header="Detalle"
            body={(item: Subsidiary) => (
              <DetailsTemplate
                path={`/dashboard/sucursales/details/${item.idagep_sucursal}`}
              />
            )}
          />
        )}
      </DataTable>
    </section>
  );
}
