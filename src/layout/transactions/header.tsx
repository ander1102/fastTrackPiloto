import { useContext, useMemo, useState,useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import { FormItem } from "@app/components/FormManager/FormItem";
import { DateFormat } from "@app/common/format";
import useValueHandler from "@app/hooks/useValueHandler";
import { CatClientesMultiSelect } from "@app/components/Dropdowns";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";
import { CustomMultiSelectChangeEvent } from "@app/components/HOC/createMultiSelectData";
import {
  TRANSACTION_PRODUCT_OPTIONS_ALL,
  TRANSACTION_TYPE_TRANSACTION_OPTIONS,
} from "@app/constants/transactions";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { UserContext } from "@app/context";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import {
  Transaction,
  TransactionAllKPIs,
  TransactionFilters,
} from "@app/types/Transactions";
import { ExcelExportButton } from "./ExcelExportButton";
import { CatControllers } from "@app/logic/backend/cat";
import { DropdownOptions } from "@app/types/Form";

const date = new Date();
interface TransactionHeader {
  loader: boolean;
  transactions: Transaction[];
  filters: TransactionFilters;
  onRefresh: (filters: Partial<TransactionFilters>) => void;
  setIsWs: (value: boolean) => void;
  kpis: TransactionAllKPIs;
}

export default function TransactionHeader({
  loader,
  transactions,
  filters,
  onRefresh,
  kpis,
  setIsWs,
}: TransactionHeader) {
  const { user } = useContext(UserContext);
  const isMaster = useMemo(() => user.userType === "master", [user]);
  const [dateStart, setDateStart] = useValueHandler<Date>(
    () => DateFormat.day.start(new Date(), true).value
  );
  const [dateEnd, setDateEnd] = useValueHandler(
    () => DateFormat.day.end(new Date(), true).value
  );
  const [sucursales, setSucursales] = useState<DropdownOptions<number>[]>();

  const showClients = useMemo(() => {
    // Validations to show clients
    return isMaster;
  }, [isMaster]);

  const showSucursales = useMemo(() => {
    // Validations to show sucursales, only show if client has (admin or client)
    if (!sucursales) return false;
    return sucursales.length >= 1;
  }, [sucursales]);

  const getFiltersLg = useMemo(() => {
    // Validations to show sucursales, only show if client has (admin or client)
    if (!isMaster) {
      return showSucursales ? 6 : 5
    }
    return showSucursales ? 7 : 6
  }, [isMaster,showSucursales]);

  //const [showSucursales, setShowSucursales] = useState(false);

  useEffect(() => {
    if (!isMaster){
      loadSucursales(Number(filters.idagep_empresa), user.persona.idagep_usuarios);
    }
  }, []);

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
    setIsWs(false);
    onRefresh({
      tipo: "all",
      tipoTransaccion: "all",
      fechaInicio,
      fechaFin,
    });
  };

  const onChangeClients = async (e: CustomMultiSelectChangeEvent) => {
    const idagep_empresas: number[] = e.value;
    onRefresh({
      tipo: "all",
      tipoTransaccion: "all",
      idagep_empresa: idagep_empresas.join(', '),
      clients: idagep_empresas,
      idagep_sucursal: 0,
    });
    setIsWs(false);
    if (idagep_empresas.length === 1) {
      loadSucursales(idagep_empresas[0], user.persona.idagep_usuarios);
    }else{
      setSucursales([]);
    }
  };

  const loadSucursales = async (idagep_empresa: number, idagep_usuarios: number) => {
    const res = await CatControllers.sucursales({
      idagep_empresas: idagep_empresa,
      idagep_usuarios: idagep_usuarios,
    });

    //nuevas sucursales
    if (res && res.response && res.response) {
      const newSucursalesOption: DropdownOptions<number>[] = res.response.map(
        (item) => ({
          label: item.nombre,
          value: item.idagep_sucursal,
        })
      );
      if (newSucursalesOption.length>=2){
        newSucursalesOption.unshift({label:"Todas",value:0});
      }
      setSucursales(newSucursalesOption);
    }
  }

  const onChangeSucursal = (e: CustomDropdownChangeEvent) => {
    onRefresh({
      idagep_sucursal: +e.value,
      sucursal: Number(e.value),
    });
    setIsWs(false);
  };

  const onChangeTipoTrasaccion = (e: CustomDropdownChangeEvent) => {
    onRefresh({
      tipoTransaccion: e.value,
    });
    setIsWs(false);
  };

  const onChangeTipo = (e: CustomDropdownChangeEvent) => {
    onRefresh({
      tipo: e.value,
    });
    setIsWs(false);
  };

  return (
    <section className="container-header">
      <KpiContainer title="Transacciones">
        <KpiItem
          title="Monto total"
          value={useTruncateAmout(kpis.montoTotal)}
          loading={kpis.loader}
        />
        <KpiItem
          title="Comisión total"
          value={useTruncateAmout(kpis.comisionTotal)}
          loading={kpis.loader}
        />
        {isMaster && (
          <KpiItem
            title="Saldo Thunderpay"
            value={useTruncateAmout(kpis.saldoefevoo)}
            loading={kpis.loader}
            tooltip="Es la suma del monto total transaccionado menos las comisiones por servicio."
          />
        )}
      </KpiContainer>

      <FiltersContainer lg={getFiltersLg}>
        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <Calendar
              placeholder="Inicio"
              className="myCalendarButton w-full"
              onChange={onChangeCalendar(1)}
              value={dateStart()}
              disabled={loader}
              maxDate={date}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem>
            <Calendar
              placeholder="Final"
              className="myCalendarButton w-full"
              onChange={onChangeCalendar(2)}
              value={dateEnd()}
              disabled={loader}
              maxDate={date}
            />
          </FormItem>
        </FiltersItem>

        {showClients && (
          <>
            <FiltersItem>
              <FormItem label="Clientes">
                <CatClientesMultiSelect
                  disabled={loader}
                  display="comma"
                  filter
                  resetFilterOnHide
                  selectedItemsLabel={`${filters.clients?.length} clientes seleccionados`}
                  maxSelectedLabels={2}
                  value={filters.clients}
                  onChange={onChangeClients}
                  className="w-full"
                />
              </FormItem>
            </FiltersItem>
          </>
        )}
        {showSucursales && (
          <FiltersItem>
            <FormItem label="Sucursal">
              <Dropdown
                className="w-full"
                value={filters.sucursal}
                onChange={onChangeSucursal}
                placeholder="Seleccionar"
                options={sucursales}
                disabled={loader}
              />
            </FormItem>
          </FiltersItem>
        )}
        <FiltersItem>
          <FormItem label="Tipo de transacción">
            <Dropdown
              value={filters.tipoTransaccion}
              onChange={onChangeTipoTrasaccion}
              placeholder="Seleccionar"
              options={TRANSACTION_TYPE_TRANSACTION_OPTIONS}
              disabled={loader}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Producto">
            <Dropdown
              value={filters.tipo}
              onChange={onChangeTipo}
              placeholder="Seleccionar"
              options={TRANSACTION_PRODUCT_OPTIONS_ALL}
              disabled={loader}
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
            <ExcelExportButton
              filters={filters}
              isMaster={isMaster}
              disabled={transactions.length == 0}
            />
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
