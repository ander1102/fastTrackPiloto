import { EXCEL_CONTENT_TYPE } from "@app/constants/excel";
import { ExcelExportBody } from "@app/types/Excel";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { ButtonLoader } from "../Buttons";
import { download } from "@app/utils/DOM";
import {  executeReturnedValue } from "@app/common/format";
import styles from "./styles.module.css";
import Image from "next/image";
import { generateExcel } from "@app/logic/excel";
interface ExcelExportButtonProps<Items extends any[], IExcelItems = Items> {
  getWorksheets: (items: Items) => ExcelExportBody<IExcelItems>;
  fileName?: string | ((items: Items) => string);
  originalItems?: () => Items | null;
  items?: Items;
  getItemAsync?: () => Promise<Items | null>;
  disabled?: boolean;
}

const ButtonExcelLocal = <Items extends any[], IExcelItems = Items[0]>({
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

    try {
      const {worksheets} = getWorksheets(items);
      const base64String = await generateExcel(worksheets);
      if (base64String) {
        download(
            base64String,
          `${
            (fileName && executeReturnedValue(fileName, items)) ?? "default"
          }.xlsx`,
          EXCEL_CONTENT_TYPE
        );
      }
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al descargar el archivo",
        DEFAULT_TOAST_CONFIGURATION
      );
    }
  };

  return (
    <ButtonLoader
      className={styles.ButtonExcelTxs}
      type="button"
      onClick={onExport}
      disabled={disabled || (items && items.length === 0)}
    >
      <Image src="/Images/svg/ico/export.svg" width={15} height={12} alt="" />
      <span className={styles.ButtonExcelText}>Exportar</span>
    </ButtonLoader>
  );
};

export default ButtonExcelLocal;
