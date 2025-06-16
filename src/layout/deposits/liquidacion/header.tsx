import { useState } from "react"
import { DateFormat } from "@app/common/format"
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters"
import { KpiContainer } from "@app/components/ViewKpis"
import useValueHandler from "@app/hooks/useValueHandler"
import styles from "@app/styles/Liquidacion.module.css"
import { FormItem } from "@app/layout/clientes/templates"
import { Button } from "primereact/button"
import { Calendar, CalendarChangeEvent } from "primereact/calendar"
import { ModalReportDate } from "@app/components/ModalComponent/modals/liquidacion/modalReportDate"

export const LiquidacionHeader = (props:any) => {
  const [dateStart, setDateStart] = useValueHandler<Date>(
    () => DateFormat.month.start(new Date()).value
  );
  const [dateEnd, setDateEnd] = useValueHandler(
    () => DateFormat.month.end(new Date()).value
  );
  const [show, setShow] = useState<boolean>(false)

  const onChange = (id: number) => (e: CalendarChangeEvent) => {
    const date = e.value as Date;
    if (id === 1) {
      setDateStart(date);
      props.onRefresh({
        idagep_empresa: 1,
        fechaInicio: DateFormat.day.start(date, true).toSimpleFormatString(),
        fechaFin: DateFormat.day.end(dateEnd(), true).toSimpleFormatString(),
      });
      return;
    }
    setDateEnd(date);
    props.onRefresh({
      idagep_empresa: 1,
      fechaInicio: DateFormat.day
        .start(dateStart(), true)
        .toSimpleFormatString(),
      fechaFin: DateFormat.day.end(date, true).toSimpleFormatString(),
    });
  };


  return(
    <section className="container-header">
      <KpiContainer title="Liquidaciones"/>
      <FiltersContainer>

        <FiltersItem span={1}>
            <FormItem title="Buscar por fecha">
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search" />
                <Calendar
                  id="icon1"
                  placeholder="Inicio"
                  className="myCalendarButton w-full"
                  showIcon
                  showButtonBar
                  onChange={onChange(1)}
                  value={dateStart()}
                  disabled={props.loader}
                />
              </span>
            </FormItem>
          </FiltersItem>
          <FiltersItem span={1}>
            <FormItem>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search" />
                <Calendar
                  id="icon2"
                  placeholder="Final"
                  className="myCalendarButton w-full"
                  showIcon
                  showButtonBar
                  onChange={onChange(2)}
                  value={dateEnd()}
                  disabled={props.loader}
                />
              </span>
            </FormItem>
          </FiltersItem>
          <FiltersItem span={4}>
            <div style={{paddingBottom: 10}}>
              <Button onClick={() => setShow(true)} className={styles.btnDownloadReport}>Descargar Reporte de Liquidaciones</Button>
            </div>
          </FiltersItem>
      </FiltersContainer>
      <ModalReportDate visible={show} onHide={setShow} {...props}/>
    </section>
  )
}