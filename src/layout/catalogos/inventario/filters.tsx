import { useState } from "react";
import Grid from "@app/components/Grid";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import styles from "@app/styles/Productos.module.css"
import { useRouter } from "next/router";

export const FiltersStore = ({onRefresh}:any) => {
  const route = useRouter();

  return(
    <Grid xl={2} style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column', paddingRight: '10px'}}>
          <label>Buscar producto</label>
          <span className="p-input-icon-left flex-col items-end">
            <i className="pi pi-search" style={{color: "#B8AFE6"}}/>
            <InputText onChange={(e) => onRefresh({busqueda: e.target.value})}/>
          </span>
        
        </div>
      </div>
    </Grid>
  )
}