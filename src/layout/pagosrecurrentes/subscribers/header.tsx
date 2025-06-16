import { ChangeEvent } from "react";
import { FormItem } from "@app/components/FormManager/FormItem";
import { KpiContainer } from "@app/components/ViewKpis";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import InputSearch from "@app/components/InputSearch";
import { SetStateAction } from "react";
import {
  PagosRecurrentesPaymentsReadResponsePagosRecurrentes,
  PagosRecurrentesSubscribersAllBody,
} from "@app/types/PagosRecurrentes";
import { Button } from "@app/components/Buttons";
import { ESTATUS_TYPES } from "@app/types/PagosRecurrentes";
interface HeaderProps {
  itemReadPayment: PagosRecurrentesPaymentsReadResponsePagosRecurrentes | null;
  onRefresh: (
    body: SetStateAction<Partial<PagosRecurrentesSubscribersAllBody>>
  ) => void;
  onShowQuestionRemovePayment: () => void;
}

export default function Header({
  itemReadPayment,
  onRefresh,
  onShowQuestionRemovePayment,
}: HeaderProps) {
  return (
    <section className="container-header">
      <KpiContainer title="Detalle de Suscriptores" back></KpiContainer>

      <FiltersContainer>
        <FiltersItem slg={2}>
          <FormItem>
            <InputSearch
              placeholder="Buscar por nombre"
              className="w-full"
              delayOnChange={700}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onRefresh({ filtroSuscriptor: e.target.value });
              }}
            />
          </FormItem>
        </FiltersItem>
        <FiltersItem slg={2}>
          <FormItem>
            <InputSearch
              placeholder="Buscar por número de celular"
              className="w-full"
              delayOnChange={700}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onRefresh({ filtroTelefono: e.target.value });
              }}
            />
          </FormItem>
        </FiltersItem>

        {itemReadPayment &&
          itemReadPayment?.estatus == ESTATUS_TYPES.Activo && (
            <FiltersItem slg={2}>
              <Button
              
                className="button-delete !w-auto !h-[48px] !rounded-md"
                label="Eliminar Pago Recurrente"
                onClick={() => onShowQuestionRemovePayment()}
              />
            </FiltersItem>
          )}
      </FiltersContainer>
    </section>
  );
}
