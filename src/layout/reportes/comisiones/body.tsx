import { useContext, useEffect } from "react";

import EmptyTemplate from "@app/components/EmptyTemplate";
import useCall from "@app/hooks/useCall";
import { ReportControllers } from "@app/logic/backend/reports";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReportResumeConstants } from "@app/constants/reports";
import { ComisionesReportsProps } from ".";
import { ReportComissionContext } from "./context";
import { ComissionReportEntotyColumn } from "./columns";
import {
  ComissionReportDataExcel,
  ComissionReportExcelColumns,
  ComissionReportData,
} from "@app/types/Reports";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { ExcelExportBody } from "@app/types/Excel";
import { DateFormat } from "@app/common/format";
import { omit } from "@app/common";

interface ComisionesReportsBodyProps extends ComisionesReportsProps {}

export default function ComisionesReportsBody({
  user,
  userType,
}: ComisionesReportsBodyProps) {
  const { filter, successListenner } = useContext(ReportComissionContext);
  const Comission = useCall(ReportControllers, "getComissionReport", () =>
    ReportResumeConstants.getComissionCallOptionsParams(filter, user, userType)
  );

  useEffect(() => {
    Comission.itemManager.addEventListenner("change", (item) => {
      successListenner.requestSuccess();
    });
    Comission.refresh(
      ReportResumeConstants.getComissionCallOptionsParams(
        filter,
        user,
        userType
      ).initialParams
    );
    return () => {
      Comission.itemManager.removeEventListenner("change");
    };
  }, [filter]);



  const colWidth = `${100 / (userType === "master" ? 5 : 4)}%`;

  return (
    <DataTable
      paginator
      value={Comission.item ?? []}
      className="datatable-custom"
      scrollHeight="85%"
      scrollable
      rows={10}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      dataKey="id"
      rowHover
      filterDisplay="menu"
      style={{
        padding: 0,
      }}
      loading={Comission.isCalling}
      emptyMessage={EmptyTemplate}
      globalFilterFields={["nombre"]}
      currentPageReportTemplate="{first} a {last} de un total de {totalRecords} registros"
    >
      <Column
        style={{ width: colWidth }}
        header={userType === "master" ? "Cliente" : "Sucursal"}
        body={(item: ComissionReportData) => (
          <ComissionReportEntotyColumn item={item} userType={userType} />
        )}
      />
      <Column
        header="Monto"
        style={{ width: colWidth }}
        body={(item: ComissionReportData) =>
          `${useTruncateAmout(item.Monto)}`
        }
      />
      <Column
        header="Comisión + IVA"
        style={{ width: colWidth }}
        body={(item: ComissionReportData) =>
          `${useTruncateAmout(item.comisionIVA)}`
        }
      />
      {userType === "master" && (
        <Column
          header="Tasa + IVA"
          style={{ width: colWidth }}
          body={(item: ComissionReportData) =>
            `${useTruncateAmout(item.TasaBaorteIVA)}`
          }
        />
      )}
      {/* {userType === "master" && (
        <Column
          header="Porcentaje de tasa"
          style={{ width: colWidth }}
          body={(item: ComissionReportData) =>
            `${item.porcentajeTasa}`
          }
        />
      )} */}
      {userType === "master" && (
        <Column
          header="Utilidad"
          style={{ width: colWidth }}
          body={(item: ComissionReportData) =>
            `${useTruncateAmout(item.utilidad)}`
          }
        />
      )}
    </DataTable>
  );
}
