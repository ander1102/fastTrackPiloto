import { SetStateAction, useEffect, useMemo, useState } from "react";
import userStyles from "./UserForm.module.css";
import { ButtonLoader } from "@app/components/Buttons";
import { PermissionProps, User } from "@app/types/User";
import { UserInfoDisabled, Users, OnlyUserFields } from "@app/types/UsersList";
import {
  DEFAULT_USER_INFO,
  getInfoDisabled,
  userFields,
  USER_VALIDATION,
} from "@app/constants/usuarios";
import UsersFields from "./Fields";
import UsersAccess from "./Access";
import { UserControllers } from "@app/logic/backend/users";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import {
  checkEmptyFields,
  checkValidationFields,
  execWithLoader,
  ShowFetchResponseToast,
} from "@app/utils/DOM";
import DeleteUserConfirmModal from "@app/components/ModalComponent/modals/users/deleteUser";
import DeleteUserSuccessModal from "@app/components/ModalComponent/modals/users/deleteUserSuccess";
import { modalManager } from "@app/components/ModalComponent";
import { ButtonAction,ButtonDeny } from "@app/components/Buttons";
interface UserFormProps extends PermissionProps {
  user: User;
  userInfo?: Users;
  context?: string;
}

export default function UsuarioFormulario(props: UserFormProps) {
  const [info, setInfo] = useState(
    () => props.userInfo ?? DEFAULT_USER_INFO(props.user as unknown as Users)
  );
  const [infoDisabled, setInfoDisabled] = useState<UserInfoDisabled>(() =>
    getInfoDisabled(props.userInfo)
  );
  const [submitted, setSubmited] = useState(false);
  const router = useRouter();

  const isNew = useMemo(() => !props.userInfo?.email, []);

  const sameUser = useMemo(
    () => router.query.email === props.user.persona?.email,
    [props.user]
  );

  useEffect(() => {
    if (isNew && !props.user.idagep_empresa)
      toast.warn(
        "Este usuario no esta ligado a ninguna empresa",
        DEFAULT_TOAST_CONFIGURATION
      );
  }, []);

  const onSubmit = async () => {
    if (isNew && !props.user.idagep_empresa) return;
    if (
      checkEmptyFields(
        userFields.map((x) => x.key),
        info
      )
    )
      return;
    setSubmited(true);
    if (!checkValidationFields(info, USER_VALIDATION)) return;
    const response = isNew
      ? await UserControllers.add({
          ...info,
          idagep_empresa: props.user.idagep_empresa ?? 0,
        })
      : await UserControllers.update(info);
    if (
      ShowFetchResponseToast(response, {
        setError: (res) => {
          return (
            typeof (res.response.mensaje as any)?.mensaje === "string" &&
            (res.response.mensaje as any)?.mensaje
              .toLowerCase()
              .includes("previamente registrado")
          );
        },
        setSuccessTitle: () =>
          isNew
            ? "Usuario Agregado correctamente"
            : "Usuario modificado correctamente",
        setFailureTitle: (res) => {
          return (
            (res.response.mensaje as any)?.mensaje ??
            "Ha ocurrido un problema al guardar cambios"
          );
        },
      })
    )
      router.push("/dashboard/usuarios");
  };

  const deleteUser = async (email: string) =>
    await UserControllers.delete(email);

  const onDelete = async () => {
    const confirm = await modalManager.show(
      DeleteUserConfirmModal,
      {},
      props.context
    );
    if (!confirm) return;

    const res = await execWithLoader(deleteUser, [info.email], props.context);

    if (
      !ShowFetchResponseToast(res, {
        setError: (response) =>
          response.response?.mensaje?.mensaje?.toLowerCase() !==
          "usuario eliminado",
        setFailureTitle: (response) => response.response?.mensaje?.mensaje,
      })
    )
      return;

    await modalManager.show(DeleteUserSuccessModal, {}, props.context);
    router.push("/dashboard/usuarios");
  };

  const onChange = (newValue: SetStateAction<Users>) => {
    setInfo(newValue);
  };

  const onDisabledChange = (key: OnlyUserFields, disabled: boolean) => {
    setInfoDisabled((prev) => ({
      ...prev,
      [key]: disabled,
    }));
  };

  return (
    <div className="container-form-view p-form">
      <UsersFields
        info={info}
        infoDisabled={infoDisabled}
        isNew={isNew}
        onChange={onChange}
        onDisabledChange={onDisabledChange}
        permission={props.permission}
        submitted={submitted}
      />
      <p className="text-xl text-primary-color my-5">Selecciones habilitadas </p>
      <UsersAccess
        permission={props.permission}
        user={info}
        onChange={onChange}
      />

      <div className={`${userStyles.section_3} flex items-center gap-5`}>
        <ButtonAction
          onClick={onSubmit}
          disabled={isNew && !props.user.idagep_empresa}
          label="Guardar cambios"
        />

        {!isNew && !sameUser && props.permission.delete && (
          <ButtonDeny
            onClick={onDelete}
            disabled={isNew && !props.user.idagep_empresa}
            label="Eliminar usuario"
          />
            
        )}
      </div>
    </div>
  );
}
