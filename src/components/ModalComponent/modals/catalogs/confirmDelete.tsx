import Image from "next/image"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog";
import style from "@app/styles/Productos.module.css";

export const ModalConfirmDelete = ({visible, onHide, handleDeleteProduct}: any) => {
  return(
    <>
      <Dialog
        visible={visible}
        onHide={()=>onHide()}
        style={{ width: "70vw", borderRadius:10, maxWidth: '600px', padding: 0}}
        draggable={false}
        focusOnShow={false}
        headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9, padding: 0}}
      >
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Image src={"/Images/catalogos/iconDelete.svg"} alt="" width={50} height={50}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', margin: "20px 0px"}}>
          <h1 style={{fontSize: 27, color: "#2E3339", fontWeight: 400}}>¿Deseas eliminar este producto?</h1>
        </div>
        <div style={{textAlign: 'center', margin: 'auto', width: '75%', marginBottom: 40}}>
          <p style={{fontSize: 16, fontWeight: 300, color: "#2E3339"}}>Al realizar esta acción se eliminarán todos los datos asociados a este producto. Esta acción es permanente.</p>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40}}>
          <Button className={style.closeModalConfirm} onClick={()=>onHide()}>Regresar</Button>
          <Button style={{marginLeft:"15px", marginRight: 0}} className={style.deleteProduct} onClick={() => handleDeleteProduct()}>Eliminar</Button>
        </div>
      </Dialog>
    </>
  )
}