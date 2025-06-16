import {
  useState,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  OperationsAlertsRisksAllResponseAlertas,
  OperationsAlertsRisksAllBody,
} from "@app/types/Operations";
import { OperationsControllers } from "@app/logic/backend/operations";
import useCall from "@app/hooks/useCall";
import { User } from "@app/types/User";
import { UserContext } from "@app/context";
import { DataTableQuery } from "@app/types";
import { DATA_TABLE_QUERY, USER_ADMINS } from "@app/constants";
import { DateFormat } from "@app/common/format";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";

export interface TableAlertsRisksState {
  filters: OperationsAlertsRisksAllBody;
  loader: boolean;
  isAdmin: boolean;
  items: Array<OperationsAlertsRisksAllResponseAlertas>;
  dataTableQuery: DataTableQuery;
  onPage: (event: any) => void;
  onUpdateSatus: (idagep_controles_alertas: number, estatus: string) => void;
  onRefresh: (
    curr: SetStateAction<Partial<OperationsAlertsRisksAllBody>>
  ) => void;
}

const getInitialParams = (user: User): OperationsAlertsRisksAllBody => ({
  filtroEmpresa: "",
  filtroAlerta: "",
  filtroEstatus: "",
  fechaInicio: DateFormat.day.start(new Date(), true).toSimpleFormatString(),
  fechaFin: DateFormat.day.end(new Date(), true).toSimpleFormatString(),
  pagina: 1,
  tamano_pagina: 10,
  idagep_usuario: user.persona.idagep_usuarios,
});

export const useTableAlertsRisks = (): TableAlertsRisksState => {
  const userCtx = useContext(UserContext);
  const [filters, setFilters] = useState(getInitialParams(userCtx.user));
  const [dataTableQuery, setDataTableQuery] =
    useState<DataTableQuery>(DATA_TABLE_QUERY);
  const isAdmin = useMemo(
    () => USER_ADMINS.some((x) => x === userCtx.user.idagep_empresa),
    [userCtx.user]
  );
  const { item, isCalling, refresh } = useCall(
    OperationsControllers,
    "alertsRisksAll",
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

  const onPage: TableAlertsRisksState["onPage"] = (event) => {
    setDataTableQuery((prevDataTableQuery) => ({
      ...prevDataTableQuery,
      first: event.first,
      rows: event.rows,
      page: event.page,
    }));
    onRefresh({ pagina: event.page + 1 });
  };

  const onRefresh: TableAlertsRisksState["onRefresh"] = (curr) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  const onUpdateSatus: TableAlertsRisksState["onUpdateSatus"] = (
    idagep_controles_alertas,
    estatus
  ) => {
    const idagep_usuario = userCtx.user.persona.idagep_usuarios;
    OperationsControllers.alertsRisksStatus({
      idagep_usuario,
      estatus,
      idagep_controles_alertas,
    })
      .then((res) => {
        toast.success(
          "El estado se ha actualizado exitosamente",
          DEFAULT_TOAST_CONFIGURATION
        );
        onRefresh({})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    filters,
    loader: isCalling,
    items: item?.alertas ?? [],
    dataTableQuery,
    onPage,
    onRefresh,
    onUpdateSatus,
    isAdmin,
  };
};
