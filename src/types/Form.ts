import { EfevooCheckBoxProps } from "@app/components/Checkbox/EfevooCheckBox";
import { StatesDropdownProps } from "@app/components/Dropdowns/states";
import { GridColumns, GridProps } from "@app/components/Grid";
import { CustomDropdownProps } from "@app/components/HOC/createDropdownData";
import { CalendarProps } from "primereact/calendar";
import { DropdownProps } from "primereact/dropdown";
import { InputNumberProps } from "primereact/inputnumber";
import { InputSwitchProps } from "primereact/inputswitch";
import { InputTextProps } from "primereact/inputtext";
import { ComponentType, PropsWithChildren, SetStateAction } from "react";
import { kpiReserveFundType } from "./reserveFund";

export interface FormValue<T> {
  value: T;
  onChange: (newValue: SetStateAction<T>) => void;
  disabled?: Record<keyof T, boolean>;
  kpiReserveFund?: kpiReserveFundType;
}

export interface DropdownOptions<T = string> {
  label: string;
  value: T;
}

export interface MultiSelectOptions<T = string> {
  label: string;
  value: T;
}

export interface DropdownMergeOptions<T = string>
  extends Omit<DropdownOptions<T>, "value"> {
  value: T | T[];
  color?: string;
}

export interface CRUDResponse<T> {
  mensaje: T;
}

export type Byte = 1 | 0;

export type FieldType = "text" | "number" | "switch";

export interface FormField<T> {
  key: keyof T;
  display?: string;
  type?: FieldType;
  required?: boolean;
  options?: DropdownOptions<any>[];
}

export interface FormRecordResult<T, K extends keyof T> {
  selectValidateValue?: any | ((value: T[K]) => any);
  validate: (value: T[K], selector: any, index?: number) => boolean;
  displayError: string | ((selector: any, index?: number) => string);
}

export type FormRecord<T> = {
  [K in keyof T]: FormRecordResult<T, K>;
};

export interface SectionFormType {
  tabs: SectionTab[];
}

export type titleType = Pick<SectionTab, "title">;

export type TabContentProps = { tabIndex: number };

export type TabLayoutProps = PropsWithChildren<
  titleType & Pick<TabContentProps, "tabIndex">
>;

export interface SectionTab {
  title: string;
  keyname: string;
  display: string;
  Content: ComponentType<TabContentProps>;
  TabLayout?: ComponentType<TabLayoutProps>;
}

export interface EntityFieldBaseProps {
  parent?: string;
  field: string;
}

export type EfevooFields = "efevoo_checkbox";

export type FieldRenderType =
  | FieldType
  | CatRenderType
  | EfevooFields
  | "dropdown"
  | "calendar";

export type CatRenderType =
  | "clientes"
  | "countries"
  | "giro"
  | "giroById"
  | "states"
  | "giroReferrals"
  | "familiasReferrals"
  | "adquirientesReferrals"
  | "pago"
  | "tasas"
  | "adquiriente"


export type FieldRenderTypeProps = {
  text: Omit<InputTextProps, "value" | "onChange">;
  number: Omit<InputNumberProps, "value" | "onChange">;
  dropdown: Omit<DropdownProps, "value" | "onChange">;
  calendar: Omit<CalendarProps, "value" | "onChange">;
  clientes: Omit<CustomDropdownProps, "value" | "onChange">;
  pago: Omit<CustomDropdownProps, "value" | "onChange">;
  countries: Omit<CustomDropdownProps, "value" | "onChange">;
  giro: Omit<CustomDropdownProps, "value" | "onChange">;
  giroById: Omit<CustomDropdownProps, "value" | "onChange">;
  giroReferrals: Omit<CustomDropdownProps, "value" | "onChange">;
  familiasReferrals: Omit<CustomDropdownProps, "value" | "onChange">;
  adquirientesReferrals: Omit<CustomDropdownProps, "value" | "onChange">;  
  states: Omit<StatesDropdownProps, "value" | "onChange">;
  switch: Omit<InputSwitchProps, "value" | "onChange">;
  efevoo_checkbox: Omit<EfevooCheckBoxProps, "value" | "onChange">;
  tasas: Omit<CustomDropdownProps, "value" | "onChange">;
  adquiriente: Omit<CustomDropdownProps, "value" | "onChange">;
};

export interface TabLayout {
  gridProps: GridProps;
}

export interface FieldLayout {
  span: GridColumns;
}
