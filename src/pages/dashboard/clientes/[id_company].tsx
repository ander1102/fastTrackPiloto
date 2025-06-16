import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { ClientsControllers } from "@app/logic/backend/clients";
import ClientFormLayout from "@app/layout/clientes/form";
import { useEffect, useState } from "react";
import { Client, ClientDocuments } from "@app/types/Clients";
import { useRouter } from "next/router";
import { LeadsLayout } from "@app/layout/app/layout";
import {
  INIT_CLIENT,
  INIT_DOCUMENTS,
  INIT_DOCUMENTS_ADDITIONAL,
} from "@app/constants/client";
import useValueHandler from "@app/hooks/useValueHandler";
import EmptyDetailsComponent from "@app/components/EmptyTemplate/EmptyDetailsComponent";
import { getFileExtension } from "@app/common/format";
import { execWithLoader } from "@app/utils/DOM";
import useCall from "@app/hooks/useCall";
import { TransactionsControllers } from "@app/logic/backend/transactions";
import DetailClienteoHeader from "@app/layout/clientes/detailClienteheader";
import { PREFIX_FILE } from "@app/layout/clientes/form/FormItemInputFile";

const CONTEXT = "dashboard/client/editclient";
//TODO FIX ALL PAGES

function EditClient({ setTitle, permission, user }: AppContextProps) {
  const router = useRouter();
  const { id_company } = router.query;

  // component states
  const [client, setClient] = useState<Client | null>(null);
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null);

  const amountEfevoopayInfo = useCall(
    TransactionsControllers,
    "saldoefevoopay",
    () => ({
      initialParams: [
        {
          idagep_empresa: id_company ?? 0,
          idagep_usuarios: user.persona.idagep_usuarios,
        },
      ] as [body: any],
    })
  );

  const kpiReserveFund:any = useCall(
    ClientsControllers,
    "getKpiReserveFund",
    () => ({
      initialParams: [Number(id_company)] as [body: number],
    })
  );

  const getClientData = async () => {
    if (!id_company) return INIT_CLIENT;

    let client: Client;

    const clientres = await ClientsControllers.get({
      idagep_empresa: +id_company,
      id_login: +user.persona.idagep_usuarios,
    });

    if (clientres.error || !clientres.isSuccess) return INIT_CLIENT;

    client = clientres.response;

    const documents:any = await ClientsControllers.showDocuments({
      idagep_empresa: clientres.response.idagep_empresa,
      id_login: user.persona.idagep_usuarios,
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

  useEffectAsync(async () => {
    if (id_company) {
      const client = await execWithLoader(getClientData, [], CONTEXT, 0.5);
      setIsSuccess(!!client);
      setClient(client);
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
            <div className="px-10 pb-5">
              <DetailClienteoHeader
                user={user}
                client={client}
                nombre={client?.nombre}
                permission={permission}
                id_company={id_company as string}
                saldo={amountEfevoopayInfo.item?.saldoefevoo ?? 0}
                fondo={kpiReserveFund.item?.fondo?.[0]?.totalReservado ?? 0}
              />
            </div>
            <div className="pb-0 pt-6 h-[75vh] overflow-hidden">
              <ClientFormLayout
                user={user}
                permission={permission}
                title="Información de Cliente"
                client={client}
                kpiReserveFund={kpiReserveFund.item?.fondo?.[0]}
                refreshReserveFund={kpiReserveFund.refresh}
                type={client.persona === undefined ? "fisica" : client.persona}
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
