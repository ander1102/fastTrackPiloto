import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { useState, useMemo } from "react";
import { RESUME_TAB_TYPE } from "@app/constants/resumen";
import { TabPanel, TabView } from "primereact/tabview";
import ResumePanel from "@app/layout/resume/panel";
import FulfillmentMessage from "@app/components/ModalComponent/modals/fulfillments/FulfillmentMessage";
import { modalManager } from "@app/components/ModalComponent";
import { ClientsControllers } from "@app/logic/backend/clients";
import useEffectAsync from "@app/hooks/useEffectAsync";
export const CONTEXT = "dashboard/reportes";
import useCall from "@app/hooks/useCall";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";
import { User } from "@app/types/User";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import {
  TransactionFilters,
  TransactionAllKPIs,
  TransactionResumenBody,
  TransactionSaldoEfevoopayBody,
} from "@app/types/Transactions";
import { ResumeTabs } from "@app/types/Resume";
import { DateFormat } from "@app/common/format";
import { TransactionsControllers } from "@app/logic/backend/transactions";
const date = new Date();

const getParams = (
  user: User,
  type: ResumeTabs
): [body: TransactionResumenBody] => {
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
      idagep_usuarios: user.persona.idagep_usuarios,
      fechaInicio: start.toSimpleFormatString(),
      fechaFin: end.toSimpleFormatString(),
    },
  ];
};

function Resumen({ user,client }: AppContextProps) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffectAsync(async () => {
    if (user && user.userType === "admin") {
      const cliente = await ClientsControllers.get({
        idagep_empresa: user.idagep_empresa ?? 0,
        id_login: +user.persona.idagep_usuarios
      });

      if (cliente && cliente.response?.cumplimiento === "Pendiente") {
        modalManager.show(FulfillmentMessage, {}, CONTEXT).then();
      }
    }
  }, []);

  //llamadas
  const callGetKPIs = useCall(TransactionsControllers, "kpi", () => ({
    initialParams: getParams(user, RESUME_TAB_TYPE[currentTabIndex]),
  }));

  const callGetEfevooAmount = useCall(
    TransactionsControllers,
    "saldoefevoopay",
    () => ({
      initialParams: [
        {
          idagep_empresa: `${user.idagep_empresa ?? ""}`,
          idagep_usuarios: user.persona.idagep_usuarios ?? 0,
        },
      ] as [body: TransactionSaldoEfevoopayBody],
    })
  );

  useEffectAsync(async () => {
    await callGetKPIs.refresh(
      getParams(user, RESUME_TAB_TYPE[currentTabIndex])
    );

    await callGetEfevooAmount.refresh([
      {
        idagep_empresa: `${user.idagep_empresa ?? ""}`,
        idagep_usuarios: user.persona.idagep_usuarios ?? 0,
      },
    ] as [body: TransactionSaldoEfevoopayBody]);
  }, [currentTabIndex]);

  //formateo
  const kpis: TransactionAllKPIs = useMemo(
    () => ({
      montoTotal: callGetKPIs.item?.montoTotal ?? 0,
      comisionTotal: callGetKPIs.item?.comisionTotal ?? 0,
      totalTransacciones: callGetKPIs.item?.totalTransacciones ?? 0,
      promedioPorTicket: callGetKPIs.item?.promedioPorTicket ?? 0,
      saldoefevoo: callGetEfevooAmount.item?.saldoefevoo ?? 0,
      montoReserva: callGetEfevooAmount.item?.montoReserva ?? 0,
      loader: callGetKPIs.isCalling && callGetEfevooAmount.isCalling,
    }),
    [callGetKPIs, callGetEfevooAmount]
  );


  const tooltip_kpi_total_transactions  = useMemo(()=>{
    if (currentTabIndex == 0){
      return "Número de ventas de hoy."
    }else if (currentTabIndex == 1){
      return "Número de ventas del mes en curso."
    }
  },[currentTabIndex])
  const tooltip_kpi_total_amount        = useMemo(()=>{
    if (currentTabIndex == 0){
      return "Suma del importe de ventas de hoy."
    }else if (currentTabIndex == 1){
      return "Número de ventas del mes en curso."
    }
  },[currentTabIndex])
  const tooltip_kpi_average_ticket      = useMemo(()=>{
    if (currentTabIndex == 0){
      return "Monto promedio por transacción de hoy."
    }else if (currentTabIndex == 1){
      return "Monto promedio por transacción del mes."
    }
  },[currentTabIndex])
  const tooltip_kpi_amount_backup       = useMemo(()=>{
    if (currentTabIndex == 0){
      return "Monto retenido de sus ventas como fondo de reserva."
    }else if (currentTabIndex == 1){
      return "Monto retenido de sus ventas como fondo de reserva."
    }
  },[currentTabIndex])
  const tooltip_kpi_balance_efevoopay   = useMemo(()=>{
    if (currentTabIndex == 0){
      return "Suma del monto total menos la comisión."
    }else if (currentTabIndex == 1){
      return "Suma del monto total menos la comisión."
    }
  },[currentTabIndex])

  return (
    <>
      <section className="container-header-tab">
        <KpiContainer title="Resumen">
          <KpiItem
            title="Total de transacciones"
            value={kpis.totalTransacciones}
            loading={kpis.loader}
            tooltip={tooltip_kpi_total_transactions}
          />
          <KpiItem
            title="Monto total"
            value={useTruncateAmout(kpis.montoTotal)}
            loading={kpis.loader}
            tooltip={tooltip_kpi_total_amount}
          />
          <KpiItem
            title="Ticket promedio"
            value={useTruncateAmout(kpis.promedioPorTicket)}
            loading={kpis.loader}
            tooltip={tooltip_kpi_average_ticket}
          />
          <KpiItem
            title="Fondo de Reserva"
            value={useTruncateAmout(kpis.montoReserva)}
            loading={kpis.loader}
            tooltip={tooltip_kpi_amount_backup}
          />
          <KpiItem
            title="Saldo Thunderpay"
            value={useTruncateAmout(kpis.saldoefevoo)}
            loading={kpis.loader}
            tooltip={tooltip_kpi_balance_efevoopay}
          />
        </KpiContainer>
      </section>

      <section className="container-body-tab">
        <TabView
          className="p-tab"
          renderActiveOnly={false}
          activeIndex={currentTabIndex}
          onTabChange={({ index }) => {
            setCurrentTabIndex(index);
          }}
        >
          {RESUME_TAB_TYPE.map((tab) => {
            return (
              <TabPanel
                header={tab.header}
                className="text-blue-400"
                key={tab.key}
              >
                <ResumePanel resumeKey={tab.key} user={user} client={client} type={tab} />
              </TabPanel>
            );
          })}
        </TabView>
      </section>
    </>
  );
}

export default withAppContext(Resumen, CONTEXT, {
  title: "Resumen",
});
