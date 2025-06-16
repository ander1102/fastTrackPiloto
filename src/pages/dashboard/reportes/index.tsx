import { useState } from "react";
import ConditionalStoredChildrenRender from "@app/components/Conditional/ConditionalChildrenRender";
import Grid from "@app/components/Grid";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { ReportResumeConstants } from "@app/constants/reports";
import PageLayout from "@app/layout/app/layout";
import ComisionesReports from "@app/layout/reportes/comisiones";
import ResumeReports from "@app/layout/reportes/resumen";
import { REPORT_TYPE } from "@app/types/Reports";
import { Dropdown } from "primereact/dropdown";
import { ResumeReportProvider } from "@app/layout/reportes/resumen/context";
export const CONTEXT = "dashboard/reportes";
import { FiltersItem } from "@app/components/ViewFilters";
function Reportes({ userType, user }: AppContextProps) {
  const [reportType, setReportType] = useState<REPORT_TYPE>(REPORT_TYPE.RESUME);

  return (
    <PageLayout>
      {/* <div className="flex justify-end" style={{ padding: "0px 28px" }}>
        <FiltersItem>
          <Dropdown
            style={{ width: "250px" }}
            value={reportType}
            onChange={(e) => setReportType(e.value)}
            options={ReportResumeConstants.REPORT_TYPE_OPTIONS}
          />
        </FiltersItem>
      </div> */}

      <ConditionalStoredChildrenRender
        condition={reportType === REPORT_TYPE.COMISION}
      >
        <ComisionesReports user={user} userType={userType} />
      </ConditionalStoredChildrenRender>

      <ConditionalStoredChildrenRender
        condition={reportType === REPORT_TYPE.RESUME}
      >
        <ResumeReportProvider>
          <ResumeReports user={user} userType={userType} />
        </ResumeReportProvider>
      </ConditionalStoredChildrenRender>
    </PageLayout>
  );
}

export default withAppContext(Reportes, CONTEXT, {
  title: "Reportes",
  mergeContainerStyles: {
    padding: "20px 0 0 0",
  },
});
