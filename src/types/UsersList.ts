import { CRUDResponse, DropdownOptions } from "./Form";
import { UserPermissions } from "./User";

export interface UsersListResponse {
  status: number;
  usuarios: Users[];
}

export interface Users {
  Empresa: string;
  estatusEmpresa: number;
  estatusUsuario: number;
  idagep_empresa: number;
  idagep_usuarios: number;
  nombre: string;
  email: string;
  telefono: string;
  /** @deprecated se usa ahora `estatusUsuario` */
  estatus: number;
  rol: string;
  idagep_sucursal: string;
  ultimasesion: string | null;
  accesos: UserPermissions[];
}

export interface UserGetBody {
  idagep_usuarios: number;
  idagep_empresa: number | null;
  email: string;
  operacion?: "T" | "E" | "U";
}

export interface UserCRUD extends Omit<Users, "email"> {
  usuario: string;
  contrasena: string;
  fechaEnt: string;
  fechaMod: string;
}

export type UsersCRUDReponse = CRUDResponse<UserCRUD>;

export type AccessPermissions = "readonly" | "readandwrite" | "none";

export type UserInfoDisabled = Record<keyof Users, boolean>;

export type OnlyUserFields = keyof Omit<
  Users,
  "idagep_usuarios" | "ultimasesion" | "accesos"
>;

export interface UserFields {
  label: string;
  key: OnlyUserFields;
  required?: boolean;
  options?: DropdownOptions<unknown>[];
}

export interface ChangeUserDataBody {
  idagep_usuarios: number;
  email?: string;
  hash?: string;
  hOld?: string;
  operacion: string;
}

export interface ProfileImageBody {
  idagep_usuarios: number;
  extension: string;
  rutaDocumentos: string;
  operacion: string;
}
