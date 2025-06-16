import LeadsInputText from "@app/components/Inputs/LeadsInputText";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { LEADESTATUS_ALL } from "@app/constants/form";
import { PermissionProps } from "@app/types/User";
import { LeadsGetBody } from "@app/types/Leads";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "./templates";
import InputSearch from "@app/components/InputSearch";
import { Button } from "primereact/button";

import { NewLeadModal } from "./Modal/NewLeadModal";
import { useRouter } from "next/router";
import { LeadsControllers } from "@app/logic/backend/leads";
import styles from '@app/styles/Leads.module.css'
import { toast } from "react-toastify";
import { copyToClipboard } from "@app/utils/DOM";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { MassiveAssign } from "./Modal/MassiveAssign";
import { SellersController } from "@app/logic/backend/sellers";
interface LeadsHeaderProps extends PermissionProps {
  onRefresh: (body: SetStateAction<Partial<any>>) => void;
  filters: any;
  isCalling: boolean;
  user: any;
  setLeadSelected:any
  leadsSelected: any
}

export default function LeadsTableHeaders({
  permission,
  onRefresh,
  filters,
  isCalling,
  user,
  setLeadSelected,
  leadsSelected
}: LeadsHeaderProps) {
  const [optionsManager, setOptionsManager] = useState([{nombre: 'Todos', referencia: ''}]);
  const [optionSeller, setOptionSeller] = useState<any>([]);
  const [gerente, setGerente] = useState<any>(null);
  const [seller, setSeller] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false)
  const DropDownRef = useRef<Dropdown>(null);
  const rol = user.user.rol_tipo;
    function copyRefLink(){
        //copyToClipboard('https://admin.efevoopay.com/onboarding&ID=MiCodigoAqui');
        copyToClipboard('https://efevoopay.com/onboarding');
        toast.success(
          "Link de referido copiado correctamente",
          DEFAULT_TOAST_CONFIGURATION
        );
    }
    useEffect(() => {
      getManagerCatalog()
    }, [])
    useEffect(() => {
      if (gerente && gerente !== null && gerente.nombre !== 'Todos'){
        getSellerCatalog(gerente.referencia)
        onRefresh({ agente: ""})
      } else {
        setOptionSeller([])
        onRefresh({gerente: "", agente: ""})
      }
      const {user:{rol_tipo},user:{referencia} } = user
      if(rol_tipo === "Gerente_Comercial"){
        getSellerCatalog(referencia, rol_tipo)
      }
    }, [gerente])

    const onHide = () => {
        setShowAssignModal(false)
    }

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

    const getSellerCatalog = async(referencia:string, rol?:string) => {
      let res = await SellersController.catalogAgent(referencia);
      if(res.isSuccess){
        const {response: {data}}:any = res
        if(rol === "Gerente_Comercial" ){
          setOptionSeller([{nombre: 'Todos', referencia: ''}, ...data])
        } else {
          setOptionSeller(data)
        }
      } else {
        setOptionSeller([])
      }
    }

    const handleManager = (e:any) => {
      const {value} = e;
      setGerente(value);
      onRefresh({gerente: value?.referencia ? value?.referencia : ""})
    }
    const handleSeller = (e:any) => {
      const {value} = e;
      if (value){
        setSeller(value)
        onRefresh({agente: value?.referencia ? value?.referencia : ""})
      }
    }
  return (
    <>
      <div className="w-full flex pb-3 justify-between" >
        <div className=" w-full flex" >
        {
          rol === "Gerente_Comercial" && (
            <div>
              <p className="text-sm text-[#5840D1]" >Agente comercial</p>
              <Dropdown
                options={optionSeller}
                value={seller}
                onChange={(e) => handleSeller(e)}
                disabled={isCalling}
                optionLabel="nombre"
                placeholder="Agente comercial"
                className="w-full"
                style={{border:'1px solid #B8AFE6', borderRadius:6}}
              />
            </div>
          )
        }
        {
          rol === "Agente_Comercial" && null
        }
        {
          rol !== "Gerente_Comercial" && rol !== "Agente_Comercial" && (
         
          <>
            <div className="w-[20%] ml-1 flex justify-end flex-col">
              <p className="text-sm text-[#5840D1]" >Gerente comercial</p>
              <Dropdown
                ref={DropDownRef}
                options={optionsManager}
                value={gerente}
                onChange={(e) => {handleManager(e);setSeller(null)}}
                disabled={isCalling}
                optionLabel="nombre" 
                placeholder="Gerente comercial"
                className="w-full"
                style={{border:'1px solid #B8AFE6', borderRadius:6}}
              />
            </div>
            <div className="flex justify-center items-center text-xl text-[#6c757d] ml-2 pt-3" >
              <i className="pi pi-angle-right" />
            </div>
            <div className="w-[20%] ml-1 flex justify-end flex-col">
              <p className="text-sm text-[#5840D1]" >Agente comercial</p>
              <Dropdown
                ref={DropDownRef}
                options={optionSeller}
                value={seller}
                showClear
                onChange={(e) => handleSeller(e)}
                disabled={isCalling}
                optionLabel="nombre"
                placeholder="Agente comercial"
                className="w-full"
                style={{border:'1px solid #B8AFE6', borderRadius:6}}
              />
            </div>
          </>
          )
        }
        </div>
        <div className="w-2/5 flex justify-end items-center" >
          {
            rol !== "Agente_Comercial" &&
            <Button disabled={leadsSelected.length < 1} className={styles.leadAssignBtn} onClick={()=>setShowAssignModal(true)} > 
              <i className="pi pi-user-plus" />
              &nbsp;Asignar vendedor
            </Button>
          }
        </div>
      </div>
      {
        showAssignModal &&
        <MassiveAssign
          visible={showAssignModal}
          onHide={onHide}
          leadsSelected={leadsSelected}
          optionSeller={optionSeller}
          optionsManager={optionsManager}
          user={user}
        />
      }
    </>
  );
}
