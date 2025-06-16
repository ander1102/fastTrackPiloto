import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import PageLayout, { PageFormLayout } from "@app/layout/app/layout";
import SucursalesForm from "@app/layout/sucursales/form";

function NewSucursal({ user, permission }: AppContextProps) {
  return (
    <SucursalesForm
      title="Nueva sucursal"
      user={user}
      permission={permission}
    />
  );
}

export default withAppContext(NewSucursal, "dashboard/sucursales/new", {
  title: "Nueva terminal",
});
