import { Call } from "@app/common/fetch";
import { ExcelExportBody } from "@app/types/Excel";

export const ExcelController = {
  export: <T>(body: ExcelExportBody<T>) =>
    Call("/api/excel/export", {
      body,
      method: "POST",
    }),
};
