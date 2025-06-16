import { Call, FetchClientResponse } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { authJSONResponse } from "@app/logic/backend/utils";
import {
  ClientAddResponse,
  ClientCreateBody,
  ClientCRUDResponse,
} from "@app/types/Clients";
import { initCors } from "@app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import { omit } from "@app/common";
const CONTROLLER = "/cliente/crud";
const CONTROLLER_OPERACIONES = "/cliente/operaciones";

export default async function add(
  req: NextApiRequest,
  res: NextApiResponse<FetchClientResponse<ClientCRUDResponse>>
) {
  await initCors(req, res);
  const { authorization } = req.headers;
  const body = req.body as ClientCreateBody;
  const infoServicios = { TC: "", TLS: "", ProD30: "", SmartD20: "" };

  const AddReponse = await Call<ClientAddResponse>(
    CONTROLLER,
    {
      headers: { authorization: authorization ?? "" },
      body: { ...body, operacion: "C", infoServicios },
      method: "POST",
    },
    AGREGADOR_API_URL
  );



  const bodyOperaciones = {
    ...omit(
      body,
      "accesos",
      "nombreUsuario",
      "emailUsuario",
      "descripcion",
      "email",
      "resCotizacion",
      "infoCotizacion",
      "infoComercio",
      "infoRepresentantes",
      "infoDomicilio",
      "infoContactos",
      //revisar
      "msi",
      "nombre",
      "plazosMsi",
      "plazosMci",
      "ticketPromedioMensual",
      "Giro",
      "fondoActivo",
      "porcetaje",
      "persona"
    ),
  };
  console.warn(JSON.stringify(bodyOperaciones));
  const AddReponseOperations = await Call<ClientAddResponse>(
    CONTROLLER_OPERACIONES,
    {
      headers: { authorization: authorization ?? "" },
      body: {
        ...bodyOperaciones,
        operacion: "C",
        idagep_empresa: AddReponse.response.data[0]?.mensaje?.idagep_empresa,
      },
      method: "POST",
    },
    AGREGADOR_API_URL
  );
  console.log('----')
  console.log(AddReponse.response.data[0]?.mensaje?.idagep_empresa);
  console.warn(JSON.stringify(AddReponseOperations));

  authJSONResponse(res, AddReponse, {}, (item) => ({
    status: item.status,
    mensaje: item.data[0]?.mensaje?.mensaje,
    idagep_empresa: item.data[0]?.mensaje?.idagep_empresa,
    operaciones: AddReponseOperations.response,
  }));
}
