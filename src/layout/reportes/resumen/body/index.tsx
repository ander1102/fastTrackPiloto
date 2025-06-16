import { AppContextProps } from "@app/components/HOC/withAppContext";
import ResumeAmountsBody from "./amounts";
import ResumeReportCircleCharts from "./circleCharts";

export interface ResumeReportsBodyProps
  extends Pick<AppContextProps, "userType" | "user"> {}

export default function ResumeReportsBody(props: ResumeReportsBodyProps) {
  return (
    <article className="flex flex-col gap-5">
      <ResumeAmountsBody {...props} />
      <ResumeReportCircleCharts {...props} />
    </article>
  );
}
