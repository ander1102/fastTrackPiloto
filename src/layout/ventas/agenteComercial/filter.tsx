import React, { useEffect, useRef, useState } from "react";
import { FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "@app/components/FormManager/FormItem";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import styles from "@app/styles/AgenteComercial.module.css"
import { DateFormat } from "@app/common/format";
import { SVG } from "@app/components/svg";
import { SellersController } from "@app/logic/backend/sellers";

export const FiltersComercial = ({ onRefresh, filters, user }: any) => {
  const {rol_tipo} = user.user
  const [estatus, setStatus] = useState<number | null>(null);
  const DropDownRef = useRef<Dropdown>(null);
  const optionsStatus = [
    {
      label: "Activo",
      value: "Activo",
    },
    {
      label: "Inactivo",
      value: "Inactivo",
    },
    {
      label: "Todos",
      value: "",
    },
  ]

  const [dateStart, setDateStart] = useState<any>("");
  const [dateEnd, setDateEnd] = useState<any>("");
  const [gerente, setGerente] = useState<any>(null);
  const [seller, setSeller] = useState(null);
  const [optionsManager, setOptionsManager] = useState([{nombre: 'Todos', referencia: ''}]);
  const [optionSeller, setOptionSeller] = useState([]);

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
  }, [gerente])
  
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

  const getSellerCatalog = async(referencia:string) => {
    let res = await SellersController.catalogAgent(referencia);
    if(res.isSuccess){
      const {response: {data}}:any = res
      setOptionSeller(data)
    } else {
      setOptionSeller([])
    }
  }


  const onDropdownChange = (e: DropdownChangeEvent) => {
    const value = e.target.value;
    setStatus(value);
    if (filters && filters){

    }
    onRefresh({estatus:value})
  };
  const handleLongtextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRefresh({
      sellerFiltro: e.target.value,
    });
  };

  const onChange = (id: number) => (e: CalendarChangeEvent) => {
    const date = e.value as Date;
    if (id === 1) {
      setDateStart(date);
      onRefresh({
        fechaInicio: date !== null ? DateFormat.day.start(date, true).toSimpleFormatString() :"",
      })
      return;
    }
    setDateEnd(date);
    onRefresh({
      fechaFin: date !== null ? DateFormat.day.end(date, true).toSimpleFormatString() : "",
    });
  };

  return(
    <>
    <div className={styles.wrapperFilter}>
      {
        rol_tipo === 'Administrador' &&
        <div className="flex items-end" style={{width: '40%'}}>
          <div>
            <label style={{color: '#5840D1', fontSize: 14,fontStyle: 'normal', fontWeight: 500,lineHeight: 'normal'}}>Gerente comercial</label>
            <span className="p-input-icon-left flex-col w-full items-end">
            <Dropdown 
              filter
              value={gerente}
              onChange={(e) => {handleManager(e);setSeller(null)}}
              options={optionsManager}
              optionLabel="nombre" 
              className="w-full md:w-14rem" 
            />
              <i className="pi pi-search" />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0px 10px', marginTop: '25px'}}><SVG.ArrowRight2 color="#7265D1" className="w-[10px]" /></div>
          <div>
            <label style={{color: '#5840D1', fontSize: 14,fontStyle: 'normal', fontWeight: 500,lineHeight: 'normal'}}>Agente comercial</label>
            <span className="p-input-icon-left flex-col w-full items-end">
              <Dropdown 
                filter
                value={seller}
                onChange={(e) => handleSeller(e)}
                options={optionSeller}
                optionLabel="nombre" 
                placeholder=""
                className="w-full md:w-14rem"
              />
              <i className="pi pi-search" />
            </span>
          </div>
        </div>
      }
      <div className="flex items-end " style={{justifyContent: 'space-between'}}>
        <div style={{padding: '0px 10px'}}>
          <FiltersItem>
            <FormItem label="Buscar por fecha" style={{marginBottom: 0}}>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search" />
                <Calendar
                  id="icon1"
                  placeholder="Inicio"
                  className="myCalendarButton w-full mb-0"
                  maxDate={new Date()}
                  onChange={onChange(1)}
                  value={dateStart}
                />
              </span>
            </FormItem>
          </FiltersItem>
        </div>
        <div style={{padding: '0px 10px'}}>
          <FiltersItem>
            <FormItem style={{marginBottom: 0}}>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search" />
                <Calendar
                  id="icon2"
                  placeholder="Final"
                  className="myCalendarButton w-full"
                  onChange={onChange(2)}
                  value={dateEnd}
                />
              </span>
            </FormItem>
          </FiltersItem>
        </div>
        <div style={{padding: '0px 10px'}}>
          <FormItem label="Estatus" style={{marginBottom: 0}}>
            <Dropdown
              ref={DropDownRef}
              options={optionsStatus}
              value={estatus}
              onChange={onDropdownChange}
              placeholder="Seleccionar"
              className="w-full"
              style={{ borderRadius: 6, width: '200px' }}
            />
          </FormItem>
        </div>
      </div>
    </div>
    </>
  )
}