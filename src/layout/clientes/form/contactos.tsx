import Grid from "@app/components/Grid";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useEffect } from "react";
import { FormItemFulfillment as FormItem } from "../templates";
import { FormikCustomerType } from "@app/types/Clients";
import { INIT_CLIENT } from "@app/constants/client";
import router from "next/router";

export default function ClientContactos({
  values,
  errors,
  handleChange,
  disabled,
  fulfillment,
  setFulfillment,
  canFulfillment,
  activeTab,
  setFieldValue,
}: FormikCustomerType) {
  useEffect(() => {
    if (!values.infoContactos) {
      setFieldValue("infoContactos", INIT_CLIENT.infoContactos);
    }
  }, [values.infoContactos]);

  let enClientes = router.pathname.includes('/dashboard/clientes')
  return (
    <>
      <p className="text-black-500 text-lg mb-5" style={{color: '#6B3374', fontSize: '20px', fontWeight: 500}}>Contactos</p>
      <TabView id="expedienteRepresentantes">
        {values.infoContactos
          ? values.infoContactos.map((contact: any, index: number) => {
              const contactNumber = index + 1;
              const { nombre, telefono, email } = contact;

              const error = Object.assign(
                { telefono: "", nombre: "", email: "" },
                errors && errors.infoContactos
                  ? errors.infoContactos[index]
                  : {}
              );
              
              const hasError = Object.values(error).some(value => value !== "");

              return (
                <TabPanel
                  key={index}
                  header={`Contacto ${contactNumber}`}
                  className={`text-blue-400 ${hasError ? 'error-tab' : ''}`}
                  style={{backgroundColor: '#FAF9F7'}}
                >
                  <Grid sm={1} md={2} lg={2} gap={3} style={{padding: 20}}>
                    <FormItem
                      maxWidth="max-w-full"
                      title="Nombre completo contacto"
                      required={(activeTab != 99 && enClientes) ? contactNumber == 1 : false}
                      error={error.nombre}
                      fulfillment={fulfillment}
                      setFulfillment={setFulfillment}
                      name={`infoContactos[${index}].nombre`}
                      canFulfillment={canFulfillment}
                    >
                      <InputText
                        name={`infoContactos[${index}].nombre`}
                        placeholder={`Nombre completo contacto ${contactNumber}`}
                        value={nombre}
                        onChange={handleChange}
                        disabled={Boolean(
                          activeTab == 99
                            ? fulfillment[`infoContactos[${index}].nombre`] ??
                                true
                            : disabled
                        )}
                        className={error.nombre && "p-invalid"}
                        style={{width:'75%', height:42, borderRadius: 6}}
                      />
                    </FormItem>
                    <FormItem
                      maxWidth="max-w-full"
                      title="Correo electrónico de contacto"
                      error={error.email}
                      required={(activeTab != 99 && enClientes) ? contactNumber == 1 : false}
                      name={`infoContactos[${index}].email`}
                      fulfillment={fulfillment}
                      setFulfillment={setFulfillment}
                      canFulfillment={canFulfillment}
                    >
                      <InputText
                        name={`infoContactos[${index}].email`}
                        placeholder={`Correo electrónico de contacto ${contactNumber}`}
                        value={email}
                        onChange={handleChange}
                        disabled={Boolean(
                          activeTab == 99
                            ? fulfillment[`infoContactos[${index}].email`] ??
                                true
                            : disabled
                        )}
                        className={error.email && "p-invalid"}
                        style={{width:'75%', height:42, borderRadius: 6}}
                      />
                    </FormItem>
                  </Grid>

                  <Grid sm={1} md={2} lg={2} gap={3} style={{padding:"0px 20px 20px"}}>
                    <FormItem
                      maxWidth="max-w-full"
                      title="Teléfono de contacto"
                      required={(activeTab != 99 && enClientes) ? contactNumber == 1 : false}
                      error={error.telefono}
                      name={`infoContactos[${index}].telefono`}
                      fulfillment={fulfillment}
                      setFulfillment={setFulfillment}
                      canFulfillment={canFulfillment}
                    >
                      <InputText
                        name={`infoContactos[${index}].telefono`}
                        placeholder={`Teléfono de contacto ${contactNumber}`}
                        value={telefono}
                        onChange={handleChange}
                        disabled={Boolean(
                          activeTab == 99
                            ? fulfillment[`infoContactos[${index}].telefono`] ??
                                true
                            : disabled
                        )}
                        className={error.telefono && "p-invalid"}
                        style={{width:'75%', height:42, borderRadius: 6}}
                        onKeyPress={(e) => {
                          const keyCode = e.keyCode || e.which;
                          const char = String.fromCharCode(keyCode);
                          if (!/[0-9]/.test(char)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormItem>

                    
                  </Grid>
                </TabPanel>
              );
            })
          : null}
      </TabView>
    </>
  );
}
