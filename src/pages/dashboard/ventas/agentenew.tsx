import React from "react";
import withAppContext, { AppContextProps } from "@app/components/HOC/withAppContext";
import { AgenteNew } from "@app/layout/ventas/agenteComercial/AgenteNew/agenteNew";

function AgenteComercialNew({
  setTitle,
  permission,
  user,
  userType,
}: AppContextProps) {
  return(
    <>
      <AgenteNew permission={permission} user={user} userType={userType}/>
    </>
  )
}

export default withAppContext(
  AgenteComercialNew,
  "dashboard/ventas/agentenew",
  {
    title: "Nuevo Agente Comercial",
  }
);
