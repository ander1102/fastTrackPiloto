import React, { useMemo } from "react";
import Grid from "@app/components/Grid";
import { FormikCustomerType } from "@app/types/Clients";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { FormItemFulfillment as FormItem } from "../templates";
import { CatCountries, CatGiro } from "@app/components/Dropdowns";
import router from "next/router";

export default function ComercioDetails({
  values,
  errors,
  handleChange,
  setFieldValue,
  disabled,
  fulfillment,
  setFulfillment,
  canFulfillment,
  activeTab,
  isNew,
  person
}: FormikCustomerType) {
  let enClientes = router.pathname.includes("/dashboard/clientes");
  return (
    <div style={{backgroundColor: '#FAF9F7', padding: '20px'}}>
      <Grid sm={1} md={2} lg={2} gap={3}>
        <FormItem
          maxWidth="max-w-full"
          title={person === 'moral' ? "Nombre Comercial" : "Nombre del negocio"}
          required={enClientes}
          name="nombre"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          error={errors.nombre}
          canFulfillment={canFulfillment}
        >
          <InputText
            name="nombre"
            placeholder={person === 'moral' ? "Nombre comercial" : "Nombre del negocio"}
            value={values.nombre}
            onChange={handleChange}
            className={errors.nombre && "p-invalid"}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            disabled={Boolean(disabled)}
          />
        </FormItem>

        <FormItem
          required={enClientes}
          maxWidth="max-w-full"
          error={errors?.infoComercio?.razonSocial}
          title={person === 'moral' ? "Denominación o Razón Social" : "Nombre Completo"}
          name="infoComercio.razonSocial"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          canFulfillment={canFulfillment}
        >
          <InputText
            name="infoComercio.razonSocial"
            placeholder="Razón social"
            value={values.infoComercio.razonSocial}
            onChange={handleChange}
            className={errors?.infoComercio?.razonSocial && "p-invalid"}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            disabled={Boolean(disabled)}
          />
        </FormItem>
      </Grid>
      <Grid sm={1} md={2} lg={2} gap={3}>
        {
          person === 'moral' &&
          <FormItem
            maxWidth="max-w-full"
            required={enClientes}
            error={errors.email}
            title="Correo electrónico de la empresa"
            name="infoComercio.email"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            canFulfillment={canFulfillment}
          >
            <InputText
              name="email"
              value={values.email}
              placeholder="Correo electrónico"
              onChange={handleChange}
              className={errors.email && "p-invalid"}
              style={{ width: "75%", height: 42, borderRadius: 6 }}
              disabled={Boolean(disabled)}
            />
          </FormItem>
        }
        <FormItem
          maxWidth="max-w-full"
          required={enClientes}
          error={errors.Giro}
          title="Giro del negocio"
          name="Giro"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          canFulfillment={canFulfillment}
        >
          <CatGiro
            value={values.Giro}
            onChange={({ value }) => setFieldValue("Giro", value)}
            placeholder="Giro"
            editable
            disabled={Boolean(disabled)}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
          />
        </FormItem>
          <FormItem
            maxWidth="max-w-full"
            error={errors?.infoComercio?.rfc}
            title="RFC o Número de Identificación fiscal"
            name="infoComercio.rfc"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            canFulfillment={canFulfillment}
          >
            <InputText
              name="infoComercio.rfc"
              value={values.infoComercio?.rfc}
              placeholder="RFC o Número de Identificación fiscal"
              onChange={handleChange}
              className={errors?.infoComercio?.rfc && "p-invalid"}
              style={{ width: "75%", height: 42, borderRadius: 6 }}
              disabled={Boolean(disabled)}
            />
          </FormItem>
        <FormItem
          maxWidth="max-w-full"
          error={errors?.infoComercio?.fechaConst}
          title="Fecha de constitución del Negocio"
          name="infoComercio.fechaConst"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          canFulfillment={canFulfillment}
        >
          <Calendar
            name="infoComercio.fechaConst"
            value={
              values.infoComercio.fechaConst &&
              new Date(values.infoComercio.fechaConst)
            }
            onChange={({ value }) =>
              setFieldValue("infoComercio.fechaConst", value ?? "")
            }
            placeholder={`DD/MM/AAAA`}
            className="myCalendarButton"
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            dateFormat="dd/mm/yy"
            maxDate={new Date()}
            showIcon
            showButtonBar
            disabled={Boolean(disabled)}
          />
        </FormItem>

        {activeTab == 0 && (
          <FormItem
            maxWidth="max-w-full"
            error={errors?.infoComercio?.paisConst}
            title="País de constitución"
            name="infoComercio.paisConst"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            canFulfillment={canFulfillment}
          >
            <CatCountries
              value={values.infoComercio.paisConst}
              onChange={({ value }) =>
                setFieldValue("infoComercio.paisConst", value)
              }
              editable={true}
              placeholder="País de constitución"
              disabled={disabled}
              style={{ width: "75%", height: 42, borderRadius: 6 }}
            />
          </FormItem>
        )}
        <FormItem
          maxWidth="max-w-full"
          required={enClientes}
          error={errors?.infoComercio?.telefono}
          title="Teléfono del corporativo"
          name="infoComercio.telefono"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          canFulfillment={canFulfillment}
        >
          <InputText
            name="infoComercio.telefono"
            value={values.infoComercio.telefono}
            placeholder="Teléfono del corporativo"
            onChange={handleChange}
            onKeyPress={(e) => {
              const keyCode = e.keyCode || e.which;
              const char = String.fromCharCode(keyCode);
              if (!/[0-9]/.test(char)) {
                e.preventDefault();
              }
            }}
            className={errors?.infoComercio?.telefono && "p-invalid"}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            disabled={Boolean(
              activeTab == 99 ? fulfillment["infoComercio.telefono"] : disabled
            )}
          />
        </FormItem>


        <FormItem
          maxWidth="max-w-full"
          title={"Banco"}
          required={enClientes}
          name="infoOperaciones.banco"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          error={errors.infoOperaciones?.banco}
          canFulfillment={canFulfillment}
        >
          <InputText
            name="infoOperaciones.banco"
            placeholder="Banco"
            value={values.infoOperaciones.banco}
            onChange={handleChange}
            className={errors.infoOperaciones?.banco && "p-invalid"}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            disabled={Boolean(disabled)}
          />
        </FormItem>


        <FormItem
          maxWidth="max-w-full"
          title="Cuenta"
          required={enClientes}
          name="infoOperaciones.cuenta"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          error={errors.infoOperaciones?.cuenta}
          canFulfillment={canFulfillment}
        >
          <InputText
            name="infoOperaciones.cuenta"
            placeholder="Banco"
            value={values.infoOperaciones.cuenta}
            onChange={handleChange}
            className={errors.infoOperaciones?.cuenta && "p-invalid"}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            disabled={Boolean(disabled)}
          />
        </FormItem>


        <FormItem
          maxWidth="max-w-full"
          title="Clabe"
          required={enClientes}
          name="infoOperaciones.clabe"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          error={errors.infoOperaciones?.clabe}
          canFulfillment={canFulfillment}
        >
          <InputText
            name="infoOperaciones.clabe"
            placeholder="Banco"
            value={values.infoOperaciones.clabe}
            onChange={handleChange}
            className={errors.infoOperaciones?.clabe && "p-invalid"}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            disabled={Boolean(disabled)}
          />
        </FormItem>


        <FormItem
          maxWidth="max-w-full"
          title="Titular"
          required={enClientes}
          name="infoOperaciones.titular"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          error={errors.infoOperaciones?.titular}
          canFulfillment={canFulfillment}
        >
          <InputText
            name="infoOperaciones.titular"
            placeholder="Banco"
            value={values.infoOperaciones.titular}
            onChange={handleChange}
            className={errors.infoOperaciones?.titular && "p-invalid"}
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            disabled={Boolean(disabled)}
          />
        </FormItem>

      </Grid>
      
      
        
        {/* {!isNew && (
        <FormItem
          maxWidth="max-w-full"
          error={errors?.fechaEnt}
          title="Fecha de incorporación"
          name="fechaEnt"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          canFulfillment={canFulfillment}
        >
          <Calendar
            name="fechaEnt"
            value={
              values.fechaEnt &&
              new Date(values.fechaEnt)
            }
            onChange={({ value }) =>
              setFieldValue("fechaEnt", value ?? "")
            }
            placeholder={`DD/MM/AAAA`}
            className="myCalendarButton"
            style={{ width: "75%", height: 42, borderRadius: 6 }}
            dateFormat="dd/mm/yy"
            maxDate={new Date()}
            showIcon
            showButtonBar
            disabled={true}
          />
        </FormItem>)} */}
    </div>
  );
}
