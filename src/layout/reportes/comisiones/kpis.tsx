import { CURRENCY_FORMAT } from "@app/constants";
import { ReportResumeConstants } from "@app/constants/reports";
import useCall from "@app/hooks/useCall";
import { ReportControllers } from "@app/logic/backend/reports";
import { useContext, useEffect } from "react";
import { ComisionesReportsProps } from ".";
import { ReportComissionContext } from "./context";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";
interface ComisionesReportsKPISProps extends ComisionesReportsProps {}

export default function ComisionesReportsKPIS({
  user,
  userType,
}: ComisionesReportsKPISProps) {
  const { filter, successListenner } = useContext(ReportComissionContext);
  const ResumeReportKPIs = useCall(
    ReportControllers,
    "getResumeReportKPIs",
    () =>
      ReportResumeConstants.getCallOptionsParams(
        {
          card: "",
          zone: "",
          amountType: 0,
          entity: filter.entity,
          origen: "",
          dateStart: filter.dateStart,
          dateEnd: filter.dateEnd,
          transactionType: "",
        },
        user,
        userType
      )
  );

  useEffect(() => {
    ResumeReportKPIs.refresh(
      ReportResumeConstants.getCallOptionsParams(
        {
          card: "",
          zone: "",
          amountType: 0,
          entity: filter.entity,
          origen: "",
          dateStart: filter.dateStart,
          dateEnd: filter.dateEnd,
          transactionType: "",
        },
        user,
        userType
      ).initialParams
    );

    ResumeReportKPIs.itemManager.addEventListenner("change", () => {
      successListenner.requestSuccess();
    });

    return () => {
      ResumeReportKPIs.itemManager.removeEventListenner("change");
    };
  }, [filter]);

  return (
    <KpiContainer title="Comisiones">
      {/* <KpiItem
        loading={ResumeReportKPIs.isCalling}
        title="Promedio Porcentaje de tasa"
        value={ResumeReportKPIs.item?.porcentajeTasaProm ?? "0.00%"}
      /> */}
      <KpiItem
        loading={ResumeReportKPIs.isCalling}
        title="Monto total"
        value={CURRENCY_FORMAT.format(ResumeReportKPIs.item?.montoTotal ?? 0)}
      />

      <KpiItem
        loading={ResumeReportKPIs.isCalling}
        title="Comisión total"
        value={CURRENCY_FORMAT.format(ResumeReportKPIs.item?.comision ?? 0)}
      />
      {userType === "master" && (
        <>
          <KpiItem
            loading={ResumeReportKPIs.isCalling}
            title="Tasa total"
            value={CURRENCY_FORMAT.format(ResumeReportKPIs.item?.tasa ?? 0)}
          />

          <KpiItem
            loading={ResumeReportKPIs.isCalling}
            title="Utilidad Total"
            value={CURRENCY_FORMAT.format(ResumeReportKPIs.item?.utilidad ?? 0)}
          />
        </>
      )}
    </KpiContainer>
  );
}
