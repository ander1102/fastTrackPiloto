import { TRANSACTION_CARD_OPERATION_DISPLAYS } from "@app/constants/card";
import { FormItem } from "@app/components/FormManager/FormItem";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { forwardRef, useContext, useEffect, useMemo, useRef } from "react";
import { CardTransactionsContext, ICardTransactionsContext } from "./context";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import {
  CardInfoRequestResponseCard,
  CardCreditResponseCredit,
} from "@app/types/Card";

const CURRENCY_LOCAL_FORMAT = new Intl.NumberFormat("en-MX", {
  style: "currency",
  currency: "USD",
});

interface CardSectionTwoHeaderProps {
  card?: CardInfoRequestResponseCard;
  credit?: CardCreditResponseCredit;
  onFilter?: (filter: ICardTransactionsContext) => void;
}

const CardSectionTwoHeader = forwardRef<
  HTMLDivElement,
  CardSectionTwoHeaderProps
>(({ card, credit, onFilter }, ref) => {
  const { filter, onChange } = useContext(CardTransactionsContext);

  useEffect(() => {
    onFilter && onFilter(filter);
  }, [filter]);

  const availableCredit = useMemo(() => {
    return (credit?.credit_limit as number) ?? 0;
  }, [credit]);

  return (
    <div ref={ref}>
      <section>
        <h3 className="text-lg color-grey-1">Crédito disponible</h3>
        <h2 className="text-2xl text-black-1 mb-3">
          {CURRENCY_LOCAL_FORMAT.format((availableCredit as number) ?? 0)}
        </h2>
        <h4 className="text-lg color-grey-1">
          Saldo utilizado
          <span className="ml-1">
            {CURRENCY_LOCAL_FORMAT.format((card?.credit_used as number) ?? 0)}
          </span>
        </h4>
      </section>
      <section className="my-3">
        <FiltersContainer lg={3}>
          <FiltersItem>
            <FormItem label="Operaciones">
              <Dropdown
                value={filter.operation}
                onChange={(e) => onChange("operation", e.value)}
                options={TRANSACTION_CARD_OPERATION_DISPLAYS}
                placeholder="Mostrar todo"
              />
            </FormItem>
          </FiltersItem>
          <FiltersItem>
            <FormItem label="Fecha desde:">
              <Calendar
                value={filter.fechaEnt}
                onChange={(e) => onChange("fechaEnt", e.value as Date)}
                showIcon
                iconPos="right"
                placeholder="Desde"
                className="myCalendarButton w-full"
                readOnlyInput
                maxDate={new Date()}
                dateFormat="dd/mm/yy"
              />
            </FormItem>
          </FiltersItem>
          <FiltersItem>
            <FormItem label="Fecha hasta:">
              <Calendar
                value={filter.fechaFin}
                onChange={(e) => onChange("fechaFin", e.value as Date)}
                showIcon
                iconPos="right"
                placeholder="Hasta"
                maxDate={new Date()}
                minDate={
                  filter.fechaEnt ? new Date(filter.fechaEnt) : undefined
                }
                className="myCalendarButton"
                readOnlyInput
                dateFormat="dd/mm/yy"
              />
            </FormItem>
          </FiltersItem>
        </FiltersContainer>
      </section>
    </div>
  );
});

export default CardSectionTwoHeader;
