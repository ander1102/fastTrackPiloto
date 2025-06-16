import { useState } from "react";
import { DossiersControllers } from "@app/logic/backend/dossiers";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { ProgressSpinner } from "primereact/progressspinner";
import withModalPageSize, { PageSizeModalProps, } from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { DocumentInfo } from "@app/types/DocInfo";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import styles from "@app/components/ModalComponent/modal.module.css";
import {getDocName} from "@app/layout/expediente/templates/nombres"

interface cumplimientoDocProps extends ViewProps {
  item: DocumentInfo;
}

function cumplimientoDoc({
  item,
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<cumplimientoDocProps>) {
    const [imgBase64, setImgBase64] = useState("");
    const [load, setLoad] = useState(false);

    function downloadDocument(base64:string, extension:string, nombre:string) {
        let prefix;
        console.log(extension)
        if(extension === ".pdf"){
            prefix = "data:application/pdf;base64,"
        } else {
            prefix = "data:image/png;base64,"
        }
        const downloadLink = document.createElement("a");
        downloadLink.href = `${prefix}${base64}`;
        downloadLink.download = nombre[0].toUpperCase()+nombre.substring(1)+extension.toLowerCase();
        downloadLink.click();
    }

    useEffectAsync(async() => {
        setLoad(true)
        // DossiersControllers.documentos
        let res = await DossiersControllers.documentos(item.value)
        if (res.isSuccess && res.response !==""){
            setImgBase64(res.response)
            setLoad(false)
        }else {
            setImgBase64("")
        }

    },[item])

  return (
    
    <Dialog
        header={
            <div className="flex flex-row justify-between">
                <h2 className="font-normal text-xl ">Vista previa</h2>
            </div>
        }
        visible={show}
        style={{ width: "50vw" }}
        maskStyle={visibleStyles}
        maskClassName={styles.ModalBackground}
        draggable={false}
        focusOnShow={false}
        onHide={handleClose}
        headerStyle={{
            color: "#6B3374",
            paddingBottom: 20,
        }}
        dismissableMask
    >
        <div className={"px-5"}>
            {
                load ?
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ProgressSpinner />
                </div>
                :
            <div className="py-4 overflow-y-scroll text-center">
                {
                    item.docType.toLocaleLowerCase() === ".pdf"
                    ?   <iframe 
                            src={`data:application/pdf;base64,${imgBase64}`}
                            className="w-full border-transparent pointer-events-none"
                            width="100%"
                            height="500px"
                            style={{maxHeight:500}} 
                        />
                    :   <img
                            src={`data:image/png;base64,${imgBase64}`}
                            className={"mx-auto"}
                            style={{maxHeight:500}}
                            alt=""
                        />
                }
            </div>
            }
            <div className="flex justify-between w-full mt-5">
                <div className="w-1/2">
                    <p className={"text-md"}>Documentación:</p>
                    <p className={"text-sm text-[#6B3374]"}>{getDocName(item?.name)}</p>
                </div>
                <div className="w-1/2 flex flex-col justify-end">
                    <i className="pi pi-download text-right text-[#6B3374] cursor-pointer" onClick={()=>downloadDocument(imgBase64, item.docType.toLowerCase(), item.name)}  />
                </div>
            </div>
        </div>
    </Dialog>
  );
}

export default withModalPageSize(cumplimientoDoc);
