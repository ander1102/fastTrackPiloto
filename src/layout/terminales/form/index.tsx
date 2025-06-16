import { SetStateAction, useEffect, useMemo, useState } from "react";
import { ButtonAction } from "@app/components/Buttons";
import { PermissionProps, User } from "@app/types/User";
import { useRouter } from "next/router";
import { Terminal, TerminalDisabled } from "@app/types/Terminal";
import {
  DEFAULT_TERMINAL_INFO,
  REQUIRED_TERMINAL_INFO,
} from "@app/constants/terminal";
import TerminalFormFields from "./fields";
import { FormTitle } from "@app/layout/app/layout";
import { ReplaceObjectValue } from "@app/common/format";
import { checkEmptyFields, ShowFetchResponseToast } from "@app/utils/DOM";
import { TerminalControllers } from "@app/logic/backend/terminal";

interface TerminalFormProps extends PermissionProps {
  title: string;
  user: User;
  terminal?: Terminal;
}

export default function TerminalForm({
  user,
  terminal,
  title,
  permission,
}: TerminalFormProps) {
  const [info, setInfo] = useState(() => terminal ?? DEFAULT_TERMINAL_INFO);
  const [terminalDisabled, setTerminalDisabled] = useState<TerminalDisabled>(
    {} as TerminalDisabled
  );
  const router = useRouter();

  const disabledButton = useMemo(
    () => Object.values(terminalDisabled).every((x) => x),
    [terminalDisabled]
  );

  useEffect(() => {
    setTerminalDisabled(ReplaceObjectValue(DEFAULT_TERMINAL_INFO, true));
  }, []);

  const onChange = (newValue: SetStateAction<Terminal>) => {
    setInfo(newValue);
  };

  const onSubmit = async () => {
    if (checkEmptyFields(REQUIRED_TERMINAL_INFO, info)) return;

    const res = await TerminalControllers.assignClient({
      idagep_empresa: user.idagep_empresa ?? 0,
      snTerminal: info.snTerminal,
      idagep_sucursal: info.idagep_sucursal,
    });
    if (
      ShowFetchResponseToast(res, {
        setFailureTitle: () => "Ha ocurrido un error al guardar la información",
        setSuccessTitle: () =>
          `Terminal ${info.snTerminal} asignada correctamente`,
      })
    )
      router.back();
  };

  const onToogleDisable = () => {
    setTerminalDisabled(
      ReplaceObjectValue(DEFAULT_TERMINAL_INFO, !terminalDisabled.Empresa)
    );
  };

  return (
    <>
      <section className="container-header-view">
      <FormTitle
        title={title}
        showEditIcon
        onEditIconClick={onToogleDisable}
      />
      </section>
      <section className="container-body-view">

      <div className="container-form-view flex flex-col justify-between" >
        <TerminalFormFields
          terminalDisabled={terminalDisabled}
          value={info}
          onChange={onChange}
        />
           <div className="mt-5">
            {permission.update && (
          <ButtonAction  label="Guardar cambios" onClick={onSubmit} disabled={disabledButton}/>
        
          
        )}
      </div>
      </div>
        </section>
    </>
  );
}
