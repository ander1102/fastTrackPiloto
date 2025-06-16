import Grid from "@app/components/Grid";
import { FormikCustomerType } from "@app/types/Clients";
import FormItemInputFile from "./FormItemInputFile";

export default function ClientDocumentacion({
  values,
  disabled,
  errors,
  onDocumentChange,
  fulfillment,
  setFulfillment,
  canFulfillment,
  activeTab
}: FormikCustomerType) {
  return (
    <>
      <p className="text-black-500 text-lg mb-5">Documentación</p>

      <Grid sm={1} md={2} lg={2} gap={3}>
        <FormItemInputFile
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          values={values}
          errors={errors}
          fileNames={["acta", "rfc", "ine", "address"]}
          disabled={disabled}
          onDocumentChange={onDocumentChange}
          canFulfillment={canFulfillment}
          activeTab={activeTab}
        />
      </Grid>
    </>
  );
}
