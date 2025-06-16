import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import PageLayout from "@app/layout/app/layout";
import Header from "@app/layout/pagosrecurrentes/subscribers/header";
import Body from "@app/layout/pagosrecurrentes/subscribers/body";
import { useTableSubscribers } from "@app/layout/pagosrecurrentes/subscribers/useTableSubscribers";

function DetallesSuscritores({ user }: AppContextProps) {
  const {
    loader,
    items,
    itemReadPayment,
    dataTableQuery,
    onPage,
    onRefresh,
    onShowQuestionRemovePayment,
    onShowTableSubscriptionDetail
  } = useTableSubscribers();
  return (
    <PageLayout>
      <Header onRefresh={onRefresh} onShowQuestionRemovePayment={onShowQuestionRemovePayment}
      itemReadPayment ={itemReadPayment}
      />

      <Body
        loader={loader}
         items={items}
        onPage={onPage}
        dataTableQuery={dataTableQuery}
        onRefresh={onRefresh}
        onShowTableSubscriptionDetail={onShowTableSubscriptionDetail}
      />
    </PageLayout>
  );
}

export default withAppContext(
  DetallesSuscritores,
  "dashboard/pagosrecurrentes/suscritores",
  {
    title: "Detalles de Suscritores",
  }
);
