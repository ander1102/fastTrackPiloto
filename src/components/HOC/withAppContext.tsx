import {
  ComponentType,
  CSSProperties,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import type {
  PermissionProps,
  User,
  UserPermissions,
  UserType,
} from "@app/types/User";
import { UserContext } from "@app/context";
import { register } from "../ViewManager/Controlled/create";
import { isEmptyObject } from "@app/common";
import { getStorageHash, LoginControllers } from "@app/logic/backend/login";
import { useRouter } from "next/router";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { UserControllers } from "@app/logic/backend/users";
import Head from "next/head";
import { MenuItems } from "../Nav/MenuItems";
import { toast } from "react-toastify";
import {
  APP_TITLE,
  DEFAULT_TOAST_CONFIGURATION,
  excludePaths,
  USER_ADMINS,
} from "@app/constants";
import { AppLogic } from "@app/logic/app";
import { Log } from "@app/common/log";
import { ClientsControllers } from "@app/logic/backend/clients";
import { Client } from "@app/types/Clients";
import { arrayBufferToBase64 } from "@app/common/format";
import { PageSizeContext } from "@app/context/Size";
import useValueHandler from "@app/hooks/useValueHandler";
import AppLoader from "@app/layout/app/appLoader";
import { DEFAULT_CARD_CONFIG } from "@app/constants/user";

export type AppContextProps<IProps = {}> = IProps & {
  user: User;
  client: Client;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
  userType: UserType;
} & PermissionProps;

interface AppContextOptions {
  offline: boolean;
  title: string;
  /**Modifica los estilos del contenedor padre que contiene el modulo actual */
  mergeContainerStyles: CSSProperties;
}

interface RenderPageProps extends PropsWithChildren {
  PageKey?: string;
}

export const getUserType = (idagep_empresa: number): UserType =>
  USER_ADMINS.some((x) => x === idagep_empresa) ? "master" : "admin";

//Se renderiza en un componente aparte ya que el registro se debe hacer dentro de un Layout Effect luego de haber cargado los datos del usuario
const RenderPage = ({ children, PageKey }: RenderPageProps) => {
  //Se usa un Layout Effect para que registre el componente antes de invocar un modal de inmediato
  useLayoutEffect(() => {
    if (PageKey) {
      register.registerComponent({
        key: PageKey,
        status: "mounted",
      });
    }
    return () => {
      if (PageKey) register.changeStatus(PageKey, "unmounted");
    };
  }, []);

  return <>{children}</>;
};

/**HOC que renderiza una pagina con la informacion del usuario y los permisos de dicha pagina */
export default function withAppContext<IProps = {}>(
  Component: ComponentType<AppContextProps<IProps>>,
  key?: string,
  options?: Partial<AppContextOptions>
) {
  if (!key) {
    Log.debug.warn(
      "No hay un id que identifique a este Componente dentro de AppContext"
    );
  }
  return (props: IProps) => {
    const userCtx = useContext(UserContext);
    const [title, setTitle] = useState(() => options?.title);
    const [permissions, setPermissions] = useState({} as UserPermissions);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useValueHandler<NodeJS.Timer | number>(-1);
    const { setContainerStyles } = useContext(PageSizeContext);
    const router = useRouter();

    const UserEmpty = useMemo(
      () => !userCtx.user || isEmptyObject(userCtx.user),
      [userCtx.user]
    );

    const userType = useMemo(
      () => getUserType(userCtx.user.idagep_empresa ?? 0),
      [userCtx.user]
    );

    useEffect(() => {
      if (
        !userCtx.user.permisos?.length ||
        excludePaths.some((path) => router.pathname.endsWith(path))
      )
        return;
      const menuItem = MenuItems.find(
        (menu) => menu.pathname === router.pathname
      );
      const findPermission =
        menuItem?.getItem && menuItem.getItem(userCtx.user);
      if (!findPermission) {
        toast.error(
          "No tienes acceso a este modulo",
          DEFAULT_TOAST_CONFIGURATION
        );
        const firstModule = userCtx.user.permisos.find((x) => x.read);
        const default_route = MenuItems.find(
          (menu) =>
            menu.keyname === firstModule?.departamento && firstModule?.read
        );
        router.push(default_route ?? "/");
        return;
      }

      if (options && options.mergeContainerStyles) {
        setContainerStyles(router.pathname, options.mergeContainerStyles);
      }

      setPermissions(findPermission);
      window.sessionStorage.setItem("email", userCtx.user.persona.email);
    }, [router.pathname, userCtx.user]);

    useEffectAsync(async () => {
      if (!UserEmpty || (options && options.offline)) return;
      const hash = getStorageHash();
      if (!hash) {
        AppLogic.Logout(userCtx, router);
        return;
      }
      setTimer(
        setTimeout(() => {
          setLoading(true);
        }, 1500)
      );
      const storedEmail = window.sessionStorage.getItem("email") ?? "";
      const UserRes = await LoginControllers.Login(hash, storedEmail);
      if (UserRes.error || !UserRes.isSuccess) {
        AppLogic.Logout(userCtx, router);
        return;
      }
      const clientInfo = await ClientsControllers.get({
        idagep_empresa: UserRes.response.idagep_empresa ?? 0, 
        id_login: UserRes.response?.persona.idagep_usuarios ?? 0
      });
      if (clientInfo.isSuccess && !clientInfo.error)
        userCtx.setClient(clientInfo.response);
      const userImage = await UserControllers.getProfileImage(
        UserRes.response.persona?.idagep_usuarios ?? 0
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
      const userDetails = await UserControllers.all({
        email: UserRes.response.persona?.email ?? "",
        idagep_empresa: UserRes.response.idagep_empresa ?? 0,
        idagep_usuarios: UserRes.response.persona?.idagep_usuarios ?? 0,
      });

      if (UserRes.isSuccess && UserRes.response) {
        clearTimeout(timer());
        setLoading(false);
        const details = userDetails.response?.[0];
        userCtx.setUser({
          ...UserRes.response,
          idagep_empresa: details?.idagep_empresa,
          permisos: !userDetails.error
            ? details?.accesos
            : UserRes.response?.permisos,
          profileImage: image,
          userType: getUserType(UserRes.response.idagep_empresa ?? 0),
          card: DEFAULT_CARD_CONFIG,
        });
      }
    }, []);

    return (
      <>
        <Head>
          <title>{title ?? APP_TITLE}</title>
          <meta name="description" content={title ?? APP_TITLE} />
        </Head>
        {UserEmpty && loading && <AppLoader />}
        {!UserEmpty && (
          <RenderPage PageKey={key}>
            <Component
              key={key}
              {...props}
              user={userCtx.user}
              client={userCtx.client}
              setTitle={setTitle}
              permission={permissions}
              userType={userType}
            />
          </RenderPage>
        )}
      </>
    );
  };
}
