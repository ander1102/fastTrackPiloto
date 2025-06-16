import { SetStateAction, useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { ButtonDetailsLeads } from "@app/components/Buttons";
import { DataEmpty } from "@app/components/EmptyTemplate/DataEmpty";
import { FulfillmentlBodyTemplate } from "../app/layout";

import { DossierClient, DossiersFilters } from "@app/types/Dossiers";
import { PermissionProps } from "@app/types/User";

const renamePersonType = { moral: "Moral", fisica: "Física" };
type DataTableStateType = Pick<DataTableStateEvent, "first" | "rows" | "page">;

interface ExpedienteBodyProps extends PermissionProps {
  isCalling: boolean;
  item: DossierClient[];
  totalRecords: number;
  onRefresh: (body: SetStateAction<Partial<DossiersFilters>>) => void;
}

export function ExpedienteBody({
  item,
  isCalling,
  permission,
  totalRecords,
  onRefresh,
}: ExpedienteBodyProps) {
  const [lazyState, setLazyState] = useState<DataTableStateType>({
    first: 0,
    rows: 10,
    page: 1,
  });

  const onPage = (event: DataTableStateEvent) => {
    setLazyState(event);
    onRefresh({ pagina: event.page ? event.page + 1 : 1 });
  };

  return (
    <section className="datatable-custom grow !p-10 !pt-4 bg-white overflow-hidden">
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
          body={(item: DossierClient) => item.infoComercio.razonSocial}
        />
        <Column field="email" header="Correo electrónico" />
        <Column
          align="center"
          header="Tipo de persona"
          body={(item: DossierClient) => renamePersonType[item.persona]}
        />
        <Column
          header="Estado"
          body={(item: DossierClient) => (
            <FulfillmentlBodyTemplate
              expediente={item.cumplimiento ?? ""}
              id={item.idagep_empresa}
            />
          )}
        />
        {permission.read && (
          <Column
            header=""
            body={(item: DossierClient) => (
              <ButtonDetailsLeads
                destino={`/dashboard/expediente/${item.idagep_empresa}`}
              />
            )}
          />
        )}
      </DataTable>
    </section>
  );
}
