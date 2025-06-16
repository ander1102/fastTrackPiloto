import { useState } from "react";
import withAppContext from "@app/components/HOC/withAppContext";
import { ParametersHeader } from "@app/layout/operations/parameters/header";
import { OperacionesBody } from "@app/layout/operations/parameters/operacionesBody";
import { AlertsBody } from "@app/layout/operations/parameters/alertsBody";
import { TabPanel, TabView } from "primereact/tabview";
import {
  PageContainer,
  TabBodyContainer,
  TabHeaderContainer,
} from "@app/layout/app/containers";
import { useParameters } from "@app/layout/operations/parameters/useParameters";

const PARAMETERS_CONTEXT = "dashboard/parametros";

function Parametros() {
  const [index, setIndex] = useState<number>(0);

  const {
    loading,
    alertsParameters,
    operationalParameters,
    transactionalParameters,
    onChangeAlerts,
    onChangeOperational,
    onChangeTransactional,
    onSave,
  } = useParameters();

  return (
    <PageContainer>
      <TabHeaderContainer>
        <ParametersHeader loading={loading} onSave={onSave} />
      </TabHeaderContainer>

      <TabBodyContainer>
        <TabView
          className="p-tab"
          activeIndex={index}
          onTabChange={(e) => setIndex(e.index)}
        >
          {/* <TabPanel header="Operaciones">
            <OperacionesBody
              operationalParameters={operationalParameters}
              transactionalParameters={transactionalParameters}
              onChangeOperational={onChangeOperational}
              onChangeTransactional={onChangeTransactional}
            />
          </TabPanel> */}
          <TabPanel header="Alertas">
            <AlertsBody
              alertsParameters={alertsParameters}
              onChangeAlerts={onChangeAlerts}
            />
          </TabPanel>
        </TabView>
      </TabBodyContainer>
    </PageContainer>
  );
}

export default withAppContext(Parametros, PARAMETERS_CONTEXT, {
  title: "Parámetros",
});
