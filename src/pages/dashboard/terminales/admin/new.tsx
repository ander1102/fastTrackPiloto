import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { TerminalAdminForm } from "@app/layout/terminales/admin/form";

function NewTerminal({ user }: AppContextProps) {
  return <TerminalAdminForm title="Nueva terminal" user={user} />;
}

export default withAppContext(NewTerminal, "dashboard/terminal/admin/new", {
  title: "Nueva terminal",
});
