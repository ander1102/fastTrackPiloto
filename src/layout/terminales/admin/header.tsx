import { useRouter } from "next/router";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ButtonNewSecundary } from "@app/components/Buttons";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "@app/components/FormManager/FormItem";
import InputSearch from "@app/components/InputSearch";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";

import { TerminalFilters, TerminalTotal } from "@app/types/Terminal";
import { PermissionProps } from "@app/types/User";
import { TERMINAL_ESTADO, TERMINAL_ESTATUS } from "@app/constants/form";
import { InputText } from "primereact/inputtext";

interface TerminalesHeaderProps extends PermissionProps {
  kpis: TerminalTotal | null;
  loader: boolean;
  onRefresh: (body: SetStateAction<Partial<TerminalFilters>>) => void;
}

export function TerminalesHeaderAdmin({
  permission,
  kpis,
  loader,
  onRefresh,
}: TerminalesHeaderProps) {
  const router = useRouter();
  const [estatus, setEstatus] = useState("");
  const [search, setSearch] = useState("");
  const [operativa, setOperativa] = useState("");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onRefresh({
      filtro: value,
    });
  };

  const onEstatusChange = (e: DropdownChangeEvent) => {
    setEstatus(e.value);
    onRefresh({
      estatus: e.value,
    });
  };

  const onOperativaChange = (e: DropdownChangeEvent) => {
    setOperativa(e.value);
    onRefresh({
      terminalesDisp: e.value,
    });
  };

  return (
    <section className="container-header">
      <KpiContainer title="Terminales">
        <KpiItem
          loading={loader}
          title="Total de terminales"
          value={kpis?.total ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales asignadas"
          value={kpis?.totalAssign ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales PRO asignadas"
          value={kpis?.totalAssignD30 ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales SMART asignadas"
          value={kpis?.totalAssignD20 ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales MINI asignadas"
          value={kpis?.totalAssignQPSMini ?? 0}
        />
      </KpiContainer>

      <KpiContainer itemsContainerClassName="lg:ml-[170px]">
        <KpiItem
          loading={loader}
          className="invisible hidden md:block lg:hidden xl:block"
          title=""
          value=""
        />
        <KpiItem
          loading={loader}
          title="Terminales disponibles"
          value={kpis?.totalAvailable ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales PRO disponibles"
          value={kpis?.totalAvailableD30 ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales SMART disponibles"
          value={kpis?.totalAvailableD20 ?? 0}
        />
        <KpiItem
          loading={loader}
          title="Terminales MINI disponibles"
          value={kpis?.totalAvailableQPSMini ?? 0}
        />
      </KpiContainer>

      <FiltersContainer sm={2} md={4} lg={4} xl={6}>
        <FiltersItem ssm={2}>
          <FormItem label="Cliente, Modelo o No. Serie">
            <div className="p-input-search p-input-icon-right">
            <InputText
              placeholder="Buscar"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  onRefresh({ filtro: search });
                }
              }}
            />
            <i className="pi pi-search" style={{cursor: 'pointer'}} onClick={() => onRefresh({filtro: search})}/>
          </div>
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Operativa">
            <Dropdown
              className="w-full"
              options={TERMINAL_ESTATUS}
              placeholder="Seleccionar"
              value={operativa}
              onChange={onOperativaChange}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Estado">
            <Dropdown
              className="w-full"
              options={TERMINAL_ESTADO}
              placeholder="Seleccionar"
              value={estatus}
              onChange={onEstatusChange}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem ssm={2} smd={4} sxl={2}>
          {permission.create && (
            <ButtonNewSecundary
              label="Nueva terminal"
              style={{ marginBottom: "0" }}
              onClick={() => router.push("/dashboard/terminales/admin/new")}
            />
          )}
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
