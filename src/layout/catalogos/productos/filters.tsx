import { useEffect, useState } from "react";
import Grid from "@app/components/Grid";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import styles from "@app/styles/Productos.module.css"
import { useRouter } from "next/router";
import { ModalPreviewOrder } from "@app/components/ModalComponent/modals/catalogs/ModalPreviewOrder";
import { CatalogsController } from "@app/logic/backend/catalogos";

export const FiltersProducts = ({productSelected, setProductSelected, setProductos, productos, onRefresh, user}:any) => {
  const route = useRouter();
  const {idagep_empresa} = user;
  const [showPreview, setShowPreview] = useState(false)
  const [selectedCat, setSelectedCat] = useState(null);
  const [categoriesOpcion, setCategoriesOpcion] = useState([])

  const getOptionsCategories = async() => {
    let body = {
      idagep_empresa,
      "operacion": "R" 
    }
    const res = await CatalogsController.crudCategories(body)
    if (res.response?.estatus === 200) {
      setCategoriesOpcion(res.response.categorias)
    } else {
      setCategoriesOpcion([])
    }
  }

  useEffect(() => {
    getOptionsCategories();
  }, [])

  const handleCateriesFilter = (e: any) => {
    const {value} = e;
    if(value !== null) {
      setSelectedCat(e.value);
      const selectedIds = e.value?.map((category: any) => category.idagep_categorias);
      onRefresh({categorias: selectedIds.length > 0 ? selectedIds : []})
    } else {
      setSelectedCat(null);
      onRefresh({categorias: []})
    }
  };


  const handleNewProduct = () => {
    route.push("/dashboard/catalogos/productos/nuevo")
  }

  const handlePreviewOrder = () => setShowPreview(true)

  return(
    <>
      <Grid xl={2} style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', flexDirection: 'column', paddingRight: '10px'}}>
            <label>Buscar producto</label>
            <span className="p-input-icon-left flex-col items-end">
              <i className="pi pi-search" style={{color: "#B8AFE6"}}/>
              <InputText onChange={(e) => onRefresh({busqueda: e.target.value})}/>
            </span>
          
          </div>
          <div style={{display: 'flex', flexDirection: 'column', paddingRight: '10px'}}>
            <label>Categorias</label>
            <span className="p-input-icon-left flex-col items-end">
              <MultiSelect 
                options={categoriesOpcion}
                maxSelectedLabels={2}
                value={selectedCat}
                showClear
                onChange={(e) => handleCateriesFilter(e)}
                optionLabel="label"
                className="w-[200px]"
              />
            </span>
          </div>
        </div>
        <div style={{display: "flex", alignItems: 'flex-end'}}>
          <div>
            {
              productSelected && productSelected.length > 0 ? 
              <Button className={styles.btnCreateOrder} onClick={()=> handlePreviewOrder()}>+ Crear pedido</Button>
              :
              <Button className={styles.btnProductNew} onClick={()=> handleNewProduct()}>+ Nuevo producto</Button>
            }
          </div>
        </div>

      </Grid>
      <ModalPreviewOrder
        visible={showPreview}
        onHide={()=> setShowPreview(false)}
        productSelected={productSelected}
        setProductSelected={setProductSelected}
        setProductos={setProductos}
        productos={productos}
        user={user}
      />
    </>
    

  )
}