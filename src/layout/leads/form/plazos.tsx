import React, { SetStateAction, useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from 'primereact/checkbox';
import styles from "@app/styles/Leads.module.css"
import { InputNumber } from 'primereact/inputnumber';
import { LeadInfoStructure, MesesSinIntereses } from '@app/types/Leads';

interface IMsi{
  mesesInfo: MesesSinIntereses;
  allInfo: Object;
  onRefresh: (body: SetStateAction<Partial<LeadInfoStructure>>) => void;
}

const Plazo = ({mesesInfo, onRefresh} : IMsi) => {
  const [msi, setMsi] = useState<any>(mesesInfo.msi || false);
  const [msi3, setMsi3] = useState<any>(mesesInfo.msi3 || false);
  const [comision3, setComisionMsi3] = useState<any>(mesesInfo.comision3 || 0.00);
  const [tasa3, setTasaMsi3] = useState<any>( mesesInfo.tasa3 || 0.00);
  const [msi6, setMsi6] = useState<any>(mesesInfo.msi6 || false);
  const [comision6, setComisionMsi6] = useState<any>( mesesInfo.comision6 || 0.00);
  const [tasa6, setTasaMsi6] = useState<any>(mesesInfo.tasa6 || 0.00);
  const [msi9, setMsi9] = useState<any>(mesesInfo.msi9 || false);
  const [comision9, setComisionMsi9] = useState<any>(mesesInfo.comision9 || 0.00);
  const [tasa9, setTasaMsi9] = useState<any>(mesesInfo.tasa9 || 0.00);
  const [msi12, setMsi12] = useState<any>(mesesInfo.msi12);
  const [comision12, setComisionMsi12] = useState<any>(mesesInfo.comision12 || 0.00);
  const [tasa12, setTasaMsi12] = useState<any>( mesesInfo.tasa12 || 0.00);
  const [msi18, setMsi18] = useState<any>( mesesInfo.msi18 || false);
  const [comision18, setComisionMsi18] = useState<any>( mesesInfo.comision18 || 0.00);
  const [tasa18, setTasaMsi18] = useState<any>(mesesInfo.tasa18 || 0.00);

  useEffect(() => {
    onRefresh({infoMeses:
      [{
        ...mesesInfo,
        msi,
        msi3,
        comision3,
        tasa3,
        msi6,
        comision6,
        tasa6,
        msi9,
        comision9,
        tasa9,
        msi12,
        comision12,
        tasa12,
        msi18,
        comision18,
        tasa18,
      }]
    })
  }, [msi, msi3, comision3, tasa3, msi6, comision6, tasa6, msi9, comision9, tasa9, msi12, comision12, tasa12, msi18, comision18, tasa18])

  return (
    <>
      <div className="flex align-items-center" style={{marginBottom: 30}}>
        <div className= {msi ? styles.wrapperMsiActive : styles.wrapperMsi}>
          <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: 350, height: 100, padding: 20}} onClick={() => setMsi(msi)}>
            <input
              className={styles.hiddenCheckbox}
              type="checkbox"
              onChange={(e) => setMsi(e.target.checked)}
              checked={msi}
            />
            <span className={styles.geekmark}></span>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M20.6362 22.6716H7.92617C6.76617 22.6716 5.82617 21.7316 5.82617 20.5716V12.7816C5.82617 11.6216 6.76617 10.6816 7.92617 10.6816H20.6362C21.7962 10.6816 22.7362 11.6216 22.7362 12.7816V20.5716C22.7362 21.7316 21.7962 22.6716 20.6362 22.6716ZM7.92617 11.7616C7.36617 11.7616 6.90617 12.2116 6.90617 12.7816V20.5716C6.90617 21.1316 7.36617 21.5816 7.92617 21.5816H20.6362C21.1962 21.5816 21.6462 21.1316 21.6562 20.5716V12.7816C21.6562 12.2216 21.1962 11.7616 20.6362 11.7616H7.92617Z" fill="#1A1A1A"/>
                <path d="M13.9469 16.0312H8.33687C8.03687 16.0312 7.79688 15.7912 7.79688 15.4912C7.79688 15.1912 8.03687 14.9512 8.33687 14.9512H13.9569C14.2569 14.9512 14.4969 15.1912 14.4969 15.4912C14.4969 15.7912 14.2569 16.0312 13.9569 16.0312H13.9469Z" fill="#1A1A1A"/>
                <path d="M26.1735 1.19531H2.38966C1.69714 1.19531 1.13574 1.75671 1.13574 2.44923V26.233C1.13574 26.9256 1.69714 27.4869 2.38966 27.4869H26.1735C26.866 27.4869 27.4274 26.9256 27.4274 26.233V2.44923C27.4274 1.75671 26.866 1.19531 26.1735 1.19531Z" stroke="#1A1A1A" stroke-width="0.881658" stroke-miterlimit="10"/>
                <path d="M1.13574 5.32603H27.4274" stroke="#1A1A1A" stroke-width="0.881658" stroke-miterlimit="10"/>
                <path d="M2.57227 3.18262H2.80913" stroke="#1A1A1A" stroke-width="0.881658" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M4.38477 3.18262H4.62163" stroke="#1A1A1A" stroke-width="0.881658" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M6.19824 3.18262H6.43511" stroke="#1A1A1A" stroke-width="0.881658" stroke-miterlimit="10" stroke-linecap="round"/>
              </svg>
            </div>
            <div style={{marginLeft: '20px'}}>
              <span>Pago a</span><br/>
              <span>Meses sin intereses</span>
            </div>
          </label>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <section style={{width: '33%'}}>
          <div>
            <div style={{display: 'flex',  marginBottom: '30px'}}>
              <label htmlFor='msi3' style={{marginRight: 30}}>3 meses sin intereses</label>
              <InputSwitch
                id="msi3"
                name="msi3"
                className={styles.switchCustomColor}
                onChange={(e:any) => {setMsi3(e.value)}}
                checked={msi3}
                disabled={!msi}
              />
            </div>
            <div style={{display: 'flex',  marginBottom: '30px', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Comisión</label>
                <InputNumber disabled={!msi || !msi3} value={comision3} onValueChange={(e:any) => setComisionMsi3(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Tasa</label>
                <InputNumber disabled={!msi || !msi3} value={tasa3} onValueChange={(e:any) => setTasaMsi3(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
            </div>
          </div>
          <div>
            <div style={{display: 'flex',  marginBottom: '30px'}}>
              <label htmlFor='msi6' style={{marginRight: 30}}>6 meses sin intereses</label>
              <InputSwitch
                id="msi6"
                name="msi6"
                className={styles.switchCustomColor}
                onChange={(e) => {setMsi6(e.value)}}
                checked={msi6}
                disabled={!msi}
              />
            </div>
            <div style={{display: 'flex',  marginBottom: '30px', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Comisión</label>
                <InputNumber disabled={!msi || !msi6} value={comision6} onValueChange={(e:any) => setComisionMsi6(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Tasa</label>
                <InputNumber disabled={!msi || !msi6} value={tasa6} onValueChange={(e:any) => setTasaMsi6(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
            </div>
          </div>
          <div>
            <div style={{display: 'flex',  marginBottom: '30px'}}>
              <label htmlFor='msi9' style={{marginRight: 30}}>9 meses sin intereses</label>
              <InputSwitch
                id="msi9"
                name="msi9"
                className={styles.switchCustomColor}
                onChange={(e) => {setMsi9(e.value)}}
                checked={msi9}
                disabled={!msi}
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Comisión</label>
                <InputNumber disabled={!msi || !msi9} value={comision9} onValueChange={(e:any) => setComisionMsi9(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Tasa</label>
                <InputNumber disabled={!msi || !msi9} value={tasa9} onValueChange={(e:any) => setTasaMsi9(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
            </div>
          </div>
          
        </section>
        <section style={{width: '33%'}}>
        <div>
            <div style={{display: 'flex',  marginBottom: '30px'}}>
              <label htmlFor='msi12' style={{marginRight: 30}}>12 meses sin intereses</label>
              <InputSwitch
                id="msi12"
                name="msi12"
                className={styles.switchCustomColor}
                onChange={(e) => {setMsi12(e.value)}}
                checked={msi12}
                disabled={!msi}
                pt={{
                  slider: ({ ...props }) => (
                    console.log(props)
                    )
              }}
              />
            </div>
            <div style={{display: 'flex', marginBottom: '30px', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Comisión</label>
                <InputNumber disabled={!msi || !msi12} value={comision12} onValueChange={(e:any) => setComisionMsi12(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Tasa</label>
                <InputNumber disabled={!msi || !msi12} value={tasa12} onValueChange={(e:any) => setTasaMsi12(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
            </div>
          </div>
          <div>
            <div style={{display: 'flex' , marginBottom: '30px'}}>
              <label htmlFor='msi18' style={{marginRight: 30}}>18 meses sin intereses</label>
              <InputSwitch
                id="msi18"
                name="msi18"
                className={styles.switchCustomColor}
                onChange={(e) => {setMsi18(e.value)}}
                checked={msi18}
                disabled={!msi}
              />
            </div>
            <div style={{display: 'flex',  marginBottom: '30px', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Comisión</label>
                <InputNumber disabled={!msi || !msi18} value={comision18} onValueChange={(e:any) => setComisionMsi18(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Tasa</label>
                <InputNumber disabled={!msi || !msi18} value={tasa18} onValueChange={(e:any) => setTasaMsi18(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              </div>
            </div>
          </div>
        </section>
      </div>      
    </>
  );
}


export default Plazo

