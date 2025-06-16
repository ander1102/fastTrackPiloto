import { tryParseJSON } from "@app/common";
import { FetchQuery, getQueryParams } from "@app/common/fetch";
import {
  createFromCallbackObject,
  executeReturnedValue,
} from "@app/common/format";
import { ObjectCallbacks } from "@app/types";
import { useCallback, useEffect, useState } from "react";
import { IClientConfig, IMessageEvent, w3cwebsocket } from "websocket";
import useEventHandler from "./useEventHandler";
import useValueHandler from "./useValueHandler";

type ItemEvents = "change";

interface ItemManager<IResult> {
  addEventListenner: (
    events: ItemEvents,
    callback: (value: IResult) => void
  ) => void;
  removeEventListenner: (events: ItemEvents) => void;
}

export interface WS_URLOptions {
  base: string;
  queryParams?: FetchQuery;
  subRoutes?: string[];
}

interface Options<IData> {
  protocols: string | string[];
  origin: string;
  headers: NodeJS.Dict<number | string | string[]>;
  requestOptions: object;
  IClientConfig: IClientConfig;
  update: (prev: IData, next: IData) => boolean;
  onGetMessage: (
    client: w3cwebsocket,
    message: IMessageEvent["data"]
  ) => boolean;
}

export type WS_Options<IData> = Partial<Options<IData>>;

const initial = <IData>(
  URLOptions: WS_URLOptions,
  WSOptions?: WS_Options<IData>
) => {
  const finalUrl = `${URLOptions.base}${
    URLOptions.subRoutes ? "/" + URLOptions.subRoutes.join("/") : ""
  }${URLOptions.queryParams ? getQueryParams(URLOptions.queryParams) : ""}`;
  return new w3cwebsocket(
    finalUrl,
    WSOptions?.protocols,
    WSOptions?.origin,
    WSOptions?.headers,
    WSOptions?.requestOptions,
    WSOptions?.IClientConfig
  );
};

export default function useWSClient<IData>(
  URLOptions: WS_URLOptions | (() => WS_URLOptions),
  WSOptions?: WS_Options<IData> | (() => WS_Options<IData>)
) {
  const [data, setData] = useState<IData | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [update, setUpdate] = useState(0);
  const [originalData, setOriginalData] = useValueHandler<IData | null>(null);
  const [URL_Options, setURL_Options] = useValueHandler<WS_URLOptions>();
  const [WS_Options, setWS_Options] = useValueHandler<
    WS_Options<IData> | undefined
  >();
  const [client, setClient] = useValueHandler<w3cwebsocket>();
  const [isClosed, setIsClosed] = useValueHandler(false);
  const itemEvent = useEventHandler<ItemEvents, IData>();

  const itemManager: ItemManager<IData> = {
    addEventListenner: itemEvent.addEventListenner,
    removeEventListenner: itemEvent.removeEventListenner,
  };

  const connect = useCallback(() => {
    const url_options = URL_Options();
    const ws_options = WS_Options();

    if (!client() || !url_options || !ws_options)
      throw new Error(
        "El método connect() esta siendo llamado antes de declarar la instancia de W3Socket"
      );

    if (isClosed()) {
      setClient(initial(url_options, ws_options));
      setIsClosed(false);
    }
    const cl = client();
    cl.onopen = () => {
      setIsCalling(true);
    };
    cl.onmessage = (message: IMessageEvent) => {
      const m = message.data;
      if (ws_options?.onGetMessage && ws_options.onGetMessage(cl, m)) return;

      const client_data = tryParseJSON<IData>(m as string);
      if (!client_data.isSuccess || typeof client_data.result === "string")
        return;
      setData((prev) => {
        const final =
          prev &&
          ws_options?.update &&
          !ws_options.update(prev, client_data.result as IData)
            ? (client_data.result as IData)
            : (client_data.result as IData);
        return final;
      });
      setOriginalData(client_data.result as IData);
      setIsCalling((prev) => (prev ? false : prev));
    };
  }, []);

  useEffect(() => {
    const prev = originalData();
    if (!data || !prev) return;
    const ws_options = WS_Options();
    const update = ws_options?.update && !ws_options.update(data, prev);
    if (update) itemEvent.listen("change", data);
  }, [data]);

  const disconnect = useCallback(() => {
    const _client = client();
    if (!isClosed() && _client) {
      _client.close();
      setIsClosed(true);
    }
  }, []);

  const refreshParams = (
    url_options: ObjectCallbacks<WS_URLOptions>,
    ws_options?: ObjectCallbacks<WS_Options<IData>>
  ) => {
    const finalURLOptions = createFromCallbackObject(
      url_options,
      URL_Options()
    );
    const finalWSOptions =
      ws_options &&
      createFromCallbackObject(ws_options, WS_Options() as WS_Options<IData>);
    setURL_Options(finalURLOptions);
    setWS_Options(finalWSOptions);
    const cl = client();
    if (cl) cl.close();
    setClient(initial(finalURLOptions, finalWSOptions));
    setUpdate((prev) => prev + 1);
  };

  const setInitialWSValues = () => {
    const url_options = executeReturnedValue(URLOptions);
    const ws_options = executeReturnedValue(WSOptions);
    setURL_Options(url_options);
    setWS_Options(ws_options);
    setClient(initial(url_options, ws_options));
  };

  useEffect(() => {
    if (update === 0) setInitialWSValues();
    connect();

    return () => {
      disconnect();
    };
  }, [update]);

  return {
    data,
    isCalling,
    itemManager,
    originalData,
    connect,
    disconnect,
    isClosed,
    refreshParams,
  };
}
