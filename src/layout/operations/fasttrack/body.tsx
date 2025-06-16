import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Button } from "@app/components/Buttons";
import EmptyTemplate from "@app/components/EmptyTemplate";
import { modalManager } from "@app/components/ModalComponent";
import modalDeshabilitar from "./modalDeshabilitar";
import { SEVERITY, TAG_VARIANTS, Tag } from "@app/components/Tag";

import {
  ALERT_TYPES,
  Operation,
  OperationsFastTrackAllBody,
  RISK_TYPES,
} from "@app/types/Operations";
import { NUMBER_FORMAT } from "@app/constants";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { TableContainer } from "@app/layout/app/containers";

const severityByTipoAlerta = {
  [ALERT_TYPES["BAJA OPERACIÓN"]]: SEVERITY.NONE,
  [ALERT_TYPES["INCREMENTO LÍMITE INFERIOR"]]: SEVERITY.CAUTION,
  [ALERT_TYPES["OPERACIÓN MÚLTIPLE"]]: SEVERITY.CAUTION,
  [ALERT_TYPES["INCREMENTO LÍMITE AUTORIZADO"]]: SEVERITY.WARNING,
  [ALERT_TYPES["TICKET ALTO"]]: SEVERITY.WARNING,
  [ALERT_TYPES.INHABILITAR]: SEVERITY.DANGER,
};

const severityByTipoRiesgo = {
  [RISK_TYPES["SIN RIESGO"]]: SEVERITY.NONE,
  [RISK_TYPES.MEDIA]: SEVERITY.CAUTION,
  [RISK_TYPES.ALTA]: SEVERITY.WARNING,
  [RISK_TYPES["CRÍTICO"]]: SEVERITY.DANGER,
};

interface OperationsBody {
  loader: boolean;
  totalRecords: number;
  operations: Operation[];
  onRefresh: (filters: Partial<OperationsFastTrackAllBody>) => void;
}

type LazyStateType = Pick<DataTableStateEvent, "first" | "rows" | "page">;

export const OperationsBody = ({
  loader,
  operations,
  totalRecords,
  onRefresh,
}: OperationsBody) => {
  const [lazyState, setLazyState] = useState<LazyStateType>({
    first: 0,
    rows: 10,
    page: 1,
  });

  const onPage = (event: DataTableStateEvent) => {
    setLazyState(event);
    onRefresh({ pagina: event.page ? event.page + 1 : 1 });
  };

  const handleShowModalDeshabilitar = (idagep_empresa: number) => async () => {
    await modalManager.show(modalDeshabilitar, { idagep_empresa });
  };

  return (
    <TableContainer>
      <DataTable
        className="datatable-custom bg-white"
        currentPageReportTemplate=""
        emptyMessage={EmptyTemplate}
        filterDisplay="menu"
        first={lazyState.first}
        globalFilterFields={["ID"]}
        lazy={true}
        loading={loader}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        rows={10}
        rowHover
        scrollHeight="90%"
        scrollable
        totalRecords={totalRecords}
        value={operations ?? []}
        onPage={onPage}
      >
        <Column
          header="ID"
          body={(item: Operation) => `#${item.idagep_controles_empresas}`}
        />
        <Column field="nombre" header="Nombre del cliente" />
        <Column
          header="Fecha de alerta"
          body={(item) => DateDDMMYYHHMMA(new Date(item.fechaAlerta))}
        />
        <Column
          header="Fecha de primera transacción"
          body={(item) => DateDDMMYYHHMMA(new Date(item.primeraTransaccion))}
        />
        <Column
          header="Monto transaccionado"
          body={(item) => `${NUMBER_FORMAT.format(item.montoTransaccionado)}`}
        />
        <Column header="Días en operación" field="diasOperacion" />
        <Column
          header="Tipo de alerta"
          body={(item: Operation) => (
            <Tag
              label={`${ALERT_TYPES[item.idagep_catalerta]}`}
              severity={severityByTipoAlerta[item.idagep_catalerta]}
              variant={TAG_VARIANTS.SECONDARY}
            />
          )}
        />
        <Column
          header="Tipo de riesgo"
          body={(item: Operation) => (
            <Tag
              label={`${RISK_TYPES[item.idagep_catriesgo]}`}
              severity={severityByTipoRiesgo[item.idagep_catriesgo]}
            />
          )}
        />
        <Column
          body={(item: Operation) => (
            <>
              {item.idagep_catriesgo === RISK_TYPES["CRÍTICO"] ? (
                <Button
                  className="button-cancel"
                  icon="pi pi-times"
                  type="button"
                  onClick={handleShowModalDeshabilitar(item.idagep_empresa)}
                />
              ) : null}
            </>
          )}
        />
      </DataTable>
    </TableContainer>
  );
};
