import { useState } from "react";
import Grid from "@app/components/Grid";
import { Calendar } from "primereact/calendar";
import { FormItem } from "@app/components/FormManager/FormItem";
import { ButtonPrimary } from "@app/components/Buttons";
import { Checkbox } from "primereact/checkbox";
import { Client, ClientFinance } from "@app/types/Clients";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { ClientsControllers } from "@app/logic/backend/clients";
import useEffectAsync from "@app/hooks/useEffectAsync";
export interface FinanceTabType {
  client: Client;
  finances: ClientFinance;
  onClickFinance: (start: Date, end: Date) => void;
  onChangeFinaceCheck: (status: number) => void;
}
export default function FinanceTab({
  client,
  finances,
  onClickFinance,
  onChangeFinaceCheck,
}: FinanceTabType) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffectAsync(async () => {
    ClientsControllers.getCheck({
      idagep_empresa: client.idagep_empresa,
    }).then((response) => {
      setCheckboxValue(Boolean(response.response.estatus));
    });
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-2xl text-primary mb-2 font-medium">Finanzas</h3>
      <Grid sm={1} md={1} lg={2} gap={5}>
        <Grid.Item>
          <h3 className="text-lg mb-5 font-medium">
            Saldo de Efevoo Pay a liquidar
          </h3>
          <div className="flex items-center my-5">
            <Checkbox
              onChange={async ({ checked }) => {
                setCheckboxValue(Boolean(checked));

                await onChangeFinaceCheck(checked ? 1 : 0);
              }}
              checked={checkboxValue}
            />
            <div className="ml-5">
              <p className="text-sm font-semibold">
                Dentro del reporte de clientes
              </p>
              <p className="text-sm max-w-sm">
                Incluir este cliente dentro del reporte excel descargable
                ubicado en módulo de clientes.
              </p>
            </div>
          </div>

          <Grid sm={1} md={1} lg={2} gap={5}>
            <Grid.Item>
              <p className="font-semibold">Concepto</p>
            </Grid.Item>
            <Grid.Item>
              <p className="font-semibold">Total</p>
            </Grid.Item>

            <Grid.Item>
              <p>Monto transaccionado</p>
            </Grid.Item>
            <Grid.Item>
              <p>{useTruncateAmout(finances.monto)}</p>
            </Grid.Item>

            <Grid.Item>
              <p>Comisiones generadas</p>
            </Grid.Item>
            <Grid.Item>
              <p>{useTruncateAmout(finances.comision)}</p>
            </Grid.Item>

            <Grid.Item>
              <p>Tasas aplicadas</p>
            </Grid.Item>
            <Grid.Item>
              <p>{useTruncateAmout(finances.tasa)}</p>
            </Grid.Item>

            <Grid.Item>
              <p className="font-semibold">Utilidad generada</p>
            </Grid.Item>
            <Grid.Item>
              <p>{useTruncateAmout(finances.utilidad)}</p>
            </Grid.Item>

            <Grid.Item>
              <p>Saldo Thunderpay liquidado</p>
            </Grid.Item>
            <Grid.Item>
              <p>{useTruncateAmout(finances.saldoefevoo)}</p>
            </Grid.Item>

            <Grid.Item>
              <p>Fondo de reserva</p>
            </Grid.Item>
            <Grid.Item>
              <p>{useTruncateAmout(finances.reserva)}</p>
            </Grid.Item>
          </Grid>
        </Grid.Item>

        <Grid.Item>
          <h3 className="text-lg mb-5 font-medium">Reporte financiero</h3>
          <Grid sm={1} md={1} lg={2} gap={3}>
            <FormItem label="Periodo de reporte">
              <Calendar
                placeholder="Fecha inicio"
                value={startDate}
                onChange={({ value }) => {
                  setStartDate(new Date(value as Date));
                }}
                className="myCalendarButton w-full"
                showIcon
                showButtonBar
                readOnlyInput
                maxDate={new Date()}
              />
            </FormItem>

            <FormItem className="self-end">
              <Calendar
                placeholder="Fecha final"
                value={endDate}
                onChange={({ value }) => {
                  setEndDate(new Date(value as Date));
                }}
                className="myCalendarButton w-full"
                showIcon
                showButtonBar
                readOnlyInput
                minDate={startDate}
                maxDate={new Date()}
              />
            </FormItem>
          </Grid>
        </Grid.Item>
      </Grid>
      <div className="mt-10">
        <ButtonPrimary
          disabled={!startDate || !endDate}
          loading={loading}
          label="Generar reporte"
          onClick={async () => {
            setLoading(true);
            if (startDate && endDate) {
              await onClickFinance(startDate, endDate);
              setTimeout(() => {
                setLoading(false);
              }, 500);
            }
          }}
        />
      </div>
    </div>
  );
}
