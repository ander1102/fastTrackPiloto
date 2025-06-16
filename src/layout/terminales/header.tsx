import { ChangeEvent, SetStateAction, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "@app/components/FormManager/FormItem";
import InputSearch from "@app/components/InputSearch";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";

import { TerminalFilters, TerminalTotal } from "@app/types/Terminal";
import { TERMINAL_SUCURSAL_ESTATUS } from "@app/constants/form";

interface TerminalesHeaderProps {
  loader: boolean;
  kpis: TerminalTotal | null;
  onRefresh: (body: SetStateAction<Partial<TerminalFilters>>) => void;
}

export function TerminalesHeader({
  loader,
  kpis,
  onRefresh,
}: TerminalesHeaderProps) {
  const [estatus, setStatus] = useState("");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onRefresh({
      filtro: value,
    });
  };

  const onEstatusChange = (e: DropdownChangeEvent) => {
    if (estatus === e.value) return;
    setStatus(e.value);
    onRefresh({
      terminalesDisp: e.value,
    });
  };

  return (
    <section className="container-header">
      <KpiContainer title="Terminales">
        <KpiItem
          loading={loader}
          title="Total de terminales:"
          value={kpis?.total ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales asignadas:"
          value={kpis?.totalAssign ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales SMART asignadas"
          value={kpis?.totalAssignD20 ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales PRO asignadas"
          value={kpis?.totalAssignD30 ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales MINI asignadas"
          value={kpis?.totalAssignQPSMini ?? 0}
        />
      </KpiContainer>

      <FiltersContainer lg={4} xl={6}>
        <FiltersItem smd={2}>
          <FormItem label="ID, Sucursal o Modelo">
            <InputSearch placeholder="Buscar" onChange={onSearch} />
          </FormItem>
        </FiltersItem>
        <FiltersItem>
          <FormItem label="Estado">
            <Dropdown
              className="w-full"
              options={TERMINAL_SUCURSAL_ESTATUS}
              placeholder="Seleccionar"
              value={estatus}
              onChange={onEstatusChange}
            />
          </FormItem>
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
