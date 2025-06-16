import { ComponentType } from "react";
import { FieldRenderType } from "@app/types/Form";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import { InputText, InputTextProps } from "primereact/inputtext";
import { CustomDropdownProps } from "@app/components/HOC/createDropdownData";
import {
  CatClientes,
  CatCountries,
  CatGiro,
  CatGiroById,
  CatGiroReferrals,
  CatFamiliasReferrals,
  CatAdquirientesReferrals,
  CatMetPago,
  CatTasas,
  CatAdquiriente,
} from "@app/components/Dropdowns";
import StatesDropdown, {
  StatesDropdownProps,
} from "@app/components/Dropdowns/states";
import { InputSwitch, InputSwitchProps } from "primereact/inputswitch";
import EfevooCheckBox, {
  EfevooCheckBoxProps,
} from "@app/components/Checkbox/EfevooCheckBox";
import adquiriente from "@app/pages/api/cat/get/adquiriente";

export const FORM_INPUTS: Record<FieldRenderType, ComponentType<any>> = {
  text: (props: InputTextProps) => <InputText {...props} />,
  calendar: (props: CalendarProps) => <Calendar {...props} />,
  dropdown: (props: DropdownProps) => <Dropdown {...props} />,
  number: (props: InputNumberProps) => <InputNumber {...props} />,
  clientes: (props: CustomDropdownProps) => <CatClientes {...props} />,
  countries: (props: CustomDropdownProps) => <CatCountries {...props} />,
  giro: (props: CustomDropdownProps) => <CatGiro {...props} />,
  giroById: (props: CustomDropdownProps) => <CatGiroById {...props} />,
  giroReferrals: (props: CustomDropdownProps) => (
    <CatGiroReferrals {...props} />
  ),
  familiasReferrals: (props: CustomDropdownProps) => (
    <CatFamiliasReferrals {...props} />
  ),
  pago: (props: CustomDropdownProps) => <CatMetPago {...props} />,
  adquirientesReferrals: (props: CustomDropdownProps) => (
    <CatAdquirientesReferrals {...props} />
  ),
  states: (props: StatesDropdownProps) => <StatesDropdown {...props} />,
  switch: (props: InputSwitchProps) => <InputSwitch {...props} />,
  efevoo_checkbox: (props: EfevooCheckBoxProps) => (
    <EfevooCheckBox {...props} />
  ),
  tasas: (props: CustomDropdownProps) => <CatTasas {...props} />,
  adquiriente: (props: CustomDropdownProps) => <CatAdquiriente {...props} />,
};
