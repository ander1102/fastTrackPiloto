import { AppContextProps } from "@app/components/HOC/withAppContext";
import { ComissionReportProvider } from "./context";
import ComisionesReportsKPIS from "./kpis";
import ComisionesReportsHeader from "./header";
import ComisionesReportsBody from "./body";
export interface ComisionesReportsProps
  extends Pick<AppContextProps, "userType" | "user"> {}

export default function ComisionesReports(props: ComisionesReportsProps) {
  return (
    <ComissionReportProvider>
      <section className="container-header">
        <ComisionesReportsKPIS {...props} />
        <ComisionesReportsHeader {...props} />
      </section>

      <section className="container-body">
        <ComisionesReportsBody {...props} />
      </section>
    </ComissionReportProvider>
  );
}
