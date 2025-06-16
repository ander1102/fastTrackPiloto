import withModalPageSize, { PageSizeModalProps, } from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import styles from "@app/components/ModalComponent/modal.module.css";
import { LeadConfirmEstatus } from "@app/types/Leads";
import { LEADESTATUS } from "@app/constants/form";
import { Button } from "primereact/button";

interface leadStatusConfirmationProps extends ViewProps<boolean> {
  item: LeadConfirmEstatus;
}

function leadStatusConfirmation({
  item,
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<leadStatusConfirmationProps>) {
    
    let elEstatus = item.newStatus

    const estatusText = (estatus:string) => {
        switch(estatus){
            case 'nocalificado': return 'El Lead perderá los accesos a la plataforma.'
            case 'convertido': return 'El Lead se mostrará visible dentro del módulo de Clientes Referidos.'
            default: return('')
        }
    }

    return (
        <Dialog
            id="statusLeadConfModal"
            visible={show}
            style={{ width: "40vw", borderRadius:10}}
            maskStyle={visibleStyles}
            maskClassName={styles.ModalBackground}
            draggable={false}
            focusOnShow={false}
            onHide={()=>handleClose(false)}
            dismissableMask
            headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
            contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9}}
        >
            <div className={"px- px-0"}>
                <h5 className="text-2xl w-full flex justify-center font-[400] !color-[#1C1B1B]" >Confirmación de estado</h5>
                <div className="pt-5" >
                    <p className="flex text-xl w-full justify-center text-center font-[300]" >¿Deseas cambiar el estado a &nbsp;<b>{LEADESTATUS.find(item => item.value === elEstatus)?.label}</b> ?</p>
                    <p className="flex text-lg w-full justify-center text-center font-[300] px-10 text-[#6A6D74]" >{estatusText(item.newStatus)}</p>
                </div>
                <div className="py-5 px-10 flex justify-between" >
                    <Button className={styles.cancelStatusBtn} onClick={()=>handleClose(false)} >Regresar</Button>
                    <Button className={elEstatus === 'nocalificado' ?styles.noCalificadoStatusBtn :styles.confirmStatusBtn} onClick={()=>handleClose(true)} >Confirmar</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default withModalPageSize(leadStatusConfirmation);
