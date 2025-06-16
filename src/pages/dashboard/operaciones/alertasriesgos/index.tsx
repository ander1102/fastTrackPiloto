import withAppContext from "@app/components/HOC/withAppContext";
import { PageContainer } from "@app/layout/app/containers";
import { AlertasRiesgosHeader } from "@app/layout/operations/alertsrisks/header";
import { AlertasRiesgosBody } from "@app/layout/operations/alertsrisks/body";
import { useTableAlertsRisks } from "@app/layout/operations/alertsrisks/useTableAlertsRisks";

const CONTEXT = "dashboard/operaciones/alertasriesgos";

function AlertasRiesgos() {
  const {
    filters,
    loader,
    items,
    dataTableQuery,
    onPage,
    onRefresh,
    onUpdateSatus,
  } = useTableAlertsRisks();
  return (
    <PageContainer
      header={
        <AlertasRiesgosHeader
          filters={filters}
          loader={loader}
          onRefresh={onRefresh}
          items={items ?? []}
        />
      }
      body={
        <AlertasRiesgosBody
          onUpdateSatus={onUpdateSatus}
          loader={loader}
          items={items ?? []}
          dataTableQuery={dataTableQuery}
          onRefresh={onRefresh}
          onPage={onPage}
        />
      }
    />
  );
}

export default withAppContext(AlertasRiesgos, CONTEXT, {
  title: "Alertas y Riesgos",
});
