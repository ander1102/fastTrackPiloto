import { useContext, useEffect, useState } from "react";
import { FormItem } from "@app/components/FormManager/FormItem";
import { Calendar } from "@app/components/Calendar";
import { ReportComissionContext } from "./context";
import { ComisionesReportsProps } from ".";
import { CatClientes, CatSucursal } from "@app/components/Dropdowns";
import { DROPDOWN_ALL } from "@app/constants/form";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ReportResumeConstants } from "@app/constants/reports";
import { DateFormat } from "@app/common/format";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { ButtonExcel } from "@app/components/Buttons";
import {
  ComissionReportDataExcel,
  MasterComissionReportDataExcel,
  ComissionReportExcelColumns,
  MasterComissionReportExcelColumns,
} from "@app/types/Reports";
import { ExcelExportBody } from "@app/types/Excel";
import { ReportControllers } from "@app/logic/backend/reports";
import useCall from "@app/hooks/useCall";

interface ComisionesReportsHeaderProps extends ComisionesReportsProps {}

export default function ComisionesReportsHeader({
  user,
  userType,
}: ComisionesReportsHeaderProps) {
  const { filter, onChange, successListenner, onChangeByObj } = useContext(
    ReportComissionContext
  );
  const Comission = useCall(ReportControllers, "getComissionReport", () =>
    ReportResumeConstants.getComissionCallOptionsParams(filter, user, userType)
  );

  useEffect(() => {
    Comission.itemManager.addEventListenner("change", (item) => {
      successListenner.requestSuccess();
    });
    Comission.refresh(
      ReportResumeConstants.getComissionCallOptionsParams(
        filter,
        user,
        userType
      ).initialParams
    );
    return () => {
      Comission.itemManager.removeEventListenner("change");
    };
  }, [filter]);

  const [loading, setLoading] = useState(false);
  const [entityDropdown, setEntityDropdown] = useState<number>(0);
  const [quickDate, setQuickDate] = useState<ReportResumeConstants.LAST_DAYS>(
    ReportResumeConstants.LAST_DAYS.MID_MONTH
  );
  const [dateDisabled, setDateDisabled] = useState<boolean>(false);
  const filterTitle = userType === "master" ? "Cliente" : "Sucursal";

  const onEntityChange = (e: CustomDropdownChangeEvent) => {
    const value: number = e.value;
    setEntityDropdown(e.value);
    onChange("entity", value);
  };

  useEffect(() => {
    successListenner.setLoadingCb("header", () => {
      setLoading(true);
    });
    successListenner.setSuccessCb("header", () => {
      setLoading(false);
    });
  }, []);

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
      dateStart: DateFormat.day.start(start, true).value,
      dateEnd: DateFormat.day.end(new Date(), true).value,
    });
  };

  const getWorksheets = (
    transactions: ComissionReportDataExcel[]
  ): ExcelExportBody<ComissionReportExcelColumns> => {
    const isMaster = userType === "master";
    return {
      worksheets: [
        {
          name: "Transacciones",
          items: transactions.map((x) => {
            return {
              ID: x.ID,
              adquiriente: x.adquiriente ?? "-",
              Tarjeta: x.Tarjeta,
              MetodoPago: x.MetodoPago,
              numTarjeta: x.numTarjeta.replaceAll("X","*"),
              Tipo: x.Tipo,
              FechaHora: x.FechaHora,
              [isMaster ? "Cliente" : "Sucursal"]: isMaster
                ? x.Cliente
                : x.Sucursal,
              Monto: x.Monto,
              TasaComisionEfevoopay: isMaster
                ? x.TasaComisionEfevoopay
                : (undefined as any),
              ComisionEfevoopay: x.ComisionEfevoopay,
              ivaComision: x.ivaComision,
              sobretasa: x.sobretasa ?? "-",
              sobretasaIVA: x.sobretasaIVA ?? "-",
              comisionIVA: x.comisionIVA,
              TasaComisionBanorte: x.TasaComisionBanorte,
              TasaBanorte: x.TasaBanorte,
              BanorteIVA: x.BanorteIVA,
              TasaBaorteIVA: x.TasaBaorteIVA,
              utilidad: x.utilidad,
              Neto: x.Neto,
              porcentajeTasa: x.porcentajeTasa,
              // ...omit(x, "Cliente", "Sucursal", "TasaComisionEfevoopay"),
            };
          }),
          options: ReportResumeConstants.EXCEL_COMISSION_EXCEL_OPTIONS,
        },
      ],
    };
  };
  const getMasterWorksheets = (
    transactions: MasterComissionReportDataExcel[]
  ): ExcelExportBody<MasterComissionReportExcelColumns> => {
    const isMaster = userType === "master";
    return {
      worksheets: [
        {
          name: "Transacciones",
          items: transactions.map((x) => {
            return {
              ID:x.ID,
              adquiriente:x.adquiriente,
              Tarjeta:x.Tarjeta,
              MetodoPago:x.MetodoPago,
              numTarjeta:x.numTarjeta.replaceAll("X","*"),
              Tipo:x.Tipo,
              fecha:x.fecha,
              hora:x.hora,
              cliente:x.cliente,
              Monto:x.Monto,
              tasaComisionEfevoopay:x.tasaComisionEfevoopay,
              montoComisionEfevoopay:x.montoComisionEfevoopay,
              IVAComision:x.IVAComision,
              montoComisionIVA:x.montoComisionIVA,
              tasaComisionAdquiriente:x.tasaComisionAdquiriente,
              montoComisionAdquiriente:x.montoComisionAdquiriente,
              IVAAdquiriente:x.IVAAdquiriente,
              tasaAdquirienteIVA:x.tasaAdquirienteIVA,
              sobretasaEfevoopay:x.sobretasaEfevoopay,
              montoSobretasaEfevoopay:x.montoSobretasaEfevoopay,
              IVASobretasaEfevoopay:x.IVASobretasaEfevoopay,
              montoSobretasaEfevoopayIVA:x.montoSobretasaEfevoopayIVA,
              sobretasaAdquiriente:x.sobretasaAdquiriente,
              montoSobretasaAdquiriente:x.montoSobretasaAdquiriente,
              IVASobretasaAdquiriente:x.IVASobretasaAdquiriente,
              montoSobretasaAdquirienteIVA:x.montoSobretasaAdquirienteIVA,
              utilidadBruta:x.utilidadBruta,
              netoCliente:x.netoCliente,
            };
          }),
          options: ReportResumeConstants.EXCEL_MASTER_COMISSION_EXCEL_OPTIONS,
        },
      ],
    };
  };

  const getItemAsync = async (): Promise<ComissionReportDataExcel[] | null> => {
    const fechaInicio = DateFormat.day
      .start(filter.dateStart, true)
      .toSimpleFormatString();
    const fechaFin = DateFormat.day
      .end(filter.dateEnd, true)
      .toSimpleFormatString();
    const Comissions = await ReportControllers.getComissionReportExcel({
      idagep_usuarios: user.persona.idagep_usuarios ?? 0,
      idagep_empresa: user.idagep_empresa ?? 0,
      filtroEmp: userType === "master" ? filter.entity : 0,
      filtroSuc: userType === "admin" ? filter.entity : "",
      fechaInicio,
      fechaFin,
      operacion: userType === "master" ? "DE" : "DS",
      origen: "",
    });
    if (!Comissions.isSuccess) return null;
    return Comissions.response;
  };

  const getAdminItemAsync = async (): Promise<MasterComissionReportDataExcel[] | null> => {
    const fechaInicio = DateFormat.day
      .start(filter.dateStart, true)
      .toSimpleFormatString();
    const fechaFin = DateFormat.day
      .end(filter.dateEnd, true)
      .toSimpleFormatString();
    const Comissions = await ReportControllers.getMasterComissionReportExcel({
      idagep_usuarios: user.persona.idagep_usuarios ?? 0,
      idagep_empresa: user.idagep_empresa ?? 0,
      filtroEmp: userType === "master" ? filter.entity : "",
      filtroSuc: userType === "admin" ? filter.entity : "",
      fechaInicio,
      fechaFin,
      operacion: userType === "master" ? "DE" : "DS",
      origen: "",
    });
    if (!Comissions.isSuccess) return null;
    return Comissions.response;
  };

  const getName = () => {
    const format = new Intl.DateTimeFormat("es-MX", { dateStyle: "short" });

    return `reporte_comisiones_${format.format(
      filter.dateStart
    )}_a_${format.format(filter.dateEnd)}`;
  };

  return (
    <div className="mb-3">
      <FiltersContainer>
        <FiltersItem>
          <FormItem label={filterTitle}>
            {userType === "master" ? (
              <CatClientes
                placeholder="Cliente"
                disabled={loading}
                value={entityDropdown}
                filter
                mergeOptions={DROPDOWN_ALL(0)}
                onChange={onEntityChange}
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
              className="w-full"
              options={ReportResumeConstants.QUICK_DATE_OPTIONS}
            />
          </FormItem>
        </FiltersItem>
        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <Calendar
              value={filter.dateStart}
              onChange={(e) => {
                onChange("dateStart", e.value as Date);
                setQuickDate(-1 as ReportResumeConstants.LAST_DAYS);
              }}
              maxDate={filter.dateEnd}
              placeholder="Inicio"
              className="myCalendarButton w-full"
              disabled={loading || dateDisabled}
            />
          </FormItem>
        </FiltersItem>
        <FiltersItem>
          <FormItem>
            <Calendar
              value={filter.dateEnd}
              onChange={(e) => {
                onChange("dateEnd", e.value as Date);
                setQuickDate(-1 as ReportResumeConstants.LAST_DAYS);
              }}
              placeholder="Final"
              minDate={filter.dateStart}
              className="myCalendarButton w-full"
              disabled={loading || dateDisabled}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem></FiltersItem>

        <FiltersItem>
        { userType != "master" &&
            <ButtonExcel
            getItemAsync={getItemAsync}
            getWorksheets={getWorksheets}
            disabled={!Comission.item?.length}
            fileName={getName}
            />
          }
          { userType == "master" &&
            <ButtonExcel
            getItemAsync={getAdminItemAsync}
            getWorksheets={getMasterWorksheets}
            disabled={!Comission.item?.length}
            fileName={getName}
            />
          }
        </FiltersItem>
      </FiltersContainer>
    </div>
  );
}
