import useCall from "@app/hooks/useCall";
import { BodyLiquidacion } from "./body"
import { LiquidacionHeader } from "./header"
import { DepositsControllers } from "@app/logic/backend/deposits";
import { User } from "@app/types/User";
import { DateFormat } from "@app/common/format";
import { SetStateAction, useEffect, useState } from "react";

export const IndexLiquidacion = ({user, isAdmin, setTitle}:any) => {
  const date = new Date();
  const start = DateFormat.month.start(date, true);
  const end = DateFormat.month.end(date, true);

  const [filters, setFilters] = useState({
    fechaInicio: start.toSimpleFormatString(),
    fechaFin: end.toSimpleFormatString(),
    tamano_pagina: 15,
    pagina: 1,
  });

  const { item, isCalling, itemManager, refresh } = useCall(
    DepositsControllers,
    "getLiquidacion",
    () => ({
      initialParams: [filters] as [body: any],
      skipFistCall: false,
    })
  );

  useEffect(() => {
    itemManager.addEventListenner("change", (items) => {
      setTitle(`Liquidaciones`);
    });

    return () => {
      itemManager.removeEventListenner("change");
    };
  }, []);

  useEffect(() => {
    refresh([filters]);
  }, [filters]);

  const onRefresh = (curr: SetStateAction<Partial<any>>) => {
    setFilters((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return (
    <>
      <LiquidacionHeader user={user} isAdmin={isAdmin} onRefresh={onRefresh}/>
      <BodyLiquidacion
        isCalling={isCalling}
        liquidaciones={item?.liquidaciones ?? []}
        user={user}
        isAdmin={isAdmin}
        totalRecord={item?.total ?? 0}
        onRefresh={onRefresh}
        filters={filters}
      />
    </>
  )
}