import EmptyTemplate from "@app/components/EmptyTemplate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { DataTableQuery } from "@app/types";
import { SetStateAction } from "react";
import { StatusBodyTemplate } from "@app/layout/app/layout";
import {
  ESTATUS_TYPES,
  PagosRecurrentesSubscribersAllBody,
  PagosRecurrentesSubscribersAllResponseSuscriptores,
} from "@app/types/PagosRecurrentes";
import { ButtonDetails } from "@app/components/Buttons";
import { TableContainer } from "@app/layout/app/containers";

interface BodyProps {
  items: Array<PagosRecurrentesSubscribersAllResponseSuscriptores>;
  loader: boolean;
  onPage: (e: any) => void;
  dataTableQuery: DataTableQuery;
  onRefresh: (
    body: SetStateAction<Partial<PagosRecurrentesSubscribersAllBody>>
  ) => void;
  onShowTableSubscriptionDetail: (
    idagep_pagos_suscriptor: number,
    estatus: number
  ) => void;
}

export default function Body({
  items,
  loader,
  onPage,
  dataTableQuery,
  onShowTableSubscriptionDetail,
}: BodyProps) {
  return (
    <section className="container-body">
      <TableContainer>
        <DataTable
          value={items}
          paginator
          className="datatable-custom"
          scrollable
          rows={dataTableQuery.rows}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
          dataKey="idagep_pagos_suscriptor"
          rowHover
          filterDisplay="menu"
          responsiveLayout="scroll"
          loading={loader}
          globalFilterFields={["idagep_pagos_suscriptor"]}
          currentPageReportTemplate=""
          style={{ background: "white" }}
          onPage={onPage}
          lazy
          emptyMessage={EmptyTemplate}
          totalRecords={dataTableQuery.totalRecords}
          first={dataTableQuery.first}
        >
          <Column
            className="min-w-[7.5rem]"
            header="Fecha y hora de creación"
            field="fechaRegistro"
          />
          <Column header="Nombre" field="suscriptor" />

          <Column header="Correo" field="email" />
          <Column header="Telefono" field="infoSuscriptor.telefono" />
          <Column header="Pagos realizados" field="pagosRealizados" />
          <Column
            header="Estado"
            field="estatus"
            style={{ textOverflow: "elipsis" }}
            body={(item) => (
              <StatusBodyTemplate estatus={ESTATUS_TYPES[item.estatus]} />
            )}
          />

          <Column
            field="flecha"
            style={{ width: "10%" }}
            body={(item) => {
              return (
                <ButtonDetails
                  onClick={() => {
                    onShowTableSubscriptionDetail(
                      item.idagep_pagos_suscriptor,
                      item.estatus
                    );
                  }}
                />
              );
            }}
          />
        </DataTable>
      </TableContainer>
    </section>
  );
}
