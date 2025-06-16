import { SetStateAction, useEffect, useMemo, useState } from "react";
import {SeguimientoRowLead, SeguimientoComentarios} from "../templates/leadInfo";
import styles from "@app/styles/Leads.module.css";
import { LeadInfoStructure, Seguimiento } from "@app/types/Leads";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { LEADCONTACTED } from "@app/constants/form";
import { InputTextarea } from "primereact/inputtextarea";

interface seguimientoProps{
  seguimiento:Seguimiento,
  onRefresh: (body: SetStateAction<Partial<LeadInfoStructure>>) => void;
}

export default function SeguimientoLead({seguimiento, onRefresh}:seguimientoProps) {
  const [contactado, setContactado] = useState(seguimiento.contactado);
  const [fecha, setFecha] = useState<any>(seguimiento.fecha);
  const [comentarios, setComentarios] = useState(seguimiento.comentarios);

  useEffect(() => {
    onRefresh({ infoSeguimiento: [{...seguimiento, contactado, fecha, comentarios}]})
  },[contactado, fecha, comentarios])

  return (
    <>
    <span className="w-full justify-between flex">
    <div className={styles.leftCol}>
       <div className={styles.generalRow}>
       <div className={styles.rowLeftItem}>
          <p className={styles.leadInputTitle}>Contactado</p>
          <Dropdown
            options={LEADCONTACTED}
            value={contactado}
            onChange={(e: any) => setContactado(e.value)}
            placeholder="Seleccionar"
            className="w-full !rounded-md border-[#ced4da] border-[1px]"
          
          />
       </div>
       <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >Fecha</p>
            <Calendar 
                showIcon
                value={ fecha !== '' ? new Date(fecha) : ""}
                onChange={(e) => setFecha((e.value as Date).toISOString().split('.')[0])}
                iconPos="right"
                maxDate={new Date()}
                placeholder="Final"
                className="myNewCalendarButton w-full !border-[#ced4da] border-[1px]"
                dateFormat="dd/mm/yy"
            />
        </div>
       </div>
       <div className={styles.generalRow} >
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >Comentarios</p>
            <InputTextarea placeholder={""} value={comentarios} className={styles.leadTextArea} onChange={(e)=> setComentarios(e.target.value)} />
        </div>
    </div>
       </div>
    </span>
    </>
  );
}
