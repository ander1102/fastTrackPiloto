import { SetStateAction, useCallback, useEffect, useState } from "react";
import { DateFormat } from "@app/common/format";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import useCall from "@app/hooks/useCall";
import PageLayout from "@app/layout/app/layout";
import ClientesReferidosBody from "@app/layout/ventas/clientesreferidos/table/body";
import ClientesReferidosHeader from "@app/layout/ventas/clientesreferidos/table/header";
import { ClientsReferralsControllers } from "@app/logic/backend/clientsReferrals";
import { DataTableQuery } from "@app/types";
import { User } from "@app/types/User";

import {
  ClientReferralsAllParams,
  ClientsReferralsKpiBody,
} from "@app/types/ClientsReferrals";

const getInitialParams = (user: User): ClientReferralsAllParams => {
  const date = new Date();
  const start = DateFormat.month.start(date, true);
  const end = DateFormat.month.end(date, true);
  return {
    idagep_usuarios: user.persona.idagep_usuarios ?? 0,
    fechaInicio: "",
    fechaFin: "",
    estatus: "",
    gerente: "",
    agente: "",
    pagina: 1,
    tamano_pagina: 10,
  };
};

function ClientesReferidos({ user }: AppContextProps) {
  //useState
  const [filters, setFilters] = useState<ClientReferralsAllParams>(
    getInitialParams(user)
  );
  const [lazyState, setlazyState] = useState<DataTableQuery>({
    first: 0,
    rows: 10,
    page: 1,
    totalRecords: 0,
    currRecords: 0,
  });
  //Actions
  const onRefresh = (
    curr: SetStateAction<Partial<ClientReferralsAllParams>>
  ) => {
    setFilters((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };
  const onPage = (event: any) => {
    setlazyState(event);
    onRefresh({ pagina: (event.page + 1).toString() });
  };

  //useCall
  const responseAll = useCall(ClientsReferralsControllers, "all", () => ({
    initialParams: [filters] as [body: ClientReferralsAllParams],
    skipFistCall: false,
  }));

  const responsekpis = useCall(ClientsReferralsControllers, "kpi", () => ({
    initialParams: [
      {
        idagep_usuarios: user.persona.idagep_usuarios ?? 0,
      },
    ] as [body: ClientsReferralsKpiBody],
    skipFistCall: false,
  }));

  //useEfects
  useEffect(() => {
    responseAll.refresh([filters]);
  }, [filters]);

  return (
    <PageLayout>
      
      <ClientesReferidosHeader
        onRefresh={onRefresh}
        loader={responseAll.isCalling}
        kpis={responsekpis.item}
        filters={filters}
      />
      <ClientesReferidosBody
        loader={responseAll.isCalling}
        items={responseAll.item?.data ?? []}
        totalRecords={responseAll.item?.total ?? 0}
        onPage={onPage}
        lazyState={lazyState}
        onRefresh={onRefresh}
      />
    </PageLayout>
  );
}

export default withAppContext(
  ClientesReferidos,
  
  "dashboard/ventas/clientesreferidos",
  {
    title: "Clientes Referidos",
  }
);
