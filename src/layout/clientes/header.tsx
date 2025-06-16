import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { ButtonNewSecundary } from "@app/components/Buttons";
import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import { CatClientesMultiSelect } from "@app/components/Dropdowns";
import { ClientesTableHeader } from "./templates";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "@app/components/FormManager/FormItem";
import ClientTypeModal from "./modals/clientType";
import { modalManager } from "@app/components/ModalComponent";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";

import {
  ClientsAllKpis,
  ClientsFilters,
  ESTATUS_EXPEDIENTE,
  ESTATUS_TYPE,
  ORIGEN_CLIENT_TYPE,
} from "@app/types/Clients";
import { PermissionProps } from "@app/types/User";
import useValueHandler from "@app/hooks/useValueHandler";
import { DateFormat } from "@app/common/format";
import { ESTATUS, EXPEDIENTE_ESTATUS } from "@app/constants/form";
import { ORIGEN_OPTIONS } from "@app/constants/client";
import { CLIENTS_CONTEXT } from "@app/pages/dashboard/clientes";

const date = new Date();

interface ClientesHeaderProps extends PermissionProps {
  filters: ClientsFilters;
  kpis: ClientsAllKpis;
  loader: boolean;
  onRefresh: (body: SetStateAction<Partial<ClientsFilters>>) => void;
}

export function ClientesHeader({
  permission,
  filters,
  kpis,
  loader,
  onRefresh,
}: ClientesHeaderProps) {
  const router = useRouter();
  const [clientes, setClientes] = useState<number[]>([]);
  const [estatus, setEstatus] = useState<ESTATUS_TYPE[]>([]);
  const [expediente, setExpediente] = useState<ESTATUS_EXPEDIENTE[]>([]);
  const [origen, setOrigen] = useState<ORIGEN_CLIENT_TYPE[]>([]);

  const [dateStart, setDateStart] = useValueHandler<Date>(
    () => DateFormat.month.start(new Date(), true).value
  );
  const [dateEnd, setDateEnd] = useValueHandler(
    () => DateFormat.day.end(new Date(), true).value
  );

  function onFilterChange<Value>(
    setValue: Dispatch<SetStateAction<Value>>,
    field: "idagep_empresa" | "cumplimiento" | "estatus" | "origen",
    event: MultiSelectChangeEvent
  ) {
    const value = event.value;
    setValue(value);
    onRefresh({ [field]: value.join(",") });
  }

  const onNewClient = async () => {
    const type = await modalManager.show(
      ClientTypeModal,
      { title: "Nuevo cliente" },
      CLIENTS_CONTEXT
    );
    if (type === undefined) return;
    router.push(`/dashboard/clientes/newclient?type=${type}`);
  };

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

  return (
    <section className="container-header">
      <KpiContainer title="Clientes">
        {kpisContent.map((content) => (
          <KpiItem
            key={content.key}
            estatus={content.title}
            loading={loader}
            title={content.title}
            tooltip={content.tooltip}
            value={kpis[content.key]}
          />
        ))}
      </KpiContainer>

      <FiltersContainer className="mb-5" sm={2} md={2} lg={4} xxl={5}>
        <FiltersItem ssm={2}>
          <FormItem
            childrenClassName="flex gap-3 flex-col sm:flex-row"
            label="Periodo de creación"
          >
            <Calendar
              className="w-full"
              disabled={loader}
              maxDate={date}
              placeholder="Inicio"
              value={dateStart()}
              onChange={onChangeCalendar(1)}
            />
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

        <FiltersItem ssm={2} slg={2} sxxl={3}>
          {permission.create && (
            <ButtonNewSecundary
              disabled={loader}
              label="Nuevo cliente"
              style={{ marginBottom: 0 }}
              onClick={onNewClient}
            />
          )}

          <ClientesTableHeader
            isMaster={true}
            loading={loader}
            params={{ ...filters }}
          />
        </FiltersItem>
      </FiltersContainer>

      <FiltersContainer sm={2} md={2} lg={4} xxl={5}>
        <FiltersItem>
          <FormItem label="Clientes">
            <CatClientesMultiSelect
              className="w-full"
              filter
              disabled={loader}
              maxSelectedLabels={2}
              placeholder="Seleccionar"
              selectedItemsLabel={`${clientes.length} clientes seleccionados`}
              value={clientes}
              onChange={(e) => onFilterChange(setClientes, "idagep_empresa", e)}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Estado">
            <MultiSelect
              className="w-full"
              disabled={loader}
              maxSelectedLabels={2}
              options={ESTATUS}
              placeholder="Seleccionar"
              selectedItemsLabel={
                estatus.length === ESTATUS.length
                  ? "Todos"
                  : `${estatus.length} estados seleccionados`
              }
              value={estatus}
              onChange={(e) => onFilterChange(setEstatus, "estatus", e)}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Expediente">
            <MultiSelect
              className="w-full"
              disabled={loader}
              maxSelectedLabels={2}
              options={EXPEDIENTE_ESTATUS}
              placeholder="Seleccionar"
              selectedItemsLabel={
                expediente.length === EXPEDIENTE_ESTATUS.length
                  ? "Todos"
                  : `${expediente.length} estados seleccionados`
              }
              value={expediente}
              onChange={(e) => onFilterChange(setExpediente, "cumplimiento", e)}
            />
          </FormItem>
        </FiltersItem>

        {/* <FiltersItem>
          <FormItem label="Origen del cliente">
            <MultiSelect
              className="w-full"
              disabled={loader}
              maxSelectedLabels={2}
              options={ORIGEN_OPTIONS}
              placeholder="Seleccionar"
              selectedItemsLabel={
                origen.length === ORIGEN_OPTIONS.length
                  ? "Todos"
                  : `${origen.length} orígenes seleccionados`
              }
              value={origen}
              onChange={(e) => onFilterChange(setOrigen, "origen", e)}
            />
          </FormItem>
        </FiltersItem> */}
      </FiltersContainer>
    </section>
  );
}

interface KpiContent {
  key: keyof ClientsAllKpis;
  title: string;
  tooltip?: string;
}
const kpisContent: KpiContent[] = [
  {
    key: "TotalClientes",
    title: "Total de clientes",
  },
  {
    key: "Activo",
    title: "Estado activo",
    tooltip: "Clientes que han transaccionado durante los últimos dos días.",
  },
  {
    key: "sin_movimiento",
    title: "Estado sin movimientos",
    tooltip: "Clientes que no han transaccionado en 3 días o más.",
  },
  {
    key: "Inactivo",
    title: "Estado inactivo",
    tooltip: "Clientes que no han transaccionado en más de 30 días.",
  },
  {
    key: "Deshabilitado",
    title: "Estado deshabilitado",
    tooltip: "Clientes que han sido dados de baja.",
  },
];
