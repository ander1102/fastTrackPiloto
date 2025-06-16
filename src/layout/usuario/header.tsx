import { ChangeEvent, useState } from "react";
import {  USER_FILTER_OPTIONS } from "@app/constants/form";
import { PermissionProps } from "@app/types/User";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FormItem } from "@app/components/FormManager/FormItem";
import { useRouter } from "next/router";
import { SetFilter } from "@app/hooks/useCall";
import { Users } from "@app/types/UsersList";
import { clearString } from "@app/common/format";
import { KpiContainer } from "@app/components/ViewKpis";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import InputSearch from "@app/components/InputSearch";
import { ButtonNew } from "@app/components/Buttons";

interface UsuariosHeaderProps extends PermissionProps {
  setFilter: SetFilter<Users[]>;
}

export default function UsuariosHeader({
  permission,
  setFilter,
}: UsuariosHeaderProps) {
  const [rol, setRol] = useState<string>("all");
  const [estatus, setEstatus] = useState<number | null>(null);
  const router = useRouter();

  const onRolFilter = (e: DropdownChangeEvent) => {
    const value = e.value as string;
    setRol(value);
    setFilter(
      2,
      (item) =>
        value === "all"
          ? item
          : item.filter(
              (x) => String(x.rol).toLowerCase() === value.toLowerCase()
            ),
      value.toLowerCase()
    );
  };

  const onNameFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(
      1,
      (item) =>
        item.filter((x) =>
          clearString(x.nombre).toLowerCase().includes(value.toLowerCase())
        ),
      clearString(value).toLowerCase()
    );
  };

  const onEstatusFilter = (e: DropdownChangeEvent) => {
    const value = e.value as any;
    setEstatus(value);
    setFilter(
      3,
      (item) =>
        value === 'all' ? item : item.filter((x) => x.estatusUsuario === value),
      value
    );
  };

  const OPTIONS = [
    {
      label: "Habilitado",
      value: "Habilitado",
    },
    {
      label: "Inactivo",
      value: "Inactivo",
    },
    {
      label: "Todos",
      value: "all",
    }
  ]

  return (
    <section className="container-header">
      <KpiContainer title="Usuarios"></KpiContainer>

      <FiltersContainer>
        <FiltersItem slg={2}>
          <FormItem>
            <InputSearch
              placeholder="Buscar por nombre"
              onChange={onNameFilter}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Rol">
            <Dropdown
              options={USER_FILTER_OPTIONS}
              value={rol}
              onChange={onRolFilter}
              placeholder="Seleccionar"
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Estado">
            <Dropdown
              options={OPTIONS}
              value={estatus}
              onChange={onEstatusFilter}
              placeholder="Seleccionar"
              className="w-full"
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem></FiltersItem>

        <FiltersItem>
          {permission.create && (
            <ButtonNew
              onClick={() => router.push(`/dashboard/usuarios/newuser`)}
              label="Nuevo usuario"
              style={{marginBottom: 0}}
            />
          )}
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
