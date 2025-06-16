import { useEffect, useState } from "react";
import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import { FormItem } from "@app/components/FormManager/FormItem";
import { DateFormat } from "@app/common/format";
import useValueHandler from "@app/hooks/useValueHandler";
import { User } from "@app/types/User";
import { CatClientesMultiSelect } from "@app/components/Dropdowns";
import { DepositGetByDate } from "@app/types/Deposits";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";
import { modalManager } from "@app/components/ModalComponent";
import CreateDeposit from "@app/components/ModalComponent/modals/deposits/CreateDeposit";
import { KpiContainer } from "@app/components/ViewKpis";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { Deposit } from "@app/types/Deposits";
import ExcelExportButton from "./ExcelExportButton";
import { ButtonNewSecundary } from "@app/components/Buttons";
interface DepositsHeaderProps {
  onFilter: (key: number, value: number[]) => void;
  onRefresh: ({}: DepositGetByDate) => void;
  historic?: boolean;
  loader: boolean;
  user: User;
  isAdmin: boolean;
  deposits: Deposit[] | null;
}

export default function DepositsHeader({
  loader,
  onFilter,
  onRefresh,
  user,
  isAdmin,
  deposits,
}: DepositsHeaderProps) {
  const [cliente, setCliente] = useState([]);
  const [dateStart, setDateStart] = useValueHandler<Date>(
    () => DateFormat.month.start(new Date()).value
  );
  const [dateEnd, setDateEnd] = useValueHandler(
    () => DateFormat.month.end(new Date()).value
  );

  useEffect(() => {
    if(cliente.length > 0) onFilter(2, cliente ?? "");
  }, [loader]);

  const onChange = (id: number) => (e: CalendarChangeEvent) => {
    const date = e.value as Date;
    if (id === 1) {
      setDateStart(date);
      onRefresh({
        idagep_empresa: 1,
        fechaInicio: DateFormat.day.start(date, true).toSimpleFormatString(),
        fechaFin: DateFormat.day.end(dateEnd(), true).toSimpleFormatString(),
      });
      return;
    }
    setDateEnd(date);
    onRefresh({
      idagep_empresa: 1,
      fechaInicio: DateFormat.day
        .start(dateStart(), true)
        .toSimpleFormatString(),
      fechaFin: DateFormat.day.end(date, true).toSimpleFormatString(),
    });
  };

  const onChangeClient = (e: CustomDropdownChangeEvent) => {
    const value: any = e.value;
    setCliente(value);
    onFilter(2, value && value.length > 0 ? value : []);
  };
  /*
  const kpiReserveFund = useCall(
    ClientsControllers,
    "getKpiReserveFund",
    () => ({
      initialParams: [Number(id_company)] as [body: number],
    })
  );*/

  const onCustomRefresh = () => {
    onRefresh({
      idagep_empresa: user.idagep_empresa ?? 0,
      fechaInicio: DateFormat.day
        .start(dateStart(), true)
        .toSimpleFormatString(),
      fechaFin: DateFormat.day.end(dateEnd(), true).toSimpleFormatString(),
    });
  };

  const handleDeposito = async () => {
    await modalManager.show(
      CreateDeposit,
      {
        onRefresh: onCustomRefresh,
      },
      "dashboard/depositos"
    );
  };

  return (
    <section className="container-header">
      <KpiContainer title="Depósitos"></KpiContainer>

      <FiltersContainer>
        {isAdmin && (
          <FiltersItem>
            <FormItem label="Cliente">
              <CatClientesMultiSelect
                value={cliente}
                onChange={onChangeClient}
                placeholder="Cliente"
                className="w-full"
                disabled={loader}
              />
            </FormItem>
          </FiltersItem>
        )}

        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <Calendar
                id="icon1"
                placeholder="Inicio"
                className="myCalendarButton w-full"
                onChange={onChange(1)}
                value={dateStart()}
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
                id="icon2"
                placeholder="Final"
                className="myCalendarButton w-full"
                onChange={onChange(2)}
                value={dateEnd()}
                disabled={loader}
              />
            </span>
          </FormItem>
        </FiltersItem>
        <FiltersItem></FiltersItem>
        <FiltersItem slg={isAdmin ? 2 : 3}>
          {isAdmin && (
            <ButtonNewSecundary
              label="Nuevo depósito"
              onClick={handleDeposito}
              style={{marginBottom:0}}
            />
          )}

          <ExcelExportButton
            items={deposits ?? []}
            originalItem={() => deposits}
          />
        </FiltersItem>
      </FiltersContainer>
    </section>
  );
}
