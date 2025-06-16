import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DateFormat } from "@app/common/format";
import styles from "@app/styles/DepositsModal.module.css"
import useEffectAsync from "@app/hooks/useEffectAsync";
import { DepositsControllers } from "@app/logic/backend/deposits";
import { DateDDMMYYHHMMA } from "@app/common/date";

function LiquidacionDetailsModal (props: any) {
  const {user, filters} = props;
  const date = new Date();
  const start = DateFormat.month.start(date, true);
  const end = DateFormat.month.end(date, true);
  const [transactions, setTransactions] = useState<Array<any>>([]);
  const [load, setLoad] = useState<boolean>(false)
  const [details, setDetails] = useState<any>({});

  const downloadExcel = async () => {
    setLoad(true)
    try {
      let payload = { 
        "idagep_liquidaciones_emp": props.item.idagep_liquidaciones_emp,
        "operacion" : "H",
        "idagep_usuarios" : user.persona.idagep_usuarios,
        "fechaInicio" : filters.fechaInicio,
        "fechaFin" : filters.fechaFin,
      }
      const {response} = await DepositsControllers.getExcelDetail2(payload)
      console.log("EXCEL",response)
      const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response}`;
      const downloadLink = document.createElement('a');
      const fileName = `detalle-liquidación.xlsx`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {
      setLoad(false)
      console.error('Error al descargar el archivo:', error);
    }
    setLoad(false)
  };

  const getStylesTotal = (rowData : any) => {
    return <span style={{color: rowData.name === 'Depósito' ? '#6B3374' : ''}}>{rowData.name}</span>
  }

  const getStylesTotal2 = (rowData : any) => {
    return <span style={{color: rowData.name === 'Depósito' ? '#6B3374' : ''}}>{rowData.id}</span>
  }
  const isObjectEmpty= (obj: any)=>{
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
  useEffectAsync(async() => {
    if(!isObjectEmpty(props.item)){
      let payload = { 
        "idagep_liquidaciones_emp": props.item.idagep_liquidaciones_emp,
        "operacion" : "H",
        "idagep_usuarios" : user.persona.idagep_usuarios,
        "fechaInicio" : filters.fechaInicio,
        "fechaFin" : filters.fechaFin,
      }
      DepositsControllers.getExcelDetail(payload)
      .then((res) => {
        if (res.status === 200){
          setTransactions(res.response.liquidaciones)
        }
      })
      .catch((err) => {
        console.error(err)
      })

    }
  }, [props.item])

  useEffectAsync(async() => {
    if(!isObjectEmpty(props.item)){
      const {idagep_liquidaciones_emp} = props.item
      let body:any = {
        "idagep_liquidaciones_emp": idagep_liquidaciones_emp,
        operacion: "R",
       "idagep_usuarios" : user.persona.idagep_usuarios,
        "fechaInicio" : filters.fechaInicio,
        "fechaFin" : filters.fechaFin,
      }
      const {response, isSuccess, status} = await DepositsControllers.detailLiquidation(body);
      if (status === 200) {
        console.log(response)
        setDetails(response.liquidaciones[0])
      } else {
        setDetails({})
      }
    }
  }, [props.item.idagep_liquidaciones_emp]);

  let data = [
    {
      id: details?.ventas,
      name: 'Ventas totales',
    },
    {
      id:  details?.comisiones,
      name: 'Comisiones',
    },
    {
      id:  details?.iva,
      name: 'IVA de la Comisión',
    },
    {
      id:  details?.deducciones,
      name: 'Reversos / Cancelaciones / Devoluciones',
    },
    {
      id:  details?.monto,
      name: 'Depósito',
    },
  ]

  return(
    <Dialog 
      draggable={false}
      visible={props.visible}
      onHide={() => props.onHide(false)}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      header={
        <div className="dialog-header">
          <h2 className="dialog-title !text-[#6B3374]">Detalle de liquidación</h2>
          <div>
            <Button loading={load} className={`mr-5 ${styles.btnDownload}`} onClick={() =>downloadExcel()} aria-controls="popup_menu_left" aria-haspopup>
              <Image src="/Images/svg/ico/export.svg" width={15} height={12} alt="" className={ load ? "ml-2 mr-2":"mr-2"}/>
              Descargar
            </Button>
          </div>
        </div>
      }
    >
      <div className="mt-[30px]">
        <span>La liquidación corresponde a las transacciones realizadas el <span style={{color: '#6B3374', fontSize: '14px', fontWeight: 700}}>{DateDDMMYYHHMMA(props.item.fecha)}</span></span>
        <DataTable value={data} tableStyle={{ width: '100%' }} className="deposit-details" id="deposit-details">
          <Column key={1} field={"name"} body={getStylesTotal} header={"Concepto"} style={{ maxWidth: '150px' }}/>
          <Column key={2} field={"id"} body={getStylesTotal2} alignHeader={'center'} bodyStyle={{ textAlign: 'center' }} header={"Cantidad / Monto"} />
        </DataTable>
      </div>
    </Dialog>
  )
}

export default LiquidacionDetailsModal;