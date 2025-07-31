import type { NextRouter } from "next/router";
import type { User, UserPermissions } from "@app/types/User";
import styles from "./Nav.module.css";
import { MODULE_KEYS, USER_ADMINS } from "@app/constants";
import { ImgHTMLAttributes } from "react";
import { SVG } from "../svg";

export interface ClickParams {
  router: NextRouter;
  setUser: (prev: User) => void;
}

/**
 * Representa un ítem del menú que extiende las propiedades de un módulo.
 */
export interface MenuItem {
  /**
   * El nombre del ítem del menú.
   */
  nombre: string;
  /**
   * Componente opcional de icono que acepta props con una propiedad `selected`.
   * @param props - Propiedades que indican si el ítem está seleccionado.
   * @returns Un elemento JSX.
   */
  Icon?: (props: { selected: boolean }) => JSX.Element;
  /**
   * Función opcional para determinar si el ítem debe estar oculto para un usuario dado.
   * @param user - El usuario para el cual se evalúa la visibilidad del ítem.
   * @returns Un booleano que indica si el ítem debe estar oculto.
   */
  hide?: (user: User) => boolean;
  /**
   * Función opcional para obtener los permisos del usuario relacionados con este ítem.
   * @param user - El usuario para el cual se obtienen los permisos.
   * @returns Los permisos del usuario o `undefined`.
   */
  getItem?: (user: User) => UserPermissions | undefined;
  /**
   * Ruta secundaria opcional para el ítem del menú.
   */
  subRoute?: string;
  /**
   * Lista de IDs de administradores que tienen acceso especial al ítem.
   */
  admin?: number[];
  /**
   * Indica si el ítem debe estar oculto para administradores.
   */
  hideAdmin: boolean;
  /**
   * Indica si el ítem es un menú desplegable,Colocar true a todos los opciones
   */
  isDrop?: boolean;
  /**
   * Clave única que identifica al ítem del menú.
   */
  keyname: string;

  /**
   * Ruta opcional que define el camino del ítem dentro de la aplicación.
   */
  pathname?: string;
}

const ImageLayout = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <img width={20} height={20} {...props} />
    </div>
  );
};

const _hide = (user: User, key: string) =>
  !user.permisos?.some((x) => x.departamento === key && x.read);

const _getItem = (user: User, key: string) =>
  user.permisos?.find((x) => x.departamento === key && x.read);

export const _hideAdmin = (admins: number[], user: User) =>
  admins.some((x) => user.idagep_empresa === x);

export const MenuItems: MenuItem[] = [
  // Módulo de Resuemn
  {
    keyname: MODULE_KEYS.RESUMEN,
    nombre: "Resumen",
    pathname: "/dashboard/resumen",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Resumen"
        src={`/Images/menu/resumen${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.RESUMEN),
    getItem: (user) => _getItem(user, MODULE_KEYS.RESUMEN),

    hideAdmin: false,
  },
  // Módulo de Trasacciones
  {
    keyname: MODULE_KEYS.TRANSACCIONES,
    nombre: "Transacciones",
    pathname: "/dashboard/transacciones",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Transacciones"
        src={`/Images/menu/transacciones${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.TRANSACCIONES),
    getItem: (user) => _getItem(user, MODULE_KEYS.TRANSACCIONES),

    hideAdmin: false,
  },
  // Módulo de Rechazadas
  {
    keyname: MODULE_KEYS.RECHAZADAS,
    nombre: "Rechazadas",
    pathname: "/dashboard/rechazadas",

    Icon: ({ selected }) => (
      <SVG.TransactionRejected
        width={20}
        height={20}
        pathProps={{
          fill: selected ? "#FFF" : "#bca3c0",
        }}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.RECHAZADAS),
    getItem: (user) => _getItem(user, MODULE_KEYS.RECHAZADAS),
    admin: USER_ADMINS,
    hideAdmin: false,
  },
  // Módulo de Depositos
  {
    keyname: MODULE_KEYS.DEPOSITOS,
    nombre: "Depósitos",
    pathname: "/dashboard/depositos",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Depósitos"
        src={`/Images/menu/depositos${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.DEPOSITOS),
    getItem: (user) => _getItem(user, MODULE_KEYS.DEPOSITOS),
    hideAdmin: false,
  },
  // Módulo de Pagos a distancia
  {
    keyname: MODULE_KEYS.INTEGRACION,
    nombre: "Pagos a distancia",
    pathname: "/dashboard/integraciones",
    Icon: ({ selected }) => (
      <ImageLayout
        alt=""
        src={`/Images/menu/integraciones${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.INTEGRACION),
    getItem: (user) => _getItem(user, MODULE_KEYS.INTEGRACION),
    hideAdmin: false,
    },
  {
    keyname: MODULE_KEYS.INTEGRACION_DOCUMENTATION,
    nombre: "IntegracionDocumentation",
    pathname: "/dashboard/integraciones/documentacion",
    subRoute: MODULE_KEYS.INTEGRACION,
    getItem: (user) => _getItem(user, MODULE_KEYS.INTEGRACION),
    admin: USER_ADMINS,
    hideAdmin: false,
  },
  // Módulo de Reportes
  {
    keyname: MODULE_KEYS.REPORTES,
    nombre: "Reportes",
    pathname: "/dashboard/reportes",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Reportes"
        src={`/Images/menu/reportes${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.REPORTES),
    getItem: (user) => _getItem(user, MODULE_KEYS.REPORTES),
    hideAdmin: false,
  },
  // Módulo de Tarjetas
  // {
  //   keyname: MODULE_KEYS.TARJETA,
  //   nombre: "Tarjeta",
  //   pathname: "/dashboard/tarjeta",

  //   Icon: ({ selected }) => (
  //     <ImageLayout
  //       alt="Tarjeta"
  //       src={`/Images/menu/tarjetas${selected ? "_active" : ""}.svg`}
  //     />
  //   ),
  //   hide: (user) => _hide(user, MODULE_KEYS.TARJETA),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.TARJETA),
  //   hideAdmin: false,
  // },
  // Módulo de Terminales
  {
    keyname: MODULE_KEYS.TERMINALES,
    nombre: "Terminales",
    pathname: "/dashboard/terminales",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Terminales"
        src={`/Images/menu/terminales${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) =>
      _hide(user, MODULE_KEYS.TERMINALES) || _hideAdmin(USER_ADMINS, user),
    getItem: (user) =>
      _hideAdmin(USER_ADMINS, user)
        ? undefined
        : _getItem(user, MODULE_KEYS.TERMINALES),

    hideAdmin: true,
  },
  {
    keyname: MODULE_KEYS.TERMINALES_DETAILS,
    nombre: "TerminalesDetails",
    pathname: "/dashboard/terminales/details",
    subRoute: MODULE_KEYS.TERMINALES,
    hide: (user) =>
      _hide(user, MODULE_KEYS.TERMINALES) || _hideAdmin(USER_ADMINS, user),
    getItem: (user) =>
      _hideAdmin(USER_ADMINS, user)
        ? undefined
        : _getItem(user, MODULE_KEYS.TERMINALES),
    hideAdmin: true,
  },
  {
    keyname: MODULE_KEYS.TERMINALES_ADMIN,
    nombre: "Terminales",
    pathname: "/dashboard/terminales/admin",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Terminales"
        src={`/Images/menu/terminales${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.TERMINALES_ADMIN),
    getItem: (user) => _getItem(user, MODULE_KEYS.TERMINALES_ADMIN),

    admin: USER_ADMINS,
    hideAdmin: false,
  },
  {
    keyname: MODULE_KEYS.TERMINALES_ADD_ADMIN,
    nombre: "TerminalesAdd",
    pathname: "/dashboard/terminales/admin/new",
    subRoute: MODULE_KEYS.TERMINALES_ADMIN,
    hide: (user) => _hide(user, MODULE_KEYS.TERMINALES_ADMIN),
    getItem: (user) => _getItem(user, MODULE_KEYS.TERMINALES_ADMIN),
    admin: USER_ADMINS,
    hideAdmin: false,
  },
  {
    keyname: MODULE_KEYS.TERMINALES_DETAILS_ADMIN,
    nombre: "TerminalesAdd",
    pathname: "/dashboard/terminales/admin/details",
    subRoute: MODULE_KEYS.TERMINALES_ADMIN,
    hide: (user) => _hide(user, MODULE_KEYS.TERMINALES_ADMIN),
    getItem: (user) => _getItem(user, MODULE_KEYS.TERMINALES_ADMIN),
    admin: USER_ADMINS,
    hideAdmin: false,
  },
  //Modulo de Sucursales
  {
    keyname: MODULE_KEYS.SUCURSALES,
    nombre: "Sucursales",
    pathname: "/dashboard/sucursales",
    Icon: ({ selected }) => (
      <span
        className={`pi pi-home ${styles.navIcons}`}
        style={{ color: selected ? "#FFF" : "#bca3c0" }}
      />
    ),
    hide: (user) =>
      _hide(user, MODULE_KEYS.SUCURSALES) || _hideAdmin(USER_ADMINS, user),
    getItem: (user) =>
      _hideAdmin(USER_ADMINS, user)
        ? undefined
        : _getItem(user, MODULE_KEYS.SUCURSALES),

    hideAdmin: true,
  },
  {
    keyname: MODULE_KEYS.SUCURSALES_ADD,
    nombre: "SucursalesAdd",
    pathname: "/dashboard/sucursales/new",
    subRoute: MODULE_KEYS.SUCURSALES,

    hide: (user) =>
      _hide(user, MODULE_KEYS.SUCURSALES) || _hideAdmin(USER_ADMINS, user),
    getItem: (user) =>
      _hideAdmin(USER_ADMINS, user)
        ? undefined
        : _getItem(user, MODULE_KEYS.SUCURSALES),
    hideAdmin: true,
  },
  {
    keyname: MODULE_KEYS.SUCURSALES_DETAILS,
    nombre: "SucursalesAdd",
    pathname: "/dashboard/sucursales/details/[id]",
    subRoute: MODULE_KEYS.SUCURSALES,
    hide: (user) =>
      _hide(user, MODULE_KEYS.SUCURSALES) || _hideAdmin(USER_ADMINS, user),
    getItem: (user) =>
      _hideAdmin(USER_ADMINS, user)
        ? undefined
        : _getItem(user, MODULE_KEYS.SUCURSALES),
    hideAdmin: true,
  },
  // Módulo de Pagos Recurrentes
  // {
  //   keyname: MODULE_KEYS.PAGOS_RECURRENTES,
  //   nombre: "Pagos Recurrentes",
  //   pathname: "/dashboard/pagosrecurrentes",
  //   Icon: ({ selected }) => (
  //     <ImageLayout
  //       alt="Pagos Recurrentes"
  //       src={`/Images/menu/pagos_recurrentes${selected ? "_active" : ""}.svg`}
  //     />
  //   ),
  //   hide: (user) => _hide(user, MODULE_KEYS.PAGOS_RECURRENTES),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.PAGOS_RECURRENTES),
  //   hideAdmin: false,
  // },
  // {
  //   keyname: MODULE_KEYS.PAGOS_RECURRENTES,
  //   nombre: "Nuevo Pagos Recurrente",
  //   pathname: "/dashboard/pagosrecurrentes/nuevo",
  //   subRoute: MODULE_KEYS.PAGOS_RECURRENTES,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.PAGOS_RECURRENTES),
  //   hideAdmin: false,
  // },
  // {
  //   keyname: MODULE_KEYS.PAGOS_RECURRENTES,
  //   nombre: "Pagos Recurrentes Detalles",
  //   pathname: "/dashboard/pagosrecurrentes/detalles/[id]",
  //   subRoute: MODULE_KEYS.PAGOS_RECURRENTES,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.PAGOS_RECURRENTES),
  //   hideAdmin: false,
  // },
  // {
  //   keyname: MODULE_KEYS.PAGOS_RECURRENTES,
  //   nombre: "Pagos Recurrentes Suscritores",
  //   pathname: "/dashboard/pagosrecurrentes/suscritores/[id]",
  //   subRoute: MODULE_KEYS.PAGOS_RECURRENTES,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.PAGOS_RECURRENTES),
  //   hideAdmin: false,
  // },
  // Módulo de Clientes
  {
    keyname: MODULE_KEYS.CLIENTES,
    nombre: "Clientes",
    pathname: "/dashboard/clientes",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Clientes"
        src={`/Images/menu/clientes${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.CLIENTES),
    getItem: (user) => _getItem(user, MODULE_KEYS.CLIENTES),
    admin: USER_ADMINS,

    hideAdmin: false,
  },
  {
    keyname: MODULE_KEYS.CLIENTES_ADD,
    nombre: "ClientesAdd",
    pathname: "/dashboard/clientes/newclient",
    subRoute: MODULE_KEYS.CLIENTES,
    getItem: (user) => _getItem(user, MODULE_KEYS.CLIENTES),
    admin: USER_ADMINS,
    hideAdmin: false,
  },
  {
    keyname: MODULE_KEYS.CLIENTES_DETAILS,
    nombre: "ClientesDetails",
    pathname: "/dashboard/clientes/[id_company]",
    subRoute: MODULE_KEYS.CLIENTES,
    getItem: (user) => _getItem(user, MODULE_KEYS.CLIENTES),
    admin: USER_ADMINS,
    hideAdmin: false,
  },
  // Módulo de Expendientes
  {
    keyname: MODULE_KEYS.CUMPLIMIENTO,
    nombre: "Expediente",
    pathname: "/dashboard/expediente",
    Icon: ({ selected }) => (
      <ImageLayout
        alt=""
        src={`/Images/menu/cumplimiento${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.CUMPLIMIENTO),
    getItem: (user) => _getItem(user, MODULE_KEYS.CUMPLIMIENTO),
    admin: USER_ADMINS,
    hideAdmin: false,
  },
  {
    keyname: MODULE_KEYS.CUMPLIMIENTO_DETAILS,
    nombre: "ExpedienteDetails",
    pathname: "/dashboard/expediente/[id_company]",
    subRoute: MODULE_KEYS.CUMPLIMIENTO,
    getItem: (user) => _getItem(user, MODULE_KEYS.CUMPLIMIENTO),
    admin: USER_ADMINS,
    hideAdmin: false,
  },

  // Módulo de Usuarios
  {
    keyname: MODULE_KEYS.USUARIOS,
    nombre: "Usuarios",
    pathname: "/dashboard/usuarios",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Usuarios"
        src={`/Images/menu/usuarios${selected ? "_active" : ""}.svg`}
        width={18}
        height={18}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.USUARIOS),
    getItem: (user) => _getItem(user, MODULE_KEYS.USUARIOS),
    hideAdmin: false,
  },

  {
    keyname: MODULE_KEYS.USUARIOS_ADD,
    nombre: "Agregar usuario",
    pathname: "/dashboard/usuarios/newuser",
    subRoute: MODULE_KEYS.USUARIOS,

    getItem: (user) => _getItem(user, MODULE_KEYS.USUARIOS),
    hideAdmin: false,
  },
  {
    keyname: MODULE_KEYS.USUARIOS_DETAILS,
    nombre: "UsuariosDetails",
    pathname: "/dashboard/usuarios/[email]",
    subRoute: MODULE_KEYS.USUARIOS,

    getItem: (user) => _getItem(user, MODULE_KEYS.USUARIOS),
    hideAdmin: false,
  },
  // Módulo de Ventas
  // {
  //   keyname: MODULE_KEYS.VENTAS,
  //   nombre: "Ventas",
  //   pathname: "/dashboard/ventas",
  //   Icon: ({ selected }) => (
  //     <ImageLayout
  //       alt="Ventas"
  //       src={`/Images/menu/ventas${selected ? "_active" : ""}.svg`}
  //       width={18}
  //       height={18}
  //     />
  //   ),
  //   hide: (user) => _hide(user, MODULE_KEYS.VENTAS),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.VENTAS),
  //   hideAdmin: false,
  //   admin: USER_ADMINS,
  //   isDrop: true,
  // },
  // Módulo de Ventas - Leads
  // {
  //   keyname: MODULE_KEYS.LEADS_DETAILS,
  //   nombre: "LeadsDetails",
  //   pathname: "/dashboard/leads/[id_company]",
  //   subRoute: MODULE_KEYS.LEADS,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.LEADS),
  //   admin: USER_ADMINS,
  //   hideAdmin: false,
  // },
  // {
  //   keyname: MODULE_KEYS.LEADS,
  //   nombre: "Leads",
  //   pathname: "/dashboard/leads",
  //   hide: (user) => _hide(user, MODULE_KEYS.LEADS),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.LEADS),
  //   subRoute: MODULE_KEYS.VENTAS,
  //   hideAdmin: false,
  //   isDrop: true,
  // },
  // Módulo de Ventas - Agente Comercial
  // {
  //   keyname: MODULE_KEYS.AGENTE_COMERCIAL,
  //   nombre: "Agente Comercial",
  //   pathname: "/dashboard/ventas/agentecomercial",
  //   subRoute: MODULE_KEYS.VENTAS,
  //   hide: (user) => _hide(user, MODULE_KEYS.VENTAS),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.VENTAS),
  //   hideAdmin: false,
  //   isDrop: true,
  // },
  // {
  //   keyname: MODULE_KEYS.AGENTE_COMERCIAL_ADD,
  //   nombre: "TerminalesAdd",
  //   pathname: "/dashboard/ventas/agentenew",
  //   subRoute: MODULE_KEYS.VENTAS,
  //   hide: (user) => _hide(user, MODULE_KEYS.VENTAS),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.VENTAS),
  //   admin: USER_ADMINS,
  //   hideAdmin: false,
  // },
  // {
  //   keyname: MODULE_KEYS.AGENTE_COMERCIAL_DETAILS,
  //   nombre: "Agente Comercial",
  //   pathname: "/dashboard/ventas/agentecomercial/[id]",
  //   subRoute: MODULE_KEYS.VENTAS,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.VENTAS),
  //   hideAdmin: false,
  // },
  // Módulo de Ventas - Clientes Referidos
  // {
  //   keyname: MODULE_KEYS.CLIENTES_REFERIDOS,
  //   nombre: "Clientes Referidos",
  //   pathname: "/dashboard/ventas/clientesreferidos",
  //   subRoute: MODULE_KEYS.VENTAS,
  //   hide: (user) => _hide(user, MODULE_KEYS.VENTAS),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.VENTAS),

  //   hideAdmin: false,
  //   isDrop: true,
  // },
  // {
  //   keyname: MODULE_KEYS.CLIENTES_REFERIDOS_ADD,
  //   nombre: "Clientes Referidos",
  //   pathname: "/dashboard/ventas/clientesreferidos/nuevo",
  //   subRoute: MODULE_KEYS.VENTAS,
  //   hide: (user) => _hide(user, MODULE_KEYS.VENTAS),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.VENTAS),
  //   hideAdmin: false,
  // },
  // {
  //   keyname: MODULE_KEYS.CLIENTES_REFERIDOS_DETAIL,
  //   nombre: "Clientes Referidos Detalles",
  //   pathname: "/dashboard/ventas/clientesreferidos/[id]",
  //   subRoute: MODULE_KEYS.VENTAS,
  //   hide: (user) => _hide(user, MODULE_KEYS.VENTAS),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.VENTAS),
  //   hideAdmin: false,
  // },
  // Módulo de Catálogos - Agente Comercial
  // {
  //   keyname: MODULE_KEYS.CATALOGOS,
  //   nombre: "Catálogos",
  //   pathname: "/dashboard/catalogos",
  //   Icon: ({ selected }) => (
  //     <ImageLayout
  //       alt="Ventas"
  //       src={`/Images/menu/catalogo${selected ? "_active" : ""}.svg`}
  //       width={18}
  //       height={18}
  //     />
  //   ),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.CATALOGOS),
  //   hide: (user) => _hide(user, MODULE_KEYS.CATALOGOS),

  //   hideAdmin: false,
  //   isDrop: true,
  // },
  // Módulo de Catalogos - Productos
  // {
  //   keyname: MODULE_KEYS.PRODUCTOS,
  //   nombre: "Productos",
  //   pathname: "/dashboard/catalogos/productos",
  //   subRoute: MODULE_KEYS.CATALOGOS,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.CATALOGOS),
  //   hide: (user) => _hide(user, MODULE_KEYS.CATALOGOS),
  //   hideAdmin: false,
  //   isDrop: true,
  // },
  // {
  //   keyname: MODULE_KEYS.PRODUCTOS_ADD,
  //   nombre: "Nuevo producto",
  //   pathname: "/dashboard/catalogos/productos/nuevo",
  //   subRoute: MODULE_KEYS.CATALOGOS,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.CATALOGOS),

  //   hideAdmin: false,
  // },
  // {
  //   keyname: MODULE_KEYS.PRODUCTOS_DETAIL,
  //   nombre: "Agente Comercial",
  //   pathname: "/dashboard/catalogos/productos/[id]",

  //   subRoute: MODULE_KEYS.CATALOGOS,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.CATALOGOS),
  //   hideAdmin: false,
  // },
  // Módulo de Catálogos - Inventarios
  // {
  //   keyname: MODULE_KEYS.INVENTARIO,
  //   nombre: "Inventario",
  //   pathname: "/dashboard/catalogos/inventario",
  //   subRoute: MODULE_KEYS.CATALOGOS,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.CATALOGOS),
  //   hideAdmin: false,
  //   isDrop: true,
  // },
  // {
  //   keyname: MODULE_KEYS.INVENTARIO_DETAIL,
  //   nombre: "Inventario",
  //   pathname: "/dashboard/catalogos/inventario/[id]",
  //   subRoute: MODULE_KEYS.CATALOGOS,
  //   getItem: (user) => _getItem(user, MODULE_KEYS.CATALOGOS),
  //   hideAdmin: false,
  // },
  // Módulo de Operaciones
  {
    keyname: MODULE_KEYS.OPERACIONES,
    nombre: "Operaciones",
    pathname: "/dashboard/operaciones",
    Icon: ({ selected }) => (
      <ImageLayout
        alt=""
        src={`/Images/menu/operaciones${selected ? "_active" : ""}.svg`}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.OPERACIONES),
    getItem: (user) => _getItem(user, MODULE_KEYS.OPERACIONES),
    admin: USER_ADMINS,
    hideAdmin: false,
    isDrop: true,
  },
  // Módulo de Operaciones - Fast Track
  // {
  //   keyname: MODULE_KEYS.FAST_TRACK,
  //   nombre: "Fast Track",
  //   pathname: "/dashboard/operaciones/fasttrack",
  //   admin: USER_ADMINS,
  //   hide: (user) => _hide(user, MODULE_KEYS.OPERACIONES),
  //   getItem: (user) => _getItem(user, MODULE_KEYS.OPERACIONES),
  //   hideAdmin: false,
  //   subRoute: MODULE_KEYS.OPERACIONES,
  //   isDrop: true,
  // },
  // Módulo de Operaciones - Alertas y Riesgos
  {
    keyname: MODULE_KEYS.ALERTAS_RIESGOS,
    nombre: "Alertas y Riesgos",
    pathname: "/dashboard/operaciones/alertasriesgos",
    hide: (user) => _hide(user, MODULE_KEYS.OPERACIONES),
    getItem: (user) => _getItem(user, MODULE_KEYS.OPERACIONES),
    admin: USER_ADMINS,
    hideAdmin: false,
    subRoute: MODULE_KEYS.OPERACIONES,
    isDrop: true,
  },
  // Módulo de Operaciones - Parámetros
  {
    keyname: MODULE_KEYS.PARAMETROS,
    nombre: "Parámetros",
    pathname: "/dashboard/parametros",
    Icon: ({ selected }) => (
      <ImageLayout
        alt=""
        src={`/Images/menu/parametros${selected ? "_active" : ""}.svg`}
      />
    ),
    admin: USER_ADMINS,
    hide: (user) => _hide(user, MODULE_KEYS.PARAMETROS),
    getItem: (user) => _getItem(user, MODULE_KEYS.PARAMETROS),
    hideAdmin: false,
    //subRoute: MODULE_KEYS.OPERACIONES,
  },
  
  // Módulo de Configuración
  {
    keyname: MODULE_KEYS.CONFIGURACION,
    nombre: "Configuración",
    pathname: "/dashboard/configuracion",
    Icon: ({ selected }) => (
      <ImageLayout
        alt="Ventas"
        src={`/Images/menu/configuracion${selected ? "_active" : ""}.svg`}
        width={18}
        height={18}
      />
    ),
    hide: (user) => _hide(user, MODULE_KEYS.CONFIGURACION),
    getItem: (user) => _getItem(user, MODULE_KEYS.CONFIGURACION),
    hideAdmin: false,
  },
];
