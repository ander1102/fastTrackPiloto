import { useState } from "react";
import { Button } from "primereact/button";
import { modalManager } from "@app/components/ModalComponent";
import CumplimientoModal from "@app/components/ModalComponent/modals/cumplimiento/cumplimientoDoc";

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
    <p className="text-gray-400 text-sm  p-2 flex-1 flex items-center" >
      {props.name && props.extension
        ? `${extractFileName(props.name)}${props.extension.toLowerCase()}`
        : "Sin documento"}
    </p>
  );
};

export const extractFileName = (file: string) => {
  const parts = file.split('/');
  let fileName = parts[parts.length - 1];

  fileName = fileName.split('.').slice(0, -1).join('.');

  fileName = fileName.replace(/_OK$/, '');

  fileName = fileName.replace(/_\d+$/, '');

  return fileName;
}
export function getDocShortName(doc: string): string {
  const parts = doc.split("/");
  if (parts.length < 4) {
    return doc;
  }
  const fourthPart = parts[5];
  const subParts = fourthPart.split("_");
  if (subParts.length < 1) {
    return doc;
  }
  const desiredPart = subParts[0];
  if (!desiredPart) {
    return doc;
  }
  const result = desiredPart[0].toUpperCase() + desiredPart.substring(1);

  return result;
    //return (doc.split('/')[3].split('_')[0])[0].toUpperCase()+(doc.split('/')[3].split('_')[0]).substring(1)
    
}


export default function InputFile(props: TextInputProps) {
    const [extension, setExtension] = useState(() => props.extension);
    let info = { value: props.name ?? "", docType: props.extension ?? "", name: props.id ?? ""}
    
    const onClick = async () => {
        await modalManager.show(
            CumplimientoModal, 
            {item: info}, "dashboard/expediente/editclient"
        );
    };
  return (
    <div className={`flex input-file ${props.className}`}>
        <DisplayFileValue name={props.name} extension={extension} />
        <Button
            onClick={onClick}
            type="button"
            disabled={(props.name && props.extension) ?false :true}
            style={styles.button}
        >
            <i className={"pi pi-eye"} style={{color:(props.name && props.extension) ?'#6B3374':'#6B3374'}} />
        </Button>
    </div>
  );
}
