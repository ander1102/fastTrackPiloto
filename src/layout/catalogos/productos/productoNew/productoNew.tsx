import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import style from "@app/styles/Productos.module.css";
import { Button } from 'primereact/button';
import { CreateFormProduct } from './form/createFormProduct';
import router from 'next/router';
import { CatalogsController } from '@app/logic/backend/catalogos';
import { toast } from 'react-toastify';


export const ProductNew = ({setTitle, permission, user, userType}:any) => {
  const {idagep_empresa} = user
  const [categories, setCategories] = useState([]);
  const [formProduct, setFormProduct] = useState<any>({
    img: "",
    nombre: "",
    precio: 0.00,
    existencia: 0,
    descripcion: "",
    categoria:[],
  });

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

  const handleProductNew = async() => {
    let body = {
      "img": removeBase64Prefix(formProduct.img),
      "idagep_empresa" : idagep_empresa,
      "nombre": formProduct.nombre,
      "precio": formProduct.precio,
      "existencia": formProduct.existencia,
      "descripcion": formProduct.descripcion,
      "categorias": formProduct.categoria[0].length > 0 ? formProduct?.categoria[0].map((categories:any) => categories.idagep_categorias): [],
      "operacion": "C" 
    }
    console.log(body)
    const res = await CatalogsController.createProduct(body)
    if (res.response?.estatus === 200 && res.response?.mensaje === "Producto agregado correctamente"){
      router.push('/dashboard/catalogos')
      toast.success(res.response.mensaje)
    } else {
      toast.error(res.response.mensaje)
    }
  }

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

  useEffect(() => {
    getCategories()
  }, [categories.length])

  return (
    <>
      <div style={{padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          <div>
            <span className={style.titleHeaderNew}>Nuevo producto</span>
          </div>
          <div className={style.wrapperBackNavigation} onClick={() => router.back()}>
            <Image style={{width: 20, height: 20}} alt="back" src={require('../../../../../public/Images/backArrow.png')}/>
            <span style={{marginLeft: '10px', fontSize: 20, color: '#6A6D74'}}>Regresar</span>
          </div>
        </div>
        <div>
          <Button
            className={style.btnSaveProduct}
            loading={false}
            disabled={formProduct.nombre === '' || formProduct.precio === 0 || formProduct.precio === null || formProduct.existencia === null}
            onClick={() => handleProductNew()}
          >
            Guardar
          </Button>
        </div>
      </div>
      <div style={{backgroundColor: '#FFF'}}>
        <div style={{padding: 20}}>
          <CreateFormProduct
            setFormProduct={setFormProduct}
            formProduct={formProduct}
            categories={categories}
            setCategories={setCategories}
            idagep_empresa={idagep_empresa}
          />
        </div>
      </div>
    </>
  )
}