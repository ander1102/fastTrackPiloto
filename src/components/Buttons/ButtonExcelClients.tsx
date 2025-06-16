import { EXCEL_CONTENT_TYPE } from "@app/constants/excel";
import { ExcelController } from "@app/logic/backend/excel";
import { ExcelExportBody } from "@app/types/Excel";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { ButtonLoader } from "../Buttons";
import { download } from "@app/utils/DOM";
import { executeReturnedValue } from "@app/common/format";
import styles from "./styles.module.css";
import Image from "next/image";

interface ExcelExportButtonProps<Items extends any[], IExcelItems = Items> {
  getWorksheets: (items: Items) => ExcelExportBody<IExcelItems>;
  fileName?: string | ((items: Items) => string);
  originalItems?: () => Items | null;
  items?: Items;
  getItemAsync?: () => Promise<Items | null>;
  disabled?: boolean;
}

const ButtonExcelClients = <Items extends any[], IExcelItems = Items[0]>({
  items,
  getWorksheets,
  originalItems,
  fileName,
  getItemAsync,
  disabled,
}: ExcelExportButtonProps<Items, IExcelItems>) => {
  const getItem = async () => {
    if (getItemAsync) return getItemAsync();
    if (originalItems) return originalItems();
    return null;
  };

  const onExport = async () => {
    const items = await getItem();
    if (!items || items.length === 0) return;
    const woorksheets = getWorksheets(items);
    const res = await ExcelController.export(woorksheets);
    if (!res.isSuccess || !res.response) {
      if (res.error && res.error.message)
        toast.error(res.error.message, DEFAULT_TOAST_CONFIGURATION);
      return;
    }
    download(
      res.response,
      `${
        (fileName && executeReturnedValue(fileName, items)) ?? "default"
      }.xlsx`,
      EXCEL_CONTENT_TYPE
    );
  };

  return (
    <ButtonLoader
      className={styles.ButtonExcelClients}
      type="button"
      onClick={onExport}
      disabled={disabled || (items && items.length === 0)}
    >
      <Image src="/Images/svg/ico/export.svg" width={15} height={12} alt="" />
      <span className={styles.ButtonExcelText}>Exportar</span>
    </ButtonLoader>
  );
};

export default ButtonExcelClients;
