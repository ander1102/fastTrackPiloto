import { useState, useRef,  } from "react";
import { Calendar,  } from "@app/components/Calendar";
import { FormItem } from "@app/components/FormManager/FormItem";
import { DateFormat } from "@app/common/format";

import { modalManager } from "@app/components/ModalComponent";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { ButtonNew } from "@app/components/Buttons";
import { useRouter } from "next/router";
import ClientTypeModal from "@app/layout/clientes/modals/clientType";
import { Dropdown } from "primereact/dropdown";
import { ESTATUS_REFERIDOS } from "@app/constants/form";
const CLIENTS_CONTEXT = "dashboard/ventas/clientesreferidos";
import { ClientReferralsAllParams } from "@app/types/ClientsReferrals";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import {  SetStateAction } from "react";

interface HeaderProps {
  onRefresh: (body: SetStateAction<Partial<ClientReferralsAllParams>>) => void;
  historic?: boolean;
  loader: boolean;
  filters: ClientReferralsAllParams;
  kpis: any;
}

export default function Header({
  loader,
  onRefresh,
  filters,
  kpis,
}: HeaderProps) {
  const DropDownRef = useRef<Dropdown>(null);
  const router = useRouter();
  const [fechaInicio, setFechaInicio] = useState<any>("");
  const [fechaFin, setFechaFin] = useState<any>("");

  const onNewClient = async () => {
    const type = await modalManager.show(
      ClientTypeModal,
      { title: "Nuevo Cliente Referidos" },
      CLIENTS_CONTEXT
    );
    if (type === undefined) return;
    router.push(`/dashboard/ventas/clientesreferidos/nuevo?type=${type}`);
  };

  return (
    <section className="container-header">
      <KpiContainer title="Clientes Referidos">
        <KpiItem
          loading={loader}
          title="Clientes Referidos Totales"
          value={kpis?.clientesR ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Monto Transaccionado Total"
          value={useTruncateAmout(kpis?.montoTotal ?? 0)}
        />
        <KpiItem
          loading={loader}
          title="Comisiones Totales Generadas"
          value={useTruncateAmout(kpis?.comisionTotal ?? 0)}
        />
      </KpiContainer>

      <FiltersContainer >

        <FiltersItem slg={2} className="hidden sm:block">
        
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <Calendar
                placeholder="Inicio"
                className="myCalendarButton w-full"
                onChange={({ value }) => {
                  const date = value as Date;
                  setFechaInicio(date);
                  onRefresh({
                    fechaInicio: DateFormat.day
                      .start(date, true)
                      .toSimpleFormatString(),
                  })
                }}
                value={fechaInicio}
                disabled={loader}
              />
            </span>
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem>
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <Calendar
                placeholder="Final"
                className="myCalendarButton w-full"
                onChange={({ value }) => {
                  const date = value as Date;
                  setFechaFin(date);
                  onRefresh({
                    fechaFin: DateFormat.day
                      .end(date, true)
                      .toSimpleFormatString(),
                  });
                }}
                value={fechaFin}
                disabled={loader}
              />
            </span>
          </FormItem>
        </FiltersItem>
        <FiltersItem>
          <FormItem label="Estatus">
            <Dropdown
              ref={DropDownRef}
              options={ESTATUS_REFERIDOS}
              value={filters.estatus}
              onChange={({ value }) => {
                onRefresh({ estatus: value });
              }}
              placeholder="Selecionar"
              className="w-full"
              style={{ border: "1px solid #B8AFE6", borderRadius: 6 }}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <ButtonNew label="Nuevo Cliente" onClick={onNewClient} />
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
