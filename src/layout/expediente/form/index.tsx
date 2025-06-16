import { useContext, useEffect, useMemo, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { TabView, TabPanel } from "primereact/tabview";
import { toast } from "react-toastify";
import { ButtonLoader } from "@app/components/Buttons";
import ComercioDetails from "../../clientes/form/comercio";
import ClientDireccion from "../../clientes/form/direccion";
import ClientContactos from "../../clientes/form/contactos";
import { ExpedienteRepresentante } from "./representante";
import { ExpedienteDocumentacion } from "./documentacion";

import { Client } from "@app/types/Clients";
import { kpiReserveFundType } from "@app/types/reserveFund";
import { PermissionProps, User } from "@app/types/User";
import { UserContext } from "@app/context";
import useCall, { Refresh } from "@app/hooks/useCall";
import { useFormClientes } from "../useFormClientes";
import { DossiersControllers } from "@app/logic/backend/dossiers";
import { INIT_CLIENT } from "@app/constants/client";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";

interface ExpedienteFormLayoutProps extends PermissionProps {
  client: Client;
  kpiReserveFund: kpiReserveFundType | undefined;
  title: string;
  user: User;
  refreshReserveFund: Refresh<[body: number]>;
}

export function ExpedienteFormLayout(
  props: ExpedienteFormLayoutProps
) {
  const { user } = useContext(UserContext);
  const [isExceptional, setIsExceptional] = useState(false);
  const { item, isCalling } = useCall(
    DossiersControllers,
    "getExceptional",
    {
      initialParams: [
        {
          idagep_usuario: user.persona.idagep_usuarios,
          idagep_empresa: props.client.idagep_empresa,
        },
      ],
    }
  );

  const tpmClient = useMemo(
    () =>
      Object.assign(
        { ...INIT_CLIENT },
        {
          ...props.client,
          fondoActivo: props.kpiReserveFund?.fondoActivo ?? 0,
          porcetaje: props.kpiReserveFund?.porcentaje ?? 0,
        }
      ),
    [props.client]
  );

  const {
    activeTab,
    canFulfillment,
    canSaveFulfillment,
    client,
    clientFulfillment,
    disabled,
    formik,
    hasReasons,
    handleTabChange,
    handleOnReasons,
    handleOnDocumentChange,
    setClientFulfillment,
  } = useFormClientes(tpmClient);

  const buttons = (
    <>
      {canFulfillment && (
        <div className="mt-5 pr-5 w-full flex justify-end">
          <ButtonLoader
            className={hasReasons ? "rechazaBtn" : "validaBtn"}
            disabled={canSaveFulfillment}
            type="button"
            onClick={handleOnReasons}
          >
            {hasReasons ? "Rechazar" : "Validar"}
          </ButtonLoader>
        </div>
      )}
    </>
  );

  const handleSwitch = async () => {
    const response = await DossiersControllers.updateExceptional({
      idagep_empresa: props.client.idagep_empresa,
      idagep_usuario: user.persona.idagep_usuarios,
      excepcional: !isExceptional ? 1 : 0,
    });

    if (response.response?.mensaje === "Actualizado") {
      toast.success(response.response.mensaje, DEFAULT_TOAST_CONFIGURATION);
      setIsExceptional((prevValue) => !prevValue);
    } else {
      toast.error(
        "No se pudo actualizar la información. Por favor, intente más tarde.",
        DEFAULT_TOAST_CONFIGURATION
      );
    }
  };

  useEffect(() => {
    if (item?.excepcional) setIsExceptional(!!item.excepcional);
  }, [item?.excepcional]);

  return (
    <div className="w-full flex flex-col h-full cumplimiento-form">
      {buttons}
      <TabView
        activeIndex={activeTab}
        className="h-full"
        id="expedienteTabs"
        onTabChange={handleTabChange}
      >
        <TabPanel header="General">
          <div className="flex justify-between items-center">
            {renderTitle("Información del cliente")}
            <div className="w-72 h-12 mt-5 flex justify-center items-center gap-5 rounded">
              <InputSwitch
                checked={isExceptional}
                disabled={isCalling}
                onChange={handleSwitch}
              />
              <span>Caso Excepcional</span>
            </div>
          </div>
          <div className="mt-5 w-full flex flex-col">
            <ComercioDetails
              activeTab={activeTab}
              canFulfillment={canFulfillment}
              disabled={disabled[0]}
              errors={formik.errors}
              fulfillment={clientFulfillment}
              person={client.persona}
              values={formik.values}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
              setFulfillment={setClientFulfillment}
            />
          </div>
        </TabPanel>
        <TabPanel header="Dirección fiscal">
          <ClientDireccion
            activeTab={activeTab}
            canFulfillment={canFulfillment}
            disabled={disabled[0]}
            errors={formik.errors}
            fulfillment={clientFulfillment}
            values={formik.values}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            setFulfillment={setClientFulfillment}
          />
        </TabPanel>
        <TabPanel header="Contactos">
          <ClientContactos
            activeTab={activeTab}
            canFulfillment={canFulfillment}
            disabled={disabled[0]}
            errors={formik.errors}
            fulfillment={clientFulfillment}
            values={formik.values}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            setFulfillment={setClientFulfillment}
          />
        </TabPanel>
        <TabPanel header="Documentación">
          <div className="w-full">
            {renderTitle("Documentación")}
            <div className="mt-5 w-full flex flex-col">
              <ExpedienteDocumentacion
                activeTab={activeTab}
                canFulfillment={canFulfillment}
                disabled={disabled[1]}
                errors={formik.errors}
                fulfillment={clientFulfillment}
                person={client.persona}
                values={formik.values}
                handleChange={formik.handleChange}
                onDocumentChange={handleOnDocumentChange}
                setFieldValue={formik.setFieldValue}
                setFulfillment={setClientFulfillment}
              />
            </div>
          </div>
        </TabPanel>
        {client.persona === "moral" && (
          <TabPanel header="Representantes">
            <ExpedienteRepresentante
              activeTab={activeTab}
              canFulfillment={canFulfillment}
              disabled={disabled[0]}
              errors={formik.errors}
              fulfillment={clientFulfillment}
              values={formik.values}
              handleChange={formik.handleChange}
              onDocumentChange={handleOnDocumentChange}
              setFieldValue={formik.setFieldValue}
              setFulfillment={setClientFulfillment}
            />
          </TabPanel>
        )}
      </TabView>
    </div>
  );
}

const renderTitle = (title: string) => (
  <div className="flex flex-row justify-between mt-5">
    <p className="text-2xl flex items-center text-[#6B3374]">
      {title}
    </p>
  </div>
);
