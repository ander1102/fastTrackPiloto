import { ChangeEvent, useContext, useMemo, useState } from "react";
import Grid from "@app/components/Grid";
import { UserContext, UserProps } from "@app/context";
import { FormItem } from "@app/components/FormManager/FormItem";
import { InputText } from "primereact/inputtext";
import { ButtonLoader } from "@app/components/Buttons";
import { ClientsControllers } from "@app/logic/backend/clients";
import { evaluateValues, isEmpty } from "@app/common";
import { modalManager } from "@app/components/ModalComponent";
import DepositNotificationModal from "@app/components/ModalComponent/modals/configuration/DepositNotification";
import { BankData } from "@app/types/Configuration";
import {
  CONFIGURATION_REQUIRED_FIELDS,
  CONFIGURATION_VALIDATION,
} from "@app/constants/configuration";
import { checkEmptyFields, checkValidationFields } from "@app/utils/DOM";
import LoaderCheckBox from "@app/components/Checkbox/LoaderCheckBox";
import { toast } from "react-toastify";
import { DepositsControllers } from "@app/logic/backend/deposits";
import { toByte } from "@app/common/format";
import { CheckboxChangeEvent } from "primereact/checkbox";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";

const INITIAL: BankData = {
  account: "",
  bank: "",
  clabe: "",
  name: "",
};

export default function BankDataConfiguration({ user }: UserProps) {
  // const [edit, setEdit] = useState(true);
  const [data, setData] = useState(() => INITIAL);
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(UserContext);
  const [enable, setEnable] = useState(
    () => !!userCtx.client.infoComercio?.correoDeposito
  );
  const _isEmpty = useMemo(
    () => !evaluateValues(data, (x: string) => !isEmpty(x)),
    [data]
    );
    
  const onChange =
    (key: keyof BankData) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const validate = CONFIGURATION_VALIDATION[key];
      if (
        value &&
        validate &&
        validate.validate &&
        !validate.validate(value, validate.selectValidateValue)
      )
        return;
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const handleOnchange = async (e: CheckboxChangeEvent) => {
    setEnable(e.checked ?? false);
    const result = toByte(e.checked);
    const res = await DepositsControllers.depositEmail({
      idagep_empresa: userCtx.user.idagep_empresa ?? 0,
      avisoCorreo: result,
    });
    if (res.isSuccess && res.response?.mensaje) {
      toast.info(res.response.mensaje, DEFAULT_TOAST_CONFIGURATION);
      userCtx.setClient((prev) => ({
        ...prev,
        infoComercio: prev.infoComercio && {
          ...prev.infoComercio,
          correoDeposito: result,
        },
      }));
    }
  };

  const onSubmit = async () => {
    if (checkEmptyFields(CONFIGURATION_REQUIRED_FIELDS, data)) return;
    if (!checkValidationFields(data, CONFIGURATION_VALIDATION)) return;
    setLoading(true);
    const res = await ClientsControllers.changeBankData({
      banco: data.bank,
      clabe: data.clabe,
      cuenta: data.account,
      idagep_empresa: user.idagep_empresa ?? 0,
      operacion: "I",
      titular: data.name,
    });
    if (res.isSuccess && res.response?.code === "success"){
      await modalManager.show(DepositNotificationModal);
      setData((prev)=> prev)
      setLoading(false);
    }
    
  };

  return (
    <div>
      <Grid sm={1} md={2} lg={2} gap={5}>
        <FormItem label="Nombre del titular">
          <InputText
            onChange={onChange("name")}
            value={data.name}
          />
        </FormItem>
        <FormItem label="Número de cuenta">
          <InputText
            onChange={onChange("account")}
            value={data.account}
          />
        </FormItem>
        <FormItem label="Clabe interbancaria">
          <InputText
            onChange={onChange("clabe")}
            keyfilter="num"
            // disabled={!edit}
            value={data.clabe}
          />
        </FormItem>
        <FormItem label="Banco">
          <InputText
            onChange={onChange("bank")}
            value={data.bank}
          />
        </FormItem>
      </Grid>
      <Grid sm={1} md={2} lg={2} gap={5}>
        <section className="flex items-center gap-10 mt-3">
          <div className="flex flex-col">
            <span style={{color: 'var(--primary-color)'}}>Notificación de depósitos</span>
            <span className="text-light-gray-300">
              Recibir correos cuando se deposite dinero en tu cuenta bancaria
            </span>
          </div>
        </section>
      </Grid>
      <div className="flex items-center gap-2 bg-light-blue-100 py-5 rounded">
        <LoaderCheckBox checked={enable} onChange={handleOnchange} />
        <span style={{color: 'var(--primary-color)'}}>Habilitar</span>
      </div>
      
        <div className="flex items-center gap-5">
          <button
            disabled={_isEmpty}
            onClick={onSubmit}
            className="custom-button custom-button-primary mt-5"
            style={{backgroundColor: 'var(--primary-color)'}}
          >
            {loading ? <i className="pi pi-spin pi-spinner" /> : "Guardar"}
          </button>
        </div>
    </div>
  );
}
