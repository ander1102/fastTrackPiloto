import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { INIT_CLIENT_REFERRALS } from "@app/constants/clientsReferrals";
import PageLayout from "@app/layout/app/layout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ClientPersona } from "@app/layout/clientes/form/types";
import Header from "@app/layout/ventas/clientesreferidos/form/header";
import Body from "@app/layout/ventas/clientesreferidos/form/body";
import { useMemo } from "react";
import { FormContextProvider } from "@app/components/FormManager/FormContext";
import useFormMethods from "@app/layout/ventas/clientesreferidos/hooks/useFormMethods";
import useFormFields from "@app/layout/ventas/clientesreferidos/hooks/useFormFields";

function Nuevo({ permission, user }: AppContextProps) {
  const { query,route } = useRouter();
  const personType = query.type as ClientPersona;
  const tpmClient = useMemo(
    () => ({
      ...INIT_CLIENT_REFERRALS,
      persona: personType,
      idagep_usuario: user.persona.idagep_usuarios,
      referencia: user.user.referencia,
    }),
    [route]
  );

  const formMethods = useFormMethods(tpmClient);
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
        <Header />
        <Body type={personType} />
      </FormContextProvider>
    </PageLayout>
  );
}

export default withAppContext(
  Nuevo,
  "dashboard/ventas/clientesreferidos/form",
  {
    title: "Nuevo Cliente",
  }
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type } = context.query;
  return {
    props: {},
    redirect: !type && {
      destination: `/dashboard/ventas/clientesreferidos/nuevo?type=moral`,
    },
  };
};
