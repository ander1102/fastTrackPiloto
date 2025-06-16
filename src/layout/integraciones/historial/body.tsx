import Image from "next/image";
import { useContext, useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { ButtonDetails } from "@app/components/Buttons";
import { DataEmpty } from "@app/components/EmptyTemplate/DataEmpty";

import {
  IntegrationHistoryFilters,
  IntegrationHistoryRecord,
  LINK_ESTATUS,
} from "@app/types/Integrations";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { copyToClipboardNavigator } from "@app/utils/DOM";
import { DEFAULT_TOAST_CONFIGURATION, NUMBER_FORMAT } from "@app/constants";
import { modalManager } from "@app/components/ModalComponent";
import TransactionDetails from "@app/components/ModalComponent/modals/transactions/TransactionDetails";
import { IntegrationsControllers } from "@app/logic/backend/integrations";
import { toast } from "react-toastify";
import { UserContext } from "@app/context";
import { INTEGRATIONS_CONTEXT } from "@app/pages/dashboard/integraciones";

interface IntegracionesHistorialBodyProps {
  loader: boolean;
  totalRecords: number;
  records: IntegrationHistoryRecord[];
  onRefresh: (filters: Partial<IntegrationHistoryFilters>) => void;
  onRefreshDefault: () => void;
}

type DataTableStateType = Pick<DataTableStateEvent, "first" | "rows" | "page">;

export function IntegracionesHistorialBody({
  loader,
  totalRecords,
  records,
  onRefresh,
  onRefreshDefault,
}: IntegracionesHistorialBodyProps) {
  const { user, client } = useContext(UserContext);
  const [dataTableState, setDataTableState] = useState<DataTableStateType>({
    first: 0,
    rows: 10,
    page: 1,
  });

  const onPage = (event: DataTableStateEvent) => {
    setDataTableState(event);
    onRefresh({ pagina: event.page ? event.page + 1 : 1 });
  };

  const showDetails = (id: number) => async () => {
    try {
      const { response } = await IntegrationsControllers.getDetails({
        idagep_integraciones_link_pago: id,
      });

      const item = response.info[0];

      const permitReverse = client?.infoOperaciones?.reverso === "si";
      await modalManager.show(
        TransactionDetails,
        {
          item,
          user,
          permitReverse,
          onRefresh: onRefreshDefault,
        },
        INTEGRATIONS_CONTEXT
      );
    } catch {
      toast.error(
        "Se ha producido un error. Por favor, intente más tarde.",
        DEFAULT_TOAST_CONFIGURATION
      );
    }
  };

  return (
    <section className="container-body">
      <DataTable
        className="datatable-custom bg-white p-datatable-customers h-full flex flex-col justify-between"
        currentPageReportTemplate=""
        dataKey="idagep_integraciones_link_pago"
        emptyMessage={DataEmpty}
        filterDisplay="menu"
        first={dataTableState.first}
        globalFilterFields={["ID"]}
        lazy
        loading={loader}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        responsiveLayout="scroll"
        rows={10}
        rowHover
        scrollHeight="90%"
        scrollable
        totalRecords={totalRecords ?? 0}
        value={records ?? []}
        onPage={onPage}
      >
        <Column
          header="ID"
          body={(item: IntegrationHistoryRecord) =>
            `#${item.idagep_integraciones_link_pago}`
          }
        />
        <Column
          header="Link"
          body={(item: IntegrationHistoryRecord) => (
            <button
              type="button"
              onClick={() => copyToClipboardNavigator(item.link)}
            >
              <picture
                aria-label="Copiar al portapapeles"
                className="w-full flex justify-center hover:opacity-70"
                title="Copiar al portapapeles"
              >
                <Image
                  alt=""
                  src="/Images/integrations/payment_link_active.svg"
                  height={20}
                  width={20}
                />
              </picture>
            </button>
          )}
        />
        <Column header="Referencia" field="referencia" />
        <Column
          className="min-w-[192px]"
          header="Fecha y hora de creación"
          body={(item) => DateDDMMYYHHMMA(new Date(item.fechaCreacion))}
        />
        <Column
          className="min-w-[192px]"
          header="Fecha y hora de pago"
          body={(item) =>
            item.fechaPago ? DateDDMMYYHHMMA(new Date(item.fechaPago)) : ""
          }
        />
        <Column
          header="Monto"
          body={(item) => `${NUMBER_FORMAT.format(item.monto)}`}
        />
        <Column
          header="Estatus"
          body={(item) => <LinkEstatusTemplate estatus={item.estatus} />}
        />
        <Column
          body={(item: IntegrationHistoryRecord) =>
            item.estatus === LINK_ESTATUS.Pagado ? (
              <ButtonDetails
                aria-label="Abrir detalle de transacción"
                disabled={loader}
                title="Abrir detalle de transacción"
                onClick={showDetails(item.idagep_integraciones_link_pago)}
              />
            ) : null
          }
        />
      </DataTable>
    </section>
  );
}

const stylesByEstatus = {
  [LINK_ESTATUS.Pagado]: "bg-status-green",
  [LINK_ESTATUS.Pendiente]: "bg-status-yellow",
  [LINK_ESTATUS.Vencido]: "bg-status-red",
};

function LinkEstatusTemplate({ estatus }: { estatus: LINK_ESTATUS }) {
  return (
    <div className="w-full flex items-center gap-2">
      <div className={`rounded-full h-2 w-2 ${stylesByEstatus[estatus]}`} />
      {estatus}
    </div>
  );
}
