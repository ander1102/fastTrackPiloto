import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import Image from "next/image";
import { useRouter } from 'next/router';
import { Column } from 'primereact/column';
import { Button, ButtonDetailsLeads } from '@app/components/Buttons';
import { toast } from 'react-toastify';
import { Dropdown } from 'primereact/dropdown';
import { LEADESTATUS } from '@app/constants/form';
import { modalManager } from '@app/components/ModalComponent';
import { LeadsControllers } from '@app/logic/backend/leads';
import useTruncateAmout from '@app/hooks/useTruncateAmount';
import styles from '@app/styles/AgenteComercial.module.css'
import { ModalDepositSeller } from '@app/components/ModalComponent/modals/ventas/agenteComercial/DepositModal';
import { SellersController } from '@app/logic/backend/sellers';
import { ConfirmDelete } from '@app/components/ModalComponent/modals/ventas/agenteComercial/ConfirmDeleteSeller';

export const AgenteComercialBodyDetails = ({clients, totalRecords, isCalling, onRefresh, userId, user}: any) => {
  const {rol_tipo} = user.user

  const route = useRouter();
  const [show, setShow] = useState(false)
  const [load, setLoad] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [canLazy, setCanLazy] = useState(true)
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 15,
    pagina: 1,
  });
  
  const onPage = (event: any) => {    
    setlazyState(event);
    onRefresh({ pagina:(event.page+1)})
  };

  const agentesEmpty = () => {
    return (
      <div className="w-full flex flex-col items-center text-center mt-10 h-full">
        <Image
          src="/Images/svg/Esperardatos.svg"
          height={200}
          width={200}
          alt=""
        />
        <div className={"text-2xl text-blue-400 font-light"}>
          En espera de datos
        </div>
        <div className=" text-lg text-slate-400 font-light">
          No hay información del agente comercial
        </div>
      </div>
    )
  }

  const colorCircle:any = {
    "Habilitado": "#45CC5F",//verder
    "En proceso": "#FFCC24",//amarillo
    "Prospecto": "#FFA44E",//naranja
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Correo copiado en portapapeles');
      })
      .catch((error) => {
        toast.error('Error al copiar en portapapeles');
      });
  };

  const handleDelete = async() => {
    setLoad(true);
    let res = await SellersController.deleteAgent(userId)
    if(res.response.estatus === 200){

      route.push('/dashboard/ventas/agentecomercial')
      toast.success("Agente eliminado correctamente.")
    } else{
      toast.error('No se pudo eliminar el Agente Comercial')
    }
  } 


  return(
    <section className="container-body">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{color: '#5840D1', fontSize: 25, fontWeight: 400, marginBottom: 30}}>Clientes Referidos</h1>
        {
          rol_tipo === "Administrador" &&
          <div>
            <Button onClick={() => setConfirmDelete(true)} severity="danger" className={styles.deleteSeller}>Eliminar Agente</Button>
          </div>
        }
      </div>
      <DataTable
        onPage={onPage}
        value={clients}
        paginator
        className="datatable-custom"
        scrollHeight="90%"
        scrollable
        rows={15}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        dataKey="idagep_referido"
        rowHover
        filterDisplay="menu"
        loading={isCalling}
        globalFilterFields={["ID"]}
        emptyMessage={agentesEmpty}
        currentPageReportTemplate=""
        style={{ background: "white" }}
        totalRecords={totalRecords}
        lazy={canLazy}
        first={lazyState.first}
      >
        <Column field="idagep_referido" header="ID"/>
        <Column field="nombre" header="Nombre Completo" />
        <Column field="ventas" header="Monto Transaccionado Total" body={(item) => (
          <span>{useTruncateAmout(item.montoTotal)}</span>
        )}/>
        <Column field="progreso" header="Estatus" body={(item) => (
          <div className='flex items-center'>
            <span className={`rounded-full mr-2 h-2 w-2 bg-${colorCircle[item.estatus]}`} style={{backgroundColor: colorCircle[item.estatus]}}/>
            <span>{item.estatus}</span>
          </div>
        )} />
        <Column field="comisiones" header="Comisiones Totales Generadas" align={'center'} alignHeader={'center'} body={(item) => (
          <span>{useTruncateAmout(item.comisionesTotales)}</span>
        )}/>
        <Column header="Correo electrónico" align={'center'} alignHeader={'center'}  body={(item) => (
          <a onClick={() => copyToClipboard(item.email)} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <path d="M0.229492 2.08429V15.4419H20.5728V0.182617H0.229492V2.08429ZM1.07683 2.74809L7.68833 7.92288L1.07683 13.6962V2.74809ZM1.33991 14.5925L8.36845 8.45413L10.4006 10.0448L12.4328 8.45413L19.4614 14.5925H1.33991ZM19.7255 13.6962L13.114 7.92186L19.7255 2.74809V13.6962ZM1.07683 1.02996H19.7255V1.67133L10.4017 8.96804L1.07683 1.67133V1.02996Z" fill="#B8AFE6"/>
            </svg>
          </a>
        )}/>
      </DataTable>
      <ConfirmDelete visible={confirmDelete} onHide={setConfirmDelete} handleSubmit={() => handleDelete()} load={load}/>
    </section>
  )

}