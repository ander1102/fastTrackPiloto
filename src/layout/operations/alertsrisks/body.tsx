import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import EmptyTemplate from "@app/components/EmptyTemplate";
import { TableContainer } from "@app/layout/app/containers";
import { TableAlertsRisksState } from "./useTableAlertsRisks";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { ESTATUS } from "@app/constants/operations";
import TransactionDetailsModal from "@app/components/ModalComponent/modals/transactions/TransactionDetails";
import { ButtonDetails } from "@app/components/Buttons";
import { modalManager } from "@app/components/ModalComponent";
import { useContext } from "react";
import { UserContext } from "@app/context";
import { OperationsControllers } from "@app/logic/backend/operations";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { DateDDMMYYHHMMA } from "@app/common/date";
interface AlertasRiesgosBodyProps
  extends Pick<
    TableAlertsRisksState,
    | "loader"
    | "dataTableQuery"
    | "items"
    | "onRefresh"
    | "onPage"
    | "onUpdateSatus"
  > {}

const getColor = (value: string): string => {
  switch (value) {
    case "Nueva":
      return "bg-[#5840D1]";
    case "Validada":
      return "bg-green-500";
    case "Retenida":
      return "bg-red-500";
    default:
      return "bg-gray-200";
  }
};

export const AlertasRiesgosBody = ({
  loader,
  items,
  dataTableQuery,
  onUpdateSatus,
  onPage,
}: AlertasRiesgosBodyProps) => {
  const { user } = useContext(UserContext);
  const itemTemplate = (option: { value: string }) => {
    const color = getColor(option.value);
    return (
      <div className="flex items-center gap-2">
        <span className={`rounded-full h-2 w-2 ${color}`}></span>
        <div>{option.value}</div>
      </div>
    );
  };

  const valueTemplate = (option: { value: string }, props: DropdownProps) => {
    if (option) {
      const color = getColor(option.value);
      return (
        <div className="flex items-center gap-2">
          <span className={`rounded-full h-2 w-2 ${color}`}></span>
          <div>{option.value}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const handleTxn = async (idTxn: number, tipo: string) => {
    const responseAlertsRisksTxn = await OperationsControllers.alertsRisksTxn({
      idTxn,
      tipo,
      idagep_usuario: user.persona.idagep_usuarios,
    });
    if (responseAlertsRisksTxn.isSuccess && responseAlertsRisksTxn.response?.ID) {
      await modalManager.show(TransactionDetailsModal, {
        item: responseAlertsRisksTxn.response,
        user,
        permitReverse: false,
        onRefresh: () => {},
      });
    }else{
      toast.error("Ha ocurrido al recuperar la trasacción", DEFAULT_TOAST_CONFIGURATION);
    }
  };

  return (
    <TableContainer>
      <DataTable
        className="datatable-custom bg-white"
        currentPageReportTemplate=""
        emptyMessage={EmptyTemplate}
        filterDisplay="menu"
        first={dataTableQuery.first}
        globalFilterFields={["idagep_controles_empresas"]}
        lazy
        loading={loader}
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
        rows={dataTableQuery.rows}
        rowHover
        scrollHeight="90%"
        scrollable
        totalRecords={dataTableQuery.totalRecords}
        value={items ?? []}
        onPage={onPage}
      >
        <Column field="idTxn" header="No. Folio" />
        <Column header="Tipo de Alerta" field="nombre" />
        <Column header="Fecha"   body={(item) => DateDDMMYYHHMMA(new Date(item.fechaEnt))} />
        <Column
          header="Estado"
          body={(item) => (
            <Dropdown
              className="w-[200px] rounded-[7px]"
              options={ESTATUS}
              value={item.estatus}
              onChange={({ value }) =>
                onUpdateSatus(item.idagep_controles_alertas, value)
              }
              itemTemplate={itemTemplate}
              valueTemplate={valueTemplate}
            />
          )}
        />

        <Column header="Cliente" field="empresa" />
        <Column
          body={(item) => (
            <ButtonDetails
              disabled={false}
              onClick={() => {
                handleTxn(item.idTxn, item.tipo);
              }}
            />
          )}
        />
      </DataTable>
    </TableContainer>
  );
};
