import { useContext, useEffect } from "react";
import { ReportResumeConstants } from "@app/constants/reports";
import useCall from "@app/hooks/useCall";
import { ReportControllers } from "@app/logic/backend/reports";
import { ReportResumeContext } from "./context";
import { ResumeReportsProps } from ".";
import { CURRENCY_FORMAT } from "@app/constants";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";
export default function ResumeReportsKPIS({
  user,
  userType,
}: ResumeReportsProps) {
  const { filter, successListenner } = useContext(ReportResumeContext);
  const ResumeReportKPIs = useCall(
    ReportControllers,
    "getResumeReportKPIs",
    () => ReportResumeConstants.getCallOptionsParams(filter, user, userType)
  );

  useEffect(() => {
    ResumeReportKPIs.refresh(
      ReportResumeConstants.getCallOptionsParams(filter, user, userType)
        .initialParams
    );

    ResumeReportKPIs.itemManager.addEventListenner("change", () => {
      successListenner.requestSuccess();
    });

    ResumeReportKPIs.itemManager.addEventListenner("error", () => {
      successListenner.requestSuccess();
    });

    return () => {
      ResumeReportKPIs.itemManager.removeEventListenner("change");
      ResumeReportKPIs.itemManager.removeEventListenner("error");
    };
  }, [filter]);

  return (
    <KpiContainer title="Reportes">
      <KpiItem
        loading={ResumeReportKPIs.isCalling}
        title="Transacciones totales"
        value={ResumeReportKPIs.item?.totalTransacciones ?? 0}
      />
      <KpiItem
        loading={ResumeReportKPIs.isCalling}
        title="Monto total"
        value={CURRENCY_FORMAT.format(ResumeReportKPIs.item?.montoTotal ?? 0)}
      />
      <KpiItem
        loading={ResumeReportKPIs.isCalling}
        title="Txn. promedio diarias"
        value={ResumeReportKPIs.item?.transaccionesProm ?? 0}
      />
      <KpiItem
        loading={ResumeReportKPIs.isCalling}
        title="Monto promedio diario"
        value={CURRENCY_FORMAT.format(ResumeReportKPIs.item?.montoProm ?? 0)}
      />
    </KpiContainer>
  );
}
