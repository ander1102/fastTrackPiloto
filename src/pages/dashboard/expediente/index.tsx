import { useEffect, SetStateAction, useState } from "react";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { ExpedienteBody } from "@app/layout/expediente/body";
import { ExpedienteHeader } from "@app/layout/expediente/header";

import { DossiersFilters } from "@app/types/Dossiers";
import useCall from "@app/hooks/useCall";
import { DossiersControllers } from "@app/logic/backend/dossiers";
import PageLayout from "@app/layout/app/layout";

export const EXPEDIENTE_CONTEXT = "dashboard/expediente";

const getDefaultParams = (): DossiersFilters => ({
  tamano_pagina: 10,
  pagina: 1,
  empresafiltro: "",
  cumplimiento: "",
  persona: "",
});

function Expediente({ permission }: AppContextProps) {
  const [filters, setFilters] = useState(getDefaultParams());

  const clients = useCall(DossiersControllers, "all", () => ({
    initialParams: [filters] as [body: DossiersFilters],
    skipFistCall: true,
  }));
  const kpis = useCall(DossiersControllers, "getAllKpis", () => ({
    initialParams: [filters] as [body: DossiersFilters],
    skipFistCall: true,
  }));

  const onRefresh = (curr: SetStateAction<Partial<DossiersFilters>>) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  useEffect(() => {
    clients.refresh([filters]);
    kpis.refresh([filters]);
  }, [filters]);

  return (
    <PageLayout>
      <ExpedienteHeader
        loader={kpis.isCalling || clients.isCalling}
        data={kpis?.item}
        onRefresh={onRefresh}
      />
      <ExpedienteBody
        isCalling={kpis.isCalling || clients.isCalling}
        item={clients.item?.empresas ?? []}
        permission={permission}
        totalRecords={clients.item?.totalRegistros ?? 0}
        onRefresh={onRefresh}
      />
    </PageLayout>
  );
}

export default withAppContext(Expediente, EXPEDIENTE_CONTEXT, {
  title: "Expediente",
});
