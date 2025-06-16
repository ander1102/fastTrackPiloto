import { blobToBase64, getFileExtension } from "@app/common/format";
import useValueHandler from "@app/hooks/useValueHandler";
import { upload } from "@app/utils/DOM";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getDocShortName } from "@app/layout/expediente/form/inputFileView";

type Type = "fileName" | "file";

export interface OnChangeParams {
  value: string;
  filename: string;
  extension: string;
  id?: string;
}

interface TextInputProps {
  id?: string;
  accept?: string;
  name?: string;
  value?: string | null;
  onChange?: (value: OnChangeParams) => void;
  valueType?: Type;
  extension?: string;
  disabled?: boolean;
  className?: string;
  errorIconColor?:string;
}

const styles = {
  button: {
    backgroundColor: "transparent",
    color: "#B8AFE6",
    border:'none'
  },
};
const DisplayFileValue = (
  props: Omit<TextInputProps, "accept" | "value" | "valueType">
) => {
  return (
    <p
      style={{ backgroundColor: "##EFEDFA" }}
      className="text-gray-400 text-sm  p-2 flex-1"
    >
      {props.name && props.extension
        ? `${getDocShortName(props.name)}${props.extension.toLowerCase()}`
        : "Agregar documento"}
    </p>
  );
};

export default function InputFile(props: TextInputProps) {
  const [extension, setExtension] = useState(props.extension);
  const [base64, setBase64] = useValueHandler(() => props.value ?? null);

  useEffect(()=>{
    setExtension(props.extension)
  },[props.extension])

  const onClick = async () => {
    const file = await upload(false, props.accept);
    if (!file) return;
    const exts = file.name.split(".");
    const ext = getFileExtension(file.name);
    const extensionesPermitidas = ['.pdf', '.png', '.jpeg', '.jpg'];

    if (!extensionesPermitidas.includes(ext)) {
      toast.error('Extensión no permitida');
      return;
    }

    const fileBase64 = await blobToBase64(file);
    setExtension(ext);
    setBase64(fileBase64);
    if (props.onChange)
      props.onChange({
        value:
          props.valueType && props.valueType !== "fileName"
            ? fileBase64 ?? ""
            : file.name,
        filename: exts.slice(0, exts.length - 1).join(""),
        extension: ext,
        id: props.id,
      });
  };

  return (
    <div className={`flex input-file ${props.className}`}>
      <DisplayFileValue name={props.name} extension={extension} />
      <Button
        onClick={onClick}
        type="button"
        disabled={props.disabled}
        style={styles.button}
      >
        <i className={"pi pi-upload"} style={props.errorIconColor? {color: '#6B3374'} : {color:(props.name && props.extension) ? '#6B3374':'#6B3374'}} />
      </Button>
    </div>
  );
}
