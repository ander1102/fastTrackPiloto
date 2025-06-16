import { useState } from "react";
import { useRouter } from "next/router";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import useEffectAsync from "@app/hooks/useEffectAsync";
import PageLayout, { PageFormLayout } from "@app/layout/app/layout";
import TerminalForm from "@app/layout/terminales/form";
import { TerminalControllers } from "@app/logic/backend/terminal";
import { Terminal } from "@app/types/Terminal";
import EmptyDetailsComponent from "@app/components/EmptyTemplate/EmptyDetailsComponent";
import useValueHandler from "@app/hooks/useValueHandler";

function TerminalDetalles({ user, permission }: AppContextProps) {
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null);
  const router = useRouter();
  const { idterminal } = router.query;

  useEffectAsync(async () => {
    const res = await TerminalControllers.getById({
      idagep_empresa: user.idagep_empresa ?? 0,
      idagep_terminal: Number(idterminal),
    });
    if (res.isSuccess && res.response) {
      setIsSuccess(true);
      setTerminal(res.response);
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
        <TerminalForm
          title="Detalles de la terminal"
          user={user}
          permission={permission}
          terminal={terminal}
        />
      )}
    </>
  );
}

export default withAppContext(TerminalDetalles, "dashboard/terminal/details", {
  title: "Terminal Detalles",
});
