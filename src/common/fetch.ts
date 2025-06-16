import { DEFAULT_TOAST_CONFIGURATION, excludePaths } from "@app/constants";
import { getUserContext } from "@app/context";
import { AppLogic } from "@app/logic/app";
import { toast } from "react-toastify";
import { deepParseJson, isClientSide } from ".";

interface ErrorType {
  fatal?: boolean;
  message: string;
}

interface FetchError {
  error?: ErrorType;
}

export interface FetchClientResponse<IResponse> extends FetchError {
  mensaje?: any;
  response: IResponse;
  isSuccess?: boolean;
  status: number;
  expire?: boolean;
}


export interface FetchResponse<IResponse> extends FetchError {
  isSuccess?: boolean;
  response: IResponse;
  status: number;
}

export type FetchQuery = {
  [k: string]: string | number | string[] | undefined;
};

interface CallOptions {
  body: { [k: string]: any };
  querybody: FetchQuery;
  headers: HeadersInit;
  method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "PATCH";
  parse: boolean;
  setError: (resppnse: any) => boolean;
  checkAuth: boolean;
  type?: "text" | "arrayBuffer" | "json";
}

export const getQueryParams = <T extends FetchQuery>(obj: T) =>
  "?" +
  Object.entries(obj)
    .map((obj) => `${obj[0]}=${obj[1]}`)
    .join("&");

export async function Call<IResponse = string>(
  endpoint: string,
  params?: Partial<CallOptions>,
  externalUrl?: string
): Promise<FetchClientResponse<IResponse>> {
  try {
    const url = `${externalUrl ?? ""}${endpoint}${
      params?.querybody ? getQueryParams(params.querybody) : ""
    }`;
    const call = await fetch(url, {
      method: params?.method,
      body: params?.body && JSON.stringify(params.body),
      headers: {
        "Content-Type": "application/json",
        ...(params?.headers ?? {}),
      },
    });

    const conversion = await call[params?.type ?? "text"]();
    if (call.status === 200) {
      const response =
        params?.parse || (params?.type && params?.type !== "text")
          ? conversion
          : (deepParseJson<IResponse>(conversion) as IResponse);
      const final = !externalUrl
        ? (response as unknown as FetchClientResponse<any>).response
        : response;
      const customError = params?.setError && params.setError(final);
      return {
        isSuccess: !customError,
        response: customError ? null : final,
        error: customError
          ? new Error("Error")
          : (response as unknown as FetchClientResponse<any>)?.error,
        status: call.status,
        expire: !externalUrl
          ? (response as unknown as FetchClientResponse<any>)?.expire
          : undefined,
      };
    }

    // En este punto evalua si la llamada devuelve un 401 lo que significa que la sesion ha expirado
    if (
      params &&
      (params.checkAuth ?? true) &&
      isClientSide() &&
      call.status === 401
    ) {
      const { router, ...ctx } = getUserContext();
      if (!excludePaths.some((x) => x === router.pathname)) {
        toast.error("Ha expirado la sesión", DEFAULT_TOAST_CONFIGURATION);
        AppLogic.Logout(ctx, router);
      }
    }

    return {
      isSuccess: false,
      response: null as unknown as IResponse,
      status: call.status,
      expire: call.status === 401,
    };
  } catch (error) {
    return {
      isSuccess: false,
      response: null as unknown as IResponse,
      error: error as Error,
      status: 500,
      expire: false,
    };
  }
}
