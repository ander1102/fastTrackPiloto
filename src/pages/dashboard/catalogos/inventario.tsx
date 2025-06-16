import { SetStateAction, useEffect, useState } from "react";
import Grid from "@app/components/Grid";
import withAppContext, { AppContextProps } from "@app/components/HOC/withAppContext";
import { FiltersStore } from "@app/layout/catalogos/inventario/filters";
import { BodyStore } from "@app/layout/catalogos/inventario/body";
import useCall from "@app/hooks/useCall";
import { CatalogsController } from "@app/logic/backend/catalogos";

function InventarioIndex({
  setTitle,
  permission,
  user,
  userType,
}: AppContextProps) {
  const {idagep_empresa} = user;
  const [filters, setFilters] = useState({
    idagep_empresa: idagep_empresa,
    "busqueda": "" ,
    "categorias": "",
    "pagina": 1,
    "tamano_pagina": 10
  });

  const { item, isCalling, itemManager, refresh } = useCall(
    CatalogsController,
    "crudInventario",
    () => ({
      initialParams: [filters] as [body: any],
      skipFistCall: true,
    })
  );

  useEffect(() => {
    refresh([filters]);
  }, [filters]);

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
            Inventario
          </h1>
        </div>
      </Grid>
      <div style={{padding: 20}}>
        <FiltersStore onRefresh={onRefresh}/>
      </div>
      <div className={"datatable-custom !pb-10 !pt-4 !px-10 bg-white"}>
        <BodyStore totalRecords={item?.total ?? 0} isCalling={isCalling} productos={item?.productos ?? []} onRefresh={onRefresh}/>
      </div>
    </>
  )
}

export default withAppContext(
  InventarioIndex,
  "dashboard/catalogos/inventario",
  {
    title: "Inventario",
  }
);
