import { ChangeEvent, SetStateAction, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import LeadsInputText from "@app/components/Inputs/LeadsInputText";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "@app/components/FormManager/FormItem";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";

import { ESTATUS_EXPEDIENTE } from "@app/types/Clients";
import { DossiersAllKpis, DossiersFilters, PERSONA } from "@app/types/Dossiers";
import { EXPEDIENTE_ESTATUS_ALL, PERSONA_ALL } from "@app/constants/form";

interface ExpedienteHeaderProps {
  loader: boolean;
  data: DossiersAllKpis | null;
  onRefresh: (body: SetStateAction<Partial<DossiersFilters>>) => void;
}

export function ExpedienteHeader({
  loader,
  data,
  onRefresh,
}: ExpedienteHeaderProps) {
  const [expediente, setExpediente] = useState<ESTATUS_EXPEDIENTE | "">("");
  const [persona, setPersona] = useState<PERSONA | "">("");

  const onExpedienteChange = (e: DropdownChangeEvent) => {
    const value = e.target.value;
    setExpediente(value);
    onRefresh({ cumplimiento: value });
  };

  const onPersonaChange = (e: DropdownChangeEvent) => {
    const value = e.target.value;
    setPersona(value);
    onRefresh({ persona: value });
  };

  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onRefresh({ empresafiltro: value });
  };

  return (
    <section className="container-header">
      <KpiContainer title="Expediente">
        <KpiItem
          title="Total de clientes"
          value={data?.TotalClientes ?? 0}
          loading={loader}
        />
        <KpiItem
          title="Clientes pendientes"
          value={data?.Pendientes ?? 0}
          loading={loader}
        />
        <KpiItem
          title="Clientes por validar"
          value={data?.Validar ?? 0}
          loading={loader}
        />
        <KpiItem
          title="Clientes terminados"
          value={data?.Terminados ?? 0}
          loading={loader}
        />
      </KpiContainer>

      <FiltersContainer md={4} lg={5} xl={6}>
        <FiltersItem className="md:col-span-2">
          <FormItem>
            <span className="p-input-icon-right w-full">
              <LeadsInputText
                className="w-full !h-12 !rounded-[10px]"
                delayOnChange={700}
                disabled={loader}
                placeholder="Buscar cliente"
                onChange={onFilter}
              />
              <i className="pi pi-search"  style={{top:"50% !important"}}/>
            </span>
          </FormItem>
        </FiltersItem>

        <FiltersItem className="col-span-1">
          <FormItem label="Estado">
            <Dropdown
              className="w-full"
              disabled={loader}
              options={EXPEDIENTE_ESTATUS_ALL}
              placeholder="Seleccionar"
              value={expediente}
              onChange={onExpedienteChange}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem className="col-span-1">
          <FormItem label="Persona">
            <Dropdown
              className="w-full"
              disabled={loader}
              options={PERSONA_ALL}
              placeholder="Seleccionar"
              value={persona}
              onChange={onPersonaChange}
            />
          </FormItem>
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
