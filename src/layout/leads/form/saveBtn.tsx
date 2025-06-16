import { SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "@app/styles/Leads.module.css";
import { LeftSaveButton} from "../templates/leadInfo";
import { LeadInfoStructure, saveLeadBody } from "@app/types/Leads";
import { toast } from "react-toastify";
import { LeadsControllers } from "@app/logic/backend/leads";

interface saveBtnProps{
  originalInfo: LeadInfoStructure,
  allInfo: LeadInfoStructure,
  toRefresh: any;
}

export default function SaveBtn({originalInfo, allInfo, toRefresh}:saveBtnProps ) {
  
  const [infoToSend, setInfooSend] = useState(Object)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let ref;
    if (allInfo.infoLead && allInfo.infoLead[0]){
      if (allInfo.infoLead[0].gerente){
				ref = allInfo.infoLead[0].gerente.referencia
				if (allInfo.infoLead[0].agente){
					ref = allInfo.infoLead[0].agente.referencia
				}
			} 
    }

    setInfooSend({
      referencia: ref ?? "",
      idagep_leads: allInfo.idagep_leads,
      infoLead: allInfo.infoLead,
      infoSeguimiento: allInfo.infoSeguimiento,
      infoCotizacion: allInfo.infoCotizacion,
      infoProductos: allInfo.infoProductos,
      fecha: allInfo.fecha,
      estatus: allInfo.estatus,
      operacion: 'U',
    })
  }, [allInfo]);

  const areConsecutive = (arr: number[]): boolean => {
    if (arr.length < 2) {
      return true;
    }
    const sortedArray = arr.slice().sort((a, b) => a - b);
    for (let i = 0; i < sortedArray.length - 1; i++) {
      if (sortedArray[i] + 1 !== sortedArray[i + 1]) {
        return false;
      }
    }
    return true;
  };

  const sendInfo = async (origin: string, value: string) => {
    setLoading(true);
    if (infoToSend.infoMeses?.length > 0 && infoToSend.infoMeses[0].msi) {
      const msiFields = ["msi3", "msi6", "msi9", "msi12", "msi18"];
      const selectedIndices = [];
      for (let i = 0; i < msiFields.length; i++) {
        const currentField = msiFields[i];
  
        if (infoToSend.infoMeses[0][currentField]) {
          selectedIndices.push(i);
        }
      }

      if(selectedIndices.length >= 3 && areConsecutive(selectedIndices)){
        LeadsControllers.saveLeadInfo(infoToSend)
        .then((res) => {
          if (res.isSuccess) {
            toast.success("Lead actualizado correctamente");
            toRefresh()
            setLoading(false)
          } else {
            setLoading(false)
          }
        })
        .catch((res) => {
          toast.error("Ocurrió un error al actualizar estado");
          setLoading(false)
        });
      } else {
        toast.error("Selecciona mínimo menos tres campos consecutivos.");
        setLoading(false);
      }
  
    } else {
      LeadsControllers.saveLeadInfo(infoToSend)
        .then((res) => {
          if (res.isSuccess) {
            toast.success("Lead actualizado correctamente");
            toRefresh()
            setLoading(false)
          } else {
            setLoading(false)
          }
        })
        .catch((res) => {
          toast.error("Ocurrió un error al actualizar estado");
          setLoading(false)
        });
      setLoading(false);
    }
  };
  
  return (
    <>
        <span className="w-full justify-end flex">
            {/*Columna Izquierda */}
            <div className="w-full flex justify-end">
                {/*Row para formulario */}
                <LeftSaveButton catchOrigin={sendInfo} loading={loading} />
            </div>
        </span>
    </>
  );
}
