import UsuarioFormulario from "@app/layout/usuario/UsuarioFormulario";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import PageLayout, {
  PageFormLayout,
  FormTitle,
} from "@app/layout/app/layout";

function NewUser({ user, permission }: AppContextProps) {
  return (<>
        <section className="container-header-view">
        <FormTitle title="Nuevo usuario" />
        </section>

        <section className="container-body-view">
        <UsuarioFormulario user={user} permission={permission} />
        </section>
      
  </>
  );
}

export default withAppContext(NewUser, "dashboard/newuser", {
  title: "Nuevo Usuario",
});
