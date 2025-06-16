import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import {
  DEFAULT_SUBSIDIARY_BODY,
  DEFAULT_SUBSIDIARY_QUERY,
  DEFAULT_SUBSIDIARY_ROWS,
} from "@app/constants/subsidiary";
import useCall from "@app/hooks/useCall";
import useValueHandler from "@app/hooks/useValueHandler";
import PageLayout from "@app/layout/app/layout";
import SurcursalesBody from "@app/layout/sucursales/body";
import SucursalesHeader from "@app/layout/sucursales/header";
import { SubsidiaryControllers } from "@app/logic/backend/subsidiary";
import { SubsidiaryQuery } from "@app/types/Subsidiary";
import { SetStateAction, useEffect, useState } from "react";

function Sucursales({ permission, user, setTitle }: AppContextProps) {
  const { item, isCalling, itemManager, refresh } = useCall(
    SubsidiaryControllers,
    "get",
    {
      initialParams: [DEFAULT_SUBSIDIARY_BODY(user)],
    }
  );
  const [query, setQuery] = useState(() => DEFAULT_SUBSIDIARY_QUERY);
  const [body, setBody] = useValueHandler(() => DEFAULT_SUBSIDIARY_BODY(user));

  useEffect(() => {
    itemManager.addEventListenner("change", async (item) => {
      let total = 0;
      const totalRes = await SubsidiaryControllers.getTotalRecords(
        user.idagep_empresa ?? 0,
        user.persona.idagep_usuarios
      );
      if (totalRes.isSuccess) total = totalRes.response;
      setTitle(`(${total}) Sucursales`);
      setQuery((prev) => ({
        ...prev,
        first: item.length < DEFAULT_SUBSIDIARY_ROWS ? item.length : prev.first,
        totalRecords: total,
        currRecords:
          item.length < DEFAULT_SUBSIDIARY_ROWS ? item.length : total,
      }));
    });

    return () => {
      itemManager.removeEventListenner("change");
    };
  }, []);

  const onRefresh = (curr: SetStateAction<Partial<SubsidiaryQuery>>) => {
    setBody((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
    refresh([body()]);
  };

  return (
    <PageLayout>
      <SucursalesHeader
        permission={permission}
        onRefresh={onRefresh}
        query={query}
      />
      <SurcursalesBody
        sucursales={item}
        loader={isCalling}
        permission={permission}
        onRefresh={onRefresh}
        query={query}
        setQuery={setQuery}
      />
    </PageLayout>
  );
}

export default withAppContext(Sucursales, "dashboard/sucursales", {
  title: "Sucursales",
});
