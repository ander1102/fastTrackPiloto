import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { FormItem } from "@app/components/FormManager/FormItem";
import Grid from "@app/components/Grid";
import { InputNumber } from "primereact/inputnumber";
import { ParametersState } from "./useParameters";
import { useMemo } from "react";
import { TimeStringToDate } from "@app/common/date";

interface AlertsBodyProps
  extends Pick<ParametersState, "alertsParameters" | "onChangeAlerts"> {}

export const AlertsBody = ({
  alertsParameters,
  onChangeAlerts,
}: AlertsBodyProps) => {
  const horarioAtipicoEnt: Date = useMemo(
    () => TimeStringToDate(alertsParameters.horarioAtipicoEnt),
    [alertsParameters.horarioAtipicoEnt]
  );
  const horarioAtipicoSalida: Date = useMemo(
    () => TimeStringToDate(alertsParameters.horarioAtipicoSalida),
    [alertsParameters.horarioAtipicoSalida]
  );

  return (
    <div className="grow bg-white p-7">
      <section className="rounded-lg bg-beige py-10 px-8 flex flex-col gap-9">
        <Grid lg={2} sm={1} gap={5}>
          <Grid sm={1} gap={5} className="sm:w-full md:w-[80%] xl:w-[60%]">
            <FormItem
              className="relative"
              label="Ticket Alto"
              info="Se genera una alerta por cualquier transacción mayor al monto
              capturado."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_ticketAlto)}
                onChange={onChangeAlerts("estatus_ticketAlto")}
              />
              <InputNumber
                value={alertsParameters.ticketAlto}
                onChange={onChangeAlerts("ticketAlto")}
                className="md:w-[80%] xl:w-[60%]"
                placeholder="$0.00 MXN"
                mode="currency"
                currency="USD"
              />
            </FormItem>
            <FormItem
              className="relative"
              label="Ticket Cliente Alto"
              info="Se genera una alerta por cualquier transacción que sea mayor al monto capturado en el detalle del cliente como Ticket Alto."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_ticketClienteAlto)}
                onChange={onChangeAlerts("estatus_ticketClienteAlto")}
              />
              <InputNumber
                value={alertsParameters.ticketClienteAlto}
                onChange={onChangeAlerts("ticketClienteAlto")}
                mode="currency"
                currency="USD"
                className="md:w-[80%] xl:w-[60%]"
                placeholder="$0.00 MXN"
              />
            </FormItem>
            <FormItem
              className="relative"
              label="Cargo Duplicado Cliente (Segundos)"
              info="Se genera una alerta por cualquier transacción que sea del mismo monto y misma tarjeta en el periodo de tiempo registrado."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_cargoDuplicado)}
                onChange={onChangeAlerts("estatus_cargoDuplicado")}
              />
              <InputNumber
                onChange={onChangeAlerts("cargoDuplicado")}
                showButtons
                buttonLayout="horizontal"
                step={1}
                placeholder="00"
                decrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                incrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                className="md:w-[80%] xl:w-[60%] borderBlockNone"
                value={alertsParameters.cargoDuplicado}
              />
            </FormItem>

            <FormItem
              className="relative"
              label="Actividad inusual (Días)"
              info="Se genera una alerta por cualquier transacción que se haga después de que el cliente paso ese periodo definido sin actividad."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_actividadInusual)}
                onChange={onChangeAlerts("estatus_actividadInusual")}
              />

              <InputNumber
                onChange={onChangeAlerts("actividadInusual")}
                showButtons
                buttonLayout="horizontal"
                step={1}
                placeholder="00"
                decrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                incrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                className="md:w-[80%] xl:w-[60%] borderBlockNone"
                value={alertsParameters.actividadInusual}
              />
            </FormItem>
            <FormItem
              className="relative"
              label="Horario Atípico"
              info="Se genera una alerta por cualquier transacción que se haga en ese rango de horario."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_horarioAtipico)}
                onChange={onChangeAlerts("estatus_horarioAtipico")}
              />
              <div className="flex gap-5">
                <Calendar
                  className="w-full"
                  timeOnly
                  hourFormat="24"
                  showTime
                  placeholder="Horarios entrada"
                  onChange={onChangeAlerts("horarioAtipicoEnt")}
                  value={horarioAtipicoEnt}
                />

                <Calendar
                  className="w-full"
                  timeOnly
                  hourFormat="24"
                  showTime
                  placeholder="Horarios salida"
                  onChange={onChangeAlerts("horarioAtipicoSalida")}
                  value={horarioAtipicoSalida}
                />
              </div>
            </FormItem>
          </Grid>

          <Grid sm={1} gap={3} className="sm:w-full mds:w-[80%] xl:w-[60%]">
            <FormItem
              className="relative"
              label="Horario Inusual (Días)"
              info="Se genera una alerta por cualquier transacción que sea haga fuera del rango de horario registrado en el detalle del cliente."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_horarioInusual)}
                onChange={onChangeAlerts("estatus_horarioInusual")}
              />
            </FormItem>
            <FormItem
              className="relative"
              label="Duplicidad Tarjeta (Segundos)"
              info="Se genera una alerta por transacciones que se hagan con la misma tarjeta en el periodo de tiempo definido."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_duplicidadTarjeta)}
                onChange={onChangeAlerts("estatus_duplicidadTarjeta")}
              />
              <InputNumber
                onChange={onChangeAlerts("duplicidadTarjeta")}
                showButtons
                buttonLayout="horizontal"
                step={1}
                placeholder="00"
                decrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                incrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                className="md:w-[80%] xl:w-[60%] borderBlockNone"
                value={alertsParameters.duplicidadTarjeta}
              />
            </FormItem>
            <FormItem
              className="relative"
              label="Transacciones Internacionales"
              info="Se genera una alerta por cualquier transacciones INTERNACIONAL que sea mayor al monto capturado."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_txnInternacional)}
                onChange={onChangeAlerts("estatus_txnInternacional")}
              />
              <InputNumber
                onChange={onChangeAlerts("txnIntetrnacional")}
                className="md:w-[80%] xl:w-[60%]"
                placeholder="$0.00 MXN"
                mode="currency"
                currency="USD"
                value={alertsParameters.txnIntetrnacional}
              />
            </FormItem>
            <FormItem
              className="relative"
              label="Rechazos de Riesgo"
              info="Se genera una alerta por cualquier transacción RECHAZADA que tenga los códigos de acuerdo al catalogo de operaciones."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_rechazosRiesgo)}
                onChange={onChangeAlerts("estatus_rechazosRiesgo")}
              />
            </FormItem>
            <FormItem
              className="relative"
              label="Rechazo Tiempo"
              info="Se genera una alerta en caso de tener la cantidad de transacciones rechazadas en un periodo de 60 minutos por cliente."
            >
              <InputSwitch
                className="!absolute right-0 top-0"
                checked={Boolean(alertsParameters.estatus_rechazoTiempo)}
                onChange={onChangeAlerts("estatus_rechazoTiempo")}
              />
              <InputNumber
                onChange={onChangeAlerts("rechazoTiempo")}
                showButtons
                buttonLayout="horizontal"
                step={1}
                placeholder="00"
                decrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                incrementButtonClassName="!border-gray-border !bg-[#faf5fc] !text-[#6B3374]"
                className="md:w-[80%] xl:w-[60%] borderBlockNone"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                value={alertsParameters.rechazoTiempo}
              />
            </FormItem>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};
