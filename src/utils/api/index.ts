import cors, { CorsOptions, CorsOptionsDelegate } from "cors";
import { NextApiRequest, NextApiResponse } from "next";

export const initCors = (
  req: NextApiRequest,
  res: NextApiResponse,
  options?: CorsOptions | CorsOptionsDelegate
) =>
  new Promise((resolve, reject) => {
    cors(options)(req, res, (res: Error | unknown) => {
      if (res instanceof Error) return reject(res);

      return resolve(res);
    });
  });
