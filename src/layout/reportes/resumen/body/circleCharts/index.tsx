import { useContext, useEffect, useMemo, useState } from "react";
import Grid from "@app/components/Grid";
import LoaderView from "@app/components/Loader/loaderView";
import { ReportResumeConstants } from "@app/constants/reports";
import useCall from "@app/hooks/useCall";
import { FormItem } from "@app/components/FormManager/FormItem";
import { ReportControllers } from "@app/logic/backend/reports";
import { DropdownMergeOptions } from "@app/types/Form";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ResumeReportsBodyProps } from "..";
import { ReportResumeContext } from "../../context";
import ResumeTypeChartComponent from "../type";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
interface ResumeReportCircleChartsProps extends ResumeReportsBodyProps {}

export default function ResumeReportCircleCharts({
  user,
  userType,
}: ResumeReportCircleChartsProps) {
  const { filter, successListenner } = useContext(ReportResumeContext);
  const [valueIndex, setValueIndex] = useState(0);
  const ResumeType = useCall(
    ReportControllers,
    "getResumeReportGraphicsData",
    () => ReportResumeConstants.getCallOptionsParams(filter, user, userType)
  );

  useEffect(() => {
    ResumeType.refresh(
      ReportResumeConstants.getCallOptionsParams(filter, user, userType)
        .initialParams
    );

    ResumeType.itemManager.addEventListenner("change", (item) => {
      successListenner.requestSuccess();
    });

    ResumeType.itemManager.addEventListenner("error", () => {
      successListenner.requestSuccess();
    });

    return () => {
      ResumeType.itemManager.removeEventListenner("change");
      ResumeType.itemManager.removeEventListenner("error");
    };
  }, [filter]);

  const TRANSACTION_TYPE_DATA: DropdownMergeOptions<number>[] = useMemo(
    () => [
      {
        label: "Terminal",
        value: [
          ResumeType.item?.countTotalDukpt ?? 0,
          ResumeType.item?.countDUKPT ?? 0,
        ],
        color: "#BA81C4",
      },
      {
        label: "Ligas de pago",
        value: [
          ResumeType.item?.countTotalTls ?? 0,
          ResumeType.item?.countTLS ?? 0,
        ],
        color: "#9950A6",
      },
    ],
    [ResumeType.item]
  );

  const CARD_TYPE_DATA: DropdownMergeOptions<number>[] = useMemo(
    () => [
      {
        label: "Débito",
        value: [
          ResumeType.item?.countTotalD ?? 0,
          ResumeType.item?.countD ?? 0,
        ],
        color: "#BA81C4",
      },
      {
        label: "Crédito",
        value: [
          ResumeType.item?.countTotalC ?? 0,
          ResumeType.item?.countC ?? 0,
        ],
        color: "#9950A6",
      },
    ],
    [ResumeType.item]
  );

  const TRANSACTION_ORIGIN_DATA: DropdownMergeOptions<number>[] = useMemo(
    () => [
      {
        label: "Nacional",
        value: [
          ResumeType.item?.countTotalN ?? 0,
          ResumeType.item?.countNac ?? 0,
        ],
        color: "#BA81C4",
      },
      {
        label: "Internacional",
        value: [
          ResumeType.item?.countTotalI ?? 0,
          ResumeType.item?.countInt ?? 0,
        ],
        color: "#9950A6",
      },
    ],
    [ResumeType.item]
  );

  const onValueIndexChange = (e: DropdownChangeEvent) => {
    const value = e.value;
    if (value === valueIndex) return;
    setValueIndex(value);
  };

  return (
    <section>
      <FiltersContainer>
        <FiltersItem smd={2}>
          <FormItem  label="Selecciona el valor que deseas visualizar">
            <Dropdown
              className="w-full max-w-48"
              value={valueIndex}
              onChange={onValueIndexChange}
              options={ReportResumeConstants.RESUME_CIRCLE_CHART_TYPE}
            />
          </FormItem>
        </FiltersItem>
      </FiltersContainer>

      <Grid sm={1} md={2} lg={2} gap={5}>
        <LoaderView loading={ResumeType.isCalling}>
          <ResumeTypeChartComponent
            title="Producto"
            data={TRANSACTION_TYPE_DATA}
            displayShowValues={
              ReportResumeConstants.RESUME_TRANSACTION_SHOW_DISPLAYS
            }
            valueIndex={valueIndex}
          />
        </LoaderView>
        <LoaderView loading={ResumeType.isCalling}>
          <ResumeTypeChartComponent
            title="Tipo tarjeta"
            data={CARD_TYPE_DATA}
            displayShowValues={
              ReportResumeConstants.RESUME_TRANSACTION_SHOW_DISPLAYS
            }
            valueIndex={valueIndex}
          />
        </LoaderView>
        <LoaderView loading={ResumeType.isCalling}>
          <ResumeTypeChartComponent
            title="Origen de transacción"
            data={TRANSACTION_ORIGIN_DATA}
            displayShowValues={
              ReportResumeConstants.RESUME_TRANSACTION_SHOW_DISPLAYS
            }
            valueIndex={valueIndex}
          />
        </LoaderView>
      </Grid>
    </section>
  );
}
