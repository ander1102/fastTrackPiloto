import React from "react";
import Grid from "@app/components/Grid";
import { FormikCustomerType } from "@app/types/Clients";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { FormItemFulfillment as FormItem } from "../templates";
import { CatCountries, CatGiro } from "@app/components/Dropdowns";
export default function comercioFulfilment({
  values,
  errors,
  handleChange,
  setFieldValue,
  fulfillment,
  setFulfillment,
  canFulfillment,
  person,
}: FormikCustomerType) {
  return (
    
    <>
      {
        person && person === 'moral' ?
        <>
          <Grid sm={1} md={2} lg={2} gap={3}>
            <FormItem
              maxWidth="max-w-sm"
              title="Nombre comercial"
              name="nombre"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              error={errors.nombre}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="nombre"
                placeholder="Nombre comercial"
                value={values.nombre}
                onChange={handleChange}
                style={{width: '100%'}}
                className={errors.nombre && "p-invalid"}
                disabled={Boolean(fulfillment['nombre']?? true)}
              />
            </FormItem>
            <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.razonSocial}
              title="Nombre / Denominación o Razón Social"
              name="infoComercio.razonSocial"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoComercio.razonSocial"
                placeholder="Razón social"
                value={values?.infoComercio?.razonSocial}
                onChange={handleChange}
                style={{width: '100%'}}
                className={errors?.infoComercio?.razonSocial && "p-invalid"}
                disabled={Boolean(fulfillment['infoComercio.razonSocial']?? true)}
              />
            </FormItem>
          </Grid>
          <Grid sm={1} md={2} lg={2} gap={3}>
          <FormItem
              maxWidth="max-w-sm"
              error={errors.infoComercio?.email}
              title="Correo electrónico de empresa"
              name="infoComercio.email"
              
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoComercio.email"
                value={values.infoComercio?.email}
                placeholder="Correo electrónico de empresa"
                onChange={handleChange}
                style={{width: '100%'}}
                className={errors.infoComercio?.email && "p-invalid"}
                disabled={Boolean(fulfillment['infoComercio.email']?? true)}
              />
            </FormItem>
            <FormItem
              maxWidth="max-w-sm"
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
                style={{width: '100%'}}
                filter
                panelStyle={{width: '40%'}}
                disabled={Boolean(fulfillment["Giro"] ?? true)}
              />
            </FormItem>
          </Grid>

          <Grid sm={1} md={2} lg={2} gap={3}>
           <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.fechaConst}
              title="Fecha de constitución"
              name="infoComercio.fechaConst"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <Calendar
                name="infoComercio.fechaConst"
                value={
                  values?.infoComercio?.fechaConst &&
                  new Date(values.infoComercio.fechaConst)
                }
                onChange={({ value }) =>
                  setFieldValue("infoComercio.fechaConst", value ?? "")
                }
                placeholder={`DD/MM/AAAA`}
                className="myCalendarButton"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
                showIcon
                showButtonBar
                disabled={Boolean(fulfillment['infoComercio.fechaConst']?? true)}
                style={{width: '100%'}}
              />
            </FormItem>
            <FormItem
              maxWidth="max-w-sm"
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
                style={{width: '100%'}}
                className={errors?.infoComercio?.rfc && "p-invalid"}
                disabled={Boolean(fulfillment['infoComercio.rfc']?? true)}
              />
            </FormItem>
          </Grid>
          <Grid sm={1} md={2} lg={2} gap={3}>
            <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.paisConst}
              title="País de constitución"
              name="infoComercio.paisConst"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <CatCountries
                value={values?.infoComercio?.paisConst}
                onChange={({ value }) => setFieldValue("infoComercio.paisConst", value)}
                placeholder="País de constitución"
                editable
                filter
                disabled={Boolean(fulfillment["infoComercio.paisConst"] ?? true)}
                style={{width: '100%'}}
              />
            </FormItem>
            <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.telefono}
              title="Teléfono del corporativo"
              name="infoComercio.telefono"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoComercio.telefono"
                value={values.infoComercio?.telefono}
                placeholder="Teléfono del corporativo"
                onChange={handleChange}
                onKeyPress={(e) => {
                  const keyCode = e.keyCode || e.which;
                  const char = String.fromCharCode(keyCode);
                  if (!/[0-9]/.test(char)) {
                    e.preventDefault();
                  }
                }}
                style={{width: '100%'}}
                className={errors?.infoComercio?.telefono && "p-invalid"}
                disabled={Boolean(fulfillment['infoComercio.telefono']?? true)}
              />
            </FormItem>
          </Grid>
        </>
        :
        <>
          <Grid sm={1} md={2} lg={2} gap={3}>
            <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.razonSocial}
              title="Nombre del Negocio"
              name="infoComercio.razonSocial"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoComercio.razonSocial"
                placeholder="Razón social"
                value={values?.infoComercio?.razonSocial}
                onChange={handleChange}
                style={{width: '100%'}}
                className={errors?.infoComercio?.razonSocial && "p-invalid"}
                disabled={Boolean(fulfillment['infoComercio.razonSocial']?? true)}
              />
            </FormItem>
            <FormItem
              maxWidth="max-w-sm"
              title="Nombre completo"
              name="nombre"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              error={errors.nombre}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="nombre"
                placeholder="Nombre comercial"
                value={values.nombre}
                onChange={handleChange}
                className={errors.nombre && "p-invalid"}
                disabled={Boolean(fulfillment['nombre']?? true)}
                style={{width: '100%'}}
              />
            </FormItem>
          </Grid>
          <Grid sm={1} md={2} lg={2} gap={3}>
            <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.fechaConst}
              title="Fecha de constitución del Negocio *"
              name="infoComercio.fechaConst"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <Calendar
                name="infoComercio.fechaConst"
                style={{width: '100%'}}
                value={
                  values?.infoComercio?.fechaConst &&
                  new Date(values.infoComercio.fechaConst)
                }
                onChange={({ value }) =>
                  setFieldValue("infoComercio.fechaConst", value ?? "")
                }
                placeholder={`DD/MM/AAAA`}
                className="myCalendarButton"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
                showIcon
                showButtonBar
                disabled={Boolean(fulfillment['infoComercio.fechaConst']?? true)}
              />
            </FormItem>
            <FormItem
              maxWidth="max-w-sm"
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
                disabled={Boolean(fulfillment["Giro"] ?? true)}
                style={{width: '100%'}}
                filter
                panelStyle={{width: '40%'}}
                
              />
            </FormItem>
          </Grid>
          <Grid sm={1} md={2} lg={2} gap={3}>
          <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.paisConst}
              title="País de constitución"
              name="infoComercio.paisConst"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <CatCountries
                value={values?.infoComercio?.paisConst}
                onChange={({ value }) => setFieldValue("infoComercio.paisConst", value)}
                placeholder="País de constitución"
                editable
                filter
                disabled={Boolean(fulfillment["infoComercio.paisConst"] ?? true)}
                style={{width: '100%'}}
              />
            </FormItem>
          
            <FormItem
              maxWidth="max-w-sm"
              error={errors?.infoComercio?.rfc}
              title="RFC o Número de Identificación fiscal"
              name="infoComercio.rfc"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoComercio.rfc"
                style={{width: '100%'}}
                value={values.infoComercio?.rfc}
                placeholder="RFC o Número de Identificación fiscal"
                onChange={handleChange}
                className={errors?.infoComercio?.rfc && "p-invalid"}
                disabled={Boolean(fulfillment['infoComercio.rfc']?? true)}
              />
            </FormItem>
          </Grid>
          <Grid sm={1} md={2} lg={2} gap={3}>
          
            <FormItem
              minWidth="max-w-sm"
              error={errors?.infoComercio?.telefono}
              title="Teléfono del corporativo"
              name="infoComercio.telefono"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoComercio.telefono"
                style={{width: '100%'}}
                value={values.infoComercio?.telefono}
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
                disabled={Boolean(fulfillment['infoComercio.telefono']?? true)}
              />
            </FormItem>
            
          </Grid>
        </>
      }
    </>
  );
}
