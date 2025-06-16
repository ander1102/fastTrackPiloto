import { UserContextProps } from "@app/context";
import { User } from "@app/types/User";
import { NextRouter } from "next/router";

const Logout = (ctx: UserContextProps, router: NextRouter) => {
  window.sessionStorage.removeItem("hash");
  window.sessionStorage.removeItem("email");
  ctx.setUser({} as User);
  router.push("/");
};

export const AppLogic = {
  Logout,
};
