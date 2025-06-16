import { Call } from "@app/common/fetch";
import { Country, Giro } from "@app/types/Categories";

import { getTokenBearer } from "./middlewares";
import { COUNTRY_REST_API } from "@app/constants";
import { TerminalType } from "@app/types/Terminal";

export const CategoriesControllers = {
  getGiro: () =>
    Call<Giro[]>("/api/cat/get/giro", {
      headers: getTokenBearer(),
      checkAuth: false,
    }),
  getCountries: () =>
    Call<Country[]>(
      "/all",
      {
        headers: getTokenBearer(),
        checkAuth: false,
      },
      COUNTRY_REST_API
    ),
  getTerminalType: () =>
    Call<TerminalType[]>("/api/cat/get/terminal", {
      headers: getTokenBearer(),
      checkAuth: false,
    }),
};
