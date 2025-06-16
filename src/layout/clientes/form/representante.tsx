import Grid from "@app/components/Grid";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useEffect } from "react";
import { CatCountries } from "@app/components/Dropdowns";
import { FormikCustomerType } from "@app/types/Clients";
import FormItemInputFile from "./FormItemInputFile";
import { INIT_CLIENT } from "@app/constants/client";
import {
  FormItemFulfillment as FormItem,
  FormItem as FromLast,
} from "../templates";
export default function ClientRepresentante({
  values,
  errors,
  handleChange,
  setFieldValue,
  disabled,
  onDocumentChange,
  fulfillment,
  setFulfillment,
  canFulfillment,
  activeTab,
}: FormikCustomerType) {
  
  useEffect(()=>{
    let response = INIT_CLIENT.infoRepresentantes;
    if (values.infoRepresentantes && values.infoRepresentantes.length) {
      response = INIT_CLIENT.infoRepresentantes.map((item, index) => {
        return values.infoRepresentantes[index] ?? item;
      });
    }
    setFieldValue("infoRepresentantes", response);
  },[]);

  return (
    <div id="representantes">
      <p className={"text-black-500 text-lg mt-10 mb-5"} style={{color: '#557BFF', fontSize: 20, fontWeight: 500}}>Representantes</p>
      <TabView>
        {values.infoRepresentantes
          ? values.infoRepresentantes.map((representative: any, index: number) => {
              const representanteNumber = index + 1;
              const { nombre, fechaNacimiento, rfc, curp, pais, documents, numeroAcreditacion } =
                representative;

              const error = Object.assign(
                {
                  nombre: "",
                  fechaNacimiento: "",
                  rfc: "",
                  curp: "",
                  pais: "",
                  numeroAcreditacion: "",
                },
                errors && errors.infoRepresentantes
                  ? errors.infoRepresentantes[index]
                  : {}
              );

              const hasError = Object.values(error).some(value => value !== "");

              return (
                  <TabPanel
                    key={index}
                    header={`Representante ${representanteNumber}`}
                    className={`text-blue-400 ${hasError ? 'error-tab' : ''}`}
                    style={{backgroundColor: '#FAF9F7'}}
                  >
                    <Grid sm={1} md={2} lg={2} gap={3} style={{padding:"20px 10px"}}>
                      <FormItem
                        name={`infoRepresentantes[${index}].nombre`}
                        fulfillment={fulfillment}
                        setFulfillment={setFulfillment}
                        maxWidth="max-w-sm"
                        title="Nombre completo"
                        required={
                          activeTab == 99 ? false : representanteNumber == 1
                        }
                        error={error.nombre}
                        canFulfillment={canFulfillment}
                      >
                        <InputText
                          name={`infoRepresentantes[${index}].nombre`}
                          placeholder={`Nombre completo representante ${representanteNumber}`}
                          value={nombre}
                          onChange={handleChange}
                          disabled={Boolean(
                            activeTab == 99
                              ? fulfillment[
                                  `infoRepresentantes[${index}].nombre`
                                ] ?? true
                              : disabled
                          )}
                          className={error.nombre && "p-invalid"}
                          style={{width:canFulfillment === true ?'70%' :'100%', height:42, borderRadius: 6}}
                        />
                      </FormItem>

                      <FormItem
                        name={`infoRepresentantes[${index}].fechaNacimiento`}
                        fulfillment={fulfillment}
                        setFulfillment={setFulfillment}
                        maxWidth="max-w-sm"
                        title="Fecha de nacimiento"
                        error={error.fechaNacimiento}
                        canFulfillment={canFulfillment}
                      >
                        <Calendar
                          name={`infoRepresentantes[${index}].fechaNacimiento`}
                          value={fechaNacimiento && new Date(fechaNacimiento)}
                          onChange={({ value }) =>
                            setFieldValue(
                              `infoRepresentantes[${index}].fechaNacimiento`,
                              value ?? ""
                            )
                          }
                          placeholder={`DD/MM/AAAA`}
                          className="myCalendarButton"
                          dateFormat="dd/mm/yy"
                          maxDate={new Date()}
                          showIcon
                          showButtonBar
                          disabled={Boolean(
                            activeTab == 99
                              ? fulfillment[
                                  `infoRepresentantes[${index}].fechaNacimiento`
                                ] ?? true
                              : disabled
                          )}
                          style={{width:canFulfillment === true ?'70%' :'100%', height:42, borderRadius: 6}}
                        />
                      </FormItem>

                      <FormItem
                        name={`infoRepresentantes[${index}].rfc`}
                        fulfillment={fulfillment}
                        setFulfillment={setFulfillment}
                        maxWidth="max-w-sm"
                        title="RFC o número de identificación fiscal"
                        error={error.rfc}
                        canFulfillment={canFulfillment}
                      >
                        <InputText
                          name={`infoRepresentantes[${index}].rfc`}
                          value={rfc}
                          placeholder={`RFC del representante ${representanteNumber}`}
                          onChange={handleChange}
                          disabled={Boolean(
                            activeTab == 99
                              ? fulfillment[`infoRepresentantes[${index}].rfc`] ??
                                  true
                              : disabled
                          )}
                          className={error.rfc && "p-invalid"}
                          style={{width:canFulfillment === true ?'70%' :'100%', height:42, borderRadius: 6}}
                        />
                      </FormItem>
                      <FormItem
                        name={`infoRepresentantes[${index}].curp`}
                        fulfillment={fulfillment}
                        setFulfillment={setFulfillment}
                        maxWidth="max-w-sm"
                        title="CURP"
                        error={error.curp}
                        canFulfillment={canFulfillment}
                      >
                        <InputText
                          name={`infoRepresentantes[${index}].curp`}
                          value={curp}
                          placeholder={`CURP del representante ${representanteNumber}`}
                          onChange={handleChange}
                          disabled={Boolean(
                            activeTab == 99
                              ? fulfillment[
                                  `infoRepresentantes[${index}].curp`
                                ] ?? true
                              : disabled
                          )}
                          className={error.curp && "p-invalid"}
                          style={{width:canFulfillment === true ?'70%' :'100%', height:42, borderRadius: 6}}
                        />
                      </FormItem>
                      <FormItem
                        name={`infoRepresentantes[${index}].pais`}
                        fulfillment={fulfillment}
                        setFulfillment={setFulfillment}
                        maxWidth="max-w-sm"
                        title={`País de nacimiento`}
                        error={error.pais}
                        canFulfillment={canFulfillment}
                        className="flex content-end justify-end"
                      >
                        <CatCountries
                          name={`infoRepresentantes[${index}].pais`}
                          value={pais}
                          onChange={({ value }) =>
                            setFieldValue(
                              `infoRepresentantes[${index}].pais`,
                              value
                            )
                          }
                          editable={true}
                          filter={true}
                          placeholder={`País de nacimiento del representante ${representanteNumber}`}
                          disabled={Boolean(
                            activeTab == 99
                              ? fulfillment[
                                  `infoRepresentantes[${index}].pais`
                                ] ?? true
                              : disabled
                          )}
                          style={{width:canFulfillment === true ?'70%' :'100%', height:42, borderRadius: 6}}
                        />
                      </FormItem>
                      <FormItem
                        name={`infoRepresentantes[${index}].numeroAcreditacion`}
                        fulfillment={fulfillment}
                        setFulfillment={setFulfillment}
                        maxWidth="max-w-sm"
                        title="Registro Público del Poder notariado del Representante legal"
                        error={error.curp}
                        canFulfillment={canFulfillment}
                      >
                        <InputText
                          name={`infoRepresentantes[${index}].numeroAcreditacion`}
                          value={numeroAcreditacion}
                          placeholder={`Nùmero de registro del representante ${representanteNumber}`}
                          onChange={handleChange}
                          disabled={Boolean(
                            activeTab == 99
                              ? fulfillment[
                                  `infoRepresentantes[${index}].numeroAcreditacion`
                                ] ?? true
                              : disabled
                          )}
                          className={error.curp && "p-invalid"}
                          style={{width:'100%', height:42, borderRadius: 6}}
                        />

                      </FormItem>
                    </Grid>
                    <Grid sm={1} md={2} lg={2} gap={3} style={{padding: '0px 15px'}}>
                      <FormItemInputFile
                        fulfillment={fulfillment}
                        setFulfillment={setFulfillment}
                        values={values}
                        errors={errors}
                        fileNames={[
                          `representante${representanteNumber}Poder`,
                          `representante${representanteNumber}INE`,
                        ]}
                        disabled={disabled}
                        onDocumentChange={onDocumentChange}
                        canFulfillment={canFulfillment}
                        activeTab={activeTab}
                      />
                    </Grid>
                  </TabPanel>
              );
            })
            : null}
      </TabView>
    </div>
  );
}
