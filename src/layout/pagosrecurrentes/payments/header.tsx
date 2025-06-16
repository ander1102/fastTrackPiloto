import { ChangeEvent } from "react";
import { FormItem } from "@app/components/FormManager/FormItem";
import { KpiContainer } from "@app/components/ViewKpis";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import InputSearch from "@app/components/InputSearch";
import { SetStateAction } from "react";
import { PagosRecurrentesPaymentsAllBody } from "@app/types/PagosRecurrentes";
import { ButtonNewSecundary } from "@app/components/Buttons";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import { RECURRENCIA_NOMBRE } from "@app/constants/pagosRecurrentes";
interface HeaderProps {
  isAdmin: boolean;
  onRefresh: (
    body: SetStateAction<Partial<PagosRecurrentesPaymentsAllBody>>
  ) => void;
  filters: PagosRecurrentesPaymentsAllBody;
}

export default function Header({ onRefresh, filters, isAdmin }: HeaderProps) {
  const router = useRouter();
  return (
    <section className="container-header">
      <KpiContainer title="Pagos Recurrentes"></KpiContainer>

      <FiltersContainer>
        <FiltersItem slg={2}>
          <FormItem>
            <InputSearch
              placeholder="Buscar por nombre"
              className="w-full"
              delayOnChange={700}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onRefresh({ filtroNombre: e.target.value });
              }}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem slg={2}>
          <FormItem label="Recurrencia">
            <Dropdown
              value={filters.filtroRecurrencia}
              className="w-full"
              options={RECURRENCIA_NOMBRE}
              placeholder="Seleccionar"
              name="recurrencia"
              onChange={(e) => onRefresh({ filtroRecurrencia: e.target.value })}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem slg={2}>
          {!isAdmin && (
            <ButtonNewSecundary
              label="Nuevo Pago Recurrente"
              onClick={() => router.push("/dashboard/pagosrecurrentes/nuevo")}
            />
          )}
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
