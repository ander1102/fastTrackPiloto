import { SetStateAction, useEffect, useState } from "react";
import Grid from "@app/components/Grid";
import { FormItem } from "@app/components/FormManager/FormItem";
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import Lottie from "react-lottie";
import successAnimation from "@app/assets/lotties/success.json";
import styles from "@app/styles/AgenteComercial.module.css";
import { TableHistoryDeposits } from "./TableHistoryDeposits";
import { SellersController } from "@app/logic/backend/sellers";
import { InputText } from "primereact/inputtext";
import useCall from "@app/hooks/useCall";

export const ModalDepositSeller = ({visible,onHide, user }:any) => {
  const {idagep_usuarios} = user;
  const [amount, setAmount] = useState<number | null>(null);
  const [load, setLoad] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [optionsClients, setOptionsClients] = useState([]);
  const [currentClient, setCurrentClient] =useState<any>(null);
  const [reference, setReference] = useState<any>('');
  const [showHistory, setShowHistory] = useState(false)
  const [isValid, setIsValid] = useState(false);
  const [filters, setFilters] = useState({
    idagep_usuarios : idagep_usuarios,
    pagina: 1,
    tamano_pagina:5,
  })
  const { item, isCalling, itemManager, refresh } = useCall(
    SellersController,
    "getHistoryDeposit",
    () => ({
      initialParams: [filters] as [body: any],
      skipFistCall: true,
    })
  );
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
        <span className="font-bold white-space-nowrap" style={{color: '#5840D1', fontSize: '25px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal'}}>Nuevo depósito</span>
    </div>
  );

  useEffect(() => {
    getAgentOptions()
  }, [])

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmitDeposit = async() => {
    setLoad(true)
    let body = {
      "referencia" : currentClient?.referencia,
      "monto" : amount,
      "referenciaDep" : reference,
      "operacion" : "C"
    }

    let res = await SellersController.createDeposit(body)
    const {response} = res
    if(response.estatus === 200){
      setIsSuccess(true)
      setLoad(false)
    } else {
      setLoad(false)
    }
  }
  
  useEffect(() => {
    refresh([filters]);
  }, [filters]);


  const onRefresh = (curr: SetStateAction<Partial<any>>) => {
    setFilters((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  const getAgentOptions = async() => {
    let res = await SellersController.getAgentCatalog(idagep_usuarios)
    if (res.response.data && res.response.data.length > 0){
      setOptionsClients(res.response.data)
    } else {
      setOptionsClients([])
    }

  }

  const handleCloseAndReset = () => {
    onHide(false)
    setIsSuccess(false);
    setCurrentClient(null);
    setReference(null)
    setAmount(null);
    setShowHistory(false);
  };

  useEffect(() => {
    const isValidInput = currentClient !== null && amount !== null && reference !== '' && amount > 0;
    setIsValid(isValidInput);
  }, [currentClient, amount, reference]);

  const handleInputChange = (field: string, e: any) => {
    switch (field) {
      case "client":
        setCurrentClient(e.value);
        break;
      case "amount":
        setAmount(e.value);
        break;
      case "reference":
        setReference(e.target.value);
        break;
      default:
        break;
    }
  };

  return(
    <Dialog
      headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
      contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9}}
      header={headerElement}
      draggable={false}
      visible={visible}
      style={{ width: '50vw' }}
      onHide={() => handleCloseAndReset()}
    >
      <div style={{width: '100%', height: 1, borderTop: '1px solid #B8AFE6', marginBottom: 5}}/>
      {isSuccess ? (
        <div className={"px-0 flex flex-col items-center"}>
          <Lottie options={animationOptions} height={75} width={75} isPaused />
          <p className="mt-4 text-lg text-green-600 font-semibold">
            Depósito creado con éxito
          </p>
        </div>
      ) : (
        <div className={"px-0 flex flex-col"}>
          <Grid lg={2} gap={3}>
            <FormItem  label="Agente comercial *" className="py-2">
              <Dropdown
                value={currentClient}
                onChange={(e) => handleInputChange("client", e)}
                options={optionsClients}
                optionLabel="nombre" 
                placeholder="Selecciona una opción"
                className="w-full md:w-14rem"
              />
            </FormItem>
            <FormItem label="Monto *" className="py-2">
              <InputNumber
                value={amount}
                onChange={(ele) => handleInputChange("amount", ele)}
                placeholder="00.00"
                style={{ width: "100%", borderRadius: 6}}
                minFractionDigits={2}
                maxFractionDigits={2}
                min={0}
                prefix="$"
                suffix=" MXN"
                currency="MXN"
              />
            </FormItem>
          </Grid>
          <Grid lg={1} gap={3}>
            <FormItem
              label="Referencia *"
              className="lg:mt-0 mt-4"
              slg={1}
            >
              <InputText
                value={reference}
                onChange={(ele) => handleInputChange("reference", ele)}
                style={{ width: "100%", marginBottom: 12 }}
              />
            </FormItem>
          </Grid>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button className={styles.submitDeposit} disabled={!isValid} loading={load} onClick={() => handleSubmitDeposit()}>Depositar</Button>
            <Button style={{color: '#5840D1', fontSize: 16}} label={showHistory ? "Cerrar historial de depósitos" : "Ver historial de depósitos"} link onClick={() => {setShowHistory(!showHistory); onRefresh({pagina:1})}}/>
          </div>
          {
            showHistory &&
            <TableHistoryDeposits isCalling={isCalling} dataTable={item.data ?? []} total={item.total ?? 0} onRefresh={onRefresh}/>
          }
        </div>
    )}
    </Dialog>
  )
  
}