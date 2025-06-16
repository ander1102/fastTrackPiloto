import { SetStateAction, useEffect, useState } from "react";
import Grid from "@app/components/Grid";
import withAppContext, { AppContextProps } from "@app/components/HOC/withAppContext";
import { FiltersProducts } from "@app/layout/catalogos/productos/filters";
import ProductsBody from "@app/layout/catalogos/productos/body";
import { CatalogsController } from "@app/logic/backend/catalogos";
import useCall from "@app/hooks/useCall";
import useEffectAsync from "@app/hooks/useEffectAsync";

function ProductosIndex({
  setTitle,
  permission,
  user,
  userType,
}: AppContextProps) {
  const {idagep_empresa} = user;
  const [productSelected, setProductSelected] =  useState([]);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    idagep_empresa: idagep_empresa,
    "busqueda": "" ,
    "categorias": [],
    "pagina": 1,
    "tamano_pagina": 10
  });
  const [productos, setProductos] = useState([]);

  useEffectAsync(async() => {
    setIsCalling(true)
    const res = await CatalogsController.indexProduct(filters);
    if (res.response?.estatus === 200){
      setTotal(res.response?.total)
      setProductos(res.response.productos)
      setIsCalling(false)
    } else {
      setTotal(0)
      setProductos([])
      setIsCalling(false)
    }
  },[filters])
  
  
  const onRefresh = (curr: SetStateAction<Partial<any>>) => {
    setFilters((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return(
    <>
      <Grid style={{padding: 20, display: 'flex', justifyContent: 'space-between'}} xl={2} >
        <div>
          <h1 style={{fontSize: 30, fontWeight: 500}}>
            Productos
          </h1>
        </div>
      </Grid>
      <div style={{padding: 20}}>
        <FiltersProducts onRefresh={onRefresh} user={user} permission={permission} setTitle={setTitle} userType={userType} productSelected={productSelected} setProductSelected={setProductSelected} productos={productos} setProductos={setProductos}/>
      </div>
      <div className={"datatable-custom !pb-10 !pt-4 !px-10 bg-white"}>
        <ProductsBody
          onRefresh={onRefresh}
          productos={productos}
          isCalling={isCalling}
          setProductos={setProductos}
          setProductSelected={setProductSelected}
          productSelected={productSelected}
          totalRecords={total ?? 0}
        />
      </div>
    </>
  )
}

export default withAppContext(
  ProductosIndex,
  "dashboard/catalogos/productos",
  {
    title: "Productos",
  }
);