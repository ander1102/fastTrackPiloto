import { ChangeEvent, useContext, useMemo, useRef, useState } from "react";
import { CatClientesMultiSelect } from "@app/components/Dropdowns";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";
import { UserContext } from "@app/context";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import { FormItem } from "@app/components/FormManager/FormItem";
import useValueHandler from "@app/hooks/useValueHandler";
import { DateFormat } from "@app/common/format";
import InputSearch from "@app/components/InputSearch";
import { TransactionRejectedContext } from "./context";
import ExcelExportButton from "./exportButton";
import { ReportResumeConstants } from "@app/constants/reports";
import { CustomMultiSelectChangeEvent } from "@app/components/HOC/createMultiSelectData";
import { TRANSACTION_REJECTED_TYPE_OPTIONS } from "@app/constants/rejected";

export default function RechazadasHeader() {
  const data = useContext(TransactionRejectedContext);
  const { user } = useContext(UserContext);
  const [clientes, setClientes] = useState<number[]>([]);
  const [tarjeta, setTarjeta] = useState("");
  const [producto, setProducto] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [dateStart, setDateStart] = useValueHandler<Date>(
    () => DateFormat.day.start(new Date(), true).value
  );
  const [dateEnd, setDateEnd] = useValueHandler(
    () => DateFormat.day.end(new Date(), true).value
  );

  const currentDate = useMemo(() => new Date(), []);

  const onChangeClients = (e: CustomMultiSelectChangeEvent) => {
    const value:number[] = e.value;
    setClientes(value);
    let idagep_empresa = value
    if (value.length==0){
      idagep_empresa = [1]
    }
    data.refresh([
      {
        idagep_empresa: idagep_empresa.join(', '),
      },
    ]);
    cleanDropdowns();
  };

  const cleanDropdowns = () => {
    setProducto("");
    setTarjeta("");
    searchRef.current?.setAttribute("value", "");
  };

  const onChangeProducto = (e: DropdownChangeEvent) => {
    setProducto(e.value);
    data.refresh([
      {
        producto: e.value,
      },
    ]);
  };

  const onChangeTarjeta = (e: DropdownChangeEvent) => {
    setTarjeta(e.value);
    data.refresh([
      {
        tarjeta: e.value,
      },
    ]);
  };

  const onSearchMotivo = (e: ChangeEvent<HTMLInputElement>) => {
    data.refresh([{ motivo: e.target.value }]);
  };

  const onChange = (id: number) => (e: CalendarChangeEvent) => {
    const date = e.value as Date;
    let fechaIni: string;
    let fechaFin: string;

    const idagep_empresa =
      clientes.length === 0 ? [user.idagep_empresa] ?? [1] : clientes;

    if (id === 1) {
      setDateStart(date);
      fechaIni = DateFormat.day.start(date, true).toSimpleFormatString();
      fechaFin = DateFormat.day.end(dateEnd(), true).toSimpleFormatString();
    } else {
      setDateEnd(date);
      fechaIni = DateFormat.day.start(dateStart(), true).toSimpleFormatString();
      fechaFin = DateFormat.day.end(date, true).toSimpleFormatString();
    }
    cleanDropdowns();
    data.refresh([
      {
        idagep_empresa: String(idagep_empresa.join(', ') ?? 0),
        fechaIni,
        fechaFin,
        motivo: "",
        producto: "",
        tarjeta: "",
      },
    ]);
  };

  return (
    <section className="container-header">
      <KpiContainer title="Transacciones rechazadas">
        <KpiItem
          title="Porcentaje de aprobación"
          loading={data.isCalling}
          value={`${(data.item?.porcentaje ?? 0).toFixed(2)}%`}
        />
      </KpiContainer>

      <FiltersContainer lg={7}>
        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <Calendar
              placeholder="Inicio"
              className="myCalendarButton w-full"
              onChange={onChange(1)}
              value={dateStart()}
              maxDate={currentDate}
              disabled={data.isCalling}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem>
            <Calendar
              placeholder="Final"
              className="myCalendarButton w-full"
              onChange={onChange(2)}
              value={dateEnd()}
              maxDate={currentDate}
              disabled={data.isCalling}
            />
          </FormItem>
        </FiltersItem>
        <FiltersItem>
          <FormItem label="Clientes">
            <CatClientesMultiSelect
              disabled={data.isCalling}
              display="comma"
              filter
              resetFilterOnHide
              selectedItemsLabel={`${clientes.length} clientes seleccionados`}
              maxSelectedLabels={2}
              value={clientes}
              onChange={onChangeClients}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Producto">
            <Dropdown
              value={producto}
              onChange={onChangeProducto}
              placeholder="Seleccionar"
              options={TRANSACTION_REJECTED_TYPE_OPTIONS}
              disabled={data.isCalling}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>
        <FiltersItem>
          <FormItem label="Tarjeta">
            <Dropdown
              value={tarjeta}
              onChange={onChangeTarjeta}
              placeholder="Seleccionar"
              options={ReportResumeConstants.REPORT_RESUME_CARD_OPTIONS}
              disabled={data.isCalling}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Motivo de rechazo">
            <InputSearch
              ref={searchRef}
              onChange={onSearchMotivo}
              placeholder="Buscar"
              delayOnChange={700}
              disabled={data.isCalling}
            />
          </FormItem>
        </FiltersItem>
        <FiltersItem>
          <ExcelExportButton style={{margin:"0"}}/>
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
