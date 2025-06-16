import withAppContext, { AppContextProps } from "@app/components/HOC/withAppContext";
import { CreateFormProduct } from "@app/layout/catalogos/productos/productoNew/form/createFormProduct";
import style from "@app/styles/Productos.module.css"
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { InventarioForm } from "@app/layout/catalogos/inventario/form/inventarioForm";
import { CatalogsController } from "@app/logic/backend/catalogos";
import { toast } from "react-toastify";
import { ModalConfirmDelete } from "@app/components/ModalComponent/modals/catalogs/confirmDelete";
const CONTEXT = "dashboard/catalogos/inventario";

export const StorageDetails = ({ setTitle, permission, user }: AppContextProps) => {
  const router = useRouter();
  const {query:{ id }} = router;
  const [inventario, setInventario] = useState<any>({})
  const [modalConfirm, setModalConfirm] = useState(false)

  const getData = async() =>{
    let body = {
      "idagep_productos": id, 
      "operacion": "R"
    }
    const res = await CatalogsController.detailInventario(body)
    if (res.response?.estatus === 200) {
      const {data} = res.response;
      let imageFormat = '';
      if (data.img) {
        if (data.img.startsWith('/9j/')) {
          imageFormat = 'jpeg';
        } else if (data.img.startsWith('iVBORw0KGgo=')) {
          imageFormat = 'png';
        }
        // Agrega más condiciones si es necesario para otros formatos
      } 
      setInventario({
        img: data.img !== '' ?`data:image/${imageFormat};base64,${data.img}` : "",
        nombre: data.nombre,
        referencia: data.referencia,
        existencia: data.existencia,
        alerta: data.alerta === 1,
        unidadesMin: data.unidadesMin
      })
    }
  }

  useEffect(() => {
    getData();
  }, [id]);


  const handleUpdateStore = async() => {
    let body = {
      "idagep_productos": id, 
      "existencia" : inventario.existencia,
      "unidadesMin": inventario.unidadesMin,
      "referencia": inventario.referencia,
      "alerta": inventario.alerta ? 1 : 0, 
      "operacion": "U"
    }
    const res = await CatalogsController.detailInventario(body)
    if (res.response.estatus === 200) {
      toast.success(res.response.mensaje)
    } else {
      toast.error(res.response.mensaje)
    }
    
  }

  const handleDeleteProduct = async() => {
    let body = {
      "idagep_productos": id,
      "operacion": "D"
    }
    const res = await CatalogsController.detailInventario(body)
    if (res.response?.estatus === 200) {
      toast.success(res.response?.mensaje)
      router.push('/dashboard/catalogos/inventario')
    } else {
      toast.error(res.response?.mensaje)
    }
  }

  return (
    <>
      <div style={{padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          <div>
            <span className={style.titleHeaderNew}>Detalle de Inventario</span>
          </div>
          <div className={style.wrapperBackNavigation} onClick={() => router.back()}>
            <Image style={{width: 20, height: 20}} alt="back" src={require('../../../../../public/Images/backArrow.png')}/>
            <span style={{marginLeft: '10px', fontSize: 20, color: '#6A6D74'}}>Regresar</span>
          </div>
        </div>
        <div>
        <Button className={style.deleteProduct} loading={false} onClick={() => setModalConfirm(true)}>Eliminar producto</Button>
        <Button className={style.btnSaveProduct} loading={false} onClick={() => handleUpdateStore()}>Actualizar</Button>
        </div>
      </div>
      <div style={{backgroundColor: '#FFF'}}>
        <div style={{padding: 20}}>
          <InventarioForm data={inventario} setInventario={setInventario}/>
        </div>
      </div>
      <ModalConfirmDelete visible={modalConfirm} onHide={setModalConfirm} handleDeleteProduct={handleDeleteProduct}/>
    </>
  )
}

export default withAppContext(StorageDetails, CONTEXT, {
  title: "Detalle del Inventario",
});