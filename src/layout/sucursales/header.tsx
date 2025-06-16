import { ChangeEvent, SetStateAction } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { PermissionProps } from "@app/types/User";
import { DataTableQuery } from "@app/types";
import { SubsidiaryQuery } from "@app/types/Subsidiary";
import { KpiItem, KpiContainer } from "@app/components/ViewKpis";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import InputSearch from "@app/components/InputSearch";
import { ButtonNewSecundary } from "@app/components/Buttons";

interface SucursalesHeaderProps extends PermissionProps {
  onRefresh: (body: SetStateAction<Partial<SubsidiaryQuery>>) => void;
  query: DataTableQuery;
}

export default function SucursalesHeader({
  permission,
  onRefresh,
  query,
}: SucursalesHeaderProps) {
  const router = useRouter();

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onRefresh((prev) => ({
      idagep_sucursal: isNaN(Number(value))
        ? prev.idagep_sucursal
        : Number(value),
      nomSucursal: value,
    }));
  };

  return (
    <section className="container-header">
      <KpiContainer title="Sucursales">
        <KpiItem title="Total de sucursales" value={query.totalRecords} />
      </KpiContainer>
      <FiltersContainer>
        <FiltersItem slg={2}> 
          <InputSearch
            placeholder="Buscar por ID o sucursal"
            onChange={onSearch}
          />
        </FiltersItem>
        <FiltersItem slg={3}></FiltersItem>
        <FiltersItem > 
        {permission.create && (
          <ButtonNewSecundary
            onClick={() => router.push("/dashboard/sucursales/new")}
            label="Nueva sucursal"
            />
            
        )}
        </FiltersItem>
      </FiltersContainer>

    </section>
  );
}
