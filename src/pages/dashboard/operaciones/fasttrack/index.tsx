import { SetStateAction, useEffect, useState } from "react";
import withAppContext from "@app/components/HOC/withAppContext";
import { OperationsBody } from "@app/layout/operations/fasttrack/body";
import { OperationsHeader } from "@app/layout/operations/fasttrack/header";
import { OperationsFastTrackAllBody } from "@app/types/Operations";
import { DateFormat } from "@app/common/format";
import useCall from "@app/hooks/useCall";
import { OperationsControllers } from "@app/logic/backend/operations";

import { PageContainer } from "@app/layout/app/containers";

export const OPERATIONS_CONTEXT = "dashboard/operaciones";

const getDefaultParams = (): OperationsFastTrackAllBody => {
  const date = new Date();
  return {
    idagep_empresa: "",
    idagep_catalerta: "",
    idagep_catriesgo: 0,
    fechaInicio: DateFormat.day.start(date, true).toSimpleFormatString(),
    fechaFin: DateFormat.day.end(date, true).toSimpleFormatString(),
    pagina: 1,
    tamano_pagina: 10,
  };
};

function Operaciones() {
  const [filters, setFilters] = useState<OperationsFastTrackAllBody>(
    getDefaultParams()
  );
  const { item, isCalling, refresh } = useCall(
    OperationsControllers,
    "fastTrackAll",
    () => ({
      initialParams: [filters] as [body: OperationsFastTrackAllBody],
      skipFistCall: true,
    })
  );

  useEffect(() => {
    refresh([filters]);
  }, [filters]);

  const onRefresh = (
    curr: SetStateAction<Partial<OperationsFastTrackAllBody>>
  ) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return (
    <PageContainer
      header={
        <OperationsHeader
          filters={filters}
          loader={isCalling}
          onRefresh={onRefresh}
        />
      }
      body={
        <OperationsBody
          loader={isCalling}
          operations={item?.empresas ?? []}
          totalRecords={item?.totalRegistros ?? 0}
          onRefresh={onRefresh}
        />
      }
    />
  );
}

export default withAppContext(Operaciones, OPERATIONS_CONTEXT, {
  title: "Operaciones",
});
