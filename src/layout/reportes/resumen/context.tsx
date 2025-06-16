import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  AMOUNT_REPORT_TYPE,
  ReportCallback,
  ReportChildrenProps,
  ReportEvents,
  ReportResponseEvents,
} from "@app/types/Reports";
import { DateFormat, executeReturnedValue } from "@app/common/format";
import useValueHandler from "@app/hooks/useValueHandler";
import useEventHandler from "@app/hooks/useEventHandler";
import { ReportResumeConstants } from "@app/constants/reports";
import { TRANSACTION_PRODUCT } from "@app/types/Transactions";

export interface ResumeReportFilter {
  entity: any;
  suc? : number;
  dateStart: Date;
  dateEnd: Date;
  zone: string;
  card: string;
  amountType: AMOUNT_REPORT_TYPE;
  transactionType: TRANSACTION_PRODUCT | "";
  origen: string;
}

const GET_INITIAL = (): ResumeReportFilter => {
  const start = new Date();
  start.setDate(
    start.getDate() +
      1 -
      ReportResumeConstants.QUICK_DATE_DAYS[
        ReportResumeConstants.LAST_DAYS.MID_MONTH
      ]
  );
  return {
    entity: "",
    suc:0,
    dateStart: DateFormat.day.start(start).value,
    dateEnd: DateFormat.day.end(new Date()).value,
    card: "",
    zone: "",
    amountType: AMOUNT_REPORT_TYPE.ENTITY,
    transactionType: "",
    origen: "",
  };
};

export const ReportResumeContext = createContext(
  undefined as unknown as ReportChildrenProps<ResumeReportFilter>
);

const REQUESTS = 3;

export const ResumeReportProvider = ({ children }: PropsWithChildren) => {
  const [filter, setFilter] = useState(() => GET_INITIAL());
  const [_, setSuccessRequest] = useValueHandler(0);
  const [successCbs, setSuccessCbs] = useValueHandler<ReportCallback[]>([]);
  const [loadingCbs, setLoadingCbs] = useValueHandler<ReportCallback[]>([]);
  const successEvent = useEventHandler<ReportEvents>();

  const onSuccess = (curr: number) => {
    if (curr !== REQUESTS) return;
    setSuccessRequest(0);
    successEvent.listen("success", undefined);
  };

  const requestSuccess = () => {
    setSuccessRequest((prev) => prev + 1, onSuccess);
  };

  const setSuccessCb = (id: string, cb: () => void) => {
    setSuccessCbs((prev) => {
      if (prev.some((x) => x.id === id))
        return prev.map((x) => {
          if (x.id === id) return { id, cb };
          return x;
        });
      return prev.concat([{ id, cb }]);
    });
  };
  const setLoadingCb = (id: string, cb: () => void) => {
    setLoadingCbs((prev) => {
      if (prev.some((x) => x.id === id))
        return prev.map((x) => {
          if (x.id === id) return { id, cb };
          return x;
        });
      return prev.concat([{ id, cb }]);
    });
  };

  useEffect(() => {
    successEvent.addEventListenner("success", () => {
      successCbs().forEach((x) => executeReturnedValue(x.cb));
    });

    successEvent.addEventListenner("loading", () => {
      loadingCbs().forEach((x) => executeReturnedValue(x.cb));
    });

    return () => {
      successEvent.clearAll();
    };
  }, []);

  const successListenner: ReportResponseEvents = {
    requestSuccess,
    setSuccessCb,
    setLoadingCb,
  };

  const onChange = <IKey extends keyof ResumeReportFilter>(
    key: IKey,
    newValue: ResumeReportFilter[IKey]
  ) => {
    successEvent.listen("loading", undefined);
    setFilter((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const onChangeByObj = (newObj: Partial<ResumeReportFilter>) => {
    successEvent.listen("loading", undefined);
    setFilter((prev) => ({
      ...prev,
      ...newObj,
    }));
  };

  return (
    <ReportResumeContext.Provider
      value={{ filter, onChange, successListenner, onChangeByObj }}
    >
      {children}
    </ReportResumeContext.Provider>
  );
};
