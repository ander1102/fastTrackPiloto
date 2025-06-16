import { Button } from "@app/components/Buttons";
import { LEADCONTACTED, LEADESTATUS } from "@app/constants/form";
import { LeadsControllers } from "@app/logic/backend/leads";
import styles from "@app/styles/Leads.module.css";
import { LeadInfoStructure } from "@app/types/Leads";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SetStateAction } from "react";
import { toast } from "react-toastify";
import Grid from "@app/components/Grid";
interface RowLeadProps {
    title1?: string;
    title2?: string;
    title3?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: Date;
    value5?: number;
    value6?: number;
    placeHolder1?:string;
    placeHolder2?:string;
    placeHolder3?:string;
    disabled?: boolean;
    catchOrigin?: any
}

interface Seguimiento {
    title1?: string;
    title2?: string;
    value1?: number;
    value2?: number;
    placeHolder1?:string;
    placeHolder2?:string;
    disabled?: boolean;
    catchOrigin?: any
}

interface ButtonsLead {
    title1?: string;
    value1?: boolean;
    value2?: boolean;
    disabled?: boolean;
    loading?: boolean;
    catchOrigin?: any
}

interface RowDateProps {
    title1?: string;
    value1?: Date;
    placeHolder1?:string;
    disabled?: boolean;
}

interface ComentariosText {
    title1?: string;
    value1?: string;
    placeHolder1?:string;
    disabled?: boolean;
    handleComentarios: any;
}

export const RowFormLead = (item:RowLeadProps) => (
    <div className={styles.generalRow} >
        <div className={styles.rowLeftItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputText placeholder={item?.placeHolder1 || item?.title1} value={item.value1} className={styles.leadInputText} disabled={item?.disabled}  />
        </div>
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >{item?.title2}</p>
            <InputText placeholder={item?.placeHolder2 || item?.title2} value={item.value2} className={styles.leadInputText} disabled={item?.disabled}  />
        </div>
    </div>
);

export const SimpleRowFormLead = (item:RowLeadProps) => (
    <div className={styles.generalRow} >
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputText placeholder={item?.placeHolder1 || item?.title1} value={item.value1} className={styles.leadInputText} disabled={item?.disabled}  />
        </div>
    </div>
);

export const TrimpleRowFormLead = (item:RowLeadProps) => (
    <div className={styles.generalRow} >
        <div className={styles.rowLeftItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputText placeholder={item?.placeHolder1 || item?.title1} value={item.value1} className={styles.leadInputText} disabled={item?.disabled}  />
        </div>
        <div className={styles.rowRightDoubleItem} >
            <div className={styles.rowRightItem} >
                <p className={styles.leadInputTitle} >{item?.title2}</p>
                <InputText placeholder={item?.placeHolder2 || item?.title2} value={item.value2} className={styles.leadInputText} disabled={item?.disabled}  />
            </div>
            <div className={styles.rowRightItem} >
                <p className={styles.leadInputTitle} >{item?.title3}</p>
                <InputText placeholder={item?.placeHolder3 || item?.title3} value={item.value3} className={styles.leadInputText} disabled={item?.disabled}  />
            </div>
        </div>
    </div>
);

export const SimpleDropdownLead = ({ title1, value, onStatusChange, }: { title1: string; value: string; onStatusChange: any; }) => (
    <div className={styles.generalRow} >
        <div className={styles.generalRightItem} >
            <p className={styles.leadStatusDropTitle} >{title1}</p>
            <LeadStatusDropTemplate estatus={value} onStatusChange={onStatusChange} />
        </div>
    </div>
);

export const LeadStatusDropTemplate = ({ estatus, onStatusChange }: { estatus: string, onStatusChange: any }) => {
    return(
        <Dropdown
            id={estatus === 'Nuevo'?'leadNewEstatusDrop':'leadEstatusDrop'}
            options={LEADESTATUS}
            value={estatus ?? estatus}
            onChange={(e) => {onStatusChange(e.value)}}
            optionValue="value"
            optionLabel="label"
            placeholder={"Estatus"}
            valueTemplate={selectedEstatusTemplate}
            style={{ border: estatus === 'Nuevo' ?"1px solid #1AB8AB" :"1px solid #ced4da", width:'100%', background: (estatus === 'Nuevo' ?'#E8FCFA' :'') }}
            //dropdownIcon={'none'}
        />
    )
};

const selectedEstatusTemplate = (option:string, props:any) => {
    if (props.value) {
      return satusBodyTemplate(props.value);
    }
    return <span>{props.placeholder}</span>;
};

const satusBodyTemplate = (item:string) => {
    const arrayClass = {
      'Convertido':  'w-full font-normal truncate flex items-center justify-between cursor-pointer',
      'Nuevo':       'w-full font-normal truncate flex items-center justify-between cursor-pointer text-[#1AB8AB]',
      'Calificado':  'w-full font-normal truncate flex items-center justify-between cursor-pointer',
      'Contactado':  'w-full font-normal truncate flex items-center justify-between cursor-pointer',
      'NoCalificado':  'w-full font-normal truncate flex items-center justify-between cursor-pointer',
    }
  
    return <p className={(arrayClass as any)[item]} > {item}</p> 
};

export const SimpleRightDateLead = ({ title1, value1, disabled, handleLeadFecha, }: { title1: string; value1: Date; disabled: boolean; handleLeadFecha: any; }) => (
    <div className={styles.generalRow}>
        <div className={styles.generalRightItem}>
            <p className={styles.leadInputTitle}>{title1}</p>
            <Calendar
                showIcon
                value={value1}
                onChange={(e) => handleLeadFecha(e.value as Date)}
                iconPos="right"
                maxDate={new Date()}
                placeholder="Fecha de registro"
                className="w-full rounded border-[#ced4da] border-[1px]"
                disabled={disabled}
                dateFormat="dd/mm/yy" 
                showTime 
                hourFormat="12"
                />
        </div>
    </div>
);

export const RightCardsForm = (item:any) => (
    <div className={styles.generalRow} >
        <div className={styles.generalRightItem} >
            <p className={styles.leadInputTitle} >Resumen de solicitud</p>
            {item.item.map((which: any,index: any)=>{
                return leadCard(which)   
            })}
        </div>
    </div>
);

const leadCard = (info:any) => {
    return (
        // <div className="flex w-full justify-between rounded-md p-2 mb-2" style={{border: '1px solid #E4E4E4', background: info.disabled ?'#F7F7F7' :'#FFFFFF'}} >
        <div className="flex w-full justify-between rounded-md p-2 mb-2" style={{border: '1px solid #E4E4E4', background: '#FFFFFF'}} >
            <div className="w-3/4 flex" style={{height: 100}}>
                <p className="text-sm" >{info?.title}</p>
                <p className="text-md font-[500]">{info?.item}</p>
            </div>
            <div className="w-1/4" >
                <p className="text-sm" >{info?.subTitle}</p>
                <p className="text-md">{info?.value}</p>
            </div>
        </div>
    )
}

export const SeguimientoRowLead = (item:RowLeadProps) => (
    <div className={styles.generalRow} >
        <div className={styles.rowLeftItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <Dropdown
              options={LEADCONTACTED}
              value={item?.value1}
              onChange={(e)=>item.catchOrigin('contactado', e.value)}
              //disabled={isCalling}
              placeholder={item.placeHolder1}
              className="w-full !rounded-md border-[#ced4da] border-[1px]"
            />
        </div>
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >{item?.title2}</p>
            <Calendar 
                showIcon
                value={ item.value2 && new Date(item.value2) }
                onChange={(e) => item.catchOrigin('fecha',(e.value as Date).toISOString().split('.')[0])}
                iconPos="right"
                maxDate={new Date()}
                placeholder="Final"
                className="myNewCalendarButton w-full !border-[#ced4da] border-[1px]"
                dateFormat="dd/mm/yy"
            />
        </div>
    </div>
);

export const SeguimientoComentarios = (item:ComentariosText) => (
    <div className={styles.generalRow} >
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputTextarea value={item?.value1} className={styles.leadTextArea} disabled={item?.disabled} onChange={(e)=>item.handleComentarios(e.target.value)} />
        </div>
    </div>
);

export const CotazcionRowLead = (item:Seguimiento) => (
    <div className={styles.generalRow} >
        <div className={styles.rowLeftItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputNumber min={0} inputId="currency-us" value={item?.value1} onChange={(e) => item.catchOrigin('estimada',e.value)} mode="currency" currency="USD" locale="en-US" className="w-full rounded" />
        </div>
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >{item?.title2}</p>
            <InputNumber min={0} inputId="currency-us" value={item?.value2} onChange={(e) => item.catchOrigin('promedio',e.value)} mode="currency" currency="USD" locale="en-US" className="w-full rounded" />
        </div>
    </div>
);

export const CotazcionComisionLead = (item:Seguimiento) => (
    <div className={styles.generalRow} >
        <div className={styles.rowLeftItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputNumber min={0} suffix="%" value={item?.value1} onChange={(e) => item.catchOrigin('debito',e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} className="w-full rounded" />
        </div>
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >{item?.title2}</p>
            <InputNumber min={0} suffix="%" value={item?.value2} onChange={(e) => item.catchOrigin('credito',e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} className="w-full rounded" />
        </div>
    </div>
);

export const CotazcionRowSimple = (item:Seguimiento) => (
    <div className={styles.generalRow} >
        <div className={styles.inputComisionInternacional} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputNumber min={0} suffix="%" value={item?.value1} onChange={(e) => item.catchOrigin('internacional',e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} className="w-full rounded" />
        </div>
    </div>
);

export const ProductosRow = (item:RowLeadProps) => (
    <Grid lg={3}>
        <div className={styles.rowLeftItem} >
            <p className={styles.leadInputTitle} >{item?.title1}</p>
            <InputNumber placeholder={item?.placeHolder1 || item?.title1} value={item.value5} className={styles.leadInputText} disabled={item?.disabled} onChange={(e) => item.catchOrigin('d20',e.value)} min={0} maxFractionDigits={0}/>
        </div>
        <div className={styles.rowRightItem} >
            <p className={styles.leadInputTitle} >{item?.title2}</p>
            <InputNumber placeholder={item?.placeHolder2 || item?.title2} value={item.value6} className={styles.leadInputText} disabled={item?.disabled} onChange={(e) => item.catchOrigin('d30',e.value)} min={0} maxFractionDigits={0}/>
        </div>
    </Grid>
);

export const RowButtonsLead = (item:ButtonsLead) => (
    <div className={styles.buttonsRow} >
        <p className={styles.leadInputTitle} >{item?.title1}</p>
        <div className={styles.rightbuttonsRow} >
            <Button className={item.value1 === true ?styles.selectedButton :styles.notselectedButton} onClick={()=>item.catchOrigin('ecommerce', 'Si')} > Si </Button>
            <Button className={item.value2 === true ?styles.selectedButton :styles.notselectedButton} onClick={()=>item.catchOrigin('ecommerce', 'No')} > No </Button>
        </div>
    </div>
);

export const RightButtonsLead = (item:ButtonsLead) => (
    <div className={styles.buttonsRow} >
        <p className={styles.leadInputTitle} >{item?.title1}</p>
        <div className={styles.rightbuttonsRow} >
            <Button className={item.value1 === true ?styles.selectedButton :styles.notselectedButton} onClick={()=>item.catchOrigin('tarjeta', 'Si')}> Si </Button>
            <Button className={item.value2 === true ?styles.selectedButton :styles.notselectedButton} onClick={()=>item.catchOrigin('tarjeta', 'No')}> No </Button>
        </div>
    </div>
);

export const LeftSaveButton = (item:ButtonsLead) => (
    <div style={{width: '30%'}}>
        <p className={styles.leadInputTitle} >{item?.title1}</p>
        <div>
            <Button className={styles.savebtn} disabled={item?.disabled} onClick={()=>item.catchOrigin('boton', 'nada')} >{ item.loading ?<i className={`pi pi-spin pi-spinner`}/> :'Guardar' }</Button>
        </div>
    </div>
);