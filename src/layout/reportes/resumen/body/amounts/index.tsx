import { useContext } from "react";
import { AMOUNT_REPORT_TYPE } from "@app/types/Reports";
import DailyChart from "./dailyChart";
import EntityChart from "./entityChart";
import { ResumeReportsBodyProps } from "..";
import { ReportResumeContext } from "../../context";
import AmountTypeFilter from "./filter";

interface ResumeAmountsBodyProps extends ResumeReportsBodyProps {}

export default function ResumeAmountsBody(props: ResumeAmountsBodyProps) {
  const { filter } = useContext(ReportResumeContext);

  return (
    <section className="flex flex-col md:flex-row gap-5 mt-5" >
      <div className="flex-[4] border border-solid border-light-gray-400 rounded-md px-10 py-5">
        <AmountTypeFilter {...props} />
      
        {filter.amountType === AMOUNT_REPORT_TYPE.DAILY && (
          <DailyChart {...props} />
        )}
        {filter.amountType === AMOUNT_REPORT_TYPE.ENTITY && (
          <EntityChart {...props} />
        )}
      </div>
      <div
        id="_resume_report_description_cards"
        className="flex flex-[1] flex-col items-start justify-center gap-3"
      />
    </section>
  );
}
