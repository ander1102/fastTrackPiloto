import withAppContext from "@app/components/HOC/withAppContext";
import PageLayout from "@app/layout/app/layout";
import Header from "@app/layout/pagosrecurrentes/payments/header";
import Body from "@app/layout/pagosrecurrentes/payments/body";
import { useTablePayments } from "@app/layout/pagosrecurrentes/payments/useTablePayments";

function PagosRecurrentes() {

  const { filters, loader,isAdmin, items, dataTableQuery, onPage, onRefresh } =
    useTablePayments();

  return (
    <PageLayout>
      <Header onRefresh={onRefresh} filters={filters} isAdmin={isAdmin} />
      <Body
        loader={loader}
        items={items}
        onPage={onPage}
        dataTableQuery={dataTableQuery}
        onRefresh={onRefresh}
        isAdmin={isAdmin}
      />
    </PageLayout>
  );
}

export default withAppContext(PagosRecurrentes, "dashboard/pagosrecurrentes", {
  title: "Pagos Recurrentes",
});
