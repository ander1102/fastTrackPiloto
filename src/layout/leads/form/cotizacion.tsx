import { SetStateAction, useEffect, useMemo, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import styles from "@app/styles/Leads.module.css";
import { Cotizacion, LeadInfoStructure } from "@app/types/Leads";
import ProductosLead from "./productos";

interface cotizacionProps{
    cotiza: Cotizacion,
    productos?: any,
    onRefresh: (body: SetStateAction<Partial<LeadInfoStructure>>) => void;
}

export default function CotizacionLead({cotiza, productos, onRefresh}:cotizacionProps) {
    const [comisionD, setComisionD] = useState<any>(0);
    const [comisionC, setComisionC] = useState<any>(0);
    const [ventaEstimada, setVentaEstimada] = useState<any>(0);
    const [ticketPromedio, setTicket] = useState<any>(0);
    const [comisionI, setComisionI] = useState<any>(0)

    useEffect(() => {
        onRefresh({
            infoCotizacion: [{
                ...cotiza,
                comisionC,
                ventaEstimada,
                comisionD,
                ticketPromedio,
                comisionI
            }]
        }) 
    }, [comisionC,comisionD,  ventaEstimada, ticketPromedio, comisionI])

    useEffect(() => {
        setComisionD(cotiza.comisionD !== '' || cotiza.comisionD !== null ? cotiza?.comisionD : 0);
        setComisionC(cotiza.comisionC !== '' ? cotiza?.comisionC: 0);
        setTicket(cotiza.ticketPromedio !== '' ? cotiza?.ticketPromedio: 0);
        setVentaEstimada(cotiza.ventaEstimada !== '' ? cotiza?.ventaEstimada: 0);
        setComisionI(cotiza.comisionI !== '' ? cotiza.comisionI : 0);
    }, [])

    
  return (
    <>
        <div className={styles.wrapperCotizacion} style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className={styles.subWrapperCotizacion}>
            <div className={styles.generalRow}>
                <div className={styles.rowLeftItem}>
                    <p className={styles.leadInputTitle} >Comisión tarjeta de débito</p>
                    <InputNumber min={0} suffix="%" value={comisionD} onChange={(e) => setComisionD(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} className="w-full rounded" />
                </div>
                <div className={styles.rowLeftItem}>
                    <p className={styles.leadInputTitle}>Comisión tarjeta de crédito</p>
                    <InputNumber min={0} suffix="%" value={comisionC} onChange={(e) => setComisionC(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} className="w-full rounded" />
                </div>
            </div>
            <div className={styles.generalRow}>
                <div className={styles.rowLeftItem} >
                    <p className={styles.leadInputTitle} >Venta estimada mensual</p>
                    <InputNumber min={0} inputId="currency-us" value={ventaEstimada} onChange={(e) => setVentaEstimada(e.value)} mode="currency" currency="USD" locale="en-US" className="w-full rounded" />
                </div>
                <div className={styles.rowRightItem} >
                    <p className={styles.leadInputTitle} >Ticket promedio</p>
                    <InputNumber min={0} inputId="currency-us" value={ticketPromedio} onChange={(e) => setTicket(e.value)} mode="currency" currency="USD" locale="en-US" className="w-full rounded" />
                </div>
            </div>
            <div className={styles.generalRow} >
                <div className={styles.inputComisionInternacional} >
                    <p className={styles.leadInputTitle} >Comisión internacional</p>
                    <InputNumber min={0} suffix="%" value={comisionI} onChange={(e) => setComisionI(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} className="w-full rounded" />
                </div>
            </div>
            </div>
            <div>
                <ProductosLead productos={productos} onRefresh={onRefresh} />
            </div>
        </div>
    </>
  );
}
