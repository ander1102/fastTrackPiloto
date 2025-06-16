import { SetStateAction, useEffect, useState } from "react";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import PageLayout from "@app/layout/app/layout";
import { TerminalesBody } from "@app/layout/terminales/body";
import { TerminalesHeader } from "@app/layout/terminales/header";

import { TerminalFilters } from "@app/types/Terminal";
import { User } from "@app/types/User";
import useCall from "@app/hooks/useCall";
import { TerminalControllers } from "@app/logic/backend/terminal";
import { DEFAULT_TERMINAL_VALUES } from "@app/constants/terminal";

const getInitialParams = (user: User): TerminalFilters =>
  DEFAULT_TERMINAL_VALUES(user);

function Terminales({ permission, user, setTitle }: AppContextProps) {
  const [filters, setFilters] = useState(getInitialParams(user));
  const terminales = useCall(TerminalControllers, "get", {
    initialParams: [filters],
    skipFistCall: true,
  });

  const kpis = useCall(TerminalControllers, "getTotalRecords", {
    initialParams: [filters],
    skipFistCall: true,
  });

  const onRefresh = (curr: SetStateAction<Partial<TerminalFilters>>) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  useEffect(() => {
    terminales.refresh([filters]);
    kpis.refresh([filters]);
  }, [filters]);

  useEffect(() => {
    setTitle(`(${kpis.item?.total ?? 0}) Terminales`);
  }, [kpis.item?.total]);

  return (
    <PageLayout>
      <TerminalesHeader
        loader={terminales.isCalling || kpis.isCalling}
        kpis={kpis.item}
        onRefresh={onRefresh}
      />
      <TerminalesBody
        loader={terminales.isCalling}
        permission={permission}
        terminales={terminales.item?.terminales ?? []}
        totalRecords={terminales.item?.total ?? 0}
        onRefresh={onRefresh}
      />
    </PageLayout>
  );
}

export default withAppContext(Terminales, "dashboard/terminales", {
  title: "Terminales",
});
