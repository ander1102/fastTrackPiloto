import { CatCountries } from "@app/components/Dropdowns";
import StatesDropdown from "@app/components/Dropdowns/states";
import Grid from "@app/components/Grid";
import { InputText } from "primereact/inputtext";
import React from "react";
import { FormItemFulfillment as FormItem } from "../templates";
import { FormikCustomerType } from "@app/types/Clients";
import router from "next/router";

export default function ClientDireccion({
  values,
  errors,
  handleChange,
  setFieldValue,
  disabled,
  fulfillment,
  setFulfillment,
  canFulfillment,
  activeTab,
}: FormikCustomerType) {
  const infoDomicilio = values.infoDomicilio ?? {};
  const errorInfoDomicilio = Object.assign(
    {
      calle: "",
      numExt: "",
      numInt: "",
      colonia: "",
      municipio: "",
      codigoPostal: "",
      ciudad: "",
      estado: "",
      pais: "",
    },
    errors.infoDomicilio
  );
  let enClientes = router.pathname.includes('/dashboard/clientes')
  return (
    <>
      <p className="text-lg mb-5" style={{color: "#6B3374", fontWeight: 500, fontSize:20}}>Dirección Fiscal</p>
      <div style={{backgroundColor: '#FAF9F7', padding: '20px 20px'}}>

        <Grid sm={1} md={1} lg={1} gap={1}>
        <FormItem 
            name="infoDomicilio.calle"
            maxWidth="max-w-[100%]"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            title="Calle"
            required={activeTab != 99 && enClientes}
            error={errorInfoDomicilio.calle}
            canFulfillment={canFulfillment}
          >
            <InputText
              name="infoDomicilio.calle"
              placeholder="Calle"
              value={infoDomicilio.calle ?? ""}
              onChange={handleChange}
              className={errorInfoDomicilio.calle && "p-invalid"}
              style={{width: '87.5%', height:42, borderRadius: 6}}
              disabled={Boolean(
                activeTab == 99
                  ? fulfillment["infoDomicilio.calle"] ?? true
                  : disabled
              )}
            />
          </FormItem>
        </Grid>
        <Grid sm={1} md={2} lg={2} gap={2}>

          <FormItem
            name="infoDomicilio.colonia"
            maxWidth="max-w-full"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            title="Colonia"
            required={activeTab != 99 && enClientes}
            error={errorInfoDomicilio.colonia}
            canFulfillment={canFulfillment}
          >
            <InputText
              name="infoDomicilio.colonia"
              placeholder="Colonia"
              value={infoDomicilio.colonia ?? ""}
              onChange={handleChange}
              className={errorInfoDomicilio.colonia && "p-invalid"}
              style={{width: '75%', height:42, borderRadius: 6}}
              disabled={Boolean(
                activeTab == 99
                  ? fulfillment["infoDomicilio.colonia"] ?? true
                  : disabled
              )}
            />
          </FormItem>

          <div className="flex w-full">
            <FormItem
              name="infoDomicilio.numExt"
              maxWidth="max-w-[50%]"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              title="Número Ext."
              required={activeTab != 99 && enClientes}
              error={errorInfoDomicilio.numExt}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoDomicilio.numExt"
                placeholder="Número Ext."
                value={infoDomicilio.numExt ?? ""}
                onChange={handleChange}
                className={errorInfoDomicilio.numExt && "p-invalid"}
                style={{width: '50%', height:42, borderRadius: 6}}
                disabled={Boolean(
                  activeTab == 99
                    ? fulfillment["infoDomicilio.numExt"] ?? true
                    : disabled
                )}
              />
            </FormItem>

            <FormItem
              name="infoDomicilio.numInt"
              maxWidth="max-w-[50%]"
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              title="Número Int."
              error={errorInfoDomicilio.numInt}
              canFulfillment={canFulfillment}
            >
              <InputText
                name="infoDomicilio.numInt"
                placeholder="Número Int."
                value={infoDomicilio.numInt ?? ""}
                onChange={handleChange}
                className={errorInfoDomicilio.numInt && "p-invalid"}
                style={{width: '50%', height:42, borderRadius: 6}}
                disabled={Boolean(
                  activeTab == 99
                    ? fulfillment["infoDomicilio.numInt"] ?? true
                    : disabled
                )}
              />
            </FormItem>
          </div>

          <FormItem
            name="infoDomicilio.municipio"
            maxWidth="max-w-full"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            title="Delegación"
            required={activeTab != 99 && enClientes}
            error={errorInfoDomicilio.municipio}
            canFulfillment={canFulfillment}
          >
            <InputText
              name="infoDomicilio.municipio"
              placeholder="Delegación"
              value={infoDomicilio.municipio ?? ""}
              onChange={handleChange}
              className={errorInfoDomicilio.municipio && "p-invalid"}
              style={{width: '75%', height:42, borderRadius: 6}}
              disabled={Boolean(
                activeTab == 99
                  ? fulfillment["infoDomicilio.municipio"] ?? true
                  : disabled
              )}
            />
          </FormItem>

          <FormItem
            name="infoDomicilio.codigoPostal"
            maxWidth="max-w-[100%]"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            title="Código postal"
            required={activeTab != 99 && enClientes}
            error={errorInfoDomicilio.codigoPostal}
            canFulfillment={canFulfillment}
          >
            <InputText
              name="infoDomicilio.codigoPostal"
              placeholder="Código postal"
              value={infoDomicilio.codigoPostal ?? ""}
              onChange={handleChange}
              className={errorInfoDomicilio.codigoPostal && "p-invalid"}
              style={{width: '75%', height:42, borderRadius: 6}}
              disabled={Boolean(
                activeTab == 99
                  ? fulfillment["infoDomicilio.codigoPostal"] ?? true
                  : disabled
              )}
            />
          </FormItem>

          <FormItem
            name="infoDomicilio.ciudad"
            maxWidth="max-w-full"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            title="Ciudad"
            required={activeTab != 99 && enClientes}
            error={errorInfoDomicilio.ciudad}
            canFulfillment={canFulfillment}
          >
            <InputText
              name="infoDomicilio.ciudad"
              placeholder="Ciudad"
              value={infoDomicilio.ciudad ?? ""}
              onChange={handleChange}
              className={errorInfoDomicilio.ciudad && "p-invalid"}
              style={{width: '75%', height:42, borderRadius: 6}}
              disabled={Boolean(
                activeTab == 99
                  ? fulfillment["infoDomicilio.ciudad"] ?? true
                  : disabled
              )}
            />
          </FormItem>

          <FormItem
            name="infoDomicilio.estado"
            maxWidth="max-w-full"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            title="Estado"
            required={activeTab != 99 && enClientes}
            error={errorInfoDomicilio.estado}
            canFulfillment={canFulfillment}
          >
            <StatesDropdown
              name="infoDomicilio.estado"
              country={infoDomicilio.pais ?? ""}
              value={infoDomicilio.estado ?? ""}
              onChange={(e:any) => {
                setFieldValue("infoDomicilio.estado", e.target.value);
              }}
              placeholder="Estado"
              disabled={Boolean(
                activeTab == 99
                  ? fulfillment["infoDomicilio.estado"] ?? true
                  : disabled
              )}
              style={{width: '75%', height:42, borderRadius: 6}}
            />
          </FormItem>

          <FormItem
            name="infoDomicilio.pais"
            maxWidth="max-w-full"
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            title="País"
            required={activeTab != 99 && enClientes}
            error={errorInfoDomicilio.pais}
            canFulfillment={canFulfillment}
          >
            <CatCountries
              name="infoDomicilio.pais"
              value={infoDomicilio.pais}
              onChange={({ value }: any) =>
                setFieldValue("infoDomicilio.pais", value)
              }
              placeholder="País"
              filter
              editable
              disabled={Boolean(
                activeTab == 99
                  ? fulfillment["infoDomicilio.pais"] ?? true
                  : disabled
              )}
              style={{width: '75%', height:42, borderRadius: 6}}
            />
          </FormItem>
        </Grid>
      </div>
    </>
  );
}
