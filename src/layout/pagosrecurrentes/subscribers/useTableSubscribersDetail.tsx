import { useState, useContext, SetStateAction, useEffect } from "react";
import {
  PagosRecurrentesSubscribersPagosBody,
  PagosRecurrentesSubscribersPagosResponsePagos,
} from "@app/types/PagosRecurrentes";
import { PagosRecurrentesController } from "@app/logic/backend/pagosRecurrentes";
import useCall from "@app/hooks/useCall";
import { User } from "@app/types/User";
import { UserContext } from "@app/context";
import { DataTableQuery } from "@app/types";
import { DATA_TABLE_QUERY } from "@app/constants";

interface tableSubscribersDetailReturn {
  filters: PagosRecurrentesSubscribersPagosBody;
  loader: boolean;
  onPage: (event: any) => void;
  items: Array<PagosRecurrentesSubscribersPagosResponsePagos>;
  sumaMonto: number;
  dataTableQuery: DataTableQuery;
  onRefresh: (
    curr: SetStateAction<Partial<PagosRecurrentesSubscribersPagosBody>>
  ) => void;
}

const getInitialParams = (
  user: User,
  idagep_pagos_suscriptor: number
): PagosRecurrentesSubscribersPagosBody => ({
  idagep_usuario: user.persona.idagep_usuarios,
  idagep_pagos_suscriptor: idagep_pagos_suscriptor,
  pagina: 1,
  tamano_pagina: 10,
});

export const useTableSubscribersDetail = (
  idagep_pagos_suscriptor: number
): tableSubscribersDetailReturn => {
  const userCtx = useContext(UserContext);

  const [filters, setFilters] = useState(
    getInitialParams(userCtx.user, idagep_pagos_suscriptor)
  );
  const [dataTableQuery, setDataTableQuery] =
    useState<DataTableQuery>(DATA_TABLE_QUERY);

  const { item, isCalling, refresh } = useCall(
    PagosRecurrentesController,
    "pagosSubscribers",
    {
      initialParams: [filters],
    }
  );

  useEffect(() => {
    refresh([filters]);
  }, [filters]);

  useEffect(() => {
    setDataTableQuery((prevDataTableQuery) => ({
      ...prevDataTableQuery,
      totalRecords: item?.totalRegistros ?? 0,
    }));
  }, [item?.totalRegistros]);

  const onPage = (event: { page: number; first: number; rows: number }) => {
    setDataTableQuery((prevDataTableQuery) => ({
      ...prevDataTableQuery,
      first: event.first,
      rows: event.rows,
      page: event.page,
    }));
    onRefresh({ pagina: event.page + 1 });
  };

  const onRefresh = (
    curr: SetStateAction<Partial<PagosRecurrentesSubscribersPagosBody>>
  ) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return {
    filters,
    loader: isCalling,
    items: item?.pagos ?? [],
    sumaMonto: item?.sumaMonto ?? 0,
    dataTableQuery,
    onPage,
    onRefresh,
  };
};
