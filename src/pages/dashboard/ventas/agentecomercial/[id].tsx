import Grid from "@app/components/Grid";
import withAppContext, { AppContextProps } from "@app/components/HOC/withAppContext";
import { KpiDetails } from "@app/layout/ventas/agenteComercial/Details/kpi";
import { useRouter } from "next/router";
import Image from 'next/image';
import style from '@app/styles/AgenteComercial.module.css'
import { AgenteComercialBodyDetails } from "@app/layout/ventas/agenteComercial/Details/body";
import { SetStateAction, useEffect, useState } from "react";
import { SellersController } from "@app/logic/backend/sellers";
import useCall from "@app/hooks/useCall";

const CONTEXT = "dashboard/ventas/agentecomercial";

function DetailsAgent({ setTitle, permission, user }: AppContextProps) {
  const router = useRouter();
  const {query:{ id }} = router;
  const [kpiDetails, setKpiDetails] = useState({
    comisionTotal:0, 
    comisionTotalPagadas:0,
    comisionTotalxPagar:0,
    montoTotal: 0,
    dias: 0,
    clientesR: 0,
    fechaR: 'AA/DD/MM'
  })
  const [name, setName] = useState<any>('');
  const [filters, setFilters] = useState({
    "idagep_seller": id,
    tamano_pagina:15,
    pagina: 1,
  })

  useEffect(()=> {
    const {nombre} = router.query
    setName(nombre)
    getDetailSellerKpi();
  }, [])

  const getDetailSellerKpi = async() => {
    let res = await SellersController.detailSellerKpi(id)
    if(res.isSuccess){
      const {response: {comisionTotal, comisionTotalPagadas,comisionTotalxPagar,montoTotal, dias, clientesR, fechaR}} = res;
      setKpiDetails({
        comisionTotal, 
        comisionTotalPagadas,
        comisionTotalxPagar,
        montoTotal,
        dias, 
        clientesR,
        fechaR
      })
    } else {
      setKpiDetails({
        comisionTotal: 0, 
        comisionTotalPagadas: 0,
        comisionTotalxPagar: 0,
        montoTotal: 0,
        dias: 0,
        clientesR: 0,
        fechaR: 'AA/DD/MM'
      })
    }
  }

  const onRefresh = (curr: SetStateAction<Partial<any>>) => {
    setFilters((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };
  useEffect(() => {
    refresh([filters]);
  }, [filters]);


  const { item, isCalling, itemManager, refresh } = useCall(
    SellersController,
    "detailSeller",
    () => ({
      initialParams: [filters] as [body: any],
      skipFistCall: true,
    })
  );

  return(
    <>
      <Grid style={{padding: 20, display: 'flex', justifyContent: 'space-between'}} xl={2} >
        <div>
          <h1 style={{fontSize: 30, fontWeight: 500}}>
            {name}
          </h1>
          <div className={style.wrapperBackNavigation} onClick={() => router.push('/dashboard/ventas/agentecomercial')}>
            <Image style={{width: 20, height: 20}} alt="back" src={require('../../../../../public/Images/backArrow.png')}/>
            <span style={{marginLeft: '10px', fontSize: 20, color: '#6A6D74'}}>Regresar</span>
          </div>
        </div>
        <div>
          <KpiDetails item={item ?? {}}/>
        </div>
      </Grid>
      <Grid style={{paddingInlineEnd: '20px', display: 'flex', justifyContent: 'flex-end', marginBottom: 30}}> 
        <div style={{padding: '0px 20px'}}>
          <div>
            Clientes referidos Totales
          </div>
          <span style={{color: '#5840D1', fontSize: 17, fontWeight: 500}}>{item?.totalReferidos ?? 0}</span>
        </div>
        <div style={{padding: '0px 20px'}}>
          <div>
            Tiempo operando
          </div>
          <span style={{color: '#5840D1', fontSize: 17, fontWeight: 500}}>{item?.diasOperando ?? 0} Días</span>
        </div>
        <div style={{padding: '0px 20px'}}>
          <div>
            Fecha de registro
          </div>
          <span style={{color: '#5840D1', fontSize: 17, fontWeight: 500}}>{item?.fechaRegistro ?? 'AA/DD/MM'}</span>
        </div>
      </Grid>
      <AgenteComercialBodyDetails isCalling={isCalling} onRefresh={onRefresh} clients={item?.data ?? []} totalRecords={item?.total ?? 0} userId={id} user={user}/>
    </>
  )
}

export default withAppContext(DetailsAgent, CONTEXT, {
  title: "Detalle del Agente Comercial",
});