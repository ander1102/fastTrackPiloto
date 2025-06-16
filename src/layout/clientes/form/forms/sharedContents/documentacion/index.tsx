import Grid from "@app/components/Grid";
import FormItemInputFile, {
  PREFIX_FILE,
} from "@app/layout/clientes/form/FormItemInputFile";
import { useContext, useEffect, useMemo, useState } from "react";
import { ClientFormContext } from "../../context";
import { Button } from "@app/components/Buttons";
import { FormItem } from "@app/components/FormManager/FormItem";

export default function Content() {
  const { clientProps, type } = useContext(ClientFormContext);
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

  const filesNames = useMemo(
    () => (type === "moral" ? ["acta"] : []).concat(["ine", "rfc", "address"]),
    [type]
  );
  const MAX_ADDITIONAL_FILES = 5;

  const [additional, setAdditional] = useState(0);

  useEffect(() => {
    setAdditional(
      values.documents.filter((f) => f.filename.includes(PREFIX_FILE)).length
    );
  }, []);

  return (
    <Grid sm={1} md={2} lg={2} gap={3}>
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
      {additional < MAX_ADDITIONAL_FILES && (
        <div className="flex items-center">
          <Button
            className="!bg-dark w-52"
            disabled={disabled}
            onClick={() => {
              setAdditional(additional + 1);
            }}
          >
            Agregar documento
          </Button>
        </div>
      )}
    </Grid>
  );
}
