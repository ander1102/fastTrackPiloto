import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { IntegracionesHistorial } from "./historial";
import { IntegrationLinks } from "./links";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";

import { IntegrationHistoryFilters } from "@app/types/Integrations";
import { User } from "@app/types/User";
import useCall from "@app/hooks/useCall";
import { IntegrationsControllers } from "@app/logic/backend/integrations";
import { DateFormat } from "@app/common/format";
import { INTEGRATIONS_LINK_ITEMS } from "@app/constants/integrations";
import { CURRENCY_FORMAT } from "@app/constants";

interface IntegrationsViewProps {
  user: User;
}

const getDefaultParams = (user: User): IntegrationHistoryFilters => {
  const date = new Date();
  return {
    idagep_empresa: user.idagep_empresa ?? 0,
    fechaInicio: DateFormat.month.start(date, true).toSimpleFormatString(),
    fechaFin: DateFormat.day.end(date, true).toSimpleFormatString(),
    estatus: "",
    pagina: 1,
    tamano_pagina: 10,
  };
};

export function IntegrationsView({ user }: IntegrationsViewProps) {
  const [filters, setFilters] = useState<IntegrationHistoryFilters>(
    getDefaultParams(user)
  );

  const kpis = useCall(IntegrationsControllers, "getKPIS", () => ({
    initialParams: [filters] as [body: IntegrationHistoryFilters],
  }));

  const records = useCall(IntegrationsControllers, "getHistory", () => ({
    initialParams: [filters] as [body: IntegrationHistoryFilters],
  }));

  useEffect(() => {
    kpis.refresh([filters]);
    records.refresh([filters]);
  }, [filters]);

  const onRefreshDefault = () => {
    setFilters(getDefaultParams(user));
  };

  return (
    <>
      <section className="container-header-tab">
        <KpiContainer title="Pagos a Distancia">
          <KpiItem
            loading={kpis.isCalling}
            title="Total de transacciones"
            value={kpis.item?.totalTransacciones ?? 0}
          />
          <KpiItem
            loading={kpis.isCalling}
            title="Monto total"
            value={CURRENCY_FORMAT.format(kpis.item?.montoTotal ?? 0)}
          />
          <KpiItem
            loading={kpis.isCalling}
            title="Ticket promedio"
            value={CURRENCY_FORMAT.format(kpis.item?.promedioPorTicket ?? 0)}
          />
        </KpiContainer>

        {/* <Link
          href="/dashboard/integraciones/documentacion"
          className="w-60 h-14 ml-auto border-b-4 border-[#65C986] p-4 bg-beige rounded
            flex items-center gap-3 hover:opacity-80"
        >
          <picture className="w-8 h-8 bg-[#B8EDD3] rounded-full flex items-center justify-center">
            <Image
              alt=""
              src="/Images/integrations/documentacion.svg"
              width={20}
              height={20}
            />
          </picture>
          <span>Documentación</span>
          <Image
            alt=""
            className="ml-4 flex-1"
            src="/Images/svg/ico/arrowRight.svg"
            width={20}
            height={14}
          />
        </Link> */}
      </section>

      <section className="flex-1 lg:flex">
        <TabView
          className="p-tab lg:flex-1 flex flex-col"
          panelContainerClassName="flex-1"
          renderActiveOnly={false}
        >
          <TabPanel header="Ligas de Pago">
            <section
              className="mt-5 sm:mx-5 px-6 sm:px-10 pt-20 pb-12 bg-[#FCF8FC] rounded-md 
                flex-1 flex flex-wrap items-start justify-evenly gap-x-5 gap-y-16"
            >
              {INTEGRATIONS_LINK_ITEMS.map((item) => (
                <IntegrationLinks key={item.title} {...item} />
              ))}
            </section>
          </TabPanel>

          <TabPanel header="Historial">
            <IntegracionesHistorial
              filters={filters}
              loading={records.isCalling}
              records={records.item?.links ?? []}
              totalRecords={records.item?.total ?? 0}
              onRefreshDefault={onRefreshDefault}
              setFilters={setFilters}
            />
          </TabPanel>
        </TabView>
      </section>
    </>
  );
}
