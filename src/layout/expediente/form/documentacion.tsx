import Grid from "@app/components/Grid";
import { FormikCustomerType } from "@app/types/Clients";
import FormItemInputFile from "./FormItemInputFile";
import { useEffect, useMemo, useState } from "react";
import { PREFIX_FILE } from "@app/layout/clientes/form/FormItemInputFile";

export function ExpedienteDocumentacion({
  values,
  disabled,
  errors,
  onDocumentChange,
  fulfillment,
  setFulfillment,
  canFulfillment,
  activeTab,
  person
}: FormikCustomerType) {

  const filesNames = useMemo(
    () => (person === "moral" ? ["acta", "registroPublico", "rfc", "address","estadoDeCuenta"] : []).concat(["ine", "rfc", "address","estadoDeCuenta"]),
    [person]
  );

  const [additional, setAdditional] = useState(0);

  useEffect(() => {
    setAdditional(
      values.documents.filter((f) => f.filename.includes(PREFIX_FILE)).length
    );
  }, [ values.documents]);

  return (
    <>
      <div style={{backgroundColor: '#FAF9F7', padding: 20}}>
        <Grid sm={1} md={2} lg={2} gap={2}>
          <FormItemInputFile
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            values={values}
            errors={errors}
            fileNames={filesNames}
            disabled={disabled}
            onDocumentChange={onDocumentChange}
            canFulfillment={canFulfillment}
            activeTab={activeTab}
            additionalFiles={additional}
          />
        </Grid>
      </div>
    </>
  );
}
