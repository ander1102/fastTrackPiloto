import { SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "@app/styles/Leads.module.css";
import Image from "next/image";
import { LeadInfoStructure, Productos } from "@app/types/Leads";
interface cotizacionProps {
  productos: Productos;
  onRefresh: (body: SetStateAction<Partial<LeadInfoStructure>>) => void;
}

export default function ProductosLead({
  productos,
  onRefresh,
}: cotizacionProps) {
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

  useEffect(() => {
    if(productos){
      if(productos.d20 > '0'){
        setTerminalD20({...terminalD20, check: true, quantity: Number(productos.d20)});
      } else {
        setTerminalD20({
          check: false,
          quantity: 1,
        })
      }
      if(productos.d30 > '0'){
        setTerminalD30({...terminalD30, check: true, quantity: Number(productos.d30)});
      } else {
        setTerminalD30({check: false, quantity: 1})
      }
      if(productos.ecommerce === 'Si'){
        setEcommerce(true);
      } else {
        setEcommerce(false);
      }

      if(productos.tarjeta === 'Si'){
        setCreditCard(true)
      } else {
        setCreditCard(false)
      }
    }
  },[productos])

  useEffect(() => {
    onRefresh({
      infoProductos:[{
      ...productos, 
      d20: terminalD20.check ? terminalD20.quantity.toString() : '0', 
      d30: terminalD30.check ? terminalD30.quantity.toString() : '0',
      tarjeta: creditCard ? 'Si' : 'No',
      ecommerce: ecommerce ? 'Si' : 'No'
    }]})
  }, [creditCard, terminalD30, terminalD20, ecommerce])

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

  return (
    <>
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
              <span>Pago a</span><br/>
              <span>Meses sin intereses</span>
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
        </div>
      </div>
    </>
  );
}
