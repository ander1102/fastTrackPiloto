import { addLocale, locale } from "primereact/api";
import {
  Calendar as PrimeCalendar,
  CalendarProps as PrimeCalendarProps,
  CalendarChangeEvent as PrimeCalendarChangeEvent,
} from "primereact/calendar";

addLocale("es", {
  firstDayOfWeek: 1,
  dayNames: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ],
  dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  today: "Hoy",
  clear: "Limpiar",
});

locale("es");

export interface CalendarProps extends PrimeCalendarProps {}
export interface CalendarChangeEvent extends PrimeCalendarChangeEvent {}

export function Calendar(props: CalendarProps) {
  return (
    <PrimeCalendar
      dateFormat="dd/mm/yy"
      iconPos="right"
      locale="es"
      readOnlyInput
      showButtonBar
      showIcon
      {...props}
    />
  );
}