import Head from "next/head";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Dashboard from "@app/components/Nav";

import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import withContextProvider from "@app/components/HOC/withContextProvider";
import { APP_TITLE } from "@app/constants";
import { useContext, useEffect } from "react";
import { PrimeReactContext } from "primereact/api";
import "@app/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const { setRipple } = useContext(PrimeReactContext);

  useEffect(() => {
    setRipple(true);
  }, []);

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name="description" content={APP_TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        </style>
      </Head>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <header>
          <div id="navbar" />
        </header>
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      </div>
    </>
  );
}

export default withContextProvider(App);
