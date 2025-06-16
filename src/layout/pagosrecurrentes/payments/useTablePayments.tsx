import { useState, SetStateAction, useContext, useEffect, useMemo } from "react";
import {
  PagosRecurrentesPaymentsAllBody,
  PagosRecurrentesPaymentsAllResponsePagosRecurrentes,
} from "@app/types/PagosRecurrentes";
import { PagosRecurrentesController } from "@app/logic/backend/pagosRecurrentes";
import useCall from "@app/hooks/useCall";
import { User } from "@app/types/User";
import { UserContext } from "@app/context";
import { DataTableQuery } from "@app/types";
import { DATA_TABLE_QUERY, USER_ADMINS } from "@app/constants";

interface tablePaymentsReturn {
  filters: PagosRecurrentesPaymentsAllBody;
  loader: boolean;
  isAdmin:boolean;
  items: Array<PagosRecurrentesPaymentsAllResponsePagosRecurrentes>;
  dataTableQuery: DataTableQuery;
  onPage: (event: any) => void;
  onRefresh: (
    curr: SetStateAction<Partial<PagosRecurrentesPaymentsAllBody>>
  ) => void;
}

const getInitialParams = (user: User): PagosRecurrentesPaymentsAllBody => ({
  idagep_usuario: user.persona.idagep_usuarios,
  filtroNombre: "",
  filtroRecurrencia: "",
  pagina: 1,
  tamano_pagina: 10,
});

export const useTablePayments = (): tablePaymentsReturn => {
  const userCtx = useContext(UserContext);
  const [filters, setFilters] = useState(getInitialParams(userCtx.user));
  const [dataTableQuery, setDataTableQuery] =
    useState<DataTableQuery>(DATA_TABLE_QUERY);
  const isAdmin = useMemo(
    () => USER_ADMINS.some((x) => x === userCtx.user.idagep_empresa),
    [userCtx.user]
  );
  const { item, isCalling, refresh } = useCall(
    PagosRecurrentesController,
    "allPayments",
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
    curr: SetStateAction<Partial<PagosRecurrentesPaymentsAllBody>>
  ) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return {
    filters,
    loader: isCalling,
    items: item?.pagosRecurrentes ?? [],
    dataTableQuery,
    onPage,
    onRefresh,
    isAdmin
  };
};
