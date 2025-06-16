import { useEffect } from "react";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { UserControllers } from "@app/logic/backend/users";
import useCall from "@app/hooks/useCall";
import { UserGetBody, Users } from "@app/types/UsersList";
import { User } from "@app/types/User";
import PageLayout from "@app/layout/app/layout";
import UsuariosHeader from "@app/layout/usuario/header";
import UsuariosBody from "@app/layout/usuario/body";

const getInitialParams = (user: User): UserGetBody => ({
  email: "",
  idagep_empresa: user.idagep_empresa ?? 0,
  idagep_usuarios: user.persona?.idagep_usuarios ?? 0,
});

function Clients({ setTitle, permission, user, userType }: AppContextProps) {
  const { item, isCalling, setFilter, itemManager } = useCall(
    UserControllers,
    "allIndex",
    {
      initialParams: [getInitialParams(user)],
    }
  );

  useEffect(() => {
    itemManager.addEventListenner("change", (items) => {
      setTitle(`(${items.length}) Usuarios`);
    });

    return () => {
      itemManager.removeEventListenner("change");
    };
  }, []);

  return (
    <PageLayout>
      <UsuariosHeader permission={permission} setFilter={setFilter} />
      <UsuariosBody
        item={item}
        isCalling={isCalling}
        userType={userType}
        permission={permission}
      />
    </PageLayout>
  );
}

export default withAppContext(Clients, "dashboard/users", {
  title: "Usuarios",
});
