import { isDate } from "@app/common/format";
import { DropdownOptions } from "@app/types/Form";
import {
  ResumeDataPeriod,
  ResumeInfoType,
  ResumeTabs,
} from "@app/types/Resume";
import { Transaction } from "@app/types/Transactions";
import { DATE_FORMAT, MONTH_FORMAT, TIME_FORMAT } from ".";
import { getBackgroundColors } from "./chart";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { CommonDate } from "@app/common/date";

const RESUME_X_TITLE: Record<ResumeInfoType, string> = {
  date: "Horas",
  month: "Días",
};

const RESUME_CHART_MONTH_LABELS = new Array(CommonDate.getTotalDaysInMonth())
  .fill(undefined)
  .map((_, i) => i + 1);

export const RESUME_CHART_DAY_LABELS = new Array(24)
  .fill(undefined)
  .map((_, i) => i);

export const RESUME_LABELS: Record<ResumeInfoType, number[]> = {
  date: RESUME_CHART_DAY_LABELS,
  month: RESUME_CHART_MONTH_LABELS,
};

export const RESUME_PERIOD_TITLE: Record<
  ResumeInfoType,
  (date: Date) => string
> = {
  date: (date) => DATE_FORMAT.format(date),
  month: (date) => MONTH_FORMAT.format(date),
};

export const RESUME_SET_DATA: Record<ResumeInfoType, (date: Date) => number> = {
  date: (date) => date.getHours() + 1,
  month: (date) => date.getDate(),
};

export const RESUME_SET_TITLE: Record<
  ResumeInfoType,
  (value: number, date: Date) => string
> = {
  date: (value, date) => {
    const d = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      value
    );
    return TIME_FORMAT.format(d);
  },
  month: (value, date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), value);
    return DATE_FORMAT.format(d);
  },
};

const RESUME_TITLES: Record<ResumeInfoType, string> = {
  date: "Transacciones por día",
  month: "Transacciones por mes",
};

export const RESUME_DEFAULT_DATA = [65, 59, 80, 81, 56, 55, 40];

export const setResumeChartDataset = (
  type: ResumeInfoType,
  counts: number[],
  amounts: number[]
) => {
  return {
    labels: RESUME_LABELS[type],
    datasets: [
      {
        label: RESUME_TITLES[type],
        backgroundColor: getBackgroundColors(RESUME_LABELS[type].length, type),
        borderColor: "blue",
        borderRadius: 50,
        data: amounts,
        counts,
      },
    ],
  };
};

export const RESUME_TAB_TYPE: ResumeTabs[] = [
  {
    key: "date",
    header: "Día",
    dateFormat: "dd/mm/yy",
  },
  {
    key: "month",
    header: "Mes",
    dateFormat: "MM",
  },
];

export const RESUME_FILTER_OPTIONS: DropdownOptions<ResumeInfoType>[] = [
  {
    label: "Dia",
    value: "date",
  },
  {
    label: "Mes",
    value: "month",
  },
];

export const RESUME_CHART_OPTIONS = (
  key: ResumeInfoType,
  items: Transaction[],
  amount: (ResumeDataPeriod | null)[]
) => ({
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      display: false,
    },



    
    tooltip: {
      intersect: false,
      callbacks: {
        label: (ctx: any) => {
          const counts = ctx.dataset.counts as number[];
          const currAmount = amount[ctx.dataIndex];
          return currAmount
            ? `Transacciones: ${
                counts[ctx.dataIndex]
              } \n Monto total: ${useTruncateAmout(currAmount.amount)}`
            : `Transacciones: ${counts[ctx.dataIndex]}`;
        },
        title: (ctx: any) => {
          const value = Number(ctx[0].label);
          const firstDate = isDate(items[0].datcr)
            ? new Date(items[0].datcr)
            : new Date(); //Es necesario pasar alguna fecha del periodo de transaccion para conocer el mes del periodo
          return RESUME_SET_TITLE[key](value, firstDate);
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "",
        font: {
          weight: 500,
        },
      },
      grid: {
        display: true,
        drawBorder: false,
      },
      title: {
        display: true,
        text: RESUME_X_TITLE[key],
        font: {
          weight: 700,
          size: 16,
        },
      },
    },
    y: {
      ticks: {
        color: "",
        precision: 0,
        callback: (value: number) => useTruncateAmout(value),
      },
      grid: {
        color: "",
        drawBorder: false,
      },
      title: {
        display: true,
        text: "Monto total",
        font: {
          weight: 700,
          size: 16,
        },
      },
    },
  },
});
