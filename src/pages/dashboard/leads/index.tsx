import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { SetStateAction, useEffect, useState } from "react";
import { LeadsControllers } from "@app/logic/backend/leads";
import LeadsFilters from "@app/layout/leads/filters";
import LeadsHeader from "@app/layout/leads/header";
import LeadsBody from "@app/layout/leads/body";
import useCall from "@app/hooks/useCall";
import { LeadsGetBody } from "@app/types/Leads";
import LeadsTableHeaders from "@app/layout/leads/tableHeaders";
import {
  BodyContainer,
  HeaderContainer,
  PageContainer,
} from "@app/layout/app/containers";

export const LEADS_CONTEXT = "dashboard/leads";

function Leads({ setTitle, permission, user }: AppContextProps) {
  const { idagep_usuarios } = user.persona;
  const [leadsSelected, setLeadSelected] = useState([]);
  const [filters, setFilters] = useState({
    idagep_usuarios: idagep_usuarios,
    busqueda: "",
    fechaIni: "",
    fechaFin: "",
    estatus: "ALL",
    gerente: "",
    agente: "",
    PageIndex: 1,
    PageSize: 10,
  });
  const { item, isCalling, itemManager, refresh } = useCall(
    LeadsControllers,
    "getLeads",
    () => ({
      initialParams: [filters] as [body: any],
      skipFistCall: true,
    })
  );

  const [kpinfo, setKpinfo] = useState({
    total: 0,
    nuevos: 0,
    calificados: 0,
    contactados: 0,
    convertidos: 0,
    nocalificados: 0,
  });

  useEffect(() => {
    itemManager.addEventListenner("change", (items) => {
      setTitle(`(${items.total}) Leads`);
      setKpinfo({
        total: items.total,
        nuevos: items.nuevos,
        calificados: items.calificados,
        contactados: items.contactados,
        convertidos: items.convertidos,
        nocalificados: items.nocalificados,
      });
    });

    return () => {
      itemManager.removeEventListenner("change");
    };
  }, []);

  useEffect(() => {
    refresh([filters]);
  }, [filters]);

  const onRefresh = (curr: SetStateAction<Partial<LeadsGetBody>>) => {
    setFilters((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <LeadsHeader
          permission={permission}
          total={kpinfo?.total}
          nuevos={kpinfo?.nuevos}
          calificados={kpinfo?.calificados}
          contactados={kpinfo?.contactados}
          convertidos={kpinfo?.convertidos}
          nocalificados={kpinfo?.nocalificados}
        />
        <LeadsFilters
          permission={permission}
          onRefresh={onRefresh}
          user={user}
          filters={filters}
          isCalling={isCalling}
        />
      </HeaderContainer>

      <BodyContainer>
        <LeadsTableHeaders
          permission={permission}
          onRefresh={onRefresh}
          filters={filters}
          isCalling={isCalling}
          user={user}
          setLeadSelected={setLeadSelected}
          leadsSelected={leadsSelected}
        />
        <LeadsBody
          item={item?.data ?? []}
          isCalling={isCalling}
          permission={permission}
          onRefresh={onRefresh}
          totalRecords={item?.totalRegistros ?? 0}
          setLeadSelected={setLeadSelected}
          leadsSelected={leadsSelected}
        />
      </BodyContainer>
    </PageContainer>
  );
}

export default withAppContext(Leads, "dashboard/leads", {
  title: "Leads",
});
