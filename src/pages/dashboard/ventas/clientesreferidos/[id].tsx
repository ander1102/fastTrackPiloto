import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import PageLayout from "@app/layout/app/layout";
import { useRouter } from "next/router";
import Header from "@app/layout/ventas/clientesreferidos/form/header";
import Body from "@app/layout/ventas/clientesreferidos/form/body";
import { useState } from "react";
import { FormContextProvider } from "@app/components/FormManager/FormContext";
import useFormMethods from "@app/layout/ventas/clientesreferidos/hooks/useFormMethods";
import useFormFields from "@app/layout/ventas/clientesreferidos/hooks/useFormFields";
import { ClientsReferralsControllers } from "@app/logic/backend/clientsReferrals";
import useEffectAsync from "@app/hooks/useEffectAsync";
import {
  INIT_CLIENT_REFERRALS,
  INIT_DOCUMENTS,
} from "@app/constants/clientsReferrals";
import {
  ClientsReferrals,
  ClientsReferralsDocuments,
} from "@app/types/ClientsReferrals";
const CONTEXT = "dashboard/ventas/clientesreferidos/form";
import { execWithLoader } from "@app/utils/DOM";
import { getFileExtension } from "@app/common/format";

function Editar({ user }: AppContextProps) {
  const [client, setClient] = useState(INIT_CLIENT_REFERRALS);
  const router = useRouter();
  const id = router.query.id as string;
  const [ready, setReady] = useState(false);

  useEffectAsync(async () => {
    if (id) {
      const currentClient = await execWithLoader(getClientData, [], CONTEXT);
      setClient(currentClient);
      setReady(true);
    }
  }, []);

  const getClientData = async () => {
    if (!id) return INIT_CLIENT_REFERRALS;

    const callClientsReferrals = await ClientsReferralsControllers.read({
      idagep_referido: +id,
      operacion: "R",
    });

    if (callClientsReferrals.error || !callClientsReferrals.isSuccess)
      return INIT_CLIENT_REFERRALS;

    const tpmClient = callClientsReferrals.response.data;

    const documents = await ClientsReferralsControllers.documentosShow({
      idagep_referido: +id,
    });

    let tpmDocuments: ClientsReferralsDocuments[] = INIT_DOCUMENTS;

    if (documents.isSuccess && documents.response) {
      tpmDocuments = tpmDocuments.map((document) => {
        const find = documents.response.docs.find(
          (x) => x.nombre === document.documentoTipo
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

    let clientsReferrals: ClientsReferrals = {
      ...INIT_CLIENT_REFERRALS,
      ...tpmClient,
      documents: tpmDocuments,
    };

    return clientsReferrals;
  };

  const formMethods = useFormMethods(client);
  const formFields = useFormFields();

  return (
    <PageLayout>
      <FormContextProvider
        formMethods={formMethods}
        formFields={formFields}
        formik={formMethods.formik}
        disableds={formMethods.disabled}
        activeTab={formMethods.activeTab}
        validationSchema={formMethods.validationSchema}
      >
        {ready && (
          <>
            <Header />
            <Body type={client.persona} />
          </>
        )}
      </FormContextProvider>
    </PageLayout>
  );
}

export default withAppContext(Editar, CONTEXT, {
  title: "Editar Cliente",
});
