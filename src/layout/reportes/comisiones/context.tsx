import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { DateFormat, executeReturnedValue } from "@app/common/format";
import useValueHandler from "@app/hooks/useValueHandler";
import {
  ReportCallback,
  ReportChildrenProps,
  ReportEvents,
  ReportResponseEvents,
} from "@app/types/Reports";
import useEventHandler from "@app/hooks/useEventHandler";
import { ReportResumeConstants } from "@app/constants/reports";

export interface ComissionReportFilter {
  entity: any;
  dateStart: Date;
  dateEnd: Date;
}

const GET_INITIAL = (): ComissionReportFilter => {
  const start = new Date();
  start.setDate(
    start.getDate() +
      1 -
      ReportResumeConstants.QUICK_DATE_DAYS[
        ReportResumeConstants.LAST_DAYS.MID_MONTH
      ]
  );
  return {
    entity: 0,
    dateStart: DateFormat.day.start(start).value,
    dateEnd: DateFormat.day.end(new Date()).value,
  };
};

export const ReportComissionContext = createContext(
  undefined as unknown as ReportChildrenProps<ComissionReportFilter>
);

const REQUESTS = 2;

export const ComissionReportProvider = ({ children }: PropsWithChildren) => {
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

  const onChange = <IKey extends keyof ComissionReportFilter>(
    key: IKey,
    newValue: ComissionReportFilter[IKey]
  ) => {
    successEvent.listen("loading", undefined);
    setFilter((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const onChangeByObj = (newObj: Partial<ComissionReportFilter>) => {
    successEvent.listen("loading", undefined);
    setFilter((prev) => ({
      ...prev,
      ...newObj,
    }));
  };

  return (
    <ReportComissionContext.Provider
      value={{ filter, onChange, successListenner, onChangeByObj }}
    >
      {children}
    </ReportComissionContext.Provider>
  );
};
