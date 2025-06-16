import { FetchClientResponse, FetchResponse } from "@app/common/fetch";
import CryptoJS from "crypto-js";
import { NextApiResponse } from "next";

export const getFinalHash = (email: string, hash: string, password: string) => {
  const key = CryptoJS.enc.Utf8.parse(hash + password);
  const message = CryptoJS.enc.Utf8.parse(email);
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, key));
};
export const hashUpdatePwd =(hash: string, password: string) => {
  return CryptoJS.AES.encrypt(password, hash);
}

export const getFinalLoginHash = (hash: string): string => {
  const base64Url = hash.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const parsed = JSON.parse(Buffer.from(base64, "base64").toString("binary"));
  return parsed.unique_name;
};

export const clientJSONReponse = <IClientResult, IResult>(
  Response: FetchResponse<IResult>,
  defaultRes: any,
  extract?: (item: IResult) => IClientResult
): FetchClientResponse<IClientResult> => {
  if (!Response.isSuccess) {
    return {
      ...Response,
      response: defaultRes as IClientResult,
    };
  }
  return {
    ...Response,
    response:
      extract && Response.response
        ? extract(Response.response)
        : (Response.response as unknown as IClientResult),
  };
};

export const authJSONResponse = <IResult, IClientResult>(
  res: NextApiResponse<FetchClientResponse<IClientResult>>,
  Response: FetchResponse<IResult>,
  defaultRes: any,
  extract?: (item: IResult) => IClientResult
) => {
  const expire = Response.status === 401;
  const json = clientJSONReponse(Response, defaultRes, extract);

  res.status(setStatusRepsonse(json)).json({ ...json, expire });
};

export const setStatusRepsonse = <IResult>(Response: FetchResponse<IResult>) =>
  Response.status ?? 304;
