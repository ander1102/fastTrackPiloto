import { FetchClientResponse } from "@app/common/fetch";

export interface GeneralApiReponse<T> {
  status: number;
  data: T;
}

export type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never;

export type CARD_TYPE = "visa" | "mastercard" | "mc";

export type FetchClientController = (
  ...params: any[]
) => Promise<FetchClientResponse<any>>;

export type Controller = {
  [key: string]: FetchClientController;
};

export interface ContextManagerProps {
  context: string;
  loader: boolean;
  delay: number;
}

export interface DataTableQuery {
  first: number;
  page: number;
  rows: number;
  totalRecords: number;
  currRecords: number;
}

export interface PaginationBody {
  PageIndex: string | number;
  PageSize: string | number;
}

export interface GeneralStatusResponse {
  msg: string;
  code: string;
}

export type ObjectCallbacks<T extends { [key: string]: any }> = Record<
  keyof T,
  T[keyof T] | ((currValue: T[keyof T]) => T[keyof T])
>;

export type _Object<IValue = any> = { [key: string]: IValue };
