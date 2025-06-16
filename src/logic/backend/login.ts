import { Call } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import { GeneralStatusResponse } from "@app/types";
import type { User } from "@app/types/User";

export const LoginControllers = {
  GetHash: (email: string) =>
    Call("/api/login/hash", {
      querybody: { email, usuario: "", contrasena: "", },
      checkAuth: false,
    }),
  Auth: (email: string, hash: string, ) =>
    Call("/api/login/auth", {
      body: { email, hash, usuario: "", contrasena: "" },
      method: "POST",
      parse: false,
      setError: (res) => !res,
      checkAuth: false,
    }),
  Login: (hash: string, email: string) =>
    Call<User>("/api/login", {
      body: { hash, usuario: "", contrasena: "", email },
      method: "POST",
    }),
  ForgotPassword: (email: string) =>
    Call<GeneralStatusResponse>(
      "/api/login/forgotpassword",
      {
        body: {
          email,
          company: 1,
        },
        method: "POST",
        checkAuth: false,
      },
    ),
};

export const getStorageHash = () =>
  window && window.sessionStorage.getItem("hash");
