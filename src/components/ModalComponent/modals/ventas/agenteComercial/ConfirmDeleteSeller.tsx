import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import styles from "@app/styles/AgenteComercial.module.css"

export const ConfirmDelete = ({visible, onHide, handleSubmit, load}: any) => {
  return (
    <Dialog
      headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
      contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9}}
      draggable={false}
      visible={visible}
      style={{ width: '50vw' }}
      onHide={() => onHide(false)}
    >
      <div style={{marginBottom: 20, textAlign: 'center'}}>
        <span style={{color: '#6A6D74', fontSize: '20px', fontWeight: 500}}>¿Deseas eliminar este agente comercial y sus clientes referidos?</span>
      </div>
 
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button loading={load} className={styles.deleteSeller} severity="danger" onClick={() => handleSubmit()}>Confirmar</Button>
        <Button className={styles.buttonConfirmModal} onClick={() => onHide(false)}>Cancelar</Button>
      </div>
    </Dialog>
  )
}