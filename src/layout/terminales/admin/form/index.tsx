import { SetStateAction, useEffect, useMemo, useState } from "react";
import { ButtonAction, ButtonPrimary } from "@app/components/Buttons";
import { modalManager } from "@app/components/ModalComponent";
import QuestionCard from "@app/components/ModalComponent/modals/general/QuestionCard";
import { User } from "@app/types/User";
import { useRouter } from "next/router";
import { Terminal, TerminalDisabled } from "@app/types/Terminal";
import {
  DEFAULT_TERMINAL_INFO,
  REQUIRED_TERMINAL_INFO,
} from "@app/constants/terminal";
import { TerminalAdminFormFields } from "./fields";
import { ReplaceObjectValue } from "@app/common/format";
import { FormTitle } from "@app/layout/app/layout";
import { TerminalControllers } from "@app/logic/backend/terminal";
import { checkEmptyFields, ShowFetchResponseToast } from "@app/utils/DOM";
import { colorsConfig } from "../../../../../assets.config";

interface TerminalFormProps {
  title: string;
  user: User;
  terminal?: Terminal;
}

export function TerminalAdminForm({
  user,
  terminal,
  title,
}: TerminalFormProps) {
  const [info, setInfo] = useState(() => terminal ?? DEFAULT_TERMINAL_INFO);
  const [terminalDisabled, setTerminalDisabled] = useState<TerminalDisabled>(
    {} as TerminalDisabled
  );
  const router = useRouter();

  const isNew = useMemo(() => !terminal, []);

  const terminalAvailableModalProps = {
    title: "La terminal ya está Disponible",
    description: "La terminal ya puede ser asignada a un nuevo cliente.",
    handleCancel: (handleClose: (close: boolean) => void) => {
      handleClose(true);
      router.back();
    },
    handleAccept: (handleClose: (close: boolean) => void) => {
      handleClose(true);
      router.back();
    },
    buttonAcceptProps: {
      className: "min-w-[200px] h-12",
      label: "Confirmar",
      style: { backgroundColor: "#343434" },
    },
    buttonCancelProps: {
      style: { display: "none" },
    },
    classNames: "terminal-details-modal",
    dialogProps: {
      closable: true,
    },
  };

  const confirmTerminalAvailableModalProps = {
    title: "¿Desea reasignar esta terminal?",
    description:
      "La terminal asignada a un Cliente no puede ser asignada a un nuevo cliente sin primero regresarla al estatus de Disponible.",
    handleAccept: async (handleClose: (close: boolean) => void) => {
      const res = await TerminalControllers.unassignClient({
        idagep_empresa: user.idagep_empresa ?? 0,
        idCliente: info.idEmpresa,
        snTerminal: info.snTerminal,
        operacion: "D",
      });

      if (
        ShowFetchResponseToast(res, {
          setError: (res) => res.status !== 200,
          setFailureTitle: () =>
            "Ha ocurrido un error al desasignar la terminal",
          setSuccessTitle: () => "Terminal desasignada exitosamente",
        })
      ) {
        handleClose(false);
        setInfo((prevInfo) => ({
          ...prevInfo,
          idEmpresa: DEFAULT_TERMINAL_INFO.idEmpresa,
          Empresa: DEFAULT_TERMINAL_INFO.Empresa,
          estado_asignacion: "Disponible",
        }));

        await modalManager.show(QuestionCard, terminalAvailableModalProps);
      }
    },
    handleCancel: (handleClose: (close: boolean) => void) => handleClose(true),
    buttonAcceptProps: {
      className: "min-w-[200px] h-12",
      label: "Regresar a Disponible",
      style: { backgroundColor: colorsConfig.primary },
    },
    buttonCancelProps: {
      className: "min-w-[200px] h-12",
      label: "Cancelar",
      style: { backgroundColor: "#afafaf" },
    },
    classNames: "terminal-details-modal",
    dialogProps: {
      closable: true,
    },
  };

  useEffect(() => {
    if (!isNew)
      setTerminalDisabled(ReplaceObjectValue(DEFAULT_TERMINAL_INFO, true));
  }, []);

  const onChange = (newValue: SetStateAction<Terminal>) => {
    setInfo(newValue);
  };

  const onSubmit = async () => {
    if (checkEmptyFields(REQUIRED_TERMINAL_INFO, info)) return;
    const body: any = {
      cliente: info.Empresa,
      custodioInterno: info.custodioInterno,
      idagep_empresa: user.idagep_empresa ?? 0,
      idagep_usuarios: user.persona.idagep_usuarios ?? 0,
      idModelo: info.idagep_terminal_tipo,
      idTerminal: info.idagep_terminal,
      pagina: 0,
      snTerminal: info.snTerminal,
      tamano_pagina: 0,
      terminalesDisp: "",
      ubicacionFisica: "",
      idSucursal: 0,
      filtro: "",
    };

    const res = isNew
      ? await TerminalControllers.add(body)
      : await TerminalControllers.assignAdmin({
          idagep_empresa: user.idagep_empresa ?? 0,
          idCliente: info.idEmpresa,
          snTerminal: info.snTerminal,
        });

    if (
      ShowFetchResponseToast(res, {
        setFailureTitle: () => "Ha ocurrido un error al guardar la información",
        setSuccessTitle: () =>
          isNew
            ? "Terminal guardada correctamente"
            : `Terminal ${info.snTerminal} asignada correctamente a la empresa ${info.Empresa}`,
      })
    )
      router.back();
  };

  const onAvailable = async () => {
    await modalManager.show(QuestionCard, confirmTerminalAvailableModalProps);
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
          showEditIcon={!isNew}
          onEditIconClick={onToogleDisable}
        />
      </section>

      <section className="container-body-view">
        <form className="container-form-view flex flex-col justify-between">
          <TerminalAdminFormFields
            terminalDisabled={terminalDisabled}
            value={info}
            onChange={onChange}
          />

          <div className="terminal-details-buttons-container flex gap-5">
            <ButtonAction label="Guardar cambios" onClick={onSubmit} />
            {info.estado_asignacion === "Asignada" ? (
              <ButtonPrimary
                label="Regresar a Disponible"
                onClick={onAvailable}
              />
            ) : null}
          </div>
        </form>
      </section>
    </>
  );
}
