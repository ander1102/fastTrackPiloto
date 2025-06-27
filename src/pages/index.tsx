import { KeyboardEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from "@app/styles/Home.module.css";

import LoginLayout from "@app/layout/login";
import { Checkbox } from "primereact/checkbox";
import { useRouter } from "next/router";
import { getStorageHash, LoginControllers } from "@app/logic/backend/login";

import { UserContext } from "@app/context";
import { DEFAULT_TOAST_CONFIGURATION, NOT_ACCESS_LOGIN } from "@app/constants";
import { ShowFetchResponseToast } from "@app/utils/DOM";
import { UserControllers } from "@app/logic/backend/users";
import Link from "next/link";
import { toast } from "react-toastify";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { FormItem } from "@app/components/FormManager/FormItem";
import { InputText } from "primereact/inputtext";
import { ButtonLoader } from "@app/components/Buttons";
import { ClientsControllers } from "@app/logic/backend/clients";
import { arrayBufferToBase64 } from "@app/common/format";
import { getFinalHash } from "@app/logic/backend/utils";
import { getUserType } from "@app/components/HOC/withAppContext";
import { DEFAULT_CARD_CONFIG } from "@app/constants/user";
import { Password } from "primereact/password";
import '../layout/login/Login.module.css'

export default function Home() {
  // const [email, setEmail] = useState<any>("");
  // const [password, setPassword] = useState<string>("");

  // const [email, setEmail] = useState<any>("test@centumpay.com");
  // const [password, setPassword] = useState<string>("Admin123");

  const [email, setEmail] = useState<any>("hola@cohetepay.com");
  const [password, setPassword] = useState<string>("Admin.123");

  const [remember, setRemember] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userCtx = useContext(UserContext);

  useEffectAsync(async () => {
    const hash = getStorageHash();
    if (hash) {
      //Significa que el usuario se encuentra logeado
      await LogIn(hash);
      return;
    }

    if (!localStorage.getItem("remember")) setRemember(false);
    else {
      setRemember(Boolean(localStorage.getItem("remember")));
      if (Boolean(localStorage.getItem("remember")) === true) {
        setEmail(localStorage.getItem("mail"));
      }
    }
  }, []);

  const onSubmit = async () => {
    if (!email) return;
    const hash = await LoginControllers.GetHash(email);
    if (
      !ShowFetchResponseToast(hash, {
        setError: (res) => res.response === NOT_ACCESS_LOGIN,
        setFailureTitle: (res, err) => {
          if (res.error)
            return "A ocurrido un error inseperado al iniciar sesión, por favor intentelo de nuevo";
          if (err) return "Este usuario se encuentra inhabilitado";
          return "Error desconocido";
        },
      })
    )
      return;

    const token = await LoginControllers.Auth(
      email,
      getFinalHash(email, hash.response, password)
    );

    if (token.response === "Accesos incorrectos"){
      toast.error("Las credenciales son incorrectas")
      return;
    }
    await LogIn(token.response, true);
  };

  const LogIn = async (token: string, saveEmail?: boolean) => {
    const login = await LoginControllers.Login(token, email);
    if (login.error) return;
    window.sessionStorage.setItem("hash", token);
    const userDetails = await UserControllers.all({
      email: login?.response?.persona?.email ?? "",
      idagep_empresa: login?.response?.idagep_empresa ?? 0,
      idagep_usuarios: login?.response?.persona?.idagep_usuarios ?? 0,
    });
    const accesos =
      (!userDetails.error
        ? userDetails && userDetails.response &&  userDetails?.response[0]?.accesos
        : login.response?.permisos) ?? [];

    if (accesos.length === 0 || accesos.every((x) => !x.read)) {
      toast.error(
        "Este usuario no cuenta con ningún modulo habilitado",
        DEFAULT_TOAST_CONFIGURATION
      );
      window.sessionStorage.removeItem("hash");
      return;
    }
    if (saveEmail) {
      if (remember === true) {
        localStorage.setItem("remember", "true");
        localStorage.setItem("mail", email);
      } else {
        localStorage.removeItem("remember");
        localStorage.removeItem("mail");
      }
    }
    const clientInfo = await ClientsControllers.get({
      idagep_empresa: login.response.idagep_empresa ?? 0,
      id_login: login.response.persona?.idagep_usuarios ?? 0
    });
    if (clientInfo.isSuccess && !clientInfo.error)
      userCtx.setClient(clientInfo.response);
    const userImage = await UserControllers.getProfileImage(
      login.response.persona?.idagep_usuarios ?? 0
    );
    let image: string | null = null;
    if (userImage.isSuccess && userImage.response) {
      if(userImage.response === "Sin imagen"){
        image = ""
      } else {
        image = userImage.response;
        image = "data:image/png;base64," + image;
      }
    }
    userCtx.setUser({
      ...login.response,
      idagep_empresa: !userDetails.error
        ? userDetails.response[0]?.idagep_empresa
        : null,
      permisos: accesos,
      profileImage: image,
      userType: getUserType(login.response.idagep_empresa ?? 0),
      card: DEFAULT_CARD_CONFIG,
    });
    toast.success("Sesión iniciada correctamente", DEFAULT_TOAST_CONFIGURATION);
    const firstModule = accesos.find((x) => x.read);
    const route = firstModule && firstModule.departamento === "terminales_admin" ? "/dashboard/terminales/admin" : `/dashboard/${firstModule?.departamento}`
    router.push(route);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };

  const hasDisabled = !email || !password;

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!hasDisabled && e.key === "Enter") {
      handleSubmit().then();
    }
  };

  return (
    <>
      <Head>
        <title>Thunderpay</title>
        <meta name="description" content="Thunderpay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/mini2.png" />
      </Head>
      <main className={styles.main}>
        <div id="ze-snippet" />
        <LoginLayout>
          <div className="sub-title--light login-sub-title">
            <strong style={{ fontFamily: "DM Sans" }}>
              ¡Bienvenido de nuevo!
            </strong>{" "}
            Por favor ingresa tus datos.
          </div>
          <FormItem>
            <label style={{color: '#FFF'}}>Correo electrónico</label>
            <InputText
              value={email}
              className="inputs-login"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ingresa tu correo electrónico"
              style={{ fontFamily: "DM Sans", paddingLeft: 21, }}
            />
          </FormItem>
          <FormItem>
            <label style={{color: '#FFF'}}>Contraseña</label>
            <Password
              value={password}
              className="inputs-login"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
              type="password"
              placeholder="Ingresa tu contraseña"
              toggleMask
              feedback={false}
            />
          </FormItem>

          <div className="login-rememberme-container mt-[0px]">
            <div className="flex justify-center">
              <Checkbox
                id="rememberme"
                className=""
                checked={remember ?? false}
                onChange={(e) => setRemember(e.checked)}
              />
              <label
                htmlFor="rememberme"
                className="text-sm text-light ml-[8px]"
              >
                Recuérdame
              </label>
            </div>
            <Link
              href="/forgotpassword"
              className="ml-2 text-sm text-right text-light cursor-pointer underline"
              // style={{ color: "#FFF", fontFamily: 'DM Sans' }}
            >
              Olvidé mi contraseña
            </Link>
          </div>

          <ButtonLoader
            style={{
              paddingLeft: 46,
              paddingRight: 46,
              paddingTop: 13,
              paddingBottom: 13,
              textAlign: "center",
              justifyContent: "center",
              borderRadius: 25,
              width: 188.5,
              fontFamily: "urbanist_bold",
            }}
            className="!bg-primary-color text-light"
            loading={loading}
            disabled={hasDisabled}
            onClick={handleSubmit}
          >
            Iniciar sesión
          </ButtonLoader>
        </LoginLayout>
      </main>
    </>
  );
}
