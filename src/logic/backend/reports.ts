import { Call } from "@app/common/fetch";
import {
  ComissionReportData,
  ComissionReportDataExcel,
  MasterComissionReportDataExcel,
  ReportComissionBody,
  ReportGetBody,
  ReportResumeDaily,
  ReportResumeEntity,
  ReportResumeGraphicsInfo,
  ResumeReportKPIs,
} from "@app/types/Reports";
import { getTokenBearer } from "./middlewares";

export const ReportControllers = {
  getResumeDailyReport: (body: ReportGetBody) =>
    Call<ReportResumeDaily>("/api/reports/resume/get", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  getResumeEntityReport: (body: ReportGetBody) =>
    Call<ReportResumeEntity>("/api/reports/resume/get", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  getResumeReportKPIs: (body: ReportGetBody) =>
    Call<ResumeReportKPIs>("/api/reports/resume/get/kpis", {
      method: "POST",
      body,
      headers: getTokenBearer(),
      checkAuth: false,
    }),
  getResumeReportGraphicsData: (body: ReportGetBody) =>
    Call<ReportResumeGraphicsInfo>("/api/reports/resume/get/graphics", {
      method: "POST",
      body,
      headers: getTokenBearer(),
      checkAuth: false,
    }),
  getComissionReport: (body: ReportComissionBody) =>
    Call<ComissionReportData[]>("/api/reports/comission/get", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
  getComissionReportExcel: (body: ReportComissionBody) =>
    Call<ComissionReportDataExcel[]>("/api/reports/comission/get/excel", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
  getMasterComissionReportExcel: (body: ReportComissionBody) =>
    Call<MasterComissionReportDataExcel[]>("/api/reports/comission/get/excel", {
      body,
      headers: getTokenBearer(),
      method: "POST",
    }),
};
