import { SetStateAction, useContext, useEffect, useState } from "react";
import {
  INIT_VALUES_ALERTS,
  INIT_VALUES_OPERATIONAL,
  INIT_VALUES_TRANSACTIONAL,
} from "@app/constants/operations";
import {
  AlertsParameters,
  OperationalParameters,
  TransactionalParameters,
} from "@app/types/Operations";
import { InputNumberChangeEvent } from "primereact/inputnumber";
import { InputSwitchChangeEvent } from "primereact/inputswitch";
import { DropdownChangeEvent } from "primereact/dropdown";
import { OperationsControllers } from "@app/logic/backend/operations";
import useCall from "@app/hooks/useCall";
import { UserContext } from "@app/context";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { CalendarChangeEvent } from "primereact/calendar";
import { DateToTimeString } from "@app/common/date";

export interface ParametersState {
  loading: boolean;
  alertsParameters: AlertsParameters;
  operationalParameters: OperationalParameters;
  transactionalParameters: TransactionalParameters;
  onChangeAlerts: (
    key: keyof AlertsParameters
  ) => (
    e: InputNumberChangeEvent | InputSwitchChangeEvent | CalendarChangeEvent
  ) => void;
  onChangeOperational: (
    key: keyof OperationalParameters
  ) => (e: InputNumberChangeEvent | InputSwitchChangeEvent) => void;
  onChangeTransactional: (
    key: keyof TransactionalParameters
  ) => (
    e: InputNumberChangeEvent | InputSwitchChangeEvent | DropdownChangeEvent
  ) => void;
  onSave: () => void;
}

export const useParameters = (): ParametersState => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState<ParametersState["loading"]>(false);

  //States
  const [operationalParameters, setOperationalParameters] = useState<
    ParametersState["operationalParameters"]
  >(INIT_VALUES_OPERATIONAL(user));

  const [transactionalParameters, setTransactionalParameters] = useState<
    ParametersState["transactionalParameters"]
  >(INIT_VALUES_TRANSACTIONAL(user));

  const [alertsParameters, setAlertsParameters] = useState<
    ParametersState["alertsParameters"]
  >(INIT_VALUES_ALERTS(user));

  //Calls
  const { item: operationalItem, isCalling: operationalIsCalling } = useCall(
    OperationsControllers,
    "parametersOperationsOperationalGet",
    {
      initialParams: [INIT_VALUES_OPERATIONAL(user)],
    }
  );
  const { item: transactionalItem, isCalling: transactionalIsCalling } =
    useCall(OperationsControllers, "parametersOperationsTransactionalGet", {
      initialParams: [INIT_VALUES_TRANSACTIONAL(user)],
    });
 
    const { item: alertItem, isCalling: alertIsCalling } = useCall(
      OperationsControllers,
    "parametersAlertsGet",
    {
      initialParams: [INIT_VALUES_ALERTS(user)],
    }
  );

  //useEfecct
  useEffect(() => {
    if (operationalItem && transactionalItem) {
      setOperationalParameters(operationalItem);
      setTransactionalParameters(transactionalItem);
    }
  }, [operationalItem, transactionalItem]);

  useEffect(() => {
    if (alertItem) {
      setAlertsParameters({
        ...alertsParameters,
        ...alertItem

      });
    }
  }, [alertItem]);

  //Refresh
  const onRefreshOperational = (
    curr: SetStateAction<Partial<OperationalParameters>>
  ) => {
    setOperationalParameters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  const onRefreshTransactional = (
    curr: SetStateAction<Partial<TransactionalParameters>>
  ) => {
    setTransactionalParameters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  const onRefreshAlerts = (curr: SetStateAction<Partial<AlertsParameters>>) => {
    setAlertsParameters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  //Change

  const onChangeAlerts: ParametersState["onChangeAlerts"] = (key) => (e) => {
    let value = e.value ?? 0;
    if (key.includes("estatus")) {
      value = Number(value);
    }else if (key.includes("horario")){
      value = DateToTimeString(new Date(value as string))
    }

    onRefreshAlerts({ [key]: value });
  };

  const onChangeOperational: ParametersState["onChangeOperational"] =
    (key) => (e) => {
      // Special case because diasNaturales's max = 31
      if (key === "diasNaturales") {
        const value =
          typeof e.value === "number" ? (e.value > 31 ? 31 : e.value) : 0;

        onRefreshOperational({ diasNaturales: value ?? 0 });
        return;
      }
      if (key === "notificacion") {
        onRefreshOperational({ notificacion: e.value ? 1 : 0 });
        return;
      }

      const value = e.value ?? 0;
      onRefreshOperational({ [key]: value });
    };

  const onChangeTransactional: ParametersState["onChangeTransactional"] =
    (key) => (e) => {
      const value = e.value ?? 0;
      onRefreshTransactional({ [key]: value });
    };



  const onSave: ParametersState["onSave"] = async () => {
    setLoading(true);
    // const responseOperational = await OperationsControllers.parametersOperationsUpdate(
    //   operationalParameters
    // );
    // const responseTransactional = await OperationsControllers.parametersOperationsUpdate(
    //   transactionalParameters
    // );
    const responseAlert:any = await OperationsControllers.parametersAlertsUpdate(
      alertsParameters
    );
    setLoading(false);
    if (
      responseAlert.response.mensaje === 'Actualizado'
    ) {
      toast.success(responseAlert.response.mensaje, DEFAULT_TOAST_CONFIGURATION);
    } else {
      toast.error(
        "Ocurrió un error. Por favor, intente más tarde.",
        DEFAULT_TOAST_CONFIGURATION
      );
    }
  };

  return {
    loading,
    alertsParameters,
    operationalParameters,
    transactionalParameters,
    onChangeAlerts,
    onChangeOperational,
    onChangeTransactional,
    onSave,
  };
};
