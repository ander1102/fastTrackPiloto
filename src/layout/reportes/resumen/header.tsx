import { useContext, useEffect, useState } from "react";
import { ReportResumeConstants } from "@app/constants/reports";
import { FormItem } from "@app/components/FormManager/FormItem";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Calendar } from "@app/components/Calendar";
import { ReportResumeContext } from "./context";
import { AppContextProps } from "@app/components/HOC/withAppContext";
import { CatClientesMultiSelect, CatSucursal } from "@app/components/Dropdowns";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";
import { CustomMultiSelectChangeEvent } from "@app/components/HOC/createMultiSelectData";
import { DROPDOWN_ALL } from "@app/constants/form";
import { DateFormat } from "@app/common/format";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { ORIGEN_CLIENT_TYPE } from "@app/types/Clients";

interface ResumeReportsHeaderProps extends Pick<AppContextProps, "userType"> {}

export default function ResumeReportsHeader({
  userType,
}: ResumeReportsHeaderProps) {
  const { filter, onChange, successListenner, onChangeByObj } =
    useContext(ReportResumeContext);
  const [loading, setLoading] = useState(false);
  const [currentClients, setCurrentClients] = useState<number[]>([]);
  const [entityDropdown, setEntityDropdown] = useState<number>(0);
  const [quickDate, setQuickDate] = useState<number>(
    ReportResumeConstants.LAST_DAYS.MID_MONTH
  );
  const [dateDisabled, setDateDisabled] = useState<boolean>(false);
  const [origen, setOrigen] = useState<ORIGEN_CLIENT_TYPE[]>([]);

  const filterTitle = userType === "master" ? "Clientes" : "Sucursal";

  useEffect(() => {
    successListenner.setLoadingCb("header", () => {
      setLoading(true);
    });
    successListenner.setSuccessCb("header", () => {
      setLoading(false);
    });
  }, []);

  const onClientsChange = (e: CustomMultiSelectChangeEvent) => {
    const idagep_empresas: any = e.value;
    setCurrentClients(idagep_empresas);
    onChange("entity", idagep_empresas.join(", "));
  };

  const onEntityChange = (e: CustomDropdownChangeEvent) => {
    const value: number = e.value;
    setEntityDropdown(value);
    if (userType === "master"){
      onChange("entity", `${value}`);
    } else{
      onChange("suc", value);
    }
  };

  useEffect(() => {
    setDateDisabled(quickDate !== (-1 as ReportResumeConstants.LAST_DAYS));
  }, [quickDate]);

  const onQuickDateChange = (e: DropdownChangeEvent) => {
    const value: number = e.value;
    if (quickDate === value) return;
    setQuickDate(value);
    if (value === -1) {
      const today = new Date();
      onChangeByObj({
        dateStart: DateFormat.day.start(today, true).value,
        dateEnd: DateFormat.day.end(today, true).value,
      });
      return;
    }
    const daysRemain = ReportResumeConstants.QUICK_DATE_DAYS[value];
    const start = new Date();
    start.setDate(start.getDate() + 1 - daysRemain);
    onChangeByObj({
      dateStart: DateFormat.day.start(start).value,
      dateEnd: DateFormat.day.end(new Date()).value,
    });
  };

  const onOrigenChange = (e: MultiSelectChangeEvent) => {
    onChange("origen", e.value.join(", "));
    setOrigen(e.value);
  };

  return (
    <>
      <FiltersContainer>
        <FiltersItem>
          <FormItem label={filterTitle}>
            {userType === "master" ? (
              <CatClientesMultiSelect
                disabled={loading}
                display="comma"
                filter
                maxSelectedLabels={2}
                selectedItemsLabel={`${currentClients.length} clientes seleccionados`}
                value={currentClients}
                onChange={onClientsChange}
                className="w-full"
              />
            ) : (
              <CatSucursal
                placeholder="Sucursal"
                disabled={loading}
                value={entityDropdown}
                filter
                mergeOptions={DROPDOWN_ALL(0)}
                onChange={onEntityChange}
                className="w-full"
              />
            )}
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem
            label="Filtrar por últimos días"
          >
            <Dropdown
              value={quickDate}
              disabled={loading}
              onChange={onQuickDateChange}
              options={ReportResumeConstants.QUICK_DATE_OPTIONS}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <Calendar
              value={filter.dateStart}
              onChange={(e) => {
                setQuickDate(-1);
                onChange("dateStart", e.value as Date);
              }}
              disabled={loading}
              maxDate={filter.dateEnd}
              placeholder="Inicio"
              className="myCalendarButton w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem>
            <Calendar
              value={filter.dateEnd}
              onChange={(e) => {
                setQuickDate(-1);
                onChange("dateEnd", e.value as Date);
              }}
              placeholder="Final"
              disabled={loading}
              minDate={filter.dateStart}
              className="myCalendarButton w-full"
            />
          </FormItem>
        </FiltersItem>
      </FiltersContainer>
      <FiltersContainer>
        <FiltersItem>
          <FormItem label="Origen de transacción">
            <Dropdown
              value={filter.zone}
              disabled={loading}
              onChange={(e) => onChange("zone", e.value)}
              options={ReportResumeConstants.REPORT_RESUME_ZONE_OPTIONS}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Marca de tarjeta">
            <Dropdown
              value={filter.card}
              disabled={loading}
              onChange={(e) => onChange("card", e.value)}
              placeholder="Seleccionar"
              options={ReportResumeConstants.REPORT_RESUME_CARD_OPTIONS}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Producto">
            <Dropdown
              value={filter.transactionType}
              disabled={loading}
              onChange={(e) => onChange("transactionType", e.value)}
              options={ReportResumeConstants.REPORT_RESUME_TRANSACTION_TYPE}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>
        {/* {
          userType === 'master' &&
          <FiltersItem>
            <FormItem label="Origen del Cliente">
              <MultiSelect
                aria-label="Origen del cliente"
                disabled={loading}
                maxSelectedLabels={2}
                options={ReportResumeConstants.REPORT_RESUME_ORIGIN_OPTIONS}
                placeholder="Seleccionar"
                selectedItemsLabel={
                  origen.length === ReportResumeConstants.REPORT_RESUME_ORIGIN_OPTIONS.length
                    ? "Todos"
                    : `${origen.length} orígenes seleccionados`
                }
                value={origen}
                onChange={onOrigenChange}
                className="w-full"
              />
            </FormItem>
          </FiltersItem>
        } */}
      </FiltersContainer>
    </>
  );
}
