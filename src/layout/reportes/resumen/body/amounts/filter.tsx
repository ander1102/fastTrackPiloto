import { useContext, useEffect, useMemo, useState } from "react";
import { SVG } from "@app/components/svg";
import { ReportResumeContext } from "../../context";
import { Dropdown } from "primereact/dropdown";
import { ReportResumeConstants } from "@app/constants/reports";
import { ResumeReportsBodyProps } from "..";
import { FiltersItem } from "@app/components/ViewFilters";
interface AmountTypeFilterProps extends ResumeReportsBodyProps {}

export default function AmountTypeFilter({ userType }: AmountTypeFilterProps) {
  const { filter, onChange, successListenner } =
    useContext(ReportResumeContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    successListenner.setLoadingCb("amounts", () => {
      setLoading(true);
    });
    successListenner.setSuccessCb("amounts", () => {
      setLoading(false);
    });
  }, []);

  const options = useMemo(
    () => ReportResumeConstants.REPORT_AMOUNT_TYPE_OPTIONS(userType),
    []
  );

  const label = useMemo(
    () => options.find((x) => x.value === filter.amountType)?.label,
    [filter]
  );
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <p className="title-body">{label}</p>
      </div>
      <FiltersItem>
        <Dropdown
          options={options}
          value={filter.amountType}
          disabled={loading}
          style={{minWidth:'300px'}}
          onChange={(e) => onChange("amountType", e.value)}
        />
      </FiltersItem>
    </div>
  );
}
