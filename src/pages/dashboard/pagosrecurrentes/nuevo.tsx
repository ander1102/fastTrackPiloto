import withAppContext from "@app/components/HOC/withAppContext";
import Header from "@app/layout/pagosrecurrentes/formCreate/header";
import Body from "@app/layout/pagosrecurrentes/formCreate/body";

function NuevoPagoRecurrente() {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}

export default withAppContext(
  NuevoPagoRecurrente,
  "dashboard/pagosrecurrentes/nuevo",
  {
    title: "Nuevo Pago Recurrente",
  }
);
