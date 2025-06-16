import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import {
  CatAlertasMultiSelect,
  CatClientesMultiSelect,
  CatRiesgos,
} from "@app/components/Dropdowns";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { KpiContainer } from "@app/components/ViewKpis";

import { OperationsFastTrackAllBody } from "@app/types/Operations";
import useValueHandler from "@app/hooks/useValueHandler";
import { DateFormat } from "@app/common/format";
import { OPERATIONS_DROPDOWN_DEFAULT_SELECT } from "@app/constants/operations";
import { useState } from "react";

const date = new Date();

interface OperationsHeader {
  loader: boolean;
  filters: OperationsFastTrackAllBody;
  onRefresh: (filters: Partial<OperationsFastTrackAllBody>) => void;
}

export const OperationsHeader = ({
  filters,
  loader,
  onRefresh,
}: OperationsHeader) => {
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
    (key: keyof OperationsFastTrackAllBody) =>
    (e: CustomDropdownChangeEvent) => {
      let value = e.value;

      if (key == "idagep_catalerta") {
        setCurrentAlerts(value);
        value = value.join(",");
      }
      if (key === "idagep_empresa") {
        setCurrentClientes(value);
        value = value.join(",");
      }

      onRefresh({
        [key]: value,
      });
    };

  return (
    <>
      <KpiContainer title="Fast Track" />

      <FiltersContainer lg={5} xl={6}>
        <FiltersItem className="col-span-2 flex-col">
          <p className="text-md mb-2 self-start">
            <span>Buscar por fecha en que se presentó la alerta</span>
          </p>

          <div className="w-full flex gap-3">
            <Calendar
              className="myCalendarButton w-full"
              disabled={loader}
              maxDate={date}
              placeholder="Inicio"
              value={dateStart()}
              onChange={onChangeCalendar(1)}
            />
            <Calendar
              className="myCalendarButton w-full"
              disabled={loader}
              maxDate={date}
              placeholder="Final"
              value={dateEnd()}
              onChange={onChangeCalendar(2)}
            />
          </div>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Tipo de alerta">
            <CatAlertasMultiSelect
              className="w-full"
              filter
              disabled={loader}
              placeholder="Seleccionar"
              value={currentAlerts}
              onChange={onFilterChange("idagep_catalerta")}
              args={{ range: "1,6" }}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Tipo de riesgo">
            <CatRiesgos
              className="w-full"
              disabled={loader}
              mergeOptions={OPERATIONS_DROPDOWN_DEFAULT_SELECT}
              placeholder="Seleccionar"
              value={filters.idagep_catriesgo}
              onChange={onFilterChange("idagep_catriesgo")}
            />
          </FormItem>
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
              onChange={onFilterChange("idagep_empresa")}
            />
          </FormItem>
        </FiltersItem>
      </FiltersContainer>
    </>
  );
};
