import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import { ExcelExportButton } from "./ExcelExportButton";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";

import { IntegrationHistoryFilters } from "@app/types/Integrations";
import useValueHandler from "@app/hooks/useValueHandler";
import { DateFormat } from "@app/common/format";
import { ESTATUS_LINK } from "@app/constants/integrations";

const date = new Date();

interface IntegracionesHistorialHeaderProps {
  filters: IntegrationHistoryFilters;
  loader: boolean;
  onRefresh: (filters: Partial<IntegrationHistoryFilters>) => void;
}

export function IntegracionesHistorialHeader({
  loader,
  filters,
  onRefresh,
}: IntegracionesHistorialHeaderProps) {
  const [dateStart, setDateStart] = useValueHandler<Date>(
    () => DateFormat.month.start(new Date(), true).value
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
    (key: keyof IntegrationHistoryFilters) => (e: DropdownChangeEvent) =>
      onRefresh({
        [key]: e.value,
      });

  return (
    <section className="container-header">
      <FiltersContainer sm={4} md={8} lg={8} xl={11}>
        <FiltersItem className="col-span-2">
          <FormItem label="Buscar por fecha">
            <Calendar
              className="w-full"
              disabled={loader}
              maxDate={date}
              placeholder="Inicio"
              value={dateStart()}
              onChange={onChangeCalendar(1)}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem className="col-span-2">
          <FormItem>
            <Calendar
              className="w-full"
              disabled={loader}
              maxDate={date}
              placeholder="Final"
              value={dateEnd()}
              onChange={onChangeCalendar(2)}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem className="col-span-2 md:col-span-3">
          <FormItem label="Estatus">
            <Dropdown
              className="w-full"
              disabled={loader}
              placeholder="Seleccionar"
              options={ESTATUS_LINK}
              value={filters.estatus}
              onChange={onFilterChange("estatus")}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem className="col-span-2 sm:col-span-2 md:col-span-1 xl:col-span-4">
          <ExcelExportButton filters={filters} disabled={loader} />
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
