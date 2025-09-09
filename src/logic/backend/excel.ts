import { Call } from "@app/common/fetch";
import { ExcelExportBody } from "@app/types/Excel";
import { encodeBase64Safe } from "@app/utils/base64";

export const ExcelController = {
  export: <T>(body: ExcelExportBody<T>) => {
    const worksheets = body.worksheets.map((ws) => ({
      ...ws,
      options: ws.options
        ? encodeBase64Safe(JSON.stringify(ws.options))
        : undefined,
      items: ws.items.map((item: any) => {
        const newItem = { ...item };
        if (newItem.numTarjeta) {
          newItem.numTarjeta = encodeBase64Safe(newItem.numTarjeta);
        }
        if (newItem.descripcion) {
          newItem.descripcion = encodeBase64Safe(newItem.descripcion);
        }
        if (newItem.cliente) {
          newItem.cliente = encodeBase64Safe(newItem.cliente);
        }
        if (newItem.metodo) {
          newItem.metodo = encodeBase64Safe(newItem.metodo);
        }
        if (newItem.mensaje) {
          newItem.mensaje = encodeBase64Safe(newItem.mensaje);
        }
        if (newItem.nombreComercial) {
          newItem.nombreComercial = encodeBase64Safe(newItem.nombreComercial);
        }

        if (newItem.razonSocial) {
          newItem.razonSocial = encodeBase64Safe(newItem.razonSocial);
        }
        return newItem;
      }),
    }));
    return Call("/api/excel/export", {
      body: { worksheets },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};