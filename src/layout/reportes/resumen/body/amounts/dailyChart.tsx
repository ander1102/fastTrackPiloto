import { useContext, useEffect, useMemo, useState } from "react";
import { AppContextProps } from "@app/components/HOC/withAppContext";
import { ReportResumeConstants } from "@app/constants/reports";
import useCall from "@app/hooks/useCall";
import { ReportControllers } from "@app/logic/backend/reports";
import { Chart } from "primereact/chart";
import { ReportResumeContext } from "../../context";
import LoaderView from "@app/components/Loader/loaderView";
import Portal from "@app/components/Portal";
import DescriptionCard from "@app/components/DescriptionCard";
import { colorsConfig } from "../../../../../../assets.config";
interface DailyChartProps extends Pick<AppContextProps, "userType" | "user"> {}

export default function DailyChart({ user, userType }: DailyChartProps) {
  const { filter, successListenner } = useContext(ReportResumeContext);
  const ResumeDailyReport = useCall(
    ReportControllers,
    "getResumeDailyReport",
    () => ReportResumeConstants.getCallOptionsParams(filter, user, userType)
  );

  useEffect(() => {
    ResumeDailyReport.itemManager.addEventListenner("change", (item) => {
      successListenner.requestSuccess();
    });

    ResumeDailyReport.itemManager.addEventListenner("error", () => {
      successListenner.requestSuccess();
    });

    ResumeDailyReport.refresh(
      ReportResumeConstants.getCallOptionsParams(filter, user, userType)
        .initialParams
    );

    return () => {
      ResumeDailyReport.itemManager.removeEventListenner("change");
      ResumeDailyReport.itemManager.removeEventListenner("error");
    };
  }, [filter]);

  const data = useMemo(() => {
    const periods = ReportResumeConstants.getReportPeriod(
      filter.dateStart,
      filter.dateEnd
    );
    const transactions = ResumeDailyReport.item?.datos ?? [];
    return ReportResumeConstants.REPORT_GET_RESUME_DAILY_CHART_DATA(
      transactions,
      periods
    );
  }, [ResumeDailyReport.item, filter.dateStart, filter.dateEnd]);

  return (
    <LoaderView loading={ResumeDailyReport.isCalling}>
      <Chart
        type="bar"
        data={data}
        className="w-full"
        options={ReportResumeConstants.REPORT_GET_RESUME_CHART_OPTIONS_LINE(
          userType,
          data.type
        )}
      />
      <Portal id="_resume_report_description_cards">
        <DescriptionCard title="Monto total diario" color={colorsConfig.quinary} />
      </Portal>
    </LoaderView>
  );
}
