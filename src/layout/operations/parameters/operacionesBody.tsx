import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { FormItem } from "@app/components/FormManager/FormItem";
import Grid from "@app/components/Grid";
import { PERIODO_DE_TIEMPO_OPTIONS } from "@app/constants/operations";
import { ParametersState } from "./useParameters";

interface OperacionesBodyProps
  extends Pick<
    ParametersState,
    | "operationalParameters"
    | "transactionalParameters"
    | "onChangeOperational"
    | "onChangeTransactional"
  > {}

export const OperacionesBody = ({
  operationalParameters,
  transactionalParameters,
  onChangeOperational,
  onChangeTransactional,
}: OperacionesBodyProps) => {
  return (
    <div className="grow bg-white p-7">
      <section className="rounded-lg bg-beige py-10 px-8 flex flex-col gap-9">
        <h3 className="text-light-blue-600 text-xl leading-6 font-medium">
          Parámetros Operativos
        </h3>

        <Grid md={2} lg={3} gap={13} className="gap-x-24">
          <FormItem label="Monto Límite Inferior">
            <InputNumber
              className="w-full"
              currency="USD"
              min={0}
              mode="currency"
              placeholder="$0.00"
              value={operationalParameters.montoInferior}
              onChange={onChangeOperational("montoInferior")}
            />
          </FormItem>
          <FormItem label="Monto Límite Superior">
            <InputNumber
              className="w-full"
              currency="USD"
              min={0}
              mode="currency"
              placeholder="$0.00"
              value={operationalParameters.montoSuperior}
              onChange={onChangeOperational("montoSuperior")}
            />
          </FormItem>
          <FormItem></FormItem>
          <FormItem label="Cantidad Días Naturales">
            <InputNumber
              className="w-full"
              max={31}
              min={0}
              placeholder="00"
              value={operationalParameters.diasNaturales}
              onChange={onChangeOperational("diasNaturales")}
            />
          </FormItem>
          <FormItem
            className="flex items-start justify-between"
            label="Activar Notificación"
          >
            <InputSwitch
              checked={!!operationalParameters.notificacion}
              onChange={onChangeOperational("notificacion")}
            />
          </FormItem>
        </Grid>

        <h3 className="text-light-blue-600 text-xl leading-6 font-medium">
          Parámetros Transaccionales
        </h3>

        <Grid md={2} lg={3} gap={13} className="gap-x-24">
          <FormItem label="Monto Límite Superior">
            <InputNumber
              className="w-full"
              currency="USD"
              min={0}
              mode="currency"
              placeholder="$0.00"
              value={transactionalParameters.montoSuperior}
              onChange={onChangeTransactional("montoSuperior")}
            />
          </FormItem>
          <FormItem label="Monto Límite Medios">
            <InputNumber
              className="w-full"
              currency="USD"
              min={0}
              mode="currency"
              placeholder="$0.00"
              value={transactionalParameters.montoMedio}
              onChange={onChangeTransactional("montoMedio")}
            />
          </FormItem>
          <FormItem label="Periodo de Tiempo">
            <Dropdown
              className="w-full"
              placeholder="Seleccionar"
              options={PERIODO_DE_TIEMPO_OPTIONS}
              value={transactionalParameters.periodoTiempo}
              onChange={onChangeTransactional("periodoTiempo")}
            />
          </FormItem>
        </Grid>
      </section>
    </div>
  );
};
