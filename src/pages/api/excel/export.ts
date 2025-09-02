import { FetchClientResponse } from "@app/common/fetch";
import { generateExcel } from "@app/logic/excel";
import { ExcelExportBody } from "@app/types/Excel";
import { decodeBase64Safe } from "@app/utils/base64";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
}

export default async function ExcelExport(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<string | null>>
) {
  let { worksheets } = req.body;

  worksheets = worksheets.map((ws:any) => {
  const decodedOptions = ws.options
    ? (() => {
        try {
          return JSON.parse(decodeBase64Safe(ws.options));
        } catch {
          return undefined;
        }
      })()
    : undefined;
    return {
      ...ws,
      options: decodedOptions,
      items: ws.items.map((item: any) => {
        const newItem = { ...item };
        if (newItem.numTarjeta) {
          try {
            newItem.numTarjeta = decodeBase64Safe(newItem.numTarjeta);
          } catch {}
        }
        if (newItem.descripcion) {
          try {
            newItem.descripcion = decodeBase64Safe(newItem.descripcion);
          } catch {}
        }
        if (newItem.cliente) {
          try {
            newItem.cliente = decodeBase64Safe(newItem.cliente);
          } catch {}
        }
        if (newItem.metodo) {
          try {
            newItem.metodo = decodeBase64Safe(newItem.metodo);
          } catch {}
        }
        if (newItem.mensaje) {
          try {
            newItem.mensaje = decodeBase64Safe(newItem.mensaje);
          } catch {}
        }

        return newItem;
      }),
    };
  });
    if (!worksheets.length) {
      return res.status(200).json({
        response: null,
        error: {
          message: "No hay información disponible para generar el archivo Excel",
        },
        isSuccess: false,
        status: 301,
      });
    }
    const file = await generateExcel(worksheets);

    return res.status(200).json({
      response: file,
      isSuccess: true,
      status: 200,
    });
}