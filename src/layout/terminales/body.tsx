import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import TerminalEmpty from "@app/components/EmptyTemplate/TerminalEmpty";
import { Terminal, TerminalFilters } from "@app/types/Terminal";
import { TerminalStatusTemplate } from "./templates";
import { DetailsTemplate } from "../app/layout";

import { PermissionProps } from "@app/types/User";
import { DEFAULT_TERMINAL_ROWS } from "@app/constants/terminal";

type LazyStateType = Pick<DataTableStateEvent, "first" | "rows" | "page">;

interface TerminalesBodyProps extends PermissionProps {
  loader: boolean;
  terminales: Terminal[];
  totalRecords: number;
  onRefresh: (body: Partial<TerminalFilters>) => void;
}

export function TerminalesBody({
  loader,
  permission,
  terminales,
  totalRecords,
  onRefresh,
}: TerminalesBodyProps) {
  const [lazyState, setLazyState] = useState<LazyStateType>({
    first: 0,
    rows: 10,
    page: 1,
  });

  const onPage = (event: DataTableStateEvent) => {
    setLazyState(event);
    onRefresh({ pagina: event.page ? event.page + 1 : 1 });
  };

  return (
    <section className="container-body">
      <DataTable
        className="datatable-custom"
        currentPageReportTemplate=""
        dataKey="idagep_terminal"
        emptyMessage={TerminalEmpty}
        first={lazyState.first}
        lazy
        loading={loader}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        responsiveLayout="scroll"
        rows={DEFAULT_TERMINAL_ROWS}
        rowHover
        style={{ background: "white" }}
        totalRecords={totalRecords}
        value={terminales}
        onPage={onPage}
      >
        <Column field="idagep_terminal" header="ID" />
        <Column field="Empresa" header="Cliente" />
        <Column className="min-w-[10rem]" field="Sucursal" header="Sucursal" />
        <Column field="Modelo" header="Modelo" />
        <Column field="snTerminal" header="No. Serie" />
        <Column
          field="estatus"
          header="Estado"
          body={(item: Terminal) => (
            <TerminalStatusTemplate estatus={item.estado_asignacion_sucursal} />
          )}
        />
        {permission.update && (
          <Column
            header=""
            body={(item: Terminal) => (
              <DetailsTemplate
                path={`/dashboard/terminales/details/?idterminal=${item.idagep_terminal}`}
              />
            )}
          />
        )}
      </DataTable>
    </section>
  );
}
