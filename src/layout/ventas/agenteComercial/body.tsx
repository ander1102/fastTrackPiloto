import React, {useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { toast } from 'react-toastify';
import Image from "next/image";
import { useRouter } from 'next/router';
import { Column } from 'primereact/column';
import { Button, ButtonDetailsLeads } from '@app/components/Buttons';
import styles from '@app/styles/AgenteComercial.module.css'
import { ModalDepositSeller } from '@app/components/ModalComponent/modals/ventas/agenteComercial/DepositModal';

export const AgenteComercialBody = ({item,totalRecords, onRefresh, isCalling, user}: any) => {
  const {rol_tipo} = user.user

  let router = useRouter();
  const [show, setShow] = useState(false);

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
          No hay agentes comerciales
        </div>
      </div>
    )
  }

  const colorCircle:any = {
    Inactivo: "#E93736",
    Activo: "#45CC5F"
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

  const formatFecha = (fecha:any) => {
    const dateObj = new Date(fecha);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  }
  const [canLazy, setCanLazy] = useState(true)
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 25,
    pagina: 1,
  });
  
  const onPage = (event: any) => {    
    setlazyState(event);
    onRefresh({ pagina:(event.page+1)})
  };

  return(
    <section className="container-body">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{color: '#5840D1', fontSize: 25, fontWeight: 400, marginBottom: 30}}>Agente comercial</h1>
        <div style={{padding: '0px 0px 0px 10px'}}>
          {
            rol_tipo === 'Administrador' && (
              <Button onClick={() => setShow(true)} className={styles.btnDeposit}>+ Nuevo deposito</Button>
            )
          }
          {(rol_tipo === 'Administrador' || rol_tipo === 'Gerente_Comercial') && (
            <Button className={styles.buttonConfirmModal} style={{ height: 45}} onClick={() => router.push('/dashboard/ventas/agentenew')}>+ Nuevo Agente</Button>
          )}
        </div>
      </div>
      <DataTable
        value={item ?? []}
        onPage={onPage}
        paginator
        className="datatable-custom"
        scrollHeight="90%"
        scrollable
        rows={25}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        dataKey="idagep_seller"
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
        <Column field="idagep_seller" header="ID"    />
        <Column field="nombre" header="Nombre"  />
        <Column field="telefono" header="Teléfono"  />
        <Column field="estatus" header="Estatus" body={(item) => (
          <div className='flex items-center'>
            <span className={`rounded-full mr-2 h-2 w-2 bg-${colorCircle[item.estatus]}`} style={{backgroundColor: colorCircle[item.estatus]}}/>
            <span>{item.estatus}</span>
          </div>
        )} />
        <Column header="Correo electrónico" align={'center'} alignHeader={'center'}  body={(item) => (
          <a onClick={() => copyToClipboard(item.email)} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <path d="M0.229492 2.08429V15.4419H20.5728V0.182617H0.229492V2.08429ZM1.07683 2.74809L7.68833 7.92288L1.07683 13.6962V2.74809ZM1.33991 14.5925L8.36845 8.45413L10.4006 10.0448L12.4328 8.45413L19.4614 14.5925H1.33991ZM19.7255 13.6962L13.114 7.92186L19.7255 2.74809V13.6962ZM1.07683 1.02996H19.7255V1.67133L10.4017 8.96804L1.07683 1.67133V1.02996Z" fill="#B8AFE6"/>
            </svg>
          </a>
        )}/>
         <Column field="fecha" header="Fecha de registro"  align={'center'} alignHeader={'center'} body={(item) => (<span>{formatFecha(item.fecha)}</span>)}/>
        <Column
          header=""
          body={(item: any) => (
            <ButtonDetailsLeads destino={`/dashboard/ventas/agentecomercial/${item.idagep_seller}`} data={item}/>
          )}
        />
      </DataTable>
      {
        show &&
        <ModalDepositSeller visible={show} onHide={setShow} user={user.persona}/>
      }
    </section>
  )

}