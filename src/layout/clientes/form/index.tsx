import { useMemo } from "react";
import { Client } from "@app/types/Clients";
import { INIT_CLIENT } from "@app/constants/client";
import { PermissionProps, User } from "@app/types/User";
import { kpiReserveFundType } from "@app/types/reserveFund";
import { Refresh } from "@app/hooks/useCall";
import { useFormClientes } from "@app/layout/clientes/useFormClientes";
import createClientForm from "./create";
import { ClientPersona } from "./types";
import SectionForm from "@app/components/Form/create/section";
import { ClientFormContextProvider } from "./forms/context";

export interface ClientFormLayoutProps extends PermissionProps {
  user: User;
  title: string;
  client: Client;
  kpiReserveFund: kpiReserveFundType | undefined;
  refreshReserveFund: Refresh<[body: number]>;
  type: ClientPersona;
}

export default function ClientFormLayout(props: ClientFormLayoutProps) {
  const tpmClient = useMemo(
    () =>
      Object.assign(
        { ...INIT_CLIENT },
        {
          ...props.client,
          fondoActivo: props.kpiReserveFund?.fondoActivo ?? 0,
          porcetaje: props.kpiReserveFund?.porcentaje ?? 0,
          persona: props.type,
        }
      ),
    [props.client]
  );

  const formClientMethods = useFormClientes(tpmClient);

  const FormElements = useMemo(
    () => createClientForm(props.type),
    [props.type]
  );

  return (
    <div className="w-full flex flex-col h-full overflow-hidden cumplimiento-form">
      <ClientFormContextProvider
        {...formClientMethods}
        type={props.type}
        formLayoutProps={props}
      >
        <SectionForm
          tabs={FormElements.tabs}
          activeTab={formClientMethods.activeTab}
          setActiveTab={formClientMethods.setActiveTab}
        />
      </ClientFormContextProvider>
    </div>
  );
}
