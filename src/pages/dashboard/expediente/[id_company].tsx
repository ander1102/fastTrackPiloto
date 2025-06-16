import withAppContext, {AppContextProps,} from "@app/components/HOC/withAppContext";
import EmptyDetailsComponent from "@app/components/EmptyTemplate/EmptyDetailsComponent";
import { arrayBufferToBase64, getFileExtension } from "@app/common/format";
import { DossiersControllers } from "@app/logic/backend/dossiers";
import { INIT_CLIENT, INIT_DOCUMENTS,INIT_DOCUMENTS_ADDITIONAL } from "@app/constants/client";
import { ClientsControllers } from "@app/logic/backend/clients";

import { ExpedienteFormLayout } from "@app/layout/expediente/form";
import { Client, ClientDocuments } from "@app/types/Clients";
import useValueHandler from "@app/hooks/useValueHandler";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { LeadsLayout } from "@app/layout/app/layout";
import { execWithLoader } from "@app/utils/DOM";
import { useEffect, useState } from "react";
import useCall from "@app/hooks/useCall";
import { useRouter } from "next/router";
import { DetailExpedienteHeader } from "@app/layout/expediente/detailExpedienteHeader";
import { PREFIX_FILE } from "@app/layout/clientes/form/FormItemInputFile";

const CONTEXT = "dashboard/expediente/editclient";
//TODO FIX ALL PAGES

function EditClient({ setTitle, permission, user }: AppContextProps) {
  const router = useRouter();
  const { id_company } = router.query;

  // component states
  const [client, setClient] = useState<Client | null>(null);
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null);

  const kpiReserveFund:any = useCall(
    ClientsControllers,
    "getKpiReserveFund",
    () => ({
      initialParams: [Number(id_company)] as [body: number],
    })
  );

  const getDocBase64 = async (lainfo:Client) => {
      lainfo.documents.map(async (item,index)=>{
        if(item.filename !== ""){
          item.docBase64 = await getDocImg(item.filename)
        }
      })
      return lainfo
  }

  const getClientData = async () => {
    if (!id_company) return INIT_CLIENT;

    let client: Client;

    const clientres = await ClientsControllers.get({
      idagep_empresa: +id_company,
      id_login: +user.persona.idagep_usuarios
    });

    if (clientres.error || !clientres.isSuccess) return INIT_CLIENT;

    client = clientres.response;

    const documents:any = await ClientsControllers.showDocuments({
      idagep_empresa: clientres.response.idagep_empresa,
    });

    let tpmDocuments: ClientDocuments[] = INIT_DOCUMENTS;

    if (documents.isSuccess && documents.response) {
      //Add Additional
      documents.response.docs
        .filter((f:any) => f.descripcion.includes(PREFIX_FILE))
        .forEach((f:any) => {
          tpmDocuments.push({
            ...INIT_DOCUMENTS_ADDITIONAL,
            documentoTipo:f.nombre,
          });
        });
     
      //Add Server
      tpmDocuments = tpmDocuments.map((document) => {
        console.log(documents)
        const find = documents.response.docs.find(
          (x:any) => x.nombre === document.documentoTipo
        );

        if (find) {
          return {
            ...document,
            extension: find.ruta ? getFileExtension(find.ruta) : "",
            filename: find.ruta,
          };
        }
        return document;
      });
    }

    client = {
      ...client,
      documents: tpmDocuments,
    };

    return client;
  };

  async function getDocImg(ruta:string): Promise<string> {
    let image = '';
    const userImage = await DossiersControllers.documentos( ruta );
    if (userImage.isSuccess && userImage.response) {
      image = userImage.response;
      if (ruta.split(".")[1].toLowerCase() === "pdf")
      image = "data:application/pdf;base64," + image;
      else image = "data:image/png;base64," + image;
    }
    return image
  }

  useEffectAsync(async () => {
    if (id_company) {
      const client = await execWithLoader(getClientData, [], CONTEXT, 0.5);
      setIsSuccess(!!client);
      await getDocBase64(client).then(res=>{ 
        setClient(client) 
      })
    }
  }, []);

  useEffect(() => {
    if (client?.nombre) {
      setTitle(`Cliente ${client.nombre}`);
    }
  }, [client?.nombre]);

  if (isSuccess() === false)
    return (
      <EmptyDetailsComponent title="Ha ocurrido un error">
        El cliente <b>{id_company}</b> no existe o no se encuentra disponible
      </EmptyDetailsComponent>
    );

  return (
    <LeadsLayout>
      <div className="flex flex-col pt-5 pb-15 h-full flex-1">
        {client && (
          <>
          <div className="px-10 h-[15vh] pb-5" >
            <DetailExpedienteHeader nombre={client?.nombre} permission={permission} person={client.persona} />
          </div>
          <div className="pb-0 pt-6 h-[85vh]">
            <ExpedienteFormLayout
              user={user}
              permission={permission}
              title="Información del cliente"
              client={client}
              kpiReserveFund={kpiReserveFund.item?.fondo?.[0]}
              refreshReserveFund={kpiReserveFund.refresh}
            />
          </div>
          </>
        )}
      </div>
    </LeadsLayout>
  );
}

export default withAppContext(EditClient, CONTEXT, {
  title: "Cliente",
});
