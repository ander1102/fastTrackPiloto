import { Call } from "@app/common/fetch";
import { getTokenBearer } from "./middlewares";
import type {
  ChangeUserDataBody,
  ProfileImageBody,
  UserCRUD,
  UserGetBody,
  Users,
  UsersCRUDReponse,
} from "@app/types/UsersList";
import { isEmptyObject } from "@app/common";
import { AGREGADOR_API_URL } from "@app/constants";
import { CRUDResponse } from "@app/types/Form";

export const UserControllers = {
  all: (body: UserGetBody) =>
    Call<Users[]>("/api/users/get/all", {
      headers: getTokenBearer(),
      body,
      method: "POST",
    }),
  allIndex: (body: UserGetBody) =>
    Call<Users[]>("/api/users/get/allIndex", {
      headers: getTokenBearer(),
      body,
      method: "POST",
  }),
  add: (userObj: Users) =>
    Call<UsersCRUDReponse>("/api/users/add", {
      body: userObj,
      headers: getTokenBearer(),
      method: "POST",
    }),
  get: (email: string) =>
    Call<UserCRUD | null>(`/api/users/get`, {
      body: { email },
      headers: getTokenBearer(),
      method: "POST",
      setError: (res: any) => !res || isEmptyObject(res),
    }),
  update: (userObj: Users) =>
    Call<UsersCRUDReponse>("/api/users/update", {
      body: userObj,
      headers: getTokenBearer(),
      method: "POST",
    }),
  delete: (email: string) =>
    Call<CRUDResponse<CRUDResponse<string>>>(
      `/api/users/delete?email=${email}`,
      {
        headers: getTokenBearer(),
      }
    ),
  changeData: (body: ChangeUserDataBody) =>
    Call<CRUDResponse<any>>(
      // /usuarios/updatepass
      "/api/users/updatePass",
      {
        body,
        method: "POST",
        headers: getTokenBearer(),
      },
    ),
  uploadProfileImage: (body: ProfileImageBody) =>
    Call<CRUDResponse<string>>(
      "/api/users/uploadimage",
      {
        body,
        method: "POST",
        headers: getTokenBearer(),
      },
    ),
  getProfileImage: (idagep_usuarios: number) =>
    Call<string>(
      // /ajustes/perfil/imagen/mostrar
      "/api/users/getimage",
      {
        body: { idagep_usuarios },
        method: "POST",
        headers: getTokenBearer()
      }
    ),
};
