import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import {
  CatAlertasMultiSelect,
  CatClientesMultiSelect,
} from "@app/components/Dropdowns";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { KpiContainer } from "@app/components/ViewKpis";
import useValueHandler from "@app/hooks/useValueHandler";
import { DateFormat } from "@app/common/format";
import { OperationsAlertsRisksAllBody } from "@app/types/Operations";
import { ExcelExportButton } from "./ExcelExportButton";
import { TableAlertsRisksState } from "./useTableAlertsRisks";
import { useState } from "react";

interface AlertasRiesgosHeaderProps
  extends Pick<
    TableAlertsRisksState,
    "loader" | "items" | "filters" | "onRefresh"
  > {}

export const AlertasRiesgosHeader = ({
  filters,
  loader,
  items,
  onRefresh,
}: AlertasRiesgosHeaderProps) => {
  const [currentAlerts, setCurrentAlerts] = useState<number[]>([]);
  const [currentClientes, setCurrentClientes] = useState<number[]>([]);
  const [dateStart, setDateStart] = useValueHandler<Date>(
    () => DateFormat.day.start(new Date(), true).value
  );
  const [dateEnd, setDateEnd] = useValueHandler(
    () => DateFormat.day.end(new Date(), true).value
  );

  const onChangeCalendar = (id: number) => (e: CalendarChangeEvent) => {
    const date = e.value as Date;
    let fechaInicio: string;
    let fechaFin: string;

    if (id === 1) {
      setDateStart(date);
      fechaInicio = DateFormat.day.start(date, true).toSimpleFormatString();
      fechaFin = DateFormat.day.end(dateEnd(), true).toSimpleFormatString();
    } else {
      setDateEnd(date);
      fechaInicio = DateFormat.day
        .start(dateStart(), true)
        .toSimpleFormatString();
      fechaFin = DateFormat.day.end(date, true).toSimpleFormatString();
    }

    onRefresh({
      fechaInicio,
      fechaFin,
    });
  };

  const onFilterChange =
    (key: keyof OperationsAlertsRisksAllBody) =>
    (e: CustomDropdownChangeEvent) => {
      let value = e.value;
      if (key == "filtroAlerta") {
        setCurrentAlerts(value);
        value = value.join(",");
      }
      if (key === "filtroEmpresa") {
        setCurrentClientes(value);
        value = value.join(",");
      }

      onRefresh({
        [key]: value,
      });
    };

  return (
    <>
      <KpiContainer title="Alertas y Riesgos" />

      <FiltersContainer lg={5} xl={6}>
        <FiltersItem className="col-span-2 flex-col">
          <p className="text-md mb-2 self-start">
            <span>Buscar por fecha </span>
          </p>

          <div className="w-full flex gap-3">
            <Calendar
              className="myCalendarButton w-full"
              disabled={loader}
              maxDate={new Date()}
              placeholder="Inicio"
              value={dateStart()}
              onChange={onChangeCalendar(1)}
            />
            <Calendar
              className="myCalendarButton w-full"
              disabled={loader}
              maxDate={new Date()}
              placeholder="Final"
              value={dateEnd()}
              onChange={onChangeCalendar(2)}
            />
          </div>
        </FiltersItem>
        <FiltersItem>
          <FormItem label="Cliente">
            <CatClientesMultiSelect
              disabled={loader}
              display="comma"
              filter
              resetFilterOnHide
              selectedItemsLabel={`${currentClientes?.length} clientes seleccionados`}
              maxSelectedLabels={2}
              placeholder="Seleccionar"
              className="w-full"
              value={currentClientes}
              onChange={onFilterChange("filtroEmpresa")}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Tipo de alerta">
            <CatAlertasMultiSelect
              className="w-full"
              disabled={loader}
              filter
              placeholder="Seleccionar"
              value={currentAlerts}
              onChange={onFilterChange("filtroAlerta")}
              args={{ range: "6,15" }}
            />
          </FormItem>
        </FiltersItem>
        <FormItem />
        <FormItem className="flex justify-end items-center">
          <ExcelExportButton
            filters={filters}
            disabled={!Boolean(items.length)}
          />
        </FormItem>
      </FiltersContainer>
    </>
  );
};
