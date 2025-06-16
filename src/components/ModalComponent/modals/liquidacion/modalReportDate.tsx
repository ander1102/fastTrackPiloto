import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import styles from "@app/styles/Liquidacion.module.css"
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "@app/components/FormManager/FormItem";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { DateFormat } from "@app/common/format";
import useValueHandler from "@app/hooks/useValueHandler";
import { Button } from "@app/components/Buttons";
import { DepositsControllers } from "@app/logic/backend/deposits";
import { DateDDMMYYHHMMA } from "@app/common/date";
import moment from 'moment';

export const ModalReportDate = ({onHide, visible, user}:any) => {
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [valid, setValid] = useState(false)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (dateStart > dateEnd) {
      setValid(false);
    } else if(dateEnd < dateStart){
      setValid(false);
    } else {
      setDateStart(dateStart)
      setDateEnd(dateEnd)
      setValid(true)
    }
  }, [dateStart, dateEnd])

  const initialState = () => {
    setDateStart(new Date())
    setDateEnd(new Date())
    setValid(true)
    onHide(false)
  }
    
  const onChange = (id: number) => (e: CalendarChangeEvent) => {
    const date = e.value as Date;
    if (id === 1) {
      if (date > dateEnd) {
        setValid(false)
      }
      setDateStart(date);
      return;
    } else {
      setValid(false)
    }

    if (date < dateStart) {
      setValid(false)
      return;
    } else {
      setDateEnd(date);
    }
    setValid(true)
  };

  const handleDownloadReport = async() => {    
    setLoad(true)
    console.log("PERSONA", user)
    try {
      const {idagep_empresa} = user;
      const {idagep_usuarios} = user.persona;
      let body = {
        idagep_empresa,
        idagep_usuarios,
        "fechaInicio" : moment(dateStart).format('YYYY-MM-DD') + 'T00:00:00',
        "fechaFin" : moment(dateEnd).format('YYYY-MM-DD') + 'T23:59:59',
        "operacion" : "C"
      }
      const res = await DepositsControllers.getExcelDetail2(body);

      const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.response}`;
      const downloadLink = document.createElement('a');
      const fileName = `liquidación.xlsx`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
    setLoad(false);
  }

  return (
    <Dialog 
      draggable={false}
      visible={visible}
      onHide={() => initialState()}
      style={{ width: '50vw' }}
    >
      <h1 className={styles.liquidacionTitleModal} style={{textAlign: 'center'}}>Descargar Reporte de Liquidaciones</h1>
      <div style={{textAlign: 'center', marginTop: 20}}>
        <span>Seleccione el rango de fechas a considerar para el Reporte de Liquidaciones</span>
      </div>
      <section className="container-header">
      <FiltersContainer style={{display: 'flex', justifyContent: 'center', marginTop: 30}} lg={2} md={2}>
        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <Calendar
                id="icon1"
                placeholder="Inicio"
                className="myCalendarButton w-full"
                showIcon
                showButtonBar
                onChange={onChange(1)}
                value={dateStart}
                
              />
            </span>
          </FormItem>
        </FiltersItem>

          <FiltersItem>
            <FormItem>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search" />
                <Calendar
                  id="icon2"
                  placeholder="Final"
                  className="myCalendarButton w-full"
                  showIcon
                  showButtonBar
                  style={{background: "red"}}
                  onChange={onChange(2)}
                  value={dateEnd}
                />
              </span>
            </FormItem>
          </FiltersItem>
        </FiltersContainer>
        <div style={{marginTop: 10, textAlign: 'center'}}>
          { !valid && <span style={{color: '#fc0303'}}>Selecciona un rango de fechas válido</span>}
        </div>
      </section>
      <div style={{display: 'flex', justifyContent: 'center'}}>

        <Button onClick={() => initialState()} className={styles.closeModalBtn}>Regresar</Button>
        <Button loading={load} className={styles.btnDownloadReportModal} disabled={!valid} onClick={() => handleDownloadReport()}>Descargar</Button>
      </div>
    </Dialog>
  )
}


