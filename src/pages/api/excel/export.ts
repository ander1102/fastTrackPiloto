import { FetchClientResponse } from "@app/common/fetch";
import { generateExcel } from "@app/logic/excel";
import { ExcelExportBody } from "@app/types/Excel";
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
  const { worksheets } = req.body as ExcelExportBody;
  if (!worksheets.length)
    return res.status(200).json({
      response: null,
      error: {
        message: "No hay informacion disponible para generar el archivo Excel",
      },
      isSuccess: false,
      status: 301,
    });
  try {
    const file = await generateExcel(worksheets);
    res.json({ response: file, isSuccess: true, status: 200 });
  } catch (error) {
    res.status(200).json({
      response: null,
      error: {
        fatal: true,
        message: "Ha ocurrido un error inesperado: " + (error as Error).message,
      },
      isSuccess: false,
      status: 200,
    });
  }
}
