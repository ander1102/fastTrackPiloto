import { SetStateAction, useEffect, useState } from "react";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { ClientesBody } from "@app/layout/clientes/body";
import { ClientesHeader } from "@app/layout/clientes/header";
import PageLayout from "@app/layout/app/layout";

import { ClientsAllKpis, ClientsFilters } from "@app/types/Clients";
import useCall from "@app/hooks/useCall";
import { ClientsControllers } from "@app/logic/backend/clients";
import { DateFormat } from "@app/common/format";

export const CLIENTS_CONTEXT = "dashboard/clientes";

const getDefaultParams = (): ClientsFilters => {
  const date = new Date();
  return {
    idagep_empresa: "",
    cumplimiento: "",
    estatus: "",
    fechaInicio: DateFormat.month.start(date, true).toSimpleFormatString(),
    fechaFin: DateFormat.day.end(date, true).toSimpleFormatString(),
    origen: "",
    pagina: 1,
    tamano_pagina: 10,
  };
};

const getDefaultKpis = (): ClientsAllKpis => ({
  TotalClientes: 0,
  Activo: 0,
  sin_movimiento: 0,
  Inactivo: 0,
  Deshabilitado: 0,
  Configurar: 0,
});

function Clientes({ permission, user }: AppContextProps) {
  const { idagep_empresa } = user;
  const [filters, setFilters] = useState(getDefaultParams());

  const clients = useCall(ClientsControllers, "all", () => ({
    initialParams: [filters] as [body: ClientsFilters],
    skipFistCall: true,
  }));
  const kpis = useCall(ClientsControllers, "getAllKpis", () => ({
    initialParams: [filters] as [body: ClientsFilters],
    skipFistCall: true,
  }));

  const onRefresh = (curr: SetStateAction<Partial<any>>) => {
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
      <ClientesHeader
        filters={filters}
        kpis={kpis.item ?? getDefaultKpis()}
        loader={kpis.isCalling}
        permission={permission}
        onRefresh={onRefresh}
      />

      <ClientesBody
        isCalling={clients.isCalling}
        item={clients.item?.empresas ?? []}
        permission={permission}
        totalRecords={clients.item?.totalRegistros ?? 0}
        userId={idagep_empresa ?? 0}
        onRefresh={onRefresh}
      />
    </PageLayout>
  );
}

export default withAppContext(Clientes, CLIENTS_CONTEXT, {
  title: "Clientes",
});
