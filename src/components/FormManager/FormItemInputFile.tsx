import InputFile from "@app/components/InputFile";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FilesName,FilesNameType } from "@app/components/FormManager/FilesName"


export interface FormItemInputFileType{
  disabled:boolean;
  errors:{documents:{}};
  onDocumentChange:()=>void;
  values:Array<FilesNameType>;
  fileNames:Array<string>
}

export default function FormItemInputFile({
  values,
  onDocumentChange,
  disabled,
  fileNames = [],
  errors,
}: FormItemInputFileType) {
  const filterDocument: Array<FilesNameType> = FilesName.filter((f) =>
    fileNames.includes(f.documentoTipo)
  );
  return (
    <>
      {filterDocument.map((item) => {
        const document: FilesNameType | undefined = values.find(
          (doc) => doc.documentoTipo === item.documentoTipo
        );
        if (document) {
          const documentErrors: any = errors?.documents ?? {};
          const errorKey = document?.documentoTipo ?? "";
          const errorHas = documentErrors
            ? documentErrors.hasOwnProperty(errorKey)
            : false;
          const errorMessage = errorHas ? documentErrors[errorKey] : "";
          return (
            <FormItem
              key={item.documentoTipo}
              required={item.required}
              label={item.display}
              error={errorMessage}
            >
              <InputFile
                id={document.documentoTipo || item.documentoTipo}
                name={document.filename || document.documentoTipo}
                value={document.docBase64}
                extension={document.extension}
                valueType="file"
                onChange={onDocumentChange}
                accept={item.accept}
                disabled={disabled}
                className={document?.filename ? "p-noDoc" : "p-withDoc"}
              />
            </FormItem>
          );
        }
      })}
    </>
  );
}
