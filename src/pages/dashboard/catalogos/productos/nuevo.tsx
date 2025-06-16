import React from "react";
import withAppContext, { AppContextProps } from "@app/components/HOC/withAppContext";
import { ProductNew } from "@app/layout/catalogos/productos/productoNew/productoNew";

export const CreateProduct = ({
  setTitle,
  permission,
  user,
  userType,
}: AppContextProps) => {
  return(
    <ProductNew user={user} permission={permission} userType={userType} setTitle={setTitle}/>
  )
}

export default withAppContext(
  CreateProduct,
  "dashboard/catalogos/productos/nuevo",
  {
    title: "Nuevo producto",
  }
);