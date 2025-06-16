import Grid from "@app/components/Grid"
import { FormItem } from "@app/layout/clientes/templates"
import { InputNumber } from "primereact/inputnumber"
import { InputSwitch } from "primereact/inputswitch"
import { InputText } from "primereact/inputtext"
import { useState } from "react"

export const InventarioForm = ({data, setInventario}: any) => {

  return(
    <>
      <Grid xl={3} gap={5}>
        <div>
          <div>Nombre del producto</div>
          <div style={{display: 'flex', alignItems: 'center', marginTop: 10}}>
            {data.img !== '' && <img src={data.img} width={60} height={60} style={{borderRadius: '4px', marginRight: 10}}/> }
            {data.nombre}
          </div>
        </div>
        <FormItem
          maxWidth="max-w-[80%]"
          title={"Referencia del producto"}
        >
          <InputText
            value={data.referencia}
            placeholder="0000000"
            onChange={(e) => setInventario({...data, referencia: e.target.value})}
          />
        </FormItem>
      </Grid>
      <Grid xl={3} gap={5} style={{marginTop: 30}}>
        <FormItem
          maxWidth="max-w-[80%]"
          title={"En existencia"}
        >
          <InputNumber
            value={data.existencia}
            placeholder="0000000"
            onChange={(e) => setInventario({...data, existencia: e.value})}
          />
        </FormItem>
        <div style={{maxWidth: '80%'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <label>Alerta Mínimo</label>
          
            <InputSwitch
              id="alert"
              name="alert"
              checked={data?.alerta}
              onChange={(e:any) => {setInventario({...data, alerta: e.value}); console.log(e) }} 
            />
          </div>
          <div style={{marginTop: 5}}>
            <span style={{color: '#888686', fontSize: 14, fontWeight: 400}}>Se enviará una alerta a tu correo electrónico de que el producto está por acabarse.</span>
          </div>
        </div>
      </Grid>
      <Grid xl={3} gap={5}>
        <FormItem
          maxWidth="max-w-[80%]"
          title={"Unidades mínimas"}
        >
           <InputNumber
            value={data.unidadesMin}
            placeholder="0000000"
            onChange={(e) => setInventario({...data, unidadesMin: e.value})}
          />
        </FormItem>
      </Grid>
    </>
  )
}