import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import Grid from "@app/components/Grid";
import { KpiContainer, KpiItem } from "@app/components/ViewKpis";
import {
  ClientsReferralsAllResponseData,
} from "@app/types/ClientsReferrals";
import { DateDDMMYYHHMMA } from "@app/common/date";
interface DetailsCardModalProps extends ViewProps<boolean> {
  item:ClientsReferralsAllResponseData
}
function DetailsCardModal({
  visibleStyles,
  handleClose,
  show,
  item
}: PageSizeModalProps<DetailsCardModalProps>) {
  return (
    <Dialog
      visible={show}
      header={
        <div className="dialog-header">
          <h2 className="dialog-title">Detalle de Cliente Referido</h2>
        </div>
      }
      className="shadow-none md:w-4/5 w-10/12"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={true}
    >
      <article className="dialog-content">
        <KpiContainer  className="justify-between">
          <KpiItem title="Estatus de Cliente Referido" value={item.estatus}></KpiItem>
          <KpiItem title="Monto Trasacciones Total" value={item.montoTotal}></KpiItem>
          <KpiItem title="Trasacciones Totales Realizadas" value={item.countRechazadas}></KpiItem>
          <KpiItem title="Comisiones Total Generadas" value={item.comisionTotal}></KpiItem>
        </KpiContainer>
        <Grid sm={1} md={3} lg={3}>
          <div className="py-2">
            <p className="text-md text-gray-400 ">Fecha de registro</p>
            <p className="text-md  text-black">  {DateDDMMYYHHMMA(new Date(item.fechaEnt))}</p>
          </div>
          <div className="py-2">
            <p className="text-md text-gray-400">Nombre del Comercio</p>
            <p className="text-md  text-black">{item.nombre}</p>
          </div>
          <div className="py-2">
            <p className="text-md text-gray-400">Agente Comercial</p>
            <p className="text-md text-primary">{item.seller}</p>
          </div>
        </Grid>
        <Grid sm={1} md={3} lg={3}>
          <div className="py-2">
            <p className="text-md text-gray-400">Tpo de persona</p>
            <p className="text-md  text-black">{item.persona}</p>
          </div>
          <div className="py-2">
            <p className="text-md text-gray-400">Nombre Completo</p>
            <p className="text-md text-black">{item.nombre}</p>
          </div>
        </Grid>

        <Grid sm={1} md={3} lg={3}>
          <div className="py-2">
            <p className="text-md text-gray-400">Giro del Comercio</p>
            <p className="text-md text-black">{item.giro}</p>
          </div>
          <div className="py-2">
            <p className="text-md  text-gray-400">Cantidad de productos</p>
            <p className="text-md text-black">{}</p>
          </div>
        </Grid>
        <Grid sm={1} md={3} lg={3}>
          <div className="py-2">
            <p className="text-md text-gray-400 ">Producto</p>
            <p className="text-md  text-black">0</p>
          </div>
        </Grid>
      </article>
    </Dialog>
  );
}

export default withModalPageSize(DetailsCardModal);
