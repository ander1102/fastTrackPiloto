import InputFile from "./inputFileView";
import { FormItemFulfillment as FormItem } from "../templates";
import { useMemo } from "react";
import {
  INIT_DOCUMENTS,
  INIT_DOCUMENTS_ADDITIONAL,
} from "@app/constants/client";
import { ClientDocuments, FormItemInputFileType } from "@app/types/Clients";

export const PREFIX_FILE = "files_";
export default function FormItemInputFile({
  values,
  onDocumentChange,
  disabled,
  fileNames = [],
  errors,
  fulfillment,
  setFulfillment,
  canFulfillment,
  activeTab,
  additionalFiles
}: FormItemInputFileType) {
  const filterDocument = useMemo(() => {
    const DOCUMENTS_FILES = INIT_DOCUMENTS.filter((f) =>
      fileNames.includes(f.documentoTipo)
    );
    const ADDITIONAL_FILES: ClientDocuments[] = [];
    if (additionalFiles) {
      for (let index = 1; index <= additionalFiles; index++) {
        const tmp = { ...INIT_DOCUMENTS_ADDITIONAL };
        tmp.display = "Documento Adicional " + index;
        tmp.documentoTipo = PREFIX_FILE + index;
        ADDITIONAL_FILES[index] = tmp;
      }
    }

    return DOCUMENTS_FILES.concat(ADDITIONAL_FILES);
  }, [additionalFiles]);
  return (
    <>
      {filterDocument.map((item) => {
        const document = values.documents?.find(
          (doc) => doc.documentoTipo === item.documentoTipo
        );
        const documents: any = errors?.documents ?? {};
        const errorKey = document?.documentoTipo ?? "";
        const errorHas = documents ? documents.hasOwnProperty(errorKey) : false;
        const errorMessage = errorHas ? documents[errorKey] : "";
        return (
          <FormItem
            maxWidth="max-w-full"
            key={item.documentoTipo}
            title={item.display}
            error={errorMessage}
            name={"documents." + item.documentoTipo}
            fulfillment={fulfillment}
            setFulfillment={setFulfillment}
            canFulfillment={canFulfillment}
          >
            <InputFile
              id={document?.documentoTipo || item.documentoTipo}
              name={document?.filename || document?.documentoTipo}
              value={document?.docBase64}
              extension={document?.extension}
              valueType="file"
              onChange={onDocumentChange}
              accept={item.accept}
              disabled={
                Boolean(activeTab == 99
                  ? fulfillment["documents." + item.documentoTipo]??true
                  : disabled)
              }
              className={document?.docBase64 ? "p-withDoc" : "p-noDoc"}
            />
          </FormItem>
        );
      })}
    </>
  );
}
