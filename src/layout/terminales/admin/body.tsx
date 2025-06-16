import { SetStateAction, useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { toast } from "react-toastify";
import { DetailsTemplate } from "@app/layout/app/layout";
import { TableContainer } from "@app/layout/app/containers";
import TerminalEmpty from "@app/components/EmptyTemplate/TerminalEmpty";
import { TerminalStatusTemplate } from "../templates";

import { Terminal, TerminalFilters } from "@app/types/Terminal";
import { PermissionProps, User } from "@app/types/User";
import { TerminalControllers } from "@app/logic/backend/terminal";
import { DateDDMMYYHHMMA } from "@app/common/date";

type LazyStateType = Pick<DataTableStateEvent, "first" | "rows" | "page">;

interface TerminalesBodyProps extends PermissionProps {
  loader: boolean;
  terminales: Terminal[];
  totalRecords: number;
  user: User;
  onRefresh: (body: SetStateAction<Partial<TerminalFilters>>) => void;
}

export function TerminalesBodyAdmin({
  permission,
  loader,
  terminales,
  totalRecords,
  user,
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

  const handleSwitch = async (e: InputSwitchChangeEvent, estatus: number) => {
    const body = {
      idagep_terminal: e.target.id,
      operacion: estatus === 1 ? "D" : "H",
    };
    const response = await TerminalControllers.actionTerminal(body);
    if (response.isSuccess) {
      const { mensaje }: any = response.response;
      toast.success(mensaje);
      onRefresh({});
    }
  };

  return (
    <section className="container-body">
      <TableContainer>
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
          rows={20}
          rowHover
          style={{ background: "white" }}
          totalRecords={totalRecords}
          value={terminales}
          onPage={onPage}
        >
          <Column field="idagep_terminal" header="ID" />
          <Column field="Empresa" header="Cliente" />
          <Column field="Sucursal" header="Sucursal" />
          <Column field="Modelo" header="Modelo" />
          <Column field="snTerminal" header="No. Serie" />
          <Column
            header="Operativa"
            body={(item: Terminal) => (
              <TerminalStatusTemplate estatus={item.estado_asignacion} />
            )}
          />
          <Column
            header="Estado"
            body={(item: Terminal) => (
              <div className="w-full font-normal truncate flex items-center gap-1">
                <div
                  className={`rounded-full h-2 w-2 ${statusColor(item.Estado)}`}
                />
                &nbsp;{item.Estado}
              </div>
            )}
          />
          <Column
            className="min-w-[10.5rem]"
            header="Fecha de última transacción"
            body={(item) =>
              item.fechaTransaccion !== ""
                ? DateDDMMYYHHMMA(new Date(item.fechaTransaccion))
                : ""
            }
          />
          <Column
            alignHeader="center"
            header="Habilitar/Deshabilitar"
            body={(item: Terminal) => (
              <div className="flex justify-center">
                {item.estado_asignacion === "Asignada" && (
                  <InputSwitch
                    checked={item.estatus_terminal === 1}
                    id={`${item.idagep_terminal}`}
                    name={`${item.idagep_terminal}`}
                    onChange={(e: InputSwitchChangeEvent) => {
                      handleSwitch(e, item.estatus_terminal);
                    }}
                  />
                )}
              </div>
            )}
          />

          {permission.update && (
            <Column
              header=""
              body={(item: Terminal) => (
                <DetailsTemplate
                  path={`/dashboard/terminales/admin/details/?idterminal=${
                    item.idagep_terminal
                  }&idagep_empresa=${user.idagep_empresa ?? 0}`}
                />
              )}
            />
          )}
        </DataTable>
      </TableContainer>
    </section>
  );
}

const statusColor = (estado: string) => {
  switch (estado) {
    case "Disponible":
      return "bg-status-green";
    case "Deshabilitada":
      return "bg-status-red";
    case "Sin movimientos":
      return "bg-status-yellow";
    case "Inactiva":
      return "bg-status-orange";
    case "Activa":
      return "bg-status-purple";
    default:
      return;
  }
};
