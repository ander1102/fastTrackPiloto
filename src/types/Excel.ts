import { Cell, Columns } from "write-excel-file";

export interface ExcelExportBody<T = any> {
  worksheets: ExcelWorkSheet<T>[];
}

export type ExcelType = "string" | "date" | "number" | "boolean" | "Formula";

export type ExcelCell = Omit<NonNullable<Cell>, "value" | "type"> & {
  type?: ExcelType;
};

export type ExcelRowOptions<T> = Partial<Record<keyof T, ExcelCell>>;

export type ExcelColumn = Columns extends (infer U)[] ? U : never;

export type ExcelColumnConfig<T> = Partial<Record<keyof T, ExcelColumn>>;

export interface ExcelOptions<T> {
  headerOptions: ExcelRowOptions<T>;
  columnOptions: ExcelColumnConfig<T>;
  itemOptions: ExcelRowOptions<T>;
  displayColumns: { [key in keyof T]: string };
  sortKeys?: (keyof T)[];
  mergedHeaders?: {
    headers: ExcelRowOptions<T>[];
    sorted?: "start" | "end";
  };
}

export interface ExcelWorkSheet<T = any> {
  name: string;
  items: T[];
  options?: Partial<ExcelOptions<T>>;
}
