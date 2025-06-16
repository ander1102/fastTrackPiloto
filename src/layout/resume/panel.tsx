import { useMemo } from "react";
import { DateFormat, eliminarAcentos, isDate } from "@app/common/format";
import EmptyTemplate from "@app/components/EmptyTemplate";
import {
  setResumeChartDataset,
  RESUME_CHART_OPTIONS,
  RESUME_SET_DATA,
  RESUME_LABELS,
  RESUME_PERIOD_TITLE,
} from "@app/constants/resumen";
import useCall from "@app/hooks/useCall";
import {
  ResumeDataPeriod,
  ResumeInfoType,
  ResumeTabs,
} from "@app/types/Resume";
import { User } from "@app/types/User";
import { Client } from "@app/types/Clients";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Sum } from "@app/common";
import { ResumeTransactionTotal } from "./templates";
import { DateDDMMYYHHMMA } from "@app/common/date";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import useValueHandler from "@app/hooks/useValueHandler";
import { ShowDetailsButton } from "../transactions/ShowDetailsButton";
import { USER_ADMINS } from "@app/constants";
import { stringToDate } from "@app/common/format";
import { TransactionsControllers } from "@app/logic/backend/transactions";
import { Transaction, TransactionFilters } from "@app/types/Transactions";
interface ResumePanelProps {
  resumeKey: ResumeInfoType;
  user: User;
  client: Client;
  type: ResumeTabs;
}

const getParams = (
  user: User,
  type: ResumeTabs
): [body: TransactionFilters] => {
  const date = new Date();
  const start =
    type.key === "date"
      ? DateFormat.day.start(date, true)
      : DateFormat.month.start(date, true);
  const end =
    type.key === "date"
      ? DateFormat.day.end(date, true)
      : DateFormat.month.end(date, true);
  return [
    {
      idagep_empresa: `${user.idagep_empresa ?? ""}`,
      fechaInicio: start.toSimpleFormatString(),
      fechaFin: end.toSimpleFormatString(),
      tipo: "all",
      tipoTransaccion: "all",
      idagep_sucursal: 0,
      idagep_usuarios: user.persona.idagep_usuarios,
      pagina: 0,
      tamano_pagina: 0,
    },
  ];
};

export default function ResumePanel({
  user,
  client,
  type,
  resumeKey,
}: ResumePanelProps) {
  const [date] = useValueHandler(new Date());
  const isAdmin = useMemo(
    () => USER_ADMINS.some((x) => x === user.idagep_empresa),
    [user]
  );
  const callTransactionDate = useCall(
    TransactionsControllers,
    "resumen",
    () => ({
      initialParams: getParams(user, type),
    })
  );

  const TransactionItems: Transaction[] = useMemo(
    () => callTransactionDate.item?.transacciones ?? [],
    [callTransactionDate]
  );

  const Payments = useMemo(
    () =>
      TransactionItems?.filter(
        (x) =>
          (x.tipotxn == "VN" || x.tipotxn == "REV") &&
          x.cancela == 0 &&
          x.devolucion == 0 &&
          x.reverso == 0 &&
          (eliminarAcentos(x.Transaccion?.toLowerCase()) === "pago" ||
            eliminarAcentos(x.Transaccion?.toLowerCase()) === "reverso" ||
            eliminarAcentos(x.Transaccion?.toLowerCase()) === "pago 3msi" ||
            eliminarAcentos(x.Transaccion?.toLowerCase()) === "pago 6msi" ||
            eliminarAcentos(x.Transaccion?.toLowerCase()) === "pago 9msi" ||
            eliminarAcentos(x.Transaccion?.toLowerCase()) === "pago 12msi" ||
            eliminarAcentos(x.Transaccion?.toLowerCase()) === "pago 18msi")
      ) ?? [],
    [TransactionItems]
  );

  const Comission = useMemo(
    () =>
      TransactionItems?.filter(
        (x) => eliminarAcentos(x.Transaccion ?? "").toLowerCase() === "comision"
      ) ?? [],
    [TransactionItems]
  );

  const amounts_count = useMemo<(ResumeDataPeriod | null)[]>(() => {
    if (Payments.length === 0) return [];
    const total_periods = RESUME_LABELS[type.key].length;
    const transaction_payment_dates = Payments.map((x) => {
      const date = stringToDate(x.datcr);
      return { ...x, period: RESUME_SET_DATA[type.key](date) };
    });
    const transaction_comission_dates = Comission.map((x) => {
      const date = stringToDate(x.datcr);
      return { ...x, period: RESUME_SET_DATA[type.key](date) };
    });
    const periods = new Set(transaction_payment_dates.map((x) => x.period));
    const data: ResumeDataPeriod[] = [...periods].map((period) => {
      const payment_amounts = transaction_payment_dates.filter(
        (x) => x.period === period
      );
      const comission_amounts = transaction_comission_dates.filter(
        (x) => x.period === period
      );
      return {
        period,
        count: transaction_payment_dates.filter(
          (transaction) => transaction.period === period
        ).length,
        amount: Sum(payment_amounts.map((x) => x.amount ?? 0)),
      };
    });
    return new Array(total_periods).fill(null).map((period, i) => {
      const find_period: ResumeDataPeriod | undefined = data.find(
        (x) => x.period === i + 1
      );
      if (find_period) return find_period;
      return period;
    });
  }, [Payments, Comission]);

  const data = useMemo(
    () =>
      setResumeChartDataset(
        type.key,
        amounts_count.map((x) => x?.count ?? 0),
        amounts_count.map((x) => x?.amount ?? 0)
      ),
    [type.key, amounts_count]
  );
  const convertToDate = (date: string) => {
    if (date.split(" ").length == 1) {
      return date.charAt(0).toUpperCase() + date.slice(1);
    }
    return date.replace(/(\d+\s+de\s+)([a-z]+)/i, function (match, p1, p2) {
      return p1 + p2.charAt(0).toUpperCase() + p2.slice(1);
    });
  };
  return (
    <>
      <section className="my-4">
        <div className="flex-col KpiContainerStart">
          <p className="text-2xl mb-2" style={{color: '#6B3374'}}>Periodo</p>
          <p className="text-gray-600 text-base">
            {convertToDate(RESUME_PERIOD_TITLE[resumeKey](date()).toString())}
          </p>
        </div>
      </section>
      <section className="my-4">
        <Chart
          className="max-h-80 w-full"
          type="bar"
          data={data}
          options={RESUME_CHART_OPTIONS(resumeKey, Payments, amounts_count)}
        />
      </section>
      <section>
        <DataTable
          value={Payments.slice(0, 25)}
          className="datatable-custom p-datatable-customers h-full flex flex-col justify-between"
          style={{ padding: 0, maxHeight: "330px" }}
          scrollHeight="85%"
          scrollable
          rows={10}
          rowHover
          loading={callTransactionDate.isCalling}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={["tipotarj"]}
          emptyMessage={EmptyTemplate}
          currentPageReportTemplate="{first} a {last} de un total de {totalRecords} registros"
        >
          {isAdmin && <Column className="left" field="EMP" header="Cliente" />}
          {!isAdmin && (
            <Column className="left" field="SUC" header="Sucursal" />
          )}
          <Column className="left" field="tipotarj" header="Método de pago" />
          <Column className="left" field="ID" header="Número de transacción" />
          <Column
            className="left"
            field="Transaccion"
            header="Tipo de transacción"
          />
          <Column header="Monto total" body={ResumeTransactionTotal} />
          <Column
            header="Fecha y hora"
            body={(item) => DateDDMMYYHHMMA(new Date(item.datcr))}
          />
          <Column
            body={(item) => (
              <ShowDetailsButton
                item={item}
                transactions={Payments.slice(0, 5) ?? []}
                user={user}
                client={client}
                isResume
                onRefresh={() => {
                  // TODO: refresh table
                }}
              />
            )}
          />
        </DataTable>
      </section>
    </>
  );
}
