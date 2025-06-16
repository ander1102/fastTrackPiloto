import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import EmptyTemplate from "@app/components/EmptyTemplate";
import { ButtonDetails, Button } from "@app/components/Buttons";
import { useTableSubscribersDetail } from "@app/layout/pagosrecurrentes/subscribers/useTableSubscribersDetail";
import {
  ESTATUS_TYPES,
  PagosRecurrentesSubscribersPagosResponsePagos,
} from "@app/types/PagosRecurrentes";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import TransactionDetailsModal from "@app/components/ModalComponent/modals/transactions/TransactionDetails";
import { modalManager } from "@app/components/ModalComponent";
import { useContext } from "react";
import { UserContext } from "@app/context";
import { isDate } from "@app/common/format";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { TableContainer } from "@app/layout/app/containers";
interface modalSubscriptionDetailProps extends ViewProps {
  idagep_pagos_suscriptor: number;
  estatus: number;
  onShowQuestionRemoveSuscriptor: (id: number) => void;
}

function modalSubscriptionDetail({
  visibleStyles,
  handleClose,
  show,
  idagep_pagos_suscriptor,
  estatus,
  onShowQuestionRemoveSuscriptor,
}: PageSizeModalProps<modalSubscriptionDetailProps>) {
  const { items, sumaMonto, loader, dataTableQuery, onPage, onRefresh } =
    useTableSubscribersDetail(idagep_pagos_suscriptor);
  const { user } = useContext(UserContext);
  return (
    <Dialog
      visible={show}
      className="shadow-none w-[95%]  md:w-4/5 xl:w-4/5 min-h-[80vh]"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={true}
    >
      <section className="flex flex-col items-center gap-5">
        <div className="flex justify-between items-center w-full mt-3">
          <h2 className="text-primary text-center text-xl">
            Detalle del Suscriptor
          </h2>
          {estatus == ESTATUS_TYPES.Activo && (
            <Button
              label="Eliminar suscripción"
              className="button-delete !w-44 !rounded-sm"
              onClick={() => {
                handleClose(true);
                onShowQuestionRemoveSuscriptor(idagep_pagos_suscriptor);
              }}
            />
          )}
        </div>
        <div className="h-[1px] w-full bg-purple-light"></div>
        <div className="h-[60vh] w-full">
          <DataTable
            value={items}
            paginator
            className="datatable-custom"
            scrollable
            rows={dataTableQuery.rows}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown "
            dataKey="idTransaccion"
            rowHover
            filterDisplay="menu"
            responsiveLayout="scroll"
            globalFilterFields={["idTransaccion"]}
            emptyMessage={EmptyTemplate}
            currentPageReportTemplate=""
            loading={loader}
            style={{ background: "white" }}
            onPage={onPage}
            lazy
            totalRecords={dataTableQuery.totalRecords}
            first={dataTableQuery.first}
          >
            <Column
              header="ID"
              body={(item: PagosRecurrentesSubscribersPagosResponsePagos) => {
                return "#" + item.ID;
              }}
            />
            <Column header="Método de pago" field="tipotarj" />
            <Column header="Tarjeta" field="redtarj" />
            <Column header="Tipo de trasaccíon" field="Transaccion" />
            <Column
              header="Número de tarjeta"
              body={(item) => {
                return "****" + item.pan?.slice(-4);
              }}
            />
            <Column
              header="Fecha y hora"
              field="datcr"
              body={(item) => {
                return isDate(item.datcr)
                  ? DateDDMMYYHHMMA(new Date(item.datcr))
                  : item.datcr;
              }}
            />
            <Column
              header="Monto"
              field="amount"
              body={(item) => {
                const truncateDecimals = (number: number) => {
                  return Math[number < 0 ? "ceil" : "floor"](number);
                };
                const aux = item.amount;
                const truncated = truncateDecimals(aux * 100) / 100;

                return useTruncateAmout(truncated);
              }}
            />
            <Column
              field="flecha"
              style={{ width: "10%" }}
              body={(item) => {
                return (
                  <ButtonDetails
                    onClick={async () => {
                      await modalManager.show(TransactionDetailsModal, {
                        item:
                          item.Transaccion === "COMISIÓN"
                            ? items.find(
                                (ele) =>
                                  ele.ID === item.ID &&
                                  ele.Transaccion === "PAGO"
                              ) ?? item
                            : item,
                        user: user,
                        permitReverse: false,
                        onRefresh: () => onRefresh({}),
                      });
                    }}
                  />
                );
              }}
            />
          </DataTable>
        </div>
        <div className="flex justify-end my-3 w-full">
          <span className="w-20 text-bold text-primary">Total:</span>
          <span className="w-25 text-bold text-primary text-left">
            {useTruncateAmout(sumaMonto)}
          </span>
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(modalSubscriptionDetail);
