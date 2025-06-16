import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from "primereact/button";
import styles from '@app/styles/Leads.module.css'
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SellersController } from '@app/logic/backend/sellers';

export const MassiveAssign = ({visible, onHide, leadsSelected, user} :any) => {
    const [gerente, setGerente] = useState<any>(null);
    const [seller, setSeller] = useState<any>(null);
    const [optionsManager, setOptionsManager] = useState<any>([]);
    const [optionSeller, setOptionSeller] = useState<any>([]);
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        if (gerente && gerente !== null ){
          getSellerCatalog(gerente.referencia)
          setSeller(null)
        } else {
          setOptionSeller([])
        }
      }, [gerente])
    useEffect(() => {
        getManagerCatalog()
      }, [])

    const getManagerCatalog = async() => {
        const {persona:{idagep_usuarios}} = user
        let res = await SellersController.catalogSeller(idagep_usuarios);
        if(res.isSuccess){
          const {response: {data}}:any = res
          setOptionsManager([...optionsManager, ...data])
        } else {
          setOptionsManager([])
        }
      }
  
    const getSellerCatalog = async(referencia:string) => {
			let res = await SellersController.catalogAgent(referencia);
			if(res.isSuccess){
				const {response: {data}}:any = res
				setOptionSeller(data)
			} else {
				setOptionSeller([])
			}
    }

		const handleSubmit = async() => {
			setLoad(true)
			let ref
			if (gerente){
				ref = gerente.referencia
				if (seller){
					ref = seller.referencia
				}
			}
			const ids = await leadsSelected.map((el: any) => el.idagep_leads)
			if (!ref){
        toast.error("Selecciona un agente para asignar")
				return
			}

			let body = {
				"idLeads" : ids,
				"referencia": ref
			}
			let res = await SellersController.MassiveAssign(body)
			if (res.response.mensaje === 'Lead asignado al agente correctamente'){
				setLoad(false)
				onHide();
				toast.success(res.response.mensaje)
			} else {
				setLoad(false)
				toast.error(res.response.mensaje)
			}
			
		}

    const handleManager = (e:any) => {
        const {value} = e;
        setGerente(value);
    }

    const handleSeller = (e:any) => {
        const {value} = e;
        setSeller(value);
    }

    return(
    <Dialog 
      visible={visible} 
      style={{ width: '70vw', left: 'auto', overflowY: 'hidden' }}
      onHide={() => {onHide()}}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">  
            <div className="col-span-1 p-4 w-full">
                <p className='flex justify-center font-bold text-lg'>Asignación de Gerente y Agente comercial a Lead</p>
                <p className='flex justify-center text-md'>¿Desea realizar la siguiente asignación?</p>
            </div>
            <div className="col-span-1 px-4 w-full flex justify-between">
                <div className="w-2/5 flex" >
                    <DataTable
                        id={'TablaAsignacion'}
                        value={leadsSelected}
                        className="datatable-custom w-full h-full flex justify-between flex-col"
                        scrollHeight="500px"
                        scrollable
                        rows={25}
                        dataKey="idagep_leads"
                        rowHover
                        style={{ color: "#60A5FA", border: '0px solid transparent' }}
                    >
                       <Column field="idagep_leads" header="ID" style={{width:'35%'}}   /> 
                       <Column field="nombre" header="Nombre"  style={{width:'65%'}}  /> 
                    </DataTable>
                </div>
                <div className="w-3/5 flex" >
                    <div className="flex justify-center text-xl text-[#5840D1] ml-2 pt-3" >
                        <i className="pi pi-arrow-right" />
                    </div>
                    <div className="w-1/2 ml-4 flex flex-col">
                        <p className="text-sm text-[#5840D1]" >Gerente comercial</p>
                        <Dropdown
                            options={optionsManager}
                            optionLabel='nombre'
                            value={gerente}
                            onChange={(e) => handleManager(e)}
                            placeholder="Gerente comercial"
                            className="w-full"
                            style={{border:'1px solid #B8AFE6', borderRadius:6}}
                        />
                    </div>
                    <div className="flex justify-center text-xl text-[#5840D1] ml-2 pt-3" >
                        <i className="pi pi-arrow-right" />
                    </div>
                    <div className="w-1/2 ml-4 flex flex-col">
                        <p className="text-sm text-[#5840D1]" >Agente comercial</p>
                        <Dropdown
                            options={optionSeller}
                            value={seller}
                            optionLabel='nombre'
                            onChange={(e) => handleSeller(e)}
                            placeholder="Agente comercial"
                            className="w-full"
                            style={{border:'1px solid #B8AFE6', borderRadius:6}}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center' >
                <Button className={styles.leadRegresarBtn} onClick={()=>onHide()} > 
                    Regresar
                </Button>
                <Button className={styles.leadAssignBtn} loading={load} onClick={()=> {handleSubmit()}} > 
                    Confirmar
                </Button>
            </div>
        </div>
    </Dialog>
  )
}

