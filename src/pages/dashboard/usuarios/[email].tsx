import { useRouter } from "next/router";
import UsuarioFormulario from "@app/layout/usuario/UsuarioFormulario";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { useState } from "react";
import { Users } from "@app/types/UsersList";
import { omit } from "@app/common";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { UserControllers } from "@app/logic/backend/users";
import PageLayout, {
  FormTitle,
} from "@app/layout/app/layout";
import useValueHandler from "@app/hooks/useValueHandler";
import EmptyDetailsComponent from "@app/components/EmptyTemplate/EmptyDetailsComponent";
import { execWithLoader } from "@app/utils/DOM";

const CONTEXT = "dashboard/edituser";

function EditUser({ user, setTitle, permission }: AppContextProps) {
  const [info, setInfo] = useState<Users | null>(null);
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null);
  const router = useRouter();
  const email = router.query.email as string;

  useEffectAsync(async () => {
    const get = await execWithLoader(
      UserControllers.get,
      [email],
      CONTEXT,
      0.3
    );
    if (get.isSuccess && get.response) {
      setIsSuccess(true);
      setInfo({
        ...omit(get.response, "contrasena", "fechaEnt", "fechaMod", "usuario"),
        email: get.response.usuario,
        accesos: Array.isArray(get.response.accesos)
          ? get.response.accesos
          : [],
      });
      setTitle(`Usuario ${get.response?.nombre}`);
    } else {
      setIsSuccess(false);
      setInfo({} as Users);
    }
  }, []);

  if (isSuccess() === false)
    return (
      <EmptyDetailsComponent title="Ha ocurrido un error">
        La cuenta <b>{email}</b> no existe o no se encuentra disponible
      </EmptyDetailsComponent>
    );

  return (
    <PageLayout>
      {info && (
        <>
          <section className="container-header-view">
            <FormTitle title="Detalles del usuario" />
          </section>

          <section className="container-body-view">
            <UsuarioFormulario
              user={user}
              userInfo={info}
              permission={permission}
              context={CONTEXT}
            />
          </section>
        </>
      )}
    </PageLayout>
  );
}

export default withAppContext(EditUser, CONTEXT);
