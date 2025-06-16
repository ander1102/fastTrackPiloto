export interface UserCard {
  linked: boolean;
}

export interface User {
  persona: Persona;
  user: CatUser;
  roles: string;
  permisos: UserPermissions[];
  idagep_empresa: number | null;
  profileImage: string | null;
  userType: UserType;
  card: UserCard;
}

export interface Persona {
  idagep_usuarios: number;
  nombre: string;
  email: string;
}

export interface CatUser {
  catusers_users: string;
  catusers_details: string;
  referencia: string;
  rol_tipo: string;
}

export interface UserPermissions {
  departamento: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface PermissionProps {
  permission: UserPermissions;
}

export type HashResponse = { mensaje: string }[];

export type UserType = "admin" | "master";
