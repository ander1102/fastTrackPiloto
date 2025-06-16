import { useMemo } from "react";
import { hexToRgba } from "@app/common/format";
import DescriptionCard from "@app/components/DescriptionCard";
import Grid from "@app/components/Grid";
import { DropdownMergeOptions, DropdownOptions } from "@app/types/Form";
import { Chart } from "primereact/chart";
import { ResumeShowValues } from "@app/types/Reports";

interface ResumeTypeChartComponentProps {
  title: string;
  data: DropdownMergeOptions<number>[];
  valueIndex?: number;
  displayShowValues?: ResumeShowValues[];
}

const OPTIONS = {
  plugins: {
    legend: {
      display:false,
      labels: {
        usePointStyle: true,
      },
    },
  },
};

const emptyData = {
  labels: ["Sin datos"],
  datasets: [
    {
      data: [100],
      backgroundColor: ["lightgray"],
    },
  ],
};

const getFinalValue = (value: number | number[], index: number) =>
  Array.isArray(value) ? value[index] : value;

export default function ResumeTypeChartComponent({
  title,
  data,
  displayShowValues,
  valueIndex,
}: ResumeTypeChartComponentProps) {
  const isEmptyData = useMemo(
    () =>
      data.every((obj) =>
        Array.isArray(obj.value)
          ? obj.value[valueIndex ?? 0] === 0
          : obj.value === 0
      ),
    [data, valueIndex]
  );

  const _data = useMemo(
    () => ({
      labels: data.map((x) => x.label),
      datasets: [
        {
          data: data.map((x) => getFinalValue(x.value, valueIndex ?? 0)),
          backgroundColor: data.map((x) => x.color ?? "blue"),
          hoverBackgroundColor: data.map(
            (x) => (x.color && hexToRgba(x.color, 0.7)) || "blue"
          ),
        },
      ],
    }),
    [data, valueIndex]
  );

  return (
    <section className="rounded-md px-5 py-5">
      <Grid sm={1} md={2} lg={2}>
        <Grid.Item className="flex flex-col gap-3 justify-evenly  mr-5">
          <div className="flex flex-col gap-3 pr-14">
            <p>{title}</p>
            {data.map((x) => {
              const final = getFinalValue(x.value, valueIndex ?? 0);
              const displayCurrValue = Array.isArray(displayShowValues)
                ? displayShowValues[valueIndex ?? 0]?.getValue?.(final) ?? final
                : final;
              return (
                <DescriptionCard
                  key={x.label}
                  title={x.label}
                  color={x.color ?? "blue"}
                  content={displayCurrValue}
                />
              );
            })}
          </div>
        </Grid.Item>
        <Grid.Item>
          <Chart
            type="pie"
            data={isEmptyData ? emptyData : _data}
            options={OPTIONS}
            className="w-full"
          />
        </Grid.Item>
      </Grid>
    </section>
  );
}
