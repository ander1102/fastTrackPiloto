import { SetStateAction, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import styles from "@app/styles/Leads.module.css";
import { RowFormLead, SimpleDropdownLead, SimpleRightDateLead } from "../templates/leadInfo";
import { Lead } from "@app/types/Leads";
import Image from "next/image";
import { LEADESTATUS } from "@app/constants/form";
import { modalManager } from "@app/components/ModalComponent";
import ModalConfirmChange from '@app/components/ModalComponent/modals/leads/statusChangeModal'
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { SellersController } from "@app/logic/backend/sellers";

interface generalProps{
    lead:Lead,
    date: string,
    estatus: string,
    estatusOriginal: string,
    companyId?: any,
    onRefresh: (body: SetStateAction<Partial<any>>) => void;
    user:any
}
export default function General({lead, date, estatus, onRefresh, user}:generalProps) {
  const [ticket, setTicket] = useState<any>(lead.ticketAlto);
  const [startHour, setStartHour] = useState<any>(lead.horaInicio || "");
  const [endHour, setEndHour] = useState<any>(lead.horaFin || "");
  const [saler, setSaler] = useState<any>(lead.vendedor);
  const [loading, setLoading] = useState<boolean>(false)
  const [msi, setMsi] = useState<any>(lead.msi);
  const [optionsManager, setOptionsManager] = useState<any>([]);
  const [optionSeller, setOptionSeller] = useState<any>([]);
  const [gerente, setGerente] = useState<any>(lead.gerente || null);
  const [seller, setSeller] = useState<any>(lead.agente || null);

  const handleLeadEstatus = async (value:string) => {
    let cuales = {newStatus: value }    
    const cambioEstatus = await modalManager.show(
        ModalConfirmChange, 
        {item: cuales}, "dashboard/leads/editlead"
    );
    if(cambioEstatus === true) onRefresh({ estatus: value })
  }

  const handleLeadFecha = (e:Date) => {
    onRefresh({ fecha: e.toISOString().split('.')[0]});
  }

  useEffect(()=>{
    setGerente(lead.gerente)
    setSeller(lead.agente)
    getManagerCatalog()
  },[])

  useEffect(() => {
    if (gerente && gerente !== null ){
      getSellerCatalog(gerente.referencia)
      // setSeller(null)
    } else {
      setOptionSeller([])
    }
  }, [gerente])

  useEffect(()=>{
    setTicket(lead.ticketAlto)
    setGerente(lead.gerente)
    setSeller(lead.agente)
    
    if (lead.horaInicio) {
        setStartHour(new Date(lead.horaInicio));
    }
    if (lead.horaFin) {
      setEndHour(new Date(lead.horaFin));
    }
    if(lead.msi){
      setMsi(lead.msi)
    }
  },[lead])

  useEffect(() => {
    onRefresh({infoLead: [{...lead, horaInicio:startHour, horaFin: endHour, ticketAlto: ticket, agente: seller, gerente: gerente, msi}]})
  },[startHour, endHour, ticket, msi, gerente, seller])
    
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
  const handleManager = (e:any) => {
    const {value} = e;
    setGerente(value);
  }
  const handleSeller = (e:any) => {
    const {value} = e;
    setSeller(value);
  }
  const handleCheckboxChange = () => {
    setMsi(!msi);
  };

  return (
    <>
      <span className="w-full justify-between flex">
          {/*Columna Izquierda */}
          <div className={styles.leftCol}>
            {/*Row para formulario */}
            <RowFormLead title1={'Nombre cliente'} title2={'Nombre comercial'} value1={lead.nombre} value2={lead.nombreNegocio} disabled={true}/>
            <RowFormLead title1={'Estado'} title2={'Correo electrónico'} value1={lead.estado} value2={lead.email} disabled={true}/>
            <RowFormLead title1={'Giro de negocio'} title2={'Teléfono'} value1={lead.giro} value2={lead.telefono} disabled={true}/>
            <RowFormLead title1={'Actividad'} title2={'Tipo de persona'} value1={lead.actividad} value2={lead.persona} disabled={true}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', flexDirection: 'column', width: '48%'}}>
                <label>Ticket Alto</label>
                <InputNumber defaultValue={ticket} value={ticket} prefix="$ " suffix=" MXN" onValueChange={(e) => setTicket(e.value)} minFractionDigits={2} style={{width:'100%'}} placeholder="0.00" maxFractionDigits={2} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', width: '49.5%'}}>
                <label>Horario de operación</label>
                <div style={{justifyContent:"space-between", display: 'flex' , width: '97%'}}>
                  <Calendar hourFormat="12" value={startHour} onChange={(e:any) => setStartHour(e.value)} showTime style={{width: '45%'}} timeOnly/>
                  <Calendar hourFormat="12" value={endHour} onChange={(e:any) =>  setEndHour(e.value)} showTime style={{width: '45%'}} timeOnly/>
                </div>
              </div>
            </div>
            <div style={{width: '48%', marginTop: '20px'}}>
              <SimpleRightDateLead title1={'Fecha de registro'} value1={new Date(date)} disabled={true} handleLeadFecha={handleLeadFecha} />
            </div>
            <div className= {msi ? styles.wrapperMsiActive : styles.wrapperMsi} style={{marginTop: 20}}>
              <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: 350, height: 100, padding: 20}} onClick={() => setMsi(msi)}>
                <input
                  className={styles.hiddenCheckbox}
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={msi}
                />
                <span className={styles.geekmark}></span>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M20.6362 22.6716H7.92617C6.76617 22.6716 5.82617 21.7316 5.82617 20.5716V12.7816C5.82617 11.6216 6.76617 10.6816 7.92617 10.6816H20.6362C21.7962 10.6816 22.7362 11.6216 22.7362 12.7816V20.5716C22.7362 21.7316 21.7962 22.6716 20.6362 22.6716ZM7.92617 11.7616C7.36617 11.7616 6.90617 12.2116 6.90617 12.7816V20.5716C6.90617 21.1316 7.36617 21.5816 7.92617 21.5816H20.6362C21.1962 21.5816 21.6462 21.1316 21.6562 20.5716V12.7816C21.6562 12.2216 21.1962 11.7616 20.6362 11.7616H7.92617Z" fill="#1A1A1A"/>
                    <path d="M13.9469 16.0312H8.33687C8.03687 16.0312 7.79688 15.7912 7.79688 15.4912C7.79688 15.1912 8.03687 14.9512 8.33687 14.9512H13.9569C14.2569 14.9512 14.4969 15.1912 14.4969 15.4912C14.4969 15.7912 14.2569 16.0312 13.9569 16.0312H13.9469Z" fill="#1A1A1A"/>
                    <path d="M26.1735 1.19531H2.38966C1.69714 1.19531 1.13574 1.75671 1.13574 2.44923V26.233C1.13574 26.9256 1.69714 27.4869 2.38966 27.4869H26.1735C26.866 27.4869 27.4274 26.9256 27.4274 26.233V2.44923C27.4274 1.75671 26.866 1.19531 26.1735 1.19531Z" stroke="#1A1A1A" stroke-width="0.881658" strokeMiterlimit="10"/>
                    <path d="M1.13574 5.32603H27.4274" stroke="#1A1A1A" strokeWidth="0.881658" strokeMiterlimit="10"/>
                    <path d="M2.57227 3.18262H2.80913" stroke="#1A1A1A" strokeWidth="0.881658" strokeMiterlimit="10" strokeLinecap="round"/>
                    <path d="M4.38477 3.18262H4.62163" stroke="#1A1A1A" strokeWidth="0.881658" strokeMiterlimit="10" strokeLinecap="round"/>
                    <path d="M6.19824 3.18262H6.43511" stroke="#1A1A1A" strokeWidth="0.881658" strokeMiterlimit="10" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{marginLeft: '20px'}}>
                  <span>Pago a</span><br/>
                  <span>Meses sin intereses</span>
                </div>
              </label>
            </div>
          </div>
          {/*Columna Derecha */}
          <div className={styles.rightCol}>
              <SimpleDropdownLead title1={'Estado de Lead'} value={LEADESTATUS.find(item => item.value === estatus)?.label || estatus} onStatusChange={handleLeadEstatus} />
              <div style={{display: 'flex', flexDirection:"column", marginBottom: 20}}>
                <label htmlFor="salers">Asignar Gerente Comercial al Lead</label>
                <Dropdown
                  options={optionsManager}
                  optionLabel='nombre'
                  value={gerente}
                  onChange={(e) => handleManager(e)}
                  placeholder="Seleccionar Gerente Comercial"
                  className="w-full"
                  style={{border:'1px solid #B8AFE6', borderRadius:6}}
              />
              </div>
              <div style={{display: 'flex', flexDirection:"column", marginBottom: 20}}>
                <label htmlFor="salers">Asignar Agente Comercial al Lead</label>
                <Dropdown
                  options={optionSeller}
                  value={seller}
                  optionLabel='nombre'
                  onChange={(e) => handleSeller(e)}
                  placeholder="Seleccionar Agente Comercial"
                  className="w-full"
                  style={{border:'1px solid #B8AFE6', borderRadius:6}}
                />
              </div>

              <div className={styles.wrapperProducts}>
                  <p>Resumen de solicitud</p>
                  <div className={ lead?.tarjeta === 'Si' ? styles.rowItemProductSelected : styles.rowItemProduct}>
                      <div className={styles.rowItemAsset}>
                          <Image alt="tarjeta" src="/Images/cards/tarjeta.png" height={26} width={34} />
                      </div>
                      <div className={styles.description}>
                          <span className={styles.title}>Servicio</span>
                          <span className={styles.subtitle}>Tarjeta de crédito</span>
                      </div>
                  </div>
                  <div className={ lead?.terminalD30 > '0' ? styles.rowItemProductSelected : styles.rowItemProduct}>
                      <div className={styles.rowItemAsset}>
                          <Image alt="terminalD30" src="/Images/cards/d30.png" height={54} width={30}/>
                      </div>
                      <div className={styles.description}>
                          <span className={styles.title}>Modelo</span>
                          <span className={styles.subtitle}>Terminal Pro D30</span>
                      </div>
                      {
                          lead?.terminalD30 > '0' &&
                          <div className={styles.wrapperIndicator}>
                              <div className={styles.indicatorTerminal}>
                              {lead?.terminalD30}
                              </div>
                          </div>
                      }
                  </div>
                  <div className={ lead?.terminalD20 > "0" ? styles.rowItemProductSelected : styles.rowItemProduct}>
                      <div className={styles.rowItemAsset}>
                          
                          <Image alt="terminalD20" src="/Images/cards/d20.png" height={54} width={30}/>
                      </div>
                      <div className={styles.description}>
                          <span className={styles.title}>Modelo</span>
                          <span className={styles.subtitle}>Terminal Smart Pro D20</span>
                      </div>
                      {
                          lead?.terminalD20 > '0' &&
                          <div className={styles.wrapperIndicator}>
                              <div className={styles.indicatorTerminal}>

                              {lead?.terminalD20}
                              </div>
                          </div>
                      }
                  </div>
                  <div className={ lead?.ecommerce === 'Si' ? styles.rowItemProductSelected : styles.rowItemProduct}>
                      <div className={styles.rowItemAsset}>
                          <Image alt="ecommerce" src="/Images/cards/ecommerce.png" height={30} width={30}/>
                      </div>
                      <div className={styles.description}>
                          <span className={styles.title}>Servicio</span>
                          <span className={styles.subtitle}>Ligas de pago</span>
                      </div>
                  </div>
              </div>
          </div>
      </span>
    </>
  );
}
