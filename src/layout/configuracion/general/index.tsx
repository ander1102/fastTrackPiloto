import { useContext, useMemo, useState } from "react";
import { UserProps } from "@app/context";
import Grid from "@app/components/Grid";
import { FormItem } from "@app/components/FormManager/FormItem";
import { InputText } from "primereact/inputtext";
import { ButtonAction, ButtonDeny } from "@app/components/Buttons";
import { isValidEmail } from "@app/common";
import { UserControllers } from "@app/logic/backend/users";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import UserAvatarImage from "@app/components/Avatar/userAvatar";
import { UserContext } from "@app/context";
import { ShowFetchResponseToast, upload } from "@app/utils/DOM";
import { Password } from "primereact/password";
import {
  blobToBase64,
  cleanBase64,
  getFileExtension,
} from "@app/common/format";
import { hashUpdatePwd } from "@app/logic/backend/utils";

export default function ConfigurationGeneralTab({ user }: UserProps) {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState(() => user.persona?.email ?? "");
  const [password, setPassword] = useState("");
  const [repeatPasword, setRepeatPasword] = useState("");
  const [confirmRepeatPassword, setConfirmRepeatPassword] = useState("");

  const [disabledEdit, setDisabledEdit] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);
  const [loadingImagen, setLoadingImagen] = useState(false);

  const validEmail = useMemo(() => isValidEmail(email), [email]);
  const isEmptyPassword = useMemo(
    () => !password || !repeatPasword || !confirmRepeatPassword,
    [password, repeatPasword, confirmRepeatPassword]
  );
  const evaluatePasswords = useMemo(
    () => repeatPasword === confirmRepeatPassword,
    [repeatPasword, confirmRepeatPassword]
  );

  const onUpdateEmail = async () => {
    if (!validEmail) return;
    const changeEmail = await UserControllers.changeData({
      idagep_usuarios: user.persona?.idagep_usuarios ?? 0,
      email,
      operacion: "U",
    });
    if (changeEmail.isSuccess){
      toast.info(changeEmail.response.mensaje, DEFAULT_TOAST_CONFIGURATION);
      setDisabledEdit(true);
    } else {
      toast.error("No se pudo actualizar")
    }
  };

  const onUpdatePassword = async () => {
    const changePassword = await UserControllers.changeData({
      idagep_usuarios: user.persona?.idagep_usuarios ?? 0,
      hash: hashUpdatePwd("GSUIREEQ66D", repeatPasword).toString(),
      hOld: hashUpdatePwd("GSUIREEQ66D", password).toString(),
      operacion: "U",
    });

    if (changePassword.isSuccess && changePassword.response) {
      toast.info(changePassword.response.mensaje, DEFAULT_TOAST_CONFIGURATION);
      setPassword("");
      setRepeatPasword("");
      setConfirmRepeatPassword("");
    }
    setDisabledEdit(true);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*([^a-zA-Z\d\s])).{8,}$/;
    return passwordRegex.test(password);
  };

  const onUploadImagen = async () => {
    const file = await upload(false, "image/*");
    if (!file) return;
    if (file.size > 2000000) {
      toast.error(
        "El archivo no debe exceder los 2mb",
        DEFAULT_TOAST_CONFIGURATION
      );
      return;
    }
    setLoadingImagen(true);
    const Img = await blobToBase64(file);
    if (Img) {
      const res = await UserControllers.uploadProfileImage({
        extension: getFileExtension(file.name),
        idagep_usuarios: userCtx.user.persona.idagep_usuarios ?? 0,
        operacion: "C",
        rutaDocumentos: cleanBase64(Img) as string,
      });
      if (
        ShowFetchResponseToast(res, {
          setFailureTitle: () => "Ha ocurrido un error inesperado",
          setError: (res: any) => res.response?.code === "1001",
          setSuccessTitle: (res) => res.response?.mensaje,
        })
      ) {
        userCtx.setUser((prev) => ({
          ...prev,
          profileImage: Img,
        }));
      }
    }
    setLoadingImagen(false);
  };

  const onDeleteImagen = async () => {
    const res = await UserControllers.uploadProfileImage({
      extension: "",
      idagep_usuarios: userCtx.user.persona.idagep_usuarios ?? 0,
      operacion: "D",
      rutaDocumentos: "",
    });
    if (
      ShowFetchResponseToast(res, {
        setFailureTitle: () => "Ha ocurrido un error inesperado",
        setError: (res: any) => res.response?.code === "1001",
        setSuccessTitle: (res) => res.response as unknown as string,
      })
    ) {
      userCtx.setUser((prev) => ({
        ...prev,
        profileImage: null,
      }));
    }
  };

  return (
    <div className="container-form-tab">
      <h3 className="text-xl text-[#6B3374] mb-5 font-medium">
        Configuración general
      </h3>
      <Grid sm={1} md={1} lg={2} gap={20}>
        <div className="left">
          <div className="flex  w-full items-end ">
            <FormItem
              label="Correo electrónico"
              error={!validEmail ? "El correo  no tiene un formato válido" : ""}
            >
              <InputText
                value={email}
                disabled={disabledEdit}
                style={{ height: "45px" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormItem>
            <ButtonAction
              style={{ width: "125px", marginLeft: "0.75rem" }}
              label={disabledEdit ? "Modificar" : "Guardar"}
              onClick={() => {
                if (disabledEdit) {
                  setDisabledEdit(false);
                } else {
                  onUpdateEmail();
                }
              }}
            />
          </div>

          <div className="flex w-full items-end ">
            <div className="flex flex-col w-full">
              <FormItem label="Contraseña">
                <Password
                  className="border flex-col"
                  disabled={disabledPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="*********"
                  style={{ fontFamily: "urbanist_bold"}}
                  toggleMask
                />
              </FormItem>
              {!disabledPassword && (
                <>
                  <FormItem label="Nueva contraseña">
                    <Password
                      disabled={disabledPassword}
                      value={repeatPasword}
                      className="border flex-col"
                      onChange={(e) => setRepeatPasword(e.target.value)}
                      type="password"
                      placeholder="*********"
                      style={{ fontFamily: "urbanist_bold" }}
                      toggleMask
                    />
                    {!isPasswordValid(repeatPasword) && (
                      <span style={{ color: "#E30000", fontSize: "11px" }}>
                        La contraseña debe tener al menos 8 caracteres, una
                        letra mayúscula, un número y un carácter especial.
                      </span>
                    )}
                  </FormItem>

                  <FormItem label="Confirmar contraseña">
                    <Password
                      value={confirmRepeatPassword}
                      className="border flex-col"
                      onChange={(e) => setConfirmRepeatPassword(e.target.value)}
                      type="password"
                      placeholder="*********"
                      style={{ fontFamily: "urbanist_bold" }}
                      toggleMask
                    />
                  </FormItem>
                </>
              )}
            </div>

            <ButtonAction
              style={{ width: "125px", marginLeft: "0.75rem" }}
              label={disabledPassword ? "Modificar" : "Guardar"}
              disabled={
                disabledPassword
                  ? false
                  : isEmptyPassword ||
                    !evaluatePasswords ||
                    !isPasswordValid(repeatPasword)
              }
              onClick={() => {
                if (disabledPassword) {
                  setDisabledPassword(false);
                } else {
                  onUpdatePassword();
                }
              }}
            />
          </div>
        </div>

        <div className="right flex">
          <div>
            <h3 className="text-gray-800 text-md mb-3">Imagen de perfil</h3>
            <div className="flex">
              <div style={{ width: "200px" }}>
                <UserAvatarImage
                  onClick={onUploadImagen}
                  loading={false}
                  user={userCtx.user}
                  size="xlarge"
                  image={userCtx.user.profileImage && userCtx.user.profileImage !== 'Sin imagen' ?  userCtx.user.profileImage : undefined}
                  upload
                />
              </div>
              <div className="text-gray-500 text-md mx-5">
                Esta imagen se muestra como icono del usuario Tamaño máximo 2MB,
                .jpeg ó .png
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <ButtonAction
              style={{ height: "45px", width: "125px", margin: "0.75rem" }}
              loading={loadingImagen}
              onClick={onUploadImagen}
              label="Cambiar"
            />

            {userCtx.user.profileImage && (
              <ButtonDeny
                style={{ height: "45px", width: "125px", margin: "0.75rem" }}
                onClick={onDeleteImagen}
                label="Eliminar"
              />
            )}
          </div>
        </div>
      </Grid>
    </div>
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
