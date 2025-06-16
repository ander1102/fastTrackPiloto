import { useState } from "react";
import { EmptyIntegrationKeys } from "@app/layout/integraciones/emptyKeys";
import { IntegrationsView } from "@app/layout/integraciones/view";
import PageLayout from "@app/layout/app/layout";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";

import useEffectAsync from "@app/hooks/useEffectAsync";
import { IntegrationsControllers } from "@app/logic/backend/integrations";
import { Sleep } from "@app/common";
import { execWithLoader } from "@app/utils/DOM";

export const INTEGRATIONS_CONTEXT = "dashboard/integraciones";

function Intergraciones({ user }: AppContextProps) {
  const [assignedApiKeys, setAssignedApiKeys] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [restrictGenerateKeys, setRestrictGenerateKeys] = useState(false);

  useEffectAsync(async () => {
    await execWithLoader(Sleep, [1], INTEGRATIONS_CONTEXT);

    const res = await IntegrationsControllers.getApiKeys({
      idagep_empresa: user.idagep_empresa ?? 0,
      operacion: "RE",
    });

    if (res.isSuccess) {
      setAssignedApiKeys(res.response.estatus === "Asignadas");
      setRestrictGenerateKeys(res.response.estatus === "No permitido");
    }

    setFinishedLoading(true);
  }, []);

  return (
    <PageLayout>
      <article className="grow flex flex-col">
        {assignedApiKeys ? (
          <IntegrationsView user={user} />
        ) : (
          finishedLoading && (
            <EmptyIntegrationKeys
              user={user}
              restrictGenerateKeys={restrictGenerateKeys}
            />
          )
        )}
      </article>
    </PageLayout>
  );
}

export default withAppContext(Intergraciones, INTEGRATIONS_CONTEXT, {
  title: "Integraciones",
});
