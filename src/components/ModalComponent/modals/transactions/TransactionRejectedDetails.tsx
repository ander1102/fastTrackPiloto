import { maskText } from "@app/common/format";
import withModalPageSize, {
  type PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import type { ViewProps } from "@app/components/ViewManager/View/comp";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import type { TransactionRejected } from "@app/types/Rejected";
import TransactionModalBase from "./base";
import TransactionItem from "./item";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { assetsConfig } from "../../../../../assets.config";

interface TransactionRejectedDetailsModalProps extends ViewProps {
  item: TransactionRejected;
}

function TransactionRejectedDetailsModal({
  item,
  ...pageProps
}: PageSizeModalProps<TransactionRejectedDetailsModalProps>) {
  return (
    <TransactionModalBase
      {...pageProps}
      imageSrc={assetsConfig.transaccion.rejectImg}
      title="Detalle de la transacción rechazada"
      body1={
        <>
          <TransactionItem title="Cliente" value={item.cliente} />
          <TransactionItem
            title="Monto total"
            value={useTruncateAmout(item.monto)}
          />
          <TransactionItem title="ID" value={`#${item.ID}`} />
          <TransactionItem title="Método de pago" value={item.metodo} />
          <TransactionItem title="Fecha y hora" value={DateDDMMYYHHMMA(new Date(item.fecha))} />
          <TransactionItem
            title="Tipo de transacción"
            value={item.tipoTransaccion}
          />
        </>
      }
      body2={
        <>
          <TransactionItem title="Producto" value={item.producto} />
          <TransactionItem
            title="Número de tarjeta"
            value={`**** ${item.numTarjeta?.slice(-4)}`}
          />
          <TransactionItem title="Tipo de tarjeta" value={item.tarjeta} />
          <TransactionItem title="CÓDIGO ERROR PROSA" value={item.codigo} />
          <TransactionItem title="DESCRIPCIÓN PROSA" value={item.descripcion} />
          <TransactionItem
            title="MENSAJE DE ERROR “THUNDERPAY”"
            value={item.mensaje}
          />
        </>
      }
    />
  );
}

export default withModalPageSize(TransactionRejectedDetailsModal);
