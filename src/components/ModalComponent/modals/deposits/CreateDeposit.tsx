import { useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@app/components/Grid";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { FormItem } from "@app/components/FormManager/FormItem";
import { DepositsControllers } from "@app/logic/backend/deposits";
import { Client } from "@app/types/Clients";
import { Dialog } from "primereact/dialog";
import { ButtonLoader } from "@app/components/Buttons";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import successAnimation from "@app/assets/lotties/success.json";
import { CustomDropdownChangeEvent } from "@app/components/HOC/createDropdownData";
import styles from "@app/components/ModalComponent/modal.module.css";
import { kpiReserveFundType } from "@app/types/reserveFund";
import { ClientsControllers } from "@app/logic/backend/clients";
import { Refresh } from "@app/hooks/useCall";
import { CatClientesDeposits } from "@app/components/Dropdowns";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DateFormat } from "@app/common/format";
import { DateDDMMYYHHMMA } from "@app/common/date";
import ModalDepositEmpty from "@app/components/EmptyTemplate/ModalDepositEmpty";
import { Checkbox } from "primereact/checkbox";

interface CreateDepositProps extends ViewProps {
  client?: Client;
  kpiReserveFund?: kpiReserveFundType | undefined;
  refreshReserveFund?: Refresh<[body: number]>;
  onRefresh?: () => void;
}

function CreateDeposit({
  client,
  visibleStyles,
  show,
  handleClose,
  kpiReserveFund,
  refreshReserveFund,
  onRefresh,
}: PageSizeModalProps<CreateDepositProps>) {
  const date = new Date();
  const start = DateFormat.month.start(date, true);
  const end = DateFormat.month.end(date, true);
  const [selectedDeposit, setSelectedDeposit] = useState<any>([]);
  const [deposits, setDeposits] = useState<any>([]);
  const [amount, setAmount] = useState<number | null>(null);
  const [devoluciones, setDevoluciones] = useState<string>('0.0')
  const [reference, setReference] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loDelModal, setLoDelModal] = useState({title:'Selecciona un cliente', subtitle:'No hay nada para mostrar'})
  const [reserveAmount, setReserveAmount] = useState<number>(0);
  const [valuePorcentaje, setValuePorcentaje] = useState<number>();
  const [valueCurrentClientId, setValueClientId] = useState<any>(0);
  const [valueClient, setValueClient] = useState<any>({
    idagep_empresa: 0,
    nombre: "",
    ...client,
  });
  const [reserveFund, setReserveFund] = useState<number>(0)
  const [valueKpiReserveFund, setValueKpiReserveFund] = useState<
    kpiReserveFundType | undefined
  >(kpiReserveFund);

  const idsArray = selectedDeposit?.map((transaccion:any) => transaccion.req_id?.toString());
  const idsText = idsArray?.join(', ');

  useEffect(()=>{
    if(client){
      setValueClient(client)
      setValueClientId(client)
    }
  },[]) 

  useEffect(()=>{
    if(valueClient && valueClient?.nombre && valueClient.nombre.trim() !== '') setLoDelModal({title:'No hay nada para mostrar', subtitle:'No se ha realizado ningún depósito'})
  },[valueClient]) 

  useEffect(() => {
    if (!amount) {
      setReserveAmount(0);
    } else if (valueKpiReserveFund) {
      setValuePorcentaje(+valueKpiReserveFund.porcentaje);
      setReserveAmount((amount * valueKpiReserveFund.porcentaje) / 100);
    }
  }, [amount, valueKpiReserveFund]);


  useEffect(() => {
    if (valueCurrentClientId !== undefined && valueCurrentClientId){
      DepositsControllers.getAllTransactions(
        {
          "idagep_empresa" : valueCurrentClientId,
          "tipoDep": 0,
          "monto" : 0,
          "montoReserva" : 0,
          "porcentaje" : 0,
          "referencia" : "",
          "fechaInicio" : start.toSimpleFormatString(),
          "fechaFin" : end.toFormatString(),
          "transacciones" : "",
          "idDeposito" : 0,
          "operacion" : "T"
      })
      .then((res) => {
        if(res.status === 200){
          setDeposits(res.response.transacciones)
          setSelectedDeposit(res.response.transacciones)
        }
      })
      .catch((err) => {
        console.error(err);
      })

      DepositsControllers.getDevolutionAmount(valueCurrentClientId)
      .then((res) => {
        if(res.status === 200){
          setDevoluciones(res.response);
        }
      })
      .catch((err) => {
        console.error(err)
        setDevoluciones('0.0')
      })
      getReserveFound(valueCurrentClientId)
    }
  }, [valueCurrentClientId])


  const getReserveFound = async (id:any) => {
    const res:any = await ClientsControllers.getKpiReserveFund(id)
    if (res.isSuccess){
      const {fondo} = res.response
      setReserveFund(fondo[0]?.porcentaje ?? 0)
    } else {
      setReserveFund(0)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true);
    let payload = { 
      "idagep_empresa": valueCurrentClientId,
      "tipoDep": 0,
      "monto" : subtotalAmount(),
      "montoReserva" : amountSendReserveFund(calcularTotalMontos(selectedDeposit)),
      "porcentaje" : reserveFund,
      "referencia" : "",
      "fechaInicio" : start.toSimpleFormatString(),
      "fechaFin" : end.toSimpleFormatString(),
      "transacciones" : idsText,
      "idDeposito" : 0,
      "operacion" : "C"
    }
    DepositsControllers.getAllTransactions(payload)
      .then((res) => {
        setIsLoading(false);
        if (res.isSuccess) {
          onRefresh && onRefresh();
          setTimeout(()=>{
              handleClose(true)
          },2000)
          if (refreshReserveFund) {
            refreshReserveFund([valueClient?.idagep_empresa]);
          }
          setIsSuccess(true);
        }
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error(`Error:`, res.response?.msg ?? "");
      });
  };

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onEntityChange = async (e: CustomDropdownChangeEvent) => {
    const value: number = e.value;

    setValueClientId(value);

    const cliente = await ClientsControllers.get({
      idagep_empresa: +value,
    });
    setValueClient(cliente.response);

    const kpiReserveFund:any = await ClientsControllers.getKpiReserveFund(value);

    if (kpiReserveFund) {
      setValueKpiReserveFund(kpiReserveFund.response?.fondo?.[0]);
    }
  };

  const calcularTotalMontos = (monto:any) => {
    let total = 0.00;
    if (monto !== undefined && monto.length > 0) {
      monto.forEach((el:any) => {
        const monto = parseFloat(el.subtotal);
        total += monto;
      });
      total = total - Number(devoluciones);
      total = parseFloat(total.toFixed(2));
      const totalFormateado = total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
      return totalFormateado;
    }
  
  };

  const amountSendReserveFund = (amount:any) => {
    if (amount !== undefined) {
      let numeroLimpio = amount.replace(/[^\d.-]/g, '');
      let numero = parseFloat(numeroLimpio);
      let result = numero * reserveFund / 100
      return result.toFixed(2);
    } else {
      return 0
    }
  }

  const subtotalAmount = () => {
    let total = 0.00;
    selectedDeposit.forEach((el:any) => {
      const monto = parseFloat(el.subtotal);
      total += monto;
    });
    total = parseFloat(total.toFixed(2));
    return total - Number(devoluciones);
  };

  let renameTransactions:any= {
    "VN": "Pago"
  }

  const memoizedDeposits = useMemo(() => deposits, [deposits]);
  const memoizedSelectedDeposit = useMemo(() => selectedDeposit, [selectedDeposit]);
  const memoizedOnEntityChange = useCallback(onEntityChange, []);
  const isRowSelectable = (event:any) => (event.data.estatus === 0);

  return (
    <Dialog
      header={
        <div className="dialog-header">
          <h2 className="dialog-title" style={{color: 'var(--primary-color)'}}>Nuevo depósito</h2>
        </div>
      }
      visible={show}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      draggable={false}
      onHide={() => handleClose()}
      dismissableMask
      style={{ width: "70vw", borderRadius:10}}
      headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
      contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9}}
      focusOnShow={false}
    >
      {isSuccess ? (
        <div className={"px-0 flex flex-col items-center"}>
          <Lottie options={animationOptions} height={75} width={75} isPaused />
          <p className="mt-4 text-lg text-green-600 font-semibold">
            Depósito creado con éxito
          </p>
        </div>
      ) : (
        <div className={"px-0 flex flex-col"}>
          <Grid lg={3} gap={3}>
          {client ? (
            <FormItem  slg={2} className="py-2">
              <p className="text-md text-black">Cliente:</p>
              <p className="text-sm text-gray-400">{valueClient?.nombre}</p>
            </FormItem>
          ) : (
            <FormItem  title="Cliente*" className="py-2">
              <p className="text-lg text-gray-400">Cliente:</p>
              <CatClientesDeposits
                className="w-full"
                placeholder="Cliente"
                value={valueCurrentClientId}
                filter
                onChange={memoizedOnEntityChange}
                style={{borderRadius: 10}}
              />
            </FormItem>
          )}
          </Grid>
          <Grid>
            <DataTable
              id="deposits-table"
              value={valueCurrentClientId === undefined ? [] : memoizedDeposits}
              className="datatable-custom"
              scrollHeight="300px"
              scrollable
              virtualScrollerOptions={{ itemSize: 50 }}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
              dataKey="req_id"
              rowHover
              filterDisplay="menu"
              loading={isLoading}
              isDataSelectable={isRowSelectable}
              globalFilterFields={["ID"]}
              emptyMessage={ModalDepositEmpty(loDelModal)}
              currentPageReportTemplate=""
              style={{ background: "white" }}
              selectionMode="multiple"
              metaKeySelection={false}
              selection={memoizedSelectedDeposit}
              onSelectionChange={(e:any) => setSelectedDeposit(e.value)}
            >
              <Column selectionMode={undefined} body={(item) => (<div style={{pointerEvents: 'none'}}>
                <Checkbox onChange={e => setSelectedDeposit(e)} checked={selectedDeposit.filter((el:any) => el.req_id === item.req_id).length > 0}/>
              </div>)}/>
              <Column header="ID" field="req_id" style={{ width: '10%', maxWidth: '10%', overflow: "hidden", textOverflow: "ellipsis"}} ></Column>
              <Column header="Método de pago" field="tipotarj" style={{ width: '15%', maxWidth: '15%', overflow: "hidden", textOverflow: "ellipsis"}}></Column>
              <Column header="Tarjeta" field="redtarj" style={{ width: '10%', maxWidth: '10%', overflow: "hidden", textOverflow: "ellipsis"}}></Column>
              <Column header="Tipo de transacción" field="tipotxn" body={(item) =>  `${renameTransactions[item.tipotxn]}`} style={{ width: '15%', maxWidth: '15%', overflow: "hidden", textOverflow: "ellipsis"}}></Column>
              <Column header="Número de tarjeta" field="pan" body={(item) =>  `**** ${item?.pan?.slice(-4)}`} style={{ width: '15%', maxWidth: '15%', overflow: "hidden", textOverflow: "ellipsis"}}></Column>
              <Column header="Fecha y hora" field="fechaEnt" body={(item) => DateDDMMYYHHMMA(new Date(item.fechaEnt))} style={{ width: '15%', maxWidth: '15%', overflow: "hidden", textOverflow: "ellipsis"}}></Column>
              <Column header="Monto" field="subtotal" body={(item) => `${item.subtotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`} style={{ width: '15%', maxWidth: '15%', overflow: "hidden", textOverflow: "ellipsis"}}></Column>
            </DataTable>
          </Grid>
          <Grid>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <div style={{width: '25%', display: 'flex', justifyContent: 'space-around'}}>
                Subtotal <span>{calcularTotalMontos(selectedDeposit)}</span>
              </div>
            </div>
          </Grid>
          <Grid>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
              <div className={styles.createDepositAmmount}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:"100%"}}>
                  <div style={{marginRight:20}} >
                    <div style={{display: 'flex', justifyContent: 'flex-end'}} className={styles.spanPurpleColor}>{reserveFund}%</div>
                    <div className={styles.spanPurpleColor}>Fondo reserva</div>
                  </div>
                  <div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}} className={styles.spanPurpleColor}>${amountSendReserveFund(calcularTotalMontos(selectedDeposit ?? 0))}</div>
                    <div className={styles.spanPurpleColor}>Monto por enviar a fondo</div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 35}}>
            <ButtonLoader
              style={{background:'var(--primary-color)', border:'var(--primary-color)', width:200}}
              loading={isLoading}
              disabled={Boolean(!valueCurrentClientId) || selectedDeposit?.length < 1}
              onClick={handleSubmit}
            >
              Liquidar
            </ButtonLoader>
          </div>
        </div>
      )}
    </Dialog>
  );
}

export default withModalPageSize(CreateDeposit);