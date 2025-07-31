import React from "react";
import Image from "next/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { assetsConfig } from "../../../assets.config";

interface ITransactionDetailsPdf {
  depositResume: any;
  transactions: any[];
}
const DepositDetailsPdf = React.forwardRef<
HTMLDivElement,
ITransactionDetailsPdf
>(({ depositResume, transactions }, ref) => {

  const data = [
    {
      id: depositResume.ventas,
      name: 'Ventas totales',
    },
    {
      id: depositResume.comisiones,
      name: 'Comisiones',
    },
    {
      id: depositResume.iva,
      name: 'IVA de la Comisión',
    },
    {
      id: depositResume.deducciones,
      name: 'Reversos / Cancelaciones / Devoluciones',
    },
    {
      id: depositResume.subtotal,
      name: 'Depósito',
    },
  ]
  
  const getStylesTotal = (rowData : any) => {
    return <span style={{ fontWeight: rowData.name === 'Depósito' ? "bold" : 500 , color: rowData.name === 'Depósito' ? 'var(--primary-color)' : ''}}>{rowData.name}</span>
  }
  
  const getStylesTotal2 = (rowData : any) => {
    return <span style={{fontWeight: rowData.name === 'Depósito' ? "bold" : 500, color: rowData.name === 'Depósito' ? 'var(--primary-color)' : ''}}>{rowData.id}</span>
  }

  const FormatDateTime = (item:any) => {
    if (item !== ''){
      const fechaObjeto = new Date(item);
      const dia = fechaObjeto.getDate();
      const mes = fechaObjeto.getMonth() + 1;
      const anio = fechaObjeto.getFullYear();
      let horas = fechaObjeto.getHours();
      const minutos = fechaObjeto.getMinutes();
      const periodo = horas >= 12 ? 'pm' : 'am';
      horas = horas % 12 || 12;
      return `${dia}/${mes}/${anio} ${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos} ${periodo}`;
    }
  }

  return(
    <article
      className="bg-white w-full min-h-screen flex flex-col p-12 pb-0"
      ref={ref}
    >
      <section className="flex-[3] mt-6">
        <img alt="Logo" src={assetsConfig.depositos.logo_pdf} width={150}/>
        <div style={{marginTop: 20}}>
          <h1 style={{fontSize: 22}}>Resumen de <span style={{fontWeight: 'bolder'}}>depósito</span></h1>
        </div>

        <div style={{marginTop: 20}}>
          <span>Se ha efectuado un <span style={{fontWeight: 'bold'}}>depósito</span> a tu cuenta bancaria registrada</span>
        </div>
        {/* Detalles */}
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: '40%'}}>
            <span style={{fontSize: 14, fontWeight: 700}}>Detalle Transacción:</span>
          </div>
          <div style={{width: '60%'}}>
            <div style={{marginBottom: 12}}>
              <span>Acción: </span>
              <span style={{fontWeight: 700}}>Depósito</span>  
            </div>
            <div style={{marginBottom: 12}}>
              <span>Cuenta: </span>
              <span>{depositResume.cuenta}</span>
            </div>
            <div style={{marginBottom: 12}}>
              <span>Monto: </span>
              <span>{depositResume.subtotal}</span>
            </div>
            <div style={{marginBottom: 12}}>
              <span>Banco: </span>
              <span>{depositResume.banco}</span>
            </div>
            <div style={{marginBottom: 12}}>
              <span>Fecha: </span>
              <span>{depositResume.FechaHora}</span>
            </div>
          </div>
        </div>
        <span>El depósito realizado corresponde a las ventas realizadas del <span style={{color: 'var(--primary-color)', fontSize: '14px', fontWeight: 700}}>{`(${depositResume.primera_fecha} - ${depositResume.ultima_fecha})`}</span></span>
        <div>
          <DataTable value={data} tableStyle={{ minWidth: '50rem' }} className="deposit-details" id="deposit-details-yellow">
            <Column key={1} field={"name"} body={getStylesTotal} header={"Concepto"} style={{ maxWidth: '150px' }}/>
            <Column key={2} field={"id"} body={getStylesTotal2} alignHeader={'center'} bodyStyle={{ textAlign: 'center' }} header={"Cantidad / Monto"} />
          </DataTable>
        </div>
        <div style={{marginTop: 40}}>
          <DataTable value={transactions && transactions.length > 0 ? transactions : []} className="transactions-pdf mt-6" id="transactions-pdf">
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12, border: '5px solid red'}} header="ID" field="req_id" style={{ width: '25px' }}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="Sucursal" field="Sucursal" style={{ width: '35px' }}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="Método de pago" field="tipotarj" style={{ width: '35px' }}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="Fecha y Hora" field="FechaHora" style={{ width: '65px' }} body={(item:any) => FormatDateTime(item.FechaHora)}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="Monto total" field="monto" body={(item) => item.monto.replace("MXN","")} style={{ width: '30px' }}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="Comisión" field="comision" body={(item) => item.comision.replace("MXN","")} style={{ width: '20px' }}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="IVA de comisión" field="iva" style={{ width: '20px' }} body={(item) => item.iva.replace("MXN","")}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="Saldo Thunderpay" field="saldo" style={{ width: '40px' }} body={(item) => item.saldo?.replace("MXN","")}></Column>
            <Column headerStyle={{fontSize: 12}} bodyStyle={{fontSize: 12}} header="Saldo Thunderpay Acumulado" field="acumulado" body={(item) =>item.acumulado.replace("MXN","")} style={{ width: '40px' }}></Column>
          </DataTable>
        </div>
      </section>
    </article>
  )
})

export default DepositDetailsPdf;