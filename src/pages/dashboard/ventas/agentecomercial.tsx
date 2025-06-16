import { SetStateAction, useEffect, useState } from "react";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import Grid from "@app/components/Grid";
import { KpiComercial } from "@app/layout/ventas/agenteComercial/kpi";
import { FiltersComercial } from "@app/layout/ventas/agenteComercial/filter";
import { AgenteComercialBody } from "@app/layout/ventas/agenteComercial/body";
import { SellersController } from "@app/logic/backend/sellers";
import useCall from "@app/hooks/useCall";

function AgenteComercial({
  setTitle,
  permission,
  user,
}: AppContextProps) {
  const {persona} = user;
  const [filters, setFilters] = useState({
    idagep_usuarios: persona.idagep_usuarios,
    fechaInicio: "",
    fechaFin: "",
    estatus: "",
    gerente: "",
    agente: "",
    pagina: 1,
    tamano_pagina:15,
  })
  const { item, isCalling, itemManager, refresh } = useCall(
    SellersController,
    "getSellers",
    () => ({
      initialParams: [filters] as [body: any],
      skipFistCall: true,
    })
  );

  useEffect(() => {
    refresh([filters]);
  }, [filters]);

  useEffect(() => {
    itemManager.addEventListenner("change", (items) => {
      setTitle(`Agente Comercial`);
    });

    return () => {
      itemManager.removeEventListenner("change");
    };
  }, []);

  const onRefresh = (curr: SetStateAction<Partial<any>>) => {
    setFilters((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return (
    <>      
      <Grid style={{padding: 20, display: 'flex', justifyContent: 'space-between'}} xl={2} >
        <div>
          <h1 style={{fontSize: 30, fontWeight: 500}}>
            Agente Comercial 
          </h1>
        </div>
        <div>
          <KpiComercial {...item}/>
        </div>
      </Grid>
      <div style={{padding: 20}}>
        <FiltersComercial
          user={user}
          onRefresh={onRefresh}
          filters={filters}
        />
      </div>
      <AgenteComercialBody 
        item={item?.data ?? []}
        isCalling={isCalling}
        permission={permission}
        totalRecords={item?.total ?? 0}
        onRefresh={onRefresh}
        user={user}
      />
    </>
  )
}

export default withAppContext(
  AgenteComercial,
  "dashboard/ventas/agentecomercial",
  {
    title: "Agente Comercial",
  }
);
