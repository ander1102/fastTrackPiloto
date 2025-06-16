import { isValidEmail, omit } from "@app/common";
import { MenuItem, MenuItems, _hideAdmin } from "@app/components/Nav/MenuItems";
import { DropdownOptions, FormRecord } from "@app/types/Form";
import type { UserPermissions, User } from "@app/types/User";
import type {
  Users,
  UserInfoDisabled,
  AccessPermissions,
  UserFields,
} from "@app/types/UsersList";
import { USER_ADMINS } from ".";
import { ESTATUS_USUARIOS, ROLES } from "./form";

export interface UserFormProps {
  user: User;
  userInfo?: Users;
}

const PERMISSIONS = ["Solo Lectura", "Lectura y Escritura"];

export const PermissionOptions: DropdownOptions<AccessPermissions>[] = [
  { label: PERMISSIONS[0], value: "readonly" },
  { label: PERMISSIONS[1], value: "readandwrite" },
];

const MenuItemsFilterPredicate = (x: MenuItem, isAdmin: boolean) => {
  if (isAdmin) return !x.hideAdmin && !x.subRoute;
  return !x.subRoute && !x.admin;
};

export const DEFAULT_ACCESS = (user: Users): UserPermissions[] => {
  const isAdmin = USER_ADMINS.some((x) => x === user.idagep_empresa);
  return MenuItems.filter((x) => MenuItemsFilterPredicate(x, isAdmin)).map(
    (module) => ({
      create: false,
      delete: false,
      departamento: module.keyname,
      read: false,
      update: false,
    })
  );
};

export const DEFAULT_USER_INFO = (user: Users): Users => ({
  idagep_empresa: user.idagep_empresa ?? 0,
  email: "",
  telefono: "",
  estatus: 1,
  ultimasesion: "",
  idagep_usuarios: 0,
  rol: ROLES[0].value,
  nombre: "",
  idagep_sucursal: "",
  accesos: [],
  Empresa: "",
  estatusEmpresa: 0,
  estatusUsuario: 0,
});

export const USER_VALIDATION: Partial<FormRecord<Users>> = {
  email: {
    validate: (value) => isValidEmail(value),
    displayError: "El correo electrónico no es válido",
  },
};

export const PERMISSION_NONE = (departamento?: string): UserPermissions => ({
  create: false,
  delete: false,
  departamento: departamento ?? "",
  read: false,
  update: false,
});

export const PERMISSION_READ_ONLY = (
  departamento?: string
): UserPermissions => ({
  create: false,
  delete: false,
  departamento: departamento ?? "",
  read: true,
  update: false,
});

export const PERMISSION_READ_WRITE = (
  departamento?: string
): UserPermissions => ({
  create: true,
  delete: true,
  departamento: departamento ?? "",
  read: true,
  update: true,
});

export const getInfoDisabled = (userInfo: Users | undefined) =>
  Object.fromEntries(
    Object.entries(DEFAULT_USER_INFO({} as Users)).map((obj) => [
      obj[0],
      !!userInfo,
    ])
  ) as UserInfoDisabled;

export const setAccessByAccessType = (
  departamento: string,
  value: AccessPermissions
): UserPermissions => {
  switch (value) {
    case "none":
      return PERMISSION_NONE(departamento);
    case "readonly":
      return PERMISSION_READ_ONLY(departamento);
    case "readandwrite":
      return PERMISSION_READ_WRITE(departamento);
  }
};

export const isAccessNone = (permission: UserPermissions | undefined) =>
  !permission || getAccessByData(permission) === "none";

export const AccessMap: Record<AccessPermissions, string> = {
  readonly: PERMISSIONS[0],
  readandwrite: PERMISSIONS[1],
  none: "",
};

export const getAccessByData = (data: UserPermissions): AccessPermissions => {
  if (Object.values(omit(data, "departamento")).every((x) => x))
    return "readandwrite";
  if (
    data.read === true &&
    Object.values(omit(data, "departamento", "read")).every((x) => !x)
  )
    return "readonly";
  return "none";
};

export const userFields: UserFields[] = [
  {
    key: "nombre",
    required: true,
    label: "Nombre",
  },
  {
    key: "email",
    required: true,
    label: "Correo electrónico",
  },
  {
    key: "estatus",
    options: ESTATUS_USUARIOS,
    required: true,
    label: "Estatus",
  },
  {
    key: "rol",
    options: ROLES,
    required: true,
    label: "Rol",
  },
];
