import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styles from '@app/styles/AgenteComercial.module.css';

export const ModalConfirmAgent = ({visible, setVisible, sendSellerInfo}: any) => {
  return(
    <Dialog visible={visible} style={{ width: '32vw' }} onHide={() => setVisible(false)}>
      <div style={{textAlign: 'center', marginBottom: 20}}>
        <span style={{color: '#1C1B1B', fontSize: 27, fontWeight: 500}}>¿Desea continuar?</span>
      </div>
      <div style={{marginBottom: 50}}>
        <p style={{textAlign: 'center', fontSize: 20, color: '#6A6D74'}}>La información enviada ya no podrá ser modificada en este Módulo.</p>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
        <Button className={styles.buttonCloseModal} onClick={() => setVisible(false)}>Regresar</Button>
        <Button className={styles.buttonConfirmModal} onClick={() => {sendSellerInfo(); setVisible(false)}}>Confirmar</Button>
      </div>
    </Dialog>
  )
}