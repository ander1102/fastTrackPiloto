import withAppContext, { AppContextProps } from "@app/components/HOC/withAppContext";
import style from "@app/styles/Productos.module.css"
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { UpdateFormProduct } from "@app/layout/catalogos/productos/productoNew/form/updateFormProduct";
import { CatalogsController } from "@app/logic/backend/catalogos";
import { toast } from "react-toastify";
import { ModalConfirmDelete } from "@app/components/ModalComponent/modals/catalogs/confirmDelete";
const CONTEXT = "dashboard/catalogos/productos";

export const ProductDetails = ({ setTitle, permission, user }: AppContextProps) => {
  const router = useRouter();
  const {query:{ id }} = router;
  const {idagep_empresa} = user;
  const [formProduct, setFormProduct] = useState<any>({});
  const [categories, setCategories] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false)

  const getCategories = async() => {
    let body = {
      idagep_empresa,
      "operacion": "R"
    }
    const res = await CatalogsController.crudCategories(body)
    if (res.response?.estatus === 200) {
      const {categorias} = res.response;
      setCategories(categorias)
    }
  }

  const getData = async() =>{
    let body = {
      "idagep_productos": id,
      "operacion": "R"
    }
    const res = await CatalogsController.createProduct(body)
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
      setFormProduct({
        img: data.img !== '' ?`data:image/${imageFormat};base64,${data.img}` : "",
        nombre: data.nombre,
        precio: data.precio,
        existencia: data.existencia,
        descripcion: data.descripcion,
        categoria: data.categorias,
      })
    }
  }

  useEffect(() => {
    getData();
    getCategories();
  }, [id]);
  
  const removeBase64Prefix = (base64String:string)=> {
    const prefix = "data:image/png;base64,";
    const prefixJpg= "data:image/jpeg;base64,"
    if (base64String.startsWith(prefix)) {
      return base64String.slice(prefix.length);
    } else if(base64String.startsWith(prefixJpg)){
      return base64String.slice(prefixJpg.length);
    }
    return base64String;
  }

  const handleUpdateProduct = async() => {
    let body = {
      "idagep_productos": id, 
      "img": removeBase64Prefix(formProduct.img),
      "idagep_empresa" : idagep_empresa,
      "nombre": formProduct.nombre,
      "precio": formProduct.precio,
      "existencia": formProduct.existencia === null ? 0 : formProduct.existencia,
      "descripcion": formProduct.descripcion,
      "categorias":formProduct.categoria && formProduct.categoria.length > 0 ? formProduct.categoria.map((cat:any) => cat.idagep_categorias) : [],
      "operacion": "U"  
    }
    const res = await CatalogsController.createProduct(body)
    if (res.response.estatus ===200){
      toast.success(res.response.mensaje)
    } else {
      toast.error(res.response.mensaje)
    }
  }


  const handleDeleteProduct = async() => {
    let body = {
      idagep_productos: id,
      operacion: 'D'
    }
    const res = await CatalogsController.createProduct(body);
    if (res.response?.estatus === 200) {
      router.push('/dashboard/catalogos/productos')
      toast.success(res.response.mensaje)
    } else {
      toast.error(res.response.mensaje)
    }

  }

  return(
    <>
      <div style={{padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          <div>
            <span className={style.titleHeaderNew}>Detalle del producto</span>
          </div>
          <div className={style.wrapperBackNavigation} onClick={() => router.back()}>
            <Image style={{width: 20, height: 20}} alt="back" src={require('../../../../../public/Images/backArrow.png')}/>
            <span style={{marginLeft: '10px', fontSize: 20, color: '#6A6D74'}}>Regresar</span>
          </div>
        </div>
        <div>
        <Button className={style.deleteProduct} loading={false} onClick={() => setModalConfirm(true)}>Eliminar producto</Button>
        <Button disabled={formProduct.nombre === '' || formProduct.precio === null || formProduct.precio === 0} className={style.btnSaveProduct} loading={false} onClick={() => handleUpdateProduct()}>Actualizar</Button>
        </div>
      </div>
      <div style={{backgroundColor: '#FFF'}}>
        <div style={{padding: 20}}>
          <UpdateFormProduct
            user={user}
            formProduct={formProduct}
            setFormProduct={setFormProduct}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      </div>
      <ModalConfirmDelete visible={modalConfirm} onHide={setModalConfirm} handleDeleteProduct={handleDeleteProduct}/>
    </>
  )
}

export default withAppContext(ProductDetails, CONTEXT, {
  title: "Detalle del Agente Comercial",
});