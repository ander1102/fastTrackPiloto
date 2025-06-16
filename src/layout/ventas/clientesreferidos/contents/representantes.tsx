import Grid from "@app/components/Grid";
import { TabPanel, TabView } from "primereact/tabview";
import { INIT_INFO_REPRESENTATIVES } from "@app/constants/client";
import { useContext, useState } from "react";
import { FormContext } from "@app/components/FormManager/FormContext";
import { FormField } from "@app/components/FormManager/FormField";
import FormItemInputFile from "@app/components/FormManager/FormItemInputFile";
export default function Content() {
  

  const { formMethods, formik } = useContext(FormContext);
  const { disabled, handleDocumentChange, activeTab } = formMethods;
  const [representantes] = useState(() => INIT_INFO_REPRESENTATIVES);

  return (
    <TabView renderActiveOnly={false}>
      {representantes.map((_, idx) => {
        const representanteNumber = idx + 1;
        const error = Object.assign(
          { telefono: "", nombre: "", email: "" },
          formik.errors && formik.errors.infoContactos ? formik.errors.infoContactos[idx] : {}
        );

        const hasError = Object.values(error).some((value) => value !== "");

        return (
          <TabPanel
            key={idx}
            header={`Representante ${representanteNumber}`}
            className={`text-blue-400 ${hasError ? "error-tab" : ""}`}
          >
            <Grid sm={1} md={2} lg={2} gap={3}>
              <FormField field={`infoRepresentantes[${idx}].nombre`} />
              <FormField field={`infoRepresentantes[${idx}].fechaNacimiento`} />
              <FormField field={`infoRepresentantes[${idx}].rfc`} />
              <FormField field={`infoRepresentantes[${idx}].curp`} />
              <FormField field={`infoRepresentantes[${idx}].pais`} />
              <FormField
                field={`infoRepresentantes[${idx}].numeroAcreditacion`}
              />

              <FormItemInputFile
                values={formik.values.documents ?? []}
                errors={formik.errors}
                fileNames={[
                  `representante${representanteNumber}Poder`,
                  `representante${representanteNumber}INE`,
                ]}
                disabled={disabled[activeTab]}
                onDocumentChange={handleDocumentChange}
              />
            </Grid>
          </TabPanel>
        );
      })}
    </TabView>
  );
}
