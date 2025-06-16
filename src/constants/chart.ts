import { ResumeInfoType } from "@app/types/Resume";

export const CHART_BACKGROUND_COLORS: Record<ResumeInfoType, string> = {
  date: "#6B3374",
  month: "#6B3374",
};
export const CHART_BORDER_COLORS = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

export const getBackgroundColors = (
  length: number,
  type: ResumeInfoType
): string[] =>
  new Array(length)
    .fill(undefined)
    .map(() => CHART_BACKGROUND_COLORS[type] ?? "#CD6155");
