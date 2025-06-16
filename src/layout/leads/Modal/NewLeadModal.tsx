import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import { EstadosMX } from './Estados';
import { onboardingPayload } from './Services';
import styles from '@app/styles/Leads.module.css'
import { LeadsControllers } from '@app/logic/backend/leads';
import { toast } from 'react-toastify';
import { SellersController } from '@app/logic/backend/sellers';

export const NewLeadModal = ({visible, onHide, user} :any) => {
  const rol = user?.user?.rol_tipo
  const [load, setLoad] = useState<boolean>(false)
  const [gerente, setGerente] = useState<any>(null);
  const [optionsManager, setOptionsManager] = useState<any>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [options, setOptions] = useState<Array<any>>([])
  const [nombreComercial, setNombreComercial] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean | undefined>();
  const [estado, setEstado] = useState<string>('');
  const [persona, setPersona] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [giro, setGiro] = useState<string>('');
  const [terms, searchTerm] = useState<boolean>(false);
  const [creditCard, setCreditCard] = useState<boolean>(false)
  const [terminalD30, setTerminalD30] = useState<any>({
    check: false,
    quantity: 1,
  })
  const [terminalD20, setTerminalD20] = useState<any>({
    check: false,
    quantity: 1,
  })
  const [ecommerce, setEcommerce] = useState<boolean>(false);
  const router = useRouter()


  const restrictNonNumeric = (value:string) => {
    let limit = value.replace(/\D/g, '').slice(0, 10);
    setPhone(limit)
  };

  const handleSubmit = async() => {
    setLoad(true)
    const fixedData = onboardingPayload({
      name,
      email,
      phone,
      nombreComercial,
      persona,
      estado,
      giro,
      terminalD30,
      terminalD20,
      ecommerce,
      creditCard,
      gerente,
    });
    const response = await LeadsControllers.createLead(fixedData)
    if (response.response.data && response.response.data.length > 0) {
      if (response.response.data[0].mensaje === 'Su codigo de referencia es incorrecto'){
        setLoad(false)
        toast.error('Su codigo de referencia es incorrecto')
       
      } else if(response.response.data[0].mensaje === 'Lead previamente registrado'){
        toast.error('Lead previamente registrado')
        setLoad(false)
        return;
      }else if(response.response.data[0].mensaje === 'Lead agregado correctamente') {
        onHide(); 
        handleInitialState();
        setLoad(false)
        toast.success('Lead creado correctamente')
        router.reload();
      }
    }
  }

  useEffect(() => {
    getManagerCatalog();
  }, []);

  const getManagerCatalog = async() => {
    const {persona:{idagep_usuarios}} = user
    let res = await SellersController.filterCatalogSeller(idagep_usuarios);
    if(res.isSuccess){
      const {response: {data}}:any = res
      setOptionsManager([...optionsManager, ...data])
    } else {
      setOptionsManager([])
    }
  }

  const validateEmailFormat = (value: string) => {
    setEmail(value);
    if (value !== '') {
      if (/^[\w.+]+@[\w.-]+\.\w+$/.test(value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    } else {
      setEmailValid(undefined);
    }
  };

  const disminuirCantidad = () => {
    setTerminalD20((prev:any) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };

  const aumentarCantidad = () => {
    setTerminalD20((prev:any) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const handleInitialState = () => {
    setName("")
    setEmail("")
    setEmailValid(undefined);
    setGiro("");
    setEstado("");
    searchTerm(false);
    setCreditCard(false);
    setPersona("");
    setPhone("");
    setNombreComercial("");
    setTerminalD30({
      check: false,
      quantity: 1,
    });
    setTerminalD20({
      check: false,
      quantity: 1,
    });
    setEcommerce(false);
  }

  const getGiros = async() => {
    const {response:{giros}} = await LeadsControllers.getGiros();
    setOptions(giros);
  }

  useEffect(() => {
    getGiros();
  }, [])

  const handleManager = (e:any) => {
    const {value} = e;
    setGerente(value);
  }

  return(
    <Dialog 
      header="Solicitud de nuevo Lead"
      visible={visible}
      draggable={false}
      style={{ width: '70vw', left: 'auto' }}
      onHide={() => {onHide(); handleInitialState()}}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4" style={{marginBottom: 50}}>
            
        <div className="col-span-1 md:col-span-1 p-4">
          <div className="mb-4">
            <label htmlFor="input1" className="block text-sm font-medium text-gray-600">
              Nombre cliente
            </label>
            <InputText
              type="text"
              id="input1"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="input2" className="block text-sm font-medium text-gray-600">
                Correo
              </label>
              <InputText
                type="text"
                id="input2"
                name="input2"
                style={{
                  border: emailValid === false ? '1px solid red' : '', 
                }}
                className={'mt-1 p-2 w-full border rounded-md'}
                onChange={(e) => validateEmailFormat(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="input3" className="block text-sm font-medium text-gray-600">
                Teléfono
              </label>
              <InputText
                type="text"
                id="input3"
                name="input3"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => restrictNonNumeric(e.target.value)}
                value={phone}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="input2" className="block text-sm font-medium text-gray-600">
                Nombre comercial
              </label>
              <InputText
                type="text"
                id="input2"
                name="nombreComercial"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setNombreComercial(e.target.value)}
                value={nombreComercial}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="input3" className="block text-sm font-medium text-gray-600">
                Referencia Bussines Partner
              </label>
              <Dropdown
                options={optionsManager}
                optionLabel='nombre'
                value={gerente}
                showClear
                onChange={(e) => handleManager(e)}
                placeholder="Gerente comercial"
                className="w-full"
                style={{border:'1px solid #B8AFE6', borderRadius:6}}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <p className="text-sm text-[#6A6D74]" >Tipo de régimen</p>
              <Dropdown
                style={{height: '43px', display: 'flex', alignItems: 'center',marginTop: 0}}
                options={[{label:'Persona física', value: 'fisica'}, {label:'Persona moral', value: 'moral'}]}
                onChange={(e) => setPersona(e.value)}
                value={persona}
                className="mt-1 p-1 w-full border rounded-md"
              />
            </div>

            {/* Segundo input y label */}
            <div className="mb-4">
              <p className="text-sm text-[#6A6D74]" >Estado</p>
              <Dropdown
                style={{height: '43px', display: 'flex', alignItems: 'center',marginTop: 0}}
                options={EstadosMX}
                onChange={(e) => setEstado(e.value)}
                value={estado}
                className="mt-1 p-1 w-full border rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primer input y label */}
            <div className="mb-4">
              <p className="text-sm text-[#6A6D74]" >Giro del negocio</p>
              <Dropdown
                style={{height: '43px', display: 'flex', alignItems: 'center',marginTop: 0}}
                options={options}
                onChange={(e:any) => setGiro(e.value)}
                optionLabel="nombre"
                optionValue="nombre"
                value={giro}
                filter
                panelStyle={{width: '40%'}}
                className="mt-1 p-1 w-full border rounded-md"
              />
            </div>
          </div>
          <div className= {terms ? styles.termsAct : styles.terms}>
          <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
            <input
              className={styles.hiddenCheckbox}
              type="checkbox"
              onChange={(e) => searchTerm(e.target.checked)}
              checked={terms}
            />
            <span className={styles.geekmarkTerm}></span>
            <label style={{color: "#5840D1", fontSize: 12}}>Acepto los Términos, Condiciones y el Aviso de Privacidad para Clientes y Prospectos</label>
          </label>

          </div>
          
        </div> 
        <div className="col-span-1 md:col-span-1 p-4">
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{gap: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: 100}}>
              <div style={{maxWidth: '450px', width: '450px'}} className= {creditCard ? styles.wrapperMsiActive : styles.wrapperMsi}>
              <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: 350, height: 100, padding: 20}} onClick={() => setCreditCard(creditCard)}>
                <input
                  className={styles.hiddenCheckbox}
                  type="checkbox"
                  onChange={(e) => setCreditCard(e.target.checked)}
                  checked={creditCard}
                />
                <span className={styles.geekmark}></span>
                <div>
                <Image alt="tarjeta" src={require('../../../../public/Images/cards/tarjeta.png')} width={30} />
                </div>
                <div style={{marginLeft: '20px'}}>
                  <span>Servicio</span><br/>
                  <span>Tarjeta de crédito</span>
                </div>
              </label>
              </div>
              <div style={{maxWidth: '450px', width: '450px'}} className= {terminalD30 && terminalD30.check ? styles.wrapperMsiActive : styles.wrapperMsi}>
              <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: 450, height: 100, padding: 20}} onClick={() => setCreditCard(creditCard)}>
                <input
                  className={styles.hiddenCheckbox}
                  type="checkbox"
                  onChange={(e) => setTerminalD30({...terminalD30, check:e.target.checked})}
                  checked={terminalD30.check}
                />
                <span className={styles.geekmark}></span>
                <div>
                <Image alt="terminalD30" src={require('../../../../public/Images/cards/d30.png')} width={30}/>
                </div>
                <div style={{marginLeft: '20px'}}>
                  <span>Modelo</span><br/>
                  <span>Terminal Pro D30</span>
                </div>
                {
                  terminalD30.check ? 
                  <div className={styles.indicatorQuantity}>
                    <button onClick={()=> setTerminalD30((prev:any) => ({...prev,
                      quantity: Math.max(1, prev.quantity - 1),
                    }))} className={styles.btnIncreaseQuantity}>-</button> 
                      {terminalD30.quantity} 
                    <button className={styles.btnIncreaseQuantity} onClick={() => setTerminalD30((prev:any) => ({
                      ...prev,
                      quantity: prev.quantity + 1,
                    }))}>+</button>
                  </div>
                  : null
                }
                
              </label>
              </div>
              <div style={{maxWidth: '450px', width: '450px'}} className={terminalD20 && terminalD20.check ? styles.wrapperMsiActive : styles.wrapperMsi}>
              <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: 450, height: 100, padding: 20}}>
                <input
                  className={styles.hiddenCheckbox}
                  type="checkbox"
                  onChange={(e) => setTerminalD20({...terminalD20, check: e.target.checked})}
                  checked={terminalD20.check}
                />
                <span className={styles.geekmark}></span>
                <div>
                <Image alt="terminalD20" src={require('../../../../public/Images/cards/d20.png')} width={30}/>
                </div>
                <div style={{marginLeft: '20px'}}>
                  <span>Modelo</span><br/>
                  <span>Terminal Smart D20</span>
                </div>
                {
                  terminalD20.check ? 
                  <div className={styles.indicatorQuantity}>
                    <button className={styles.btnIncreaseQuantity} onClick={()=> disminuirCantidad()}>-</button> 
                      {terminalD20.quantity} 
                    <button className={styles.btnIncreaseQuantity} onClick={() => aumentarCantidad()}>+</button>
                  </div>
                  :null
                }
              </label>
              </div>
              <div style={{maxWidth: '450px', width: '450px'}} className= {ecommerce ? styles.wrapperMsiActive : styles.wrapperMsi}>
              <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: 450, height: 100, padding: 20}}>
                <input
                  className={styles.hiddenCheckbox}
                  type="checkbox"
                  onChange={(e) => setEcommerce(e.target.checked)}
                  checked={ecommerce}
                />
                <span className={styles.geekmark}></span>
                <div>
                  <Image alt="ecommerce" src={require('../../../../public/Images/cards/ecommerce.png')} width={30}/>
                </div>
                <div style={{marginLeft: '20px'}}>
                  <span>Servicio</span><br/>
                  <span>Ligas de pago</span>
                </div>
              </label>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', width: '450px', marginTop: 10}}>
                <Button 
                  disabled={
                    name === "" ||
                    nombreComercial === "" ||
                    email === "" ||
                    !emailValid ||
                    estado === "" ||
                    persona === '' ||
                    phone === '' ||
                    giro === '' ||
                    (rol === "Gerente_Comercial" && gerente === null) ||
                    !terminalD30.check &&
                    !terminalD20.check &&
                    !ecommerce &&
                    !creditCard ||
                    !terms
                  } 
                className={styles.newLeadButton} loading={load} onClick={() => handleSubmit()}>Confirmar solicitud</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

