import EmptyTemplate from "@app/components/EmptyTemplate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { DataTableQuery } from "@app/types";
import { SetStateAction } from "react";
import { StatusBodyTemplate } from "@app/layout/app/layout";
import {
  PagosRecurrentesPaymentsAllBody,
  PagosRecurrentesPaymentsAllResponsePagosRecurrentes,
  ESTATUS_TYPES,
  RECURRENCIA_TYPES,
} from "@app/types/PagosRecurrentes";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import Link from "next/link";
import { modalManager } from "@app/components/ModalComponent";
import modalPaymentLink from "@app/layout/pagosrecurrentes/payments/modalPaymentLink";
import { TableContainer } from "@app/layout/app/containers";

interface BodyProps {
  items: Array<PagosRecurrentesPaymentsAllResponsePagosRecurrentes>;
  loader: boolean;
  isAdmin: boolean;
  onPage: (e: any) => void;
  dataTableQuery: DataTableQuery;
  onRefresh: (
    body: SetStateAction<Partial<PagosRecurrentesPaymentsAllBody>>
  ) => void;
}

export default function Body({
  items,
  loader,
  isAdmin,
  onPage,
  dataTableQuery,
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
          dataKey="idagep_referido"
          rowHover
          filterDisplay="menu"
          responsiveLayout="scroll"
          loading={loader}
          globalFilterFields={["idagep_referido"]}
          currentPageReportTemplate=""
          style={{ background: "white" }}
          onPage={onPage}
          lazy
          emptyMessage={EmptyTemplate}
          totalRecords={dataTableQuery.totalRecords}
          first={dataTableQuery.first}
        >
          {isAdmin && <Column header="Comercio" field="empresa" />}
          <Column header="Nombre" field="pagoNombre" />
          <Column
            header="Monto"
            field="monto"
            body={(item) => useTruncateAmout(item.monto)}
          />

          <Column
            header="Recurencia"
            body={(item) => RECURRENCIA_TYPES[item.recurrencia]}
          />

          <Column header="Pagos" field="pagos" />
          <Column
            header="Estatus"
            field="estatus"
            style={{ textOverflow: "elipsis" }}
            body={(item) => (
              <StatusBodyTemplate estatus={ESTATUS_TYPES[item.estatus]} />
            )}
          />
          <Column
            header="Suscriptores"
            body={(item) => (
              <Link
                href={`/dashboard/pagosrecurrentes/suscritores/${item.idagep_pago_recurrente}`}
                className="underline text-primary cursor-pointer w-[80px] text-center"
              >
                {item.suscriptores}
              </Link>
            )}
            field="suscriptores"
          />
          {!isAdmin && (
            <Column
              header="Link"
              field="link"
              body={(item) => {
                return (
                  <div
                    className="pointer"
                    onClick={() => {
                      modalManager.show(modalPaymentLink, { item });
                    }}
                  >
                    <img
                      src={"/Images/integrations/payment_link_2.svg"}
                      alt="Negocio"
                      width={"20px"}
                    />
                  </div>
                );
              }}
            />
          )}
          <Column
            className="min-w-[8rem]"
            header="Fecha y hora de creación"
            field="fechaRegistro"
          />
        </DataTable>
      </TableContainer>
    </section>
  );
}
