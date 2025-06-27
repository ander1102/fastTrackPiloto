import { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import Grid from "@app/components/Grid";
import { TabView, TabPanel } from 'primereact/tabview';
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Deposit } from "@app/types/Deposits";
import { Dialog } from "primereact/dialog";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { removeMXN } from "@app/common";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DepositDetailsPdf } from "@app/utils/pdf";
import { useReactToPrint } from "react-to-print";
import { Menu } from "primereact/menu";
import styles from "@app/styles/DepositsModal.module.css"
import Image from "next/image";
import { DateFormat } from "@app/common/format";
import { DepositsControllers } from "@app/logic/backend/deposits";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { EXCEL_DEPOSIT_TRANSACTION_COLUMNS } from "@app/constants/deposits";
import { ExcelController } from "@app/logic/backend/excel";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { download } from "@app/utils/DOM";
import { EXCEL_CONTENT_TYPE } from "@app/constants/excel";

interface DepositDetailsModalProps extends ViewProps {
  item: Deposit;
}

function DepositDetailsModal({
  item,
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<DepositDetailsModalProps>) {
  const date = new Date();
  const start = DateFormat.month.start(date, true);
  const end = DateFormat.month.end(date, true);
  const [index, setIndex] = useState<number>(0);
  const [transactions, setTransactions] = useState<Array<any>>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const data = [
    {
      id: item.ventas,
      name: 'Ventas totales',
    },
    {
      id: item.comisiones,
      name: 'Comisiones',
    },
    {
      id: item.iva,
      name: 'IVA de la Comisión',
    },
    {
      id: item.deducciones,
      name: 'Reversos / Cancelaciones / Devoluciones',
    },
    {
      id: item.monto,
      name: 'Depósito',
    },
  ]
  const menuLeft = useRef<any>(null);
  const items = [
    {
      label: 'PDF',
      icon: 'pi pi-file-pdf',
      command: () => {
        handlePrint();
      }
    },
    {
      label: 'EXCEL',
      icon: 'pi pi-file-excel',
      command: () => {
        onExport();
      }
    }
  ]

  const handlePrint = useReactToPrint({
    documentTitle: `depósito_#${item.idDeposito}`,
    content: () => componentRef.current,
  });
 
  const getWorksheets = (itemsTransaction:any) => {
    return {
      worksheets: [
        {
          name: "Depositos",
          items: itemsTransaction.map((x:any)=>{
            return {
              idDeposito: x.req_id,
              Sucursal: x.Sucursal,
              tipotarj: x.tipotarj,
              FechaHora: x.FechaHora,
              monto: x.monto.replace("MXN", ""),
              comision: x.comision.replace("MXN", ""),
              iva: x.iva.replace("MXN", ""),
              saldo: x.saldo.replace("MXN", ""),
              acumulado: x.acumulado.replace("MXN", "")
            }
          }) ?? [],
          options: {
            displayColumns: EXCEL_DEPOSIT_TRANSACTION_COLUMNS,
          },
        }
      ]
    }
  }

  const onExport = async () => {
    const woorksheets = getWorksheets(transactions);
    const res = await ExcelController.export(woorksheets);
    if (!res.isSuccess || !res.response) {
      if (res.error && res.error.message)
        toast.error(res.error.message, DEFAULT_TOAST_CONFIGURATION);
      return;
    }
    download(
      res.response,
      `${"Deposito-detalle"}.xlsx`,
      EXCEL_CONTENT_TYPE
    );
  };
  const getStylesTotal = (rowData : any) => {
    return <span style={{color: rowData.name === 'Depósito' ? 'var(--primary-color)' : ''}}>{rowData.name}</span>
  }

  const getStylesTotal2 = (rowData : any) => {
    return <span style={{color: rowData.name === 'Depósito' ? 'var(--primary-color)' : ''}}>{rowData.id}</span>
  }

  useEffectAsync(async() => {
    let payload = { 
      "idagep_empresa": item.idagep_empresa,
      "tipoDep": 0,
      "monto" : 0,
      "montoReserva" : 0,
      "porcentaje" : 0,
      "referencia" : "",
      "fechaInicio" : start.toSimpleFormatString(),
      "fechaFin" : end.toSimpleFormatString(),
      "transacciones" : "",
      "idDeposito" : item.idDeposito,
      "operacion" : "D"
    }
    DepositsControllers.getAllTransactions(payload)
    .then((res) => {
      if (res.status === 200){
        setTransactions(res.response.transacciones)
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <Dialog
      header={
        <div className="dialog-header">
          <h2 className="dialog-title" style={{ color: 'var(--primary-color)'}}>Detalle de depósito</h2>
          <div>
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button className={`mr-5 ${styles.btnDownload}`} onClick={(event) => menuLeft?.current?.toggle(event)} aria-controls="popup_menu_left" aria-haspopup>
              <Image src="/Images/svg/ico/export.svg" width={15} height={12} alt="" className="mr-2"/>
              Descargar
            </Button>
          </div>
        </div>
      }
      visible={show}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      draggable={false}
      onHide={() => handleClose()}
      dismissableMask
      id="deposits-details"
    >
      <div className="hidden">
        <DepositDetailsPdf ref={componentRef} depositResume={item} transactions={transactions} />
      </div>
      <div  className="dialog-deposit">
        <TabView activeIndex={index} onTabChange={(e) => setIndex(e.index)}>
          <TabPanel header="General">
              <Grid sm={1} md={2} lg={2}>
                <div className="py-2">
                  <p className="text-md text-black">ID</p>
                  <p className="text-sm text-gray-400">#{item.idDeposito}</p>
                </div>
                <div className="py-2">
                  <p className="text-md text-black">Cliente</p>
                  <p className="text-sm text-gray-400">{item.nombre}</p>
                </div>
                <div className="py-2">
                  <p className="text-md text-black">Fecha</p>
                  <p className="text-sm text-gray-400">
                    {DateDDMMYYHHMMA(new Date(item.FechaHora))}
                  </p>
                </div>
                <div className="py-2">
                  <p className="text-md text-black">Descripción</p>
                  <p className="text-sm text-gray-400">{item.descripcion}</p>
                </div>
                <div className="py-2">
                  <p className="text-md text-black">Referencia</p>
                  <p className="text-sm text-gray-400">{item.referencia}</p>
                </div>
                <div className="py-2">
                  <p className="text-md text-black">Monto</p>
                  <p className="text-sm text-gray-400">{removeMXN(item.monto)}</p>
                </div>
                <div className="py-2">
                  <p className="text-md text-black">Porcentaje fondo de reserva</p>
                  <p className="text-sm text-gray-400">{item.porcentaje}</p>
                </div>
                <div className="py-2">
                  <p className="text-md text-black">
                    Monto enviado al fondo de reserva
                  </p>
                  <p className="text-sm text-gray-400">
                    {removeMXN(item.montoReserva)}
                  </p>
                </div>
              </Grid>
          </TabPanel>
          <TabPanel header="Resumen">
            <div>
              <span>El depósito realizado corresponde a las ventas del <span style={{color: 'var(--primary-color)', fontSize: '14px', fontWeight: 700}}>{`(${item.primera_fecha} - ${item.ultima_fecha})`}</span></span>
              <DataTable value={data} tableStyle={{ minWidth: '50rem' }} className="deposit-details" id="deposit-details">
                <Column key={1} field={"name"} body={getStylesTotal} header={"Concepto"} style={{ maxWidth: '150px' }}/>
                <Column key={2} field={"id"} body={getStylesTotal2} alignHeader={'center'} bodyStyle={{ textAlign: 'center' }} header={"Cantidad / Monto"} />
              </DataTable>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </Dialog>
  );
}

export default withModalPageSize(DepositDetailsModal);
