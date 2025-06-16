import { ComponentType } from "react";
import { UserContextProvider } from "@app/context";
import { PageSizeContextProvider } from "@app/context/Size";
import { AppProps } from "next/app";
import { PrimeReactProvider } from "primereact/api";

/**HOC que envuelve la aplicacion con los context de la app */
export default function withContextProvider(
  Component: ComponentType<AppProps>
) {
  return (props: AppProps) => (
    <PrimeReactProvider>
      <UserContextProvider>
        <PageSizeContextProvider>
          <Component {...props} />
        </PageSizeContextProvider>
      </UserContextProvider>
    </PrimeReactProvider>
  );
}
