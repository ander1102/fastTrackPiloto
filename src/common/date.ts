//Dates format are placed in this file.
import moment from "moment";
export interface DataPeriod {
  total: number;
  period: DatePeriod;
}

export interface DateLabel {
  values: number[];
  names: string[];
}

export interface DatePeriod {
  year: number;
  month: number;
  day: number;
  hour: number;
  type: keyof Omit<DatePeriod, "type">;
}

export namespace CommonDate {
  /**Devuelve la diferencia en dias entre 2 fechas */
  export const dayDiff = (date1: Date, date2: Date) => {
    const diff = Math.abs(date1.getTime() - date2.getTime());

    const milliseconsPerDay = 60 * 60 * 24 * 1000;
    return Math.floor(diff / milliseconsPerDay);
  };

  export const getTotalDaysInMonth = (year?: number, month?: number) => {
    const date = new Date();

    return new Date(
      year ?? date.getFullYear(),
      month ?? date.getMonth() + 1,
      0
    ).getDate();
  };
}

export namespace DateNumberArray {
  export const getHoutPeriod = () =>
    new Array(24).fill(undefined).map((_, i) => i + 1);
  export const Hours = () => {
    const values = getHoutPeriod();

    const HourFormat = Intl.DateTimeFormat("es-MX", {
      hour: "numeric",
      hour12: true,
      hourCycle: "h12",
    });
    const curr = new Date();
    const names = values.map((x) =>
      HourFormat.format(new Date(curr.getFullYear(), curr.getMonth() + 1, 1, x))
    );
    return { values, names };
  };

  export const Days = (dateStart: Date, dateEnd: Date): DateLabel => {
    const oneDay = 24 * 60 * 60 * 1000;
    dateStart.setHours(0, 0, 0, 0);
    dateEnd.setHours(0, 0, 0, 0);
    const dayCount =
      Math.round(Math.abs((dateStart.getTime() - dateEnd.getTime()) / oneDay)) +
      1;
    const values = Array.from({ length: dayCount }, (_, index) => {
      const currentDate = new Date(dateStart.getTime() + index * oneDay);
      return currentDate.getDate();
    });

    const names = values.map((value) => value.toString());
    return { values, names };
  };

  export const Months = (dateStart: Date, dateEnd: Date): DateLabel => {
    const values: number[] = [];
    const names: string[] = [];
    let currentDate = dateStart;
    while (currentDate <= dateEnd) {
      const month = currentDate.getMonth() + 1;
      values.push(month);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    for (const monthNumber of values) {
      const currentDate = new Date(dateStart.getFullYear(), monthNumber - 1);
      const monthName = currentDate.toLocaleString("es", { month: "long" });
      names.push(monthName);
    }

    return { values, names };
  };

  export const Years = (dateStart: Date, dateEnd: Date): DateLabel => {
    const startYear = dateStart.getFullYear();
    const endYear = dateEnd.getFullYear();
    const yearCount = endYear - startYear + 1;
    const values = Array.from(
      { length: yearCount },
      (_, index) => startYear + index
    );
    const names = values.map((value) => value.toString());
    return { values, names };
  };

  export const getDiffPeriod = (
    startDate: Date,
    endDate: Date
  ): DatePeriod[] => {
    const dateArray: DatePeriod[] = [];
    let currentDate = new Date(startDate);

    dateArray.push({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      hour: currentDate.getHours(),
      type: "day",
    });

    while (currentDate < endDate) {
      currentDate.setDate(currentDate.getDate() + 1);
      dateArray.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        hour: currentDate.getHours(),
        type: "day",
      });
    }

    return dateArray;
  };
}

export const DateMMDDYY = (date: Date) => moment(date).format("MM/DD/YY");
export const DateDDMMYY = (date: Date) => moment(date).format("DD/MM/YY");
export const DateDDMMYYHHMMA = (date: Date) => moment(date).format("DD/MM/YY hh:mm a");

export const DateToTimeString = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:00`;
};

export const TimeStringToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date;
};
