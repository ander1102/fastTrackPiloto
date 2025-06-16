import Grid from "@app/components/Grid";
import { TabPanel, TabView } from "primereact/tabview";
import { INIT_INFO_REPRESENTATIVES } from "@app/constants/client";
import { useContext, useState } from "react";
import { ClientField, ClientFormContext } from "../../../context";
import FormItemInputFile from "@app/layout/clientes/form/FormItemInputFile";

export default function Content() {
  const { clientProps } = useContext(ClientFormContext);
  const {
    fulfillment,
    setFulfillment,
    values,
    errors,
    disabled,
    onDocumentChange,
    canFulfillment,
    activeTab,
  } = clientProps;
  const [representantes] = useState(() => INIT_INFO_REPRESENTATIVES);
  return (
    <TabView id="clientesContactos" renderActiveOnly={false}>
      {representantes.map((_, idx) => {
        const representanteNumber = idx + 1;

        const error = Object.assign(
          { telefono: "", nombre: "", email: "" },
          clientProps.errors && clientProps.errors.infoContactos
            ? clientProps.errors.infoContactos[idx]
            : {}
        );

        const hasError = Object.values(error).some((value) => value !== "");

        return (
          <TabPanel
            key={idx}
            header={`Representante ${representanteNumber}`}
            className={`text-blue-400 ${hasError ? "error-tab" : ""}`}
          >
            <Grid sm={1} md={2} lg={2} gap={3}>
              <ClientField field={`infoRepresentantes[${idx}].nombre`} />
              <ClientField
                field={`infoRepresentantes[${idx}].fechaNacimiento`}
              />
              <ClientField field={`infoRepresentantes[${idx}].rfc`} />
              <ClientField field={`infoRepresentantes[${idx}].curp`} />
              <ClientField field={`infoRepresentantes[${idx}].pais`} />
              <ClientField
                field={`infoRepresentantes[${idx}].numeroAcreditacion`}
              />

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
      })}
    </TabView>
  );
}
