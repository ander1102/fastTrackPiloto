import Grid from "@app/components/Grid";

import { FormItem } from "@app/components/FormManager/FormItem";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { ButtonAction } from "@app/components/Buttons";
import useFormPagosRecurrentes from "@app/layout/pagosrecurrentes/formCreate/useFormPagosRecurrentes";

import {
  RECURRENCIA_DIAS,
  INIT_PAGOS_RECURRENTES,
} from "@app/constants/pagosRecurrentes";

export default function Form() {
  const { values, errors, handleOnChange, handleOnSubmit, disabled } =
    useFormPagosRecurrentes(INIT_PAGOS_RECURRENTES);
  return (
    <section className="container-body-view mx-10 bg-white">
      <Grid sm={1} xl={2} gap={3} className="w-full xl:w-[80%]">
        <FormItem label="Nombre" required error={errors.nombre}>
          <div className="w-full lg:w-[80%]  ">
            <InputText
              placeholder="Nombre"
              value={values.nombre}
              name="nombre"
              onChange={(e) => handleOnChange("nombre", e.target.value)}
            />
          </div>
        </FormItem>
        <FormItem label="Contrato" required error={errors.referencia}>
          <div className="w-full lg:w-[80%]">
            <InputText
              placeholder="Contrato"
              className="w-full"
              value={values.referencia}
              name="referencia"
              maxLength={20}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
                handleOnChange("referencia", value);
              }}
            />
          </div>
        </FormItem>
        <FormItem label="Monto" required error={errors.monto}>
          <div className="w-full lg:w-[80%]">
            <InputNumber
              placeholder="Monto"
              className="w-full"
              mode="currency"
              currency="USD"
              value={values.monto}
              name="monto"
              onChange={({ value }) => handleOnChange("monto", value ?? 0)}
            />
          </div>
        </FormItem>
        <FormItem label="Recurrencia" required error={errors.recurrencia}>
          <div className="w-full lg:w-[80%]">
            <Dropdown
              value={values.recurrencia}
              className="w-full"
              options={RECURRENCIA_DIAS}
              placeholder="Seleccionar"
              name="recurrencia"
              onChange={(e) => handleOnChange("recurrencia", e.target.value)}
            />
          </div>
        </FormItem>
        <FormItem label="Descripción" required error={errors.descripcion}>
          <div className="w-full lg:w-[80%]">
            <InputTextarea
              placeholder="Descripción"
              rows={5}
              cols={20}
              autoResize={false}
              value={values.descripcion}
              name="descripcion"
              className="!h-[140px]"
              onChange={(e) => handleOnChange("descripcion", e.target.value)}
            />
          </div>
        </FormItem>
        <FormItem
          label="Fecha de vigencia"
          required
          error={errors.fechaVigencia}
        >
          <div className="w-full lg:w-[80%]">
            <Calendar
              showIcon
              iconPos="right"
              minDate={new Date()}
              placeholder="Seleccionar"
              className="w-full rounded border-[#ced4da] border-[1px]"
              dateFormat="dd/mm/yy"
              showButtonBar
              name="fechaVigencia"
              value={values.fechaVigencia ? new Date(values.fechaVigencia) : ""}
              onChange={(e) =>
                handleOnChange(
                  "fechaVigencia",
                  (e.value as Date).toISOString().split(".")[0]
                )
              }
            />
          </div>
        </FormItem>
      </Grid>
      <div className="my-3">
        <ButtonAction
          label="Guardar"
          onClick={handleOnSubmit}
          disabled={disabled}
        />
      </div>
    </section>
  );
}
