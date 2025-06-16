import { _Object } from "@app/types";
import { ExcelCell, ExcelType, ExcelWorkSheet } from "@app/types/Excel";
import writeXlsxFile, { Cell, Columns, Row } from "write-excel-file";

type TypeConstructor =
  | StringConstructor
  | DateConstructor
  | NumberConstructor
  | BooleanConstructor
  | "Formula";

const ExcelConstructorTypes: Record<ExcelType, TypeConstructor> = {
  string: String,
  boolean: Boolean,
  date: Date,
  Formula: "Formula",
  number: Number,
};

/**Genera un archivo excel en base64 pasandole la info que se desea mostrar en cada worksheet */
export const generateExcel = async (
  woorkSheets: ExcelWorkSheet[]
): Promise<string | null> => {
  try {
    const worksheetsObjects: Row[][] = [];
    const workSheetsName: string[] = [];
    const woorkSheetsColumnConfig: Columns[] = [];
    for (const ws of woorkSheets) {
      if (!ws.items || ws.items.length === 0)
        throw new Error("No existen datos para registrar en el Sheet");
      const columns = (
        (ws.options && ws.options.sortKeys
          ? ws.options.sortKeys
          : Object.keys(ws.items[0])) as string[]
      )
        // se necesita comparar las keys reales del item con las que se mostraran en el Excel para que solo muestren las columnas con datos
        .filter((column) => ws.items[0].hasOwnProperty(column));
      const columnsConfig: Columns = [];
      const mainHeaders: Row = columns.map((column) => {
        const columnConfig =
          ws.options &&
          ws.options.columnOptions &&
          ws.options.columnOptions[column];
        columnsConfig.push(columnConfig || {});
        const display =
          (ws.options &&
            ws.options.displayColumns &&
            ws.options.displayColumns[column]) ||
          column;
        const headerConfig =
          ws.options &&
          ws.options.headerOptions &&
          ws.options.headerOptions[column];

        return {
          ...(headerConfig || {}),
          type: headerConfig?.type && ExcelConstructorTypes[headerConfig.type],
          value: display,
        };
      });

      const mergeHeaderColumns: Row[] =
        ws.options && ws.options.mergedHeaders
          ? ws.options.mergedHeaders.headers.map((config) => {
              const keys = Object.keys(config);
              return keys.map((column) => {
                return {
                  ...config[column],
                  type:
                    config[column]?.type &&
                    ExcelConstructorTypes[config[column]?.type as ExcelType],
                };
              });
            })
          : [];

      const headers: Row[] =
        ws.options && ws.options.mergedHeaders?.sorted === "start"
          ? mergeHeaderColumns.concat([mainHeaders])
          : [mainHeaders].concat(mergeHeaderColumns);

      const contentRows: Row[] = ws.items.map((item) => {
        const entries: [string, any][] = columns.map((column) => [
          column,
          item[column],
        ]);
        return entries.map((entry) => {
          const [key, value] = entry;
          const entryConfig =
            ws.options && ws.options.itemOptions && ws.options.itemOptions[key];
          return {
            ...(entryConfig || {}),
            type: entryConfig?.type && ExcelConstructorTypes[entryConfig.type],
            value,
          };
        }) as Row;
      });
      worksheetsObjects.push([...headers, ...contentRows]);
      woorkSheetsColumnConfig.push(columnsConfig);
      workSheetsName.push(ws.name);
    }
    /* @ts-ignore */
    const file: Blob = await writeXlsxFile(worksheetsObjects, {
      columns: woorkSheetsColumnConfig,
      sheets: workSheetsName,
      buffer: true,
    });

    return Buffer.from(await file.arrayBuffer()).toString("base64");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : (error as string));
  }
};
