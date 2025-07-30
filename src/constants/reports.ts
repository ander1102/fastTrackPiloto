import { omit, Sum, SumByCollection } from "@app/common";
import {
  CommonDate,
  DataPeriod,
  DateNumberArray,
  DatePeriod,
} from "@app/common/date";
import { DateFormat, fillArrayCircularly, isDate } from "@app/common/format";
import { CallOptions } from "@app/hooks/useCall";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { ComissionReportFilter } from "@app/layout/reportes/comisiones/context";
import { ResumeReportFilter } from "@app/layout/reportes/resumen/context";
import { ExcelCell, ExcelOptions } from "@app/types/Excel";
import { DropdownOptions } from "@app/types/Form";

import {
  REPORT_TYPE,
  ENTITY_REPORT_TYPE,
  AMOUNT_REPORT_TYPE,
  ReportGetBody,
  ReportGetOperation,
  ReportResumeEntityValues,
  ReportComissionBody,
  ComissionReportExcelColumns,
  MasterComissionReportExcelColumns,
  ResumeShowValues,
  ReportResumeTransaction,
} from "@app/types/Reports";
import { User, UserType } from "@app/types/User";
import {
  CURRENCY_FORMAT,
  DATE_FORMAT,
  DATE_FORMAT_SHORT,
  HOUR_FORMAT,
  MONTH_FORMAT,
} from ".";
import { ORIGEN_OPTIONS } from "./client";
import { TRANSACTION_REJECTED_TYPE_OPTIONS } from "./rejected";
import { colorsReports, dailyReports } from "../../assets.config";

export interface DateLabel {
  values: number[];
  names: string[];
}

export namespace ReportResumeConstants {
  export const REPORT_TYPE_DISPLAY_TITLE = ["Comisiones", "Resumen"];

  export const REPORT_ZONE_DISPLAY_TITLE = ["Nacional", "Internacional"];

  export const REPORT_CARD_DISPLAY_TITLE = ["Visa", "Mastercard"];

  export enum LAST_DAYS {
    WEEK,
    MID_MONTH,
    MONTH,
  }

  export const PERIOD_DISPLAY: Record<
    DatePeriod["type"],
    { title: string; getValue: (value: Date) => string }
  > = {
    day: {
      title: "Días",
      getValue: (value) => DATE_FORMAT_SHORT.format(value),
    },
    hour: {
      title: "Horas",
      getValue: (value) => HOUR_FORMAT.format(value),
    },
    month: {
      title: "Meses",
      getValue: (value) => MONTH_FORMAT.format(value),
    },
    year: {
      title: "Años",
      getValue: (value) => DATE_FORMAT.format(value),
    },
  };

  export const REPORT_TYPE_OPTIONS: DropdownOptions<REPORT_TYPE>[] = [
    {
      label: REPORT_TYPE_DISPLAY_TITLE[REPORT_TYPE.COMISION],
      value: REPORT_TYPE.COMISION,
    },
    {
      label: REPORT_TYPE_DISPLAY_TITLE[REPORT_TYPE.RESUME],
      value: REPORT_TYPE.RESUME,
    },
  ];

  export const REPORT_RESUME_ORIGIN_OPTIONS: DropdownOptions[] = [
    ...ORIGEN_OPTIONS,
  ];

  export const REPORT_RESUME_ZONE_OPTIONS: DropdownOptions[] = [
    {
      label: "Todos",
      value: "",
    },
    {
      label: "Nacional",
      value: "nacional",
    },
    {
      label: "Internacional",
      value: "internacional",
    },
  ];

  export const REPORT_RESUME_TRANSACTION_TYPE: DropdownOptions[] = [
    ...TRANSACTION_REJECTED_TYPE_OPTIONS,
  ];
  export const REPORT_RESUME_CARD_OPTIONS: DropdownOptions[] = [
    {
      label: "Todos",
      value: "",
    },
    {
      label: "Visa",
      value: "Visa",
    },
    {
      label: "Mastercard",
      value: "Mc",
    },
    {
      label: "Carnet",
      value: "CARNET",
    },
    {
      label: "Amex",
      value: "Amex",
    },
  ];

  export const QUICK_DATE_OPTIONS: DropdownOptions<LAST_DAYS | -1>[] = [
    {
      label: "Personalizado",
      value: -1,
    },
    {
      label: "07 días",
      value: LAST_DAYS.WEEK,
    },
    {
      label: "15 días",
      value: LAST_DAYS.MID_MONTH,
    },
    {
      label: "31 días",
      value: LAST_DAYS.MONTH,
    },
  ];

  export const QUICK_DATE_DAYS = [6, 14, 30];

  export const REPORT_AMOUNT_TYPE_OPTIONS = (
    userType: UserType
  ): DropdownOptions<AMOUNT_REPORT_TYPE>[] => [
    {
      label: "Monto total diario",
      value: AMOUNT_REPORT_TYPE.DAILY,
    },
    {
      label: userType === "master" ? "Cliente" : "Sucursal",
      value: AMOUNT_REPORT_TYPE.ENTITY,
    },
  ];

  export const REPORT_COMISION_FILTER_TYPE: DropdownOptions<ENTITY_REPORT_TYPE>[] =
    [
      {
        label: "Sucursal",
        value: ENTITY_REPORT_TYPE.SUBSIDIARY,
      },
      {
        label: "Cliente",
        value: ENTITY_REPORT_TYPE.CLIENT,
      },
    ];

  const REPORT_RESUME_ENTITY_CHART_LABELS = new Array(24)
    .fill(undefined)
    .map((_, i) => i + 1);

  const REPORT_RESUME_DAILY_CHART_LABELS = new Array(
    CommonDate.getTotalDaysInMonth()
  )
    .fill(undefined)
    .map((_, i) => i + 1);

  const REPORT_RESUME_LABELS = [
    REPORT_RESUME_DAILY_CHART_LABELS,
    REPORT_RESUME_ENTITY_CHART_LABELS,
  ];

  const REPORT_RESUME_DAILY_LABELS = (
    dateStart: Date,
    dateEnd: Date,
    type: string
  ): DateLabel => {
    switch (type) {
      case "hours":
        return DateNumberArray.Hours();
      case "days":
        return DateNumberArray.Days(dateStart, dateEnd);
      case "months":
        return DateNumberArray.Months(dateStart, dateEnd);
      case "years":
        return DateNumberArray.Years(dateStart, dateEnd);
      default:
        return { values: [], names: [] };
    }
  };

  export const REPORT_RESUME_ENTITY_COLORS = [
    colorsReports.color_1,
    colorsReports.color_2,
    colorsReports.color_3,
    colorsReports.color_4,
    colorsReports.color_5,
  ];

  export const getReportPeriod = (
    dateStart: Date,
    dateEnd: Date
  ): DatePeriod[] => {
    const dayDiff = CommonDate.dayDiff(dateEnd, dateStart);
    if (dayDiff === 0)
      return DateNumberArray.getHoutPeriod().map(
        (hour) =>
          ({
            year: dateStart.getFullYear(),
            month: dateStart.getMonth() + 1,
            day: dateStart.getDate(),
            hour: hour - 1,
            type: "hour",
          } as DatePeriod)
      );
    return DateNumberArray.getDiffPeriod(dateStart, dateEnd);
  };

  export const REPORT_GET_RESUME_DAILY_CHART_DATA = (
    data: ReportResumeTransaction[],
    periods: DatePeriod[]
  ) => {
    const totalData: DataPeriod[] = periods.map((period) => {
      const dataFilter = data.filter((item) => {
        const _period = getDataPeriod(item.fecha);
        const excludeKeys: (keyof DatePeriod)[] = ["type"];
        if (period.type === "day") excludeKeys.push("hour");
        return (
          JSON.stringify(omit(_period, ...excludeKeys)) ===
          JSON.stringify(omit(period, ...excludeKeys))
        );
      });
      return {
        total: SumByCollection(dataFilter, (obj) => obj.total),
        period,
      };
    });

    return {
      labels: totalData.map((data) => {
        const period = data.period;
        const date = new Date(`${period.year}/${period.month}/${period.day}`);
        date.setHours(period.hour);
        return PERIOD_DISPLAY[period.type ?? "day"]?.getValue?.(date);
      }),
      type: PERIOD_DISPLAY[
        Array.isArray(periods) ? periods[0]?.type ?? "day" : "day"
      ]?.title,

      // MONTO TOTAL DIARIO COLOR
      datasets: [
        {
          label: "",
          data: totalData.map((x) => x.total),
          fill: false,
          backgroundColor: [dailyReports.color],
          tension: 0.4,
          borderRadius: 50,
        },
      ],
    };
  };

  export const REPORT_GET_RESUME_ENTITY_CHART_DATA = (
    entities: ReportResumeEntityValues[]
  ) => {
    const labels = entities.map((x) => x.name);
    const data = entities.map((x) => x.sumTotal);

    return {
      labels,
      datasets: [
        {
          label: "",
          backgroundColor: fillArrayCircularly(
            REPORT_RESUME_ENTITY_COLORS,
            labels.length
          ),
          data,
          borderRadius: 10,
          barPercentage: 0.3,
        },
      ],
    };
  };

  export const REPORT_GET_RESUME_CHART_OPTIONS_LINE = (
    userType: string,
    type: string
  ) => ({
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const index = ctx.dataIndex as number;
            return useTruncateAmout(ctx.dataset.data?.[index] ?? 0);
          },
          title: (ctx: any) => {
            return null;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "",
          font: {
            weight: 500,
          },
        },
        grid: {
          display: true,
          drawBorder: false,
        },
        title: {
          display: true,
          text: type,
          font: {
            weight: 700,
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "",
          precision: 0,
          callback: (value: number) => useTruncateAmout(value),
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Monto total",
          font: {
            weight: 700,
            size: 16,
          },
        },
      },
    },
  });

  export const REPORT_GET_RESUME_CHART_OPTIONS_BAR = (
    userType: string,
    amount: number
  ) => ({
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    barThickness: 40,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
        callbacks: {
          label: (ctx: any) => {
            const index = ctx.dataIndex as number;
            return useTruncateAmout(ctx.dataset.data?.[index] ?? 0);
          },
          title: (ctx: any) => {
            return null;
          },
        },
      },
    },
    scales: {
      x: {
        barPercentage: 0.5,
        ticks: {
          color: "",
          font: {
            weight: 500,
          },
        },
        grid: {
          display: true,
          drawBorder: false,
        },
        title: {
          display: true,
          text:
            userType === "master"
              ? `Top ${amount} de clientes`
              : `Top ${amount} de sucursales`,
          font: {
            weight: 700,
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "",
          precision: 0,
          callback: (value: number) => useTruncateAmout(value),
        },
        grid: {
          display: true,
          drawBorder: false,
        },
        title: {
          display: true,
          text: "Monto total",
          font: {
            weight: 700,
            size: 16,
          },
        },
      },
    },
  });

  export const REPORT_GET_RESUME_ENTITY_CHART_OPTIONS = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "",
          display: false,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const index = ctx.dataIndex as number;
            return useTruncateAmout(ctx.dataset.data?.[index] ?? 0);
          },
          title: (ctx: any) => {
            return null;
          },
        },
      },
    },
    scales: {
      x: {
        offset: true,
        ticks: {
          color: "",
          font: {
            align: "center",
          },
        },
        grid: {
          display: true,
          drawBorder: false,
        },
        title: {
          display: true,
          text: "Clientes",
          font: {
            weight: 700,
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "",
          precision: 0,
          callback: (value: number) => useTruncateAmout(value),
        },
        grid: {
          display: true,
          drawBorder: false,
        },
        title: {
          display: true,
          text: "Monto total",
          font: {
            weight: 700,
            size: 16,
          },
        },
      },
    },
  };

  export const RESUME_REPORT_CHART_FILTER_OPTIONS: DropdownOptions<number>[] = [
    {
      label: "Todos",
      value: -1,
    },
    {
      label: "10",
      value: 10,
    },
  ];

  const getResumeOperation = (
    userType: UserType,
    amountType: AMOUNT_REPORT_TYPE
  ): ReportGetOperation => {
    if (userType === "master" && amountType === AMOUNT_REPORT_TYPE.ENTITY)
      return "MC";
    if (userType === "admin" && amountType === AMOUNT_REPORT_TYPE.ENTITY)
      return "MS";
    return "MD";
  };
  export const getComissionCallOptionsParams = (
    filter: ComissionReportFilter,
    user: User,
    userType: UserType
  ): Partial<CallOptions<[body: ReportComissionBody]>> => {
    const fechaInicio = DateFormat.day
      .start(filter.dateStart, true)
      .toSimpleFormatString();
    const fechaFin = DateFormat.day
      .end(filter.dateEnd, true)
      .toSimpleFormatString();
    return {
      initialParams: [
        {
          idagep_usuarios: user.persona.idagep_usuarios ?? 0,
          idagep_empresa: user.idagep_empresa ?? 0,
          filtroEmp: userType === "master" ? filter.entity : "",
          filtroSuc: userType === "admin" ? filter.entity : 0,
          fechaInicio,
          fechaFin,
          operacion: userType === "master" ? "DE" : "DS",
          origen: ""
        },
      ] as unknown as [body: ReportComissionBody],
      setNullOnFailed: true,
      //Se Skipea la primera vez ya que se disparara el fetch con los filtros del context
      skipFistCall: true,
    };
  };
  export const getCallOptionsParams = (
    filter: ResumeReportFilter,
    user: User,
    userType: UserType
  ): Partial<CallOptions<[body: ReportGetBody]>> => {
    const fechaInicio = DateFormat.day
      .start(filter.dateStart, true)
      .toSimpleFormatString();
    const fechaFin = DateFormat.day
      .end(filter.dateEnd, true)
      .toSimpleFormatString();
    return {
      initialParams: [
        {
          idagep_usuarios: user.persona.idagep_usuarios,
          idagep_empresa: user.idagep_empresa ?? 0,
          filtroEmp: userType === "master" ? filter.entity : "",
          filtroSuc: userType === "admin" ? filter.suc : 0,
          filtroTarj: filter.card,
          filtroNac: filter.zone,
          filtroTipo: filter.transactionType,
          fechaInicio,
          fechaFin,
          operacion: getResumeOperation(userType, filter.amountType),
          origen: filter.origen,
        },
      ] as unknown as [body: ReportGetBody],
      setNullOnFailed: true,
      //Se Skipea la primera vez ya que se disparara el fetch con los filtros del context
      skipFistCall: true,
    };
  };

  export const getDataPeriod = (date: string): DatePeriod => {
    const d = isDate(date) ? new Date(date) : new Date();
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: d.getHours(),
      type: "day",
    };
  };

  const EXCEL_COMISSION_REPORT_COLUMNS: Record<
    keyof ComissionReportExcelColumns,
    string
  > = {
    Cliente: "Cliente",
    Monto: "Monto",
    ComisionEfevoopay: "COMISIÓN EFEVOO PAY",
    Sucursal: "Sucursal",
    BanorteIVA: "IVA BANORTE",
    comisionIVA: "COMISIÓN + IVA",
    FechaHora: "Fecha y hora",
    ID: "ID",
    ivaComision: "IVA COMISIÓN",
    MetodoPago: "Método de pago",
    Neto: "NETO CLIENTE",
    numTarjeta: "Número de tarjeta",
    Tarjeta: "Tarjeta",
    TasaBanorte: "TASA BANORTE",
    TasaBaorteIVA: "TASA BANORTE + IVA",
    TasaComisionBanorte: "TASA COMISIÓN BANORTE",
    TasaComisionEfevoopay: "TASA COMISIÓN EFEVOO PAY",
    Tipo: "TIPO",
    utilidad: "UTILIDAD",
    porcentajeTasa: "PORCENTAJE TASA",
    adquiriente:"Adquiriente",
    sobretasa:"Sobretasa",
    sobretasaIVA:"Sobretasa IVA"
  };

  const EXCEL_COMISSION_REPORT_SORT_KEYS: (keyof ComissionReportExcelColumns)[] =
    [
      "ID",
      "adquiriente",
      "Tarjeta",
      "MetodoPago",
      "numTarjeta",
      "Tipo",
      "FechaHora",
      "Sucursal",
      "Cliente",
      "Monto",
      "TasaComisionEfevoopay",
      "ComisionEfevoopay",
      "ivaComision",
      "comisionIVA",
      "TasaComisionBanorte",
      "TasaBanorte",
      "BanorteIVA",
      "TasaBaorteIVA",
      "sobretasa",
      "sobretasaIVA",
      "utilidad",
      "Neto",
    ];

  const EXCEL_COMISSION_HEADER_COLORS: Partial<
    Record<keyof ComissionReportExcelColumns, string>
  > = {
    Sucursal: "#ffff00",
    Cliente: "#ffff00",
    TasaComisionBanorte: "#ffff00",
    TasaBanorte: "#ffff00",
    BanorteIVA: "#ffff00",
    TasaBaorteIVA: "#ffff00",
    utilidad: "#ade21b",
    Neto: "#ade21b",
  };

  export const EXCEL_COMISSION_EXCEL_OPTIONS: Partial<
    ExcelOptions<ComissionReportExcelColumns>
  > = {
    itemOptions: {
      ID: {
        type: "number",
      },
    },
    headerOptions: Object.fromEntries(
      EXCEL_COMISSION_REPORT_SORT_KEYS.map((key) => [
        key,
        {
          height: 50,
          align: "left",
          alignVertical: "bottom",
          fontWeight: "bold",
          wrap: true,
          borderStyle: "thin",
        } as ExcelCell,
      ])
    ),
    columnOptions: {
      ID: {
        width: 10,
      },
      Tarjeta: {
        width: 15,
      },
      MetodoPago: {
        width: 15,
      },
      numTarjeta: {
        width: 25,
      },
      Tipo: {
        width: 15,
      },
      FechaHora: {
        width: 25,
      },
      Cliente: {
        width: 25,
      },
      Sucursal: {
        width: 25,
      },
      Monto: {
        width: 15,
      },
      TasaComisionEfevoopay: {
        width: 10,
      },
      ComisionEfevoopay: {
        width: 10,
      },
      ivaComision: {
        width: 10,
      },
      comisionIVA: {
        width: 10,
      },
      TasaComisionBanorte: {
        width: 10,
      },
      TasaBanorte: {
        width: 10,
      },
      BanorteIVA: {
        width: 10,
      },
      Neto: {
        width: 15,
      },
      sobretasa:{
        width:15
      },
      adquiriente:{
        width:15
      }
    },
    displayColumns: EXCEL_COMISSION_REPORT_COLUMNS,
    sortKeys: EXCEL_COMISSION_REPORT_SORT_KEYS,
  };

  const EXCEL_MASTER_COMISSION_REPORT_COLUMNS: Record<
    keyof MasterComissionReportExcelColumns,
    string
  > = {
    ID:"ID",
    adquiriente:"Adquiriente",
    Tarjeta:"Tarjeta",
    MetodoPago:"Método de pago",
    numTarjeta:"Número de tarjeta",
    Tipo:"Tipo",
    fecha:"Fecha",
    hora:"Hora",
    cliente:"Cliente",
    Monto:"Monto",
    tasaComisionEfevoopay:"Tasa Comisión Efevoopay",
    montoComisionEfevoopay:"Monto Comisión Efevoopay",
    IVAComision:"IVA Comisión",
    montoComisionIVA:"Monto Comisión + IVA",
    tasaComisionAdquiriente:"Tasa Comisión Adquiriente",
    montoComisionAdquiriente:"Monto Comisión Adquiriente",
    IVAAdquiriente:"IVA Adquiriente",
    tasaAdquirienteIVA:"Tasa Adquiriente + IVA",
    sobretasaEfevoopay:"Sobretasa Efevoopay",
    montoSobretasaEfevoopay:"Monto Sobretasa Efevoopay",
    IVASobretasaEfevoopay:"IVA Sobretasa Efevoopay",
    montoSobretasaEfevoopayIVA:"Monto Sobretasa Efevoopay + IVA",
    sobretasaAdquiriente:"Sobretasa Adquiriente",
    montoSobretasaAdquiriente:"Monto Sobretasa Adquiriente",
    IVASobretasaAdquiriente:"Monto IVA Sobretasa Adquiriente",
    montoSobretasaAdquirienteIVA:"Monto Sobretasa Adquiriente + IVA",
    utilidadBruta:"Utilidad Bruta",
    netoCliente:"Neto Cliente"
  };

  const EXCEL_MASTER_COMISSION_REPORT_SORT_KEYS: (keyof MasterComissionReportExcelColumns)[] =
    [
      "ID",
      "adquiriente",
      "Tarjeta",
      "MetodoPago",
      "numTarjeta",
      "Tipo",
      "fecha",
      "hora",
      "cliente",
      "Monto",
      "tasaComisionEfevoopay",
      "montoComisionEfevoopay",
      "IVAComision",
      "montoComisionIVA",
      "tasaComisionAdquiriente",
      "montoComisionAdquiriente",
      "IVAAdquiriente",
      "tasaAdquirienteIVA",
      "sobretasaEfevoopay",
      "montoSobretasaEfevoopay",
      "IVASobretasaEfevoopay",
      "montoSobretasaEfevoopayIVA",
      "sobretasaAdquiriente",
      "montoSobretasaAdquiriente",
      "IVASobretasaAdquiriente",
      "montoSobretasaAdquirienteIVA",
      "utilidadBruta",
      "netoCliente",
    ];

  export const EXCEL_MASTER_COMISSION_EXCEL_OPTIONS: Partial<
    ExcelOptions<MasterComissionReportExcelColumns>
  > = {
    itemOptions: {
      ID: {
        type: "number",
      },
      Monto: { type: "number",format:"$#,##0.00" },
      montoComisionEfevoopay: { type: "number",format:"$#,##0.000" },
      IVAComision: { type: "number",format:"$#,##0.000" },
      montoComisionIVA: { type: "number",format:"$#,##0.000" },
      montoComisionAdquiriente: { type: "number",format:"$#,##0.000" },
      IVAAdquiriente: { type: "number",format:"$#,##0.000" },
      tasaAdquirienteIVA: { type: "number",format:"$#,##0.000" },
      montoSobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
      IVASobretasaEfevoopay: { type: "number",format:"$#,##0.000" },
      montoSobretasaEfevoopayIVA: { type: "number",format:"$#,##0.000" },
      montoSobretasaAdquiriente: { type: "number",format:"$#,##0.000" },
      IVASobretasaAdquiriente: { type: "number",format:"$#,##0.000" },
      montoSobretasaAdquirienteIVA: { type: "number",format:"$#,##0.000" },
      utilidadBruta: { type: "number",format:"$#,##0.000" },
      netoCliente: { type: "number",format:"$#,##0.000" },
    },
    headerOptions: Object.fromEntries(
      EXCEL_MASTER_COMISSION_REPORT_SORT_KEYS.map((key) => [
        key,
        {
          height: 50,
          align: "left",
          alignVertical: "bottom",
          fontWeight: "bold",
          wrap: true,
          borderStyle: "thin",
        } as ExcelCell,
      ])
    ),
    columnOptions: {
      ID: { width:10,},
      adquiriente: { width:10,},
      Tarjeta: { width:15,},
      MetodoPago: { width:15,},
      numTarjeta: { width:20,},
      Tipo: { width:20,},
      fecha: { width:10,},
      hora: { width:10,},
      cliente: { width:50,},
      Monto: { width:10,},
      tasaComisionEfevoopay: { width:10,},
      montoComisionEfevoopay: { width:10,},
      IVAComision: { width:10,},
      montoComisionIVA: { width:10,},
      tasaComisionAdquiriente: { width:10,},
      montoComisionAdquiriente: { width:10,},
      IVAAdquiriente: { width:10,},
      tasaAdquirienteIVA: { width:10,},
      sobretasaEfevoopay: { width:10,},
      montoSobretasaEfevoopay: { width:10,},
      IVASobretasaEfevoopay: { width:10,},
      montoSobretasaEfevoopayIVA: { width:10,},
      sobretasaAdquiriente: { width:10,},
      montoSobretasaAdquiriente: { width:10,},
      IVASobretasaAdquiriente: { width:10,},
      montoSobretasaAdquirienteIVA: { width:10,},
      utilidadBruta: { width:15,},
      netoCliente: { width:15,},
    },
    displayColumns: EXCEL_MASTER_COMISSION_REPORT_COLUMNS,
    sortKeys: EXCEL_MASTER_COMISSION_REPORT_SORT_KEYS,
  };

  export const RESUME_TRANSACTION_SHOW_DISPLAYS: ResumeShowValues[] = [
    {
      getValue: (value) => CURRENCY_FORMAT.format(value),
    },
  ];

  export const RESUME_CIRCLE_CHART_TYPE: DropdownOptions<number>[] = [
    {
      label: "Monto",
      value: 0,
    },
    {
      label: "Eventos",
      value: 1,
    },
  ];
}
