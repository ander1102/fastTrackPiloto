import Grid from "@app/components/Grid";
import FormItemInputFile from "@app/components/FormManager/FormItemInputFile";
import { useContext } from "react";
import { FormContext } from "@app/components/FormManager/FormContext";

export default function Content() {
  const { formMethods, formik } = useContext(FormContext);
  const { disabled, handleDocumentChange, activeTab } = formMethods;

  return (
    <>
      <p className="text-primary text-2xl font-medium mb-5">Documentación</p>

      <Grid sm={1} md={2} lg={2} gap={3} className="bg-[#faf9f7] p-5">
        <FormItemInputFile
          values={formik.values.documents ?? []}
          errors={formik.errors}
          fileNames={["acta","ine", "rfc", "estadoDeCuenta", "address"]}
          disabled={disabled[activeTab]}
          onDocumentChange={handleDocumentChange}
        />
      </Grid>
    </>
  );
}
