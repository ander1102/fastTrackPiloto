import withAppContext from "@app/components/HOC/withAppContext";
import PageLayout from "@app/layout/app/layout";
import RechazadasBody from "@app/layout/rechazadas/body";
import { TransactionRejectedContextProvider } from "@app/layout/rechazadas/context";
import RechazadasHeader from "@app/layout/rechazadas/header";

export const CONTEXT = "dashboard/rechazadas";

function Rechazadas() {
  return (
    <PageLayout>
      <TransactionRejectedContextProvider>
        <RechazadasHeader />
        <RechazadasBody />
      </TransactionRejectedContextProvider>
    </PageLayout>
  );
}

export default withAppContext(Rechazadas, CONTEXT, {
  title: "Rechazadas",
});
