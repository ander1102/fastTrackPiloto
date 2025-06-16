import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { ButtonDetailsLeads } from "@app/components/Buttons";
import { DataEmpty } from "@app/components/EmptyTemplate/DataEmpty";
import { FulfillmentlBodyTemplate, StatusBodyTemplate } from "../app/layout";

import { ClientCollection, ClientsFilters } from "@app/types/Clients";
import { PermissionProps } from "@app/types/User";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { ClientsControllers } from "@app/logic/backend/clients";

type DataTableStateType = Pick<DataTableStateEvent, "first" | "rows" | "page">;
interface ClientesBodyProps extends PermissionProps {
  isCalling: boolean;
  item: ClientCollection[];
  totalRecords: number;
  userId: number;
  onRefresh: (body: SetStateAction<Partial<any>>) => void;
}

export function ClientesBody({
  permission,
  isCalling,
  item,
  totalRecords,
  userId,
  onRefresh,
}: ClientesBodyProps) {
  const [lazyState, setLazyState] = useState<DataTableStateType>({
    first: 0,
    rows: 10,
    page: 1,
  });

  const handleSwitchChange = async (e: InputSwitchChangeEvent, id: number) => {
    const response = await ClientsControllers.updateStatus({
      estatus: e.value ? "Activo" : "Deshabilitar",
      idagep_empresa: id,
      idagep_usuario: userId ?? 0,
    });
    if (response.isSuccess) {
      const { mensaje } = response.response;
      toast.success(mensaje);
      onRefresh({
        habilitado: e.value ? "Activo" : "Deshabilitar",
      });
    }
  };

  const onPage = (event: DataTableStateEvent) => {
    setLazyState(event);
    onRefresh({ pagina: event.page ? event.page + 1 : 1 });
  };

  return (
    <section className="datatable-custom grow !pb-10 !pt-4 !px-10 h-[75vh] bg-white overflow-hidden">
      <DataTable
        className="p-datatable-customers h-full flex justify-between flex-col"
        currentPageReportTemplate=""
        dataKey="idagep_empresa"
        emptyMessage={DataEmpty}
        filterDisplay="menu"
        first={lazyState.first}
        globalFilterFields={["nombre"]}
        lazy
        loading={isCalling}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rows={10}
        rowHover
        scrollable
        scrollHeight="85%"
        totalRecords={totalRecords}
        value={item}
        onPage={onPage}
      >
        <Column field="idagep_empresa" header="ID" />
        <Column field="empresa" header="Nombre comercial" />
        <Column
          className="min-w-[7rem]"
          header="Nombre razón social"
          body={(item: ClientCollection) => item.infoComercio?.razonSocial}
        />
        <Column field="email" header="Correo electrónico" />
        <Column
          header="Estado"
          body={(item: ClientCollection) => (
            <StatusBodyTemplate estatus={item.estatus} />
          )}
        />
        <Column
          header="Expediente"
          body={(item: ClientCollection) => (
            <FulfillmentlBodyTemplate
              expediente={item.cumplimiento ?? ""}
              id={item.idagep_empresa}
            />
          )}
        />
        <Column
          className="min-w-[7rem]"
          header="Saldo thunderpay"
          body={(item: ClientCollection) =>
            useTruncateAmout(item.saldoefevoo ?? 0)
          }
        />
        <Column
          className="min-w-[5rem]"
          header="Monto a liquidar"
          body={(item: ClientCollection) =>
            typeof item.montoliquidar === "string"
              ? useTruncateAmout(parseFloat(item.montoliquidar))
              : useTruncateAmout(item.montoliquidar ?? 0)
          }
        />
        <Column
          header="Habilitar/Deshabilitar"
          align="center"
          body={(item: ClientCollection) => (
            <InputSwitch
              checked={item.estatus !== "Deshabilitado"}
              name={item.email}
              id={`${item.idagep_empresa}`}
              onChange={(e) => handleSwitchChange(e, item.idagep_empresa)}
            />
          )}
        />
        {permission.read && (
          <Column
            body={(item: ClientCollection) => (
              <ButtonDetailsLeads
                destino={`/dashboard/clientes/${item.idagep_empresa}`}
              />
            )}
          />
        )}
      </DataTable>
    </section>
  );
}
