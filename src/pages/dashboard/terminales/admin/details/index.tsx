import { useState } from "react";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import { TerminalAdminForm } from "@app/layout/terminales/admin/form";
import { Terminal } from "@app/types/Terminal";
import { useRouter } from "next/router";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { TerminalControllers } from "@app/logic/backend/terminal";
import useValueHandler from "@app/hooks/useValueHandler";
import EmptyDetailsComponent from "@app/components/EmptyTemplate/EmptyDetailsComponent";

function TerminalDetalles({ user }: AppContextProps) {
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null);
  const router = useRouter();
  const { idterminal, idagep_empresa } = router.query;

  useEffectAsync(async () => {
    const res = await TerminalControllers.getById({
      idagep_empresa: Number(idagep_empresa),
      idagep_terminal: Number(idterminal),
    });
    if (res.isSuccess && res.response) {
      const terminal = res.response;
      setIsSuccess(true);
      setTerminal(terminal);
    } else {
      setIsSuccess(false);
      setTerminal({} as Terminal);
    }
  }, []);

  if (isSuccess() === false)
    return (
      <EmptyDetailsComponent title="Ha ocurrido un error">
        La terminal <b>{idterminal}</b> no existe o no se encuentra disponible
      </EmptyDetailsComponent>
    );
  return (
    <>
      {terminal && (
        <TerminalAdminForm
          terminal={terminal}
          user={user}
          title="Detalles de la terminal"
        />
      )}
    </>
  );
}

export default withAppContext(
  TerminalDetalles,
  "dashboard/terminal/admin/details",
  {
    title: "Terminal Detalles",
  }
);
