import { useMemo, useEffect } from "react";
import { ReportResumeConstants } from "@app/constants/reports";
import { Chart } from "primereact/chart";
import useCall from "@app/hooks/useCall";
import { ReportControllers } from "@app/logic/backend/reports";
import { useContext } from "react";
import { ReportResumeContext } from "../../context";
import { AppContextProps } from "@app/components/HOC/withAppContext";
import LoaderView from "@app/components/Loader/loaderView";
import Portal from "@app/components/Portal";
import DescriptionCard from "@app/components/DescriptionCard";
import { fillArrayCircularly } from "@app/common/format";

interface EntityChartProps extends Pick<AppContextProps, "userType" | "user"> {}

export default function EntityChart({ user, userType }: EntityChartProps) {
  const { filter, successListenner } = useContext(ReportResumeContext);
  const ResumeEntityReport = useCall(
    ReportControllers,
    "getResumeEntityReport",
    () => ReportResumeConstants.getCallOptionsParams(filter, user, userType)
  );

  useEffect(() => {
    ResumeEntityReport.itemManager.addEventListenner("change", (item) => {
      successListenner.requestSuccess();
    });

    ResumeEntityReport.itemManager.addEventListenner("error", (item) => {
      successListenner.requestSuccess();
    });

    ResumeEntityReport.refresh(
      ReportResumeConstants.getCallOptionsParams(filter, user, userType)
        .initialParams
    );

    return () => {
      ResumeEntityReport.itemManager.removeEventListenner("change");
    };
  }, [filter]);

  const entities = useMemo(() => {
    const items = ResumeEntityReport.item ? ResumeEntityReport.item : [];
    const itemsArray = Object.entries(items).map(([name, obj]) => ({
      name,
      ...obj,
    }));
    const itemSort = itemsArray.sort(
      (a, b) => (b.sumTotal ?? 0) - (a.sumTotal ?? 0)
    );
    return itemSort.slice(0, 10);
  }, [ResumeEntityReport.item]);

  const data = useMemo(() => {
    return ReportResumeConstants.REPORT_GET_RESUME_ENTITY_CHART_DATA(entities);
  }, [ResumeEntityReport.item]);

  return (
    <LoaderView loading={ResumeEntityReport.isCalling}>
      <Chart
        type="bar"
        className="w-full"
        data={data}
        options={ReportResumeConstants.REPORT_GET_RESUME_CHART_OPTIONS_BAR(
          userType,
          data.labels.length
        )}
      />
      <Portal id="_resume_report_description_cards">
        {entities?.map((x, i) => {
          const color: string[] = fillArrayCircularly(
            ReportResumeConstants.REPORT_RESUME_ENTITY_COLORS,
            entities.length
          );
          return <DescriptionCard key={i} title={x.name} color={color[i]} />;
        })}
      </Portal>
    </LoaderView>
  );
}
