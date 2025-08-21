import { useEffect, useState, useMemo, SetStateAction } from "react";
import { DateFormat } from "@app/common/format";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import useCall from "@app/hooks/useCall";
import PageLayout from "@app/layout/app/layout";
import { TransactionBody } from "@app/layout/transactions/body";
import TransactionHeader from "@app/layout/transactions/header";
import { TransactionsControllers } from "@app/logic/backend/transactions";
import { User } from "@app/types/User";
import {
  Transaction,
  TransactionAllKPIs,
  TransactionDateBody,
  TransactionFilters,
  TransactionSaldoEfevoopayBody,
} from "@app/types/Transactions";

export const TRANSACTION_CONTEXT = "dashboard/transacciones";

const getDefaultParams = (user: User): TransactionFilters => {
  const date = new Date();
  return {
    idagep_empresa: `${user.idagep_empresa ?? ""}`,
    fechaInicio: DateFormat.day.start(date, true).toSimpleFormatString(),
    fechaFin: DateFormat.day.end(date, true).toSimpleFormatString(),
    tipoTransaccion: "all",
    idagep_usuarios: user.persona.idagep_usuarios,
    clients: [],
    sucursal: 0,
    idagep_sucursal: 0,
    tipo: "all",
    pagina: 1,
    tamano_pagina: 10,
  };
};

function Transacciones({ user }: AppContextProps) {
  const [isWs, setIsWs] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>(
    getDefaultParams(user)
  );
  const [isReady, setIsReady] = useState(false);
  //llamadas
  const callKPIs = useCall(TransactionsControllers, "kpi", () => ({
    initialParams: [filters] as [body: TransactionFilters],
    skipFistCall: true,
  }));

  const callSaldoefevoopay = useCall(
    TransactionsControllers,
    "saldoefevoopay",
    () => ({
      initialParams: [
        {
          idagep_empresa: filters.idagep_empresa,
        },
      ] as [body: TransactionSaldoEfevoopayBody],
      skipFistCall: true,
    })
  );

  const callTransactionDate = useCall(TransactionsControllers, "date", () => ({
    initialParams: [filters] as [body: TransactionDateBody],
  }));

  useEffect(() => {
    if (!isReady) {
      setIsReady(true);
      return;
    }
    callSaldoefevoopay.refresh([filters]);
    callKPIs.refresh([filters]);
    callTransactionDate.refresh([filters]);
  }, [filters, isReady]);

  const onRefreshDefault = () => {
    setFilters(getDefaultParams(user));
    setIsWs(false);
  };

  const onRefresh = (curr: SetStateAction<Partial<TransactionFilters>>) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  //useMemo formateo
  const transactions: Transaction[] = useMemo(
    () => callTransactionDate.item?.transacciones ?? [],
    [callTransactionDate]
  );

  const totalRecords: number = useMemo(
    () => callTransactionDate.item?.totalRegistros ?? 0,
    [callTransactionDate]
  );

  const loading: boolean = useMemo(
    () => (callTransactionDate.isCalling),
    [callTransactionDate]
  );

  const kpis: TransactionAllKPIs = useMemo(
    () => ({
      montoTotal: callKPIs.item?.montoTotal ?? 0,
      comisionTotal: callKPIs.item?.comisionTotal ?? 0,
      totalTransacciones: callKPIs.item?.totalTransacciones ?? 0,
      promedioPorTicket: callKPIs.item?.promedioPorTicket ?? 0,
      montoReserva: callSaldoefevoopay.item?.montoReserva ?? 0,
      saldoefevoo: callSaldoefevoopay.item?.saldoefevoo ?? 0,
      loader: callKPIs.isCalling && callSaldoefevoopay.isCalling,
    }),
    [callKPIs, callSaldoefevoopay]
  );

  return (
    <PageLayout>
      <TransactionHeader
        filters={filters}
        setIsWs={setIsWs}
        transactions={transactions}
        kpis={kpis}
        loader={loading}
        onRefresh={onRefresh}
      />
      <TransactionBody
        loader={loading}
        transactions={transactions}
        onRefresh={onRefresh}
        onRefreshDefault={onRefreshDefault}
        setIsWs={setIsWs}
        totalRecords={totalRecords}
      />
    </PageLayout>
  );
}

export default withAppContext(Transacciones, TRANSACTION_CONTEXT, {
  title: "Transacciones",
});
