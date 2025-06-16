import { Call } from "@app/common/fetch";
import { AGREGADOR_API_URL } from "@app/constants";
import {
  IPostTransactionEmail,
  IPostTransactionRefund,
  IPostTransactionReverse,
} from "@app/types/Resume";
import { getTokenBearer } from "./middlewares";

export const ResumeControllers = {

  postTransactionEmail: (body: IPostTransactionEmail) =>
    Call<any>("/api/resume/post", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),

  postTransactionRefund: (body: IPostTransactionRefund) =>
    Call<any>("/api/resume/post/refund", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  postTransactionReverse: (body: IPostTransactionReverse) =>
    Call<any>("/api/resume/post/reverse", {
      method: "POST",
      body,
      headers: getTokenBearer(),
    }),
  

};
