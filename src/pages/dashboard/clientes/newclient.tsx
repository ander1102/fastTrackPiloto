import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { INIT_CLIENT } from "@app/constants/client";
import ClientFormLayout from "@app/layout/clientes/form";
import { kpiReserveFundType } from "@app/types/reserveFund";
import ClientesHeader from "@app/layout/clientes/headerNewClient";
import { LeadsLayout } from "@app/layout/app/layout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ClientPersona } from "@app/layout/clientes/form/types";

const DEFAULT_RESERVE_FUND: kpiReserveFundType = {
  idagep_empresa: 0,
  fondoActivo: 0,
  porcentaje: 0,
  totalReservado: 0,
};

function NewClient({ permission, user }: AppContextProps) {
  const { query } = useRouter();
  return (
    <LeadsLayout>
      <div className="flex flex-col pt-5 pb-15 h-full flex-1">
        <div className="px-10 h-[15vh] pb-5">
          <ClientesHeader />
        </div>
        <div className="pb-0 pt-6 h-[85vh] overflow-hidden">
          <ClientFormLayout
            client={INIT_CLIENT}
            user={user}
            permission={permission}
            title="Información de Cliente"
            kpiReserveFund={DEFAULT_RESERVE_FUND}
            refreshReserveFund={() => {}}
            type={query.type as ClientPersona}
          />
        </div>
      </div>
    </LeadsLayout>
  );
}

export default withAppContext(NewClient, "dashboard/client/new", {
  title: "Nuevo Cliente",
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type } = context.query;
  return {
    props: {},
    redirect: !type && {
      destination: `/dashboard/clientes/newclient?type=moral`,
    },
  };
};
