import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { ButtonPrimary,ButtonReturnLight } from "@app/components/Buttons";
import Grid from "@app/components/Grid";
import { FormItem } from "@app/components/FormManager/FormItem";
import { InputText } from "primereact/inputtext";
import {
  CardInfoCardRequestResponseCard,
  CardCreditResponseCredit,
  CardDepositsBody,
} from "@app/types/Card";
import moment from "moment";
moment.locale("es");
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import DepositEmpty from "@app/components/EmptyTemplate/DepositEmpty";
import { Column } from "primereact/column";
import { useEffect, useMemo, useState } from "react";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { TransactionsControllers } from "@app/logic/backend/transactions";
import useCall from "@app/hooks/useCall";
import {
  TransactionSaldoEfevoopayBody,
} from "@app/types/Transactions";
import { User } from "@app/types/User";
import { DepositsControllers } from "@app/logic/backend/deposits";
import { CardsController } from "@app/logic/backend/cards";

interface PayCardEfevooPayBalanceProps extends ViewProps<boolean> {
  user: User;
  infocard?: CardInfoCardRequestResponseCard;
  credit?: CardCreditResponseCredit;
  handleSuccessPay?:(res?:any) => void;
}
function PayCardEfevooPayBalance({
  user,
  infocard,
  credit,
  visibleStyles,
  handleClose,
  handleSuccessPay,
  show,
}: PageSizeModalProps<PayCardEfevooPayBalanceProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDeposit, setSelectedDeposit] = useState<any>([]);
  const [deposits, setDeposits] = useState<any>([]);
  const [devoluciones, setDevoluciones] = useState<string>('0.0')

  const memoizedDeposits = useMemo(() => deposits, [deposits]);
  const memoizedSelectedDeposit = useMemo(() => selectedDeposit, [selectedDeposit]);
  const memoFormattedDevolutions = useMemo(()=>(Number(devoluciones) > 0 ? "-" + Number(devoluciones).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }) : Number(devoluciones).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })),[devoluciones]);
  const callGetEfevooAmount = useCall(
    TransactionsControllers,
    "saldoefevoopay",
    () => ({
      initialParams: [
        {
          idagep_empresa: `${user.idagep_empresa ?? ""}`,
        },
      ] as [body: TransactionSaldoEfevoopayBody],
    })
  );

  const callGetEfevooDeposits = useCall(
    CardsController,
    "deposits",
    () => ({
      initialParams: [
        {
          idagep_empresa: `${user.idagep_empresa ?? ""}`,
          operacion:"T"
        }
      ] as [body: CardDepositsBody],
    })
  );

  const saldoEfevoo = useMemo(
    () => (callGetEfevooAmount.item?.saldoefevoo ?? 0),
    [ callGetEfevooAmount]
  );

  useEffect(() => {
    DepositsControllers.getDevolutionAmount(user.idagep_empresa)
      .then((res) => {
        if(res.status === 200){
          setDevoluciones(res.response);
        }
      })
      .catch((err) => {
        console.error(err)
        setDevoluciones('0.0')
      })
  }, [])
  useEffect(() => {
    if (callGetEfevooDeposits.item){
      console.log("uh")
      setDeposits(callGetEfevooDeposits.item)
      //setSelectedDeposit(callGetEfevooDeposits.item)
      setIsLoading(false)
    }
  }, [callGetEfevooDeposits.item])

  const calcularSubTotalMontos = (monto:any) => {
    let total = 0.00;
    if (monto !== undefined && monto.length > 0) {
      monto.forEach((el:any) => {
        const monto = parseFloat(el.subtotal);
        total += monto;
      });
      total = total;
      total = parseFloat(total.toFixed(2));
      const totalFormateado = total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
      return totalFormateado;
    }
    return total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
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
    else if (Number(devoluciones)>0){
      return "-"+Number(devoluciones).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    }
    return total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
  };
  let renameTransactions:any= {
    "VN": "Pago"
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

  const onPayCard = () =>{
    setIsLoading(true);
    const idsArray = selectedDeposit?.map((transaccion:any) => transaccion.req_id?.toString());
    const idsText = idsArray?.join(', ');
    let payload = {
      "idagep_empresa": user.idagep_empresa??0,
      "montoTotal" : subtotalAmount(),
      "transacciones" : idsText,
      "card": Number(infocard?.id??0)
    }
    CardsController.pay(payload)
      .then((res) => {
        setIsLoading(false);
        if (res.isSuccess) {
          handleClose(false);
          if (handleSuccessPay)
            handleSuccessPay(true);
        }
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error(`Error:`, res.response?.msg ?? "");
      });
  }

  return (
    <Dialog
      visible={show}
      className="shadow-none sm:w-full md:w-1/2 lg:w-4/5"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      dismissableMask
      closable={false}
    >
      <section className="flex flex-col items-center lg:px-5 relative">
        <div className="w-full">
          <p className="text-2xl text-black-1 text-center">
            Pago de tarjeta
          </p>
          <p className={"text-xl h-1/2 flex text-left items-center"}>
            <i
              className={"pi pi-arrow-left size-5 absolute cursor-pointer"}
              onClick={() => handleClose(false)}
            />
          </p>
        </div>
        <div className="mb-3">
          <p className="text-md text-grey-1 text-center">
            Realiza el pago de tu tarjeta para estar al corriente <br /> con tu
            crédito.
          </p>
          <div className="mb-3">
            <FormItem className="items-center" label="Saldo Efevoo Pay actual">
              <InputText
                className="text-primary border-primary text-center bg-tertiary"
                readOnly
                value={
                  useTruncateAmout(saldoEfevoo) ?? 0
                }
              />
            </FormItem>
          </div>
        </div>
        <Grid sm={1} md={2} lg={2} gap={8} className="mb-3 sm:w-full md:w-full lg:w-4/5 xl:w-4/5 2xl:w-3/5" style={{columnGap:"10%"}}>
          <FormItem label="Pago para no generar intereses">
            <InputText
              readOnly
              className="text-grey-1"
              value={
                useTruncateAmout(credit?.not_interest_payment as number) ?? 0
              }
            />
          </FormItem>
          <FormItem label="Fecha limite de pago">
            <InputText
              readOnly
              className="text-grey-1"
              value={moment(credit?.limit_date).format("DD [de] MMMM")}
            />
          </FormItem>
          <FormItem label="Deduda total">
            <InputText
              className="text-primary border-primary"
              readOnly
              value={useTruncateAmout((credit?.total_debt as number) ?? 0)}
            />
          </FormItem>
          <FormItem label="Pago mínimo de la tarjeta">
            <InputText
              readOnly
              className="text-grey-1"
              value={useTruncateAmout(credit?.min_payment as number) ?? 0}
            />
          </FormItem>
        </Grid>
        <DataTable
              value= {memoizedDeposits}
              className="datatable-custom w-full"
              scrollHeight="350px"
              scrollable
              virtualScrollerOptions={{ itemSize: 50 }}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
              dataKey="req_id"
              rowHover
              filterDisplay="menu"
              loading={isLoading}
              globalFilterFields={["ID"]}
              emptyMessage={DepositEmpty}
              currentPageReportTemplate=""
              selection={memoizedSelectedDeposit}
              onSelectionChange={(e:any) => setSelectedDeposit(e.value)}
            >
            <Column selectionMode="multiple" headerStyle={{ width: '1rem' }}></Column>
            <Column header="ID" field="req_id" ></Column>
            <Column header="Método de pago" field="tipotarj"></Column>
            <Column header="Tarjeta" field="redtarj"></Column>
            <Column header="Tipo de transaccion" field="tipotxn" body={(item) =>  `${renameTransactions[item.tipotxn]}`}></Column>
            <Column header="Número de tarjeta" field="pan" body={(item) =>  `**** ${item?.pan?.slice(-4)}`}></Column>
            <Column header="Fecha y hora" field="fechaEnt" body={(item) => DateDDMMYYHHMMA(new Date(item.fechaEnt))}></Column>
            <Column sortable header="Monto" field="subtotal" body={(item) => `${item.subtotal?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`}></Column>
        </DataTable>
        <div className="w-full flex flex-col justify-end mx-8 mt-5">
          <div className="flex flex-row justify-end w-full">
            <div className="">Subtotal</div>
            <div className="basis-full lg:basis-2/12 text-right text-black-1">{calcularSubTotalMontos(selectedDeposit ?? [])}</div>
          </div>
          <div className="flex flex-row justify-end w-full">
            <div className="">Devoluciones</div>
            <div className="basis-full lg:basis-2/12 text-right text-black-1">{memoFormattedDevolutions}</div>
          </div>
          <div className="flex flex-row justify-end w-full">
            <div className="">Total</div>
            <div className="basis-full lg:basis-2/12 text-right text-black-1">{calcularTotalMontos(selectedDeposit ?? [])}</div>
          </div>
        </div>
      </section>
        <div className="flex flex-row space-x-5 justify-end mt-5">
          <ButtonReturnLight
            className="button-light-back-large"
            onClick={() => handleClose(false)}
          />
          <ButtonPrimary
            className="button-primary-large"
            label="Pagar Tarjeta"
            loading={isLoading}
            disabled={Boolean(!user) || selectedDeposit?.length < 1}
            onClick={onPayCard}
          />
        </div>
    </Dialog>
  );
}

export default withModalPageSize(PayCardEfevooPayBalance);
