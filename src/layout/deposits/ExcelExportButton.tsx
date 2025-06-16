import { ButtonExcel } from "@app/components/Buttons";
import { Deposit, DepositExcelColumns } from "@app/types/Deposits";
import { ExcelExportBody } from "@app/types/Excel";
import { EXCEL_DEPOSIT_COLUMNS } from "@app/constants/deposits";
import { removeMXN } from "@app/common";
import { DateDDMMYYHHMMA } from "@app/common/date";
interface ExcelExportButtonProps {
    items: Deposit[];
    originalItem: () => Deposit[] | null;
  }
  
const ExcelExportButton = ({
    items,
    originalItem,
  }: ExcelExportButtonProps) => {
    const getWorksheets = (
      deposits: Deposit[]
    ): ExcelExportBody<DepositExcelColumns> => {
      return {
        worksheets: [
          {
            name: "Depositos",
            items: deposits.map((x)=>{
              return {
                ...x,
                monto: removeMXN(x.monto),
                montoReserva: removeMXN(x.montoReserva),
                FechaHora: DateDDMMYYHHMMA(new Date(x.FechaHora))
              }
            }) ?? [],
            options: {
              displayColumns: EXCEL_DEPOSIT_COLUMNS,
            },
          },
        ],
      };
    };
  
    return (
      <ButtonExcel
        items={items}
        getWorksheets={getWorksheets}
        originalItems={originalItem}
        fileName="depositos"
      />
    );
  };

  export default ExcelExportButton