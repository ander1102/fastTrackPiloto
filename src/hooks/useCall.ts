import { useState } from "react";
import { isEmpty } from "@app/common";
import useEffectAsync from "./useEffectAsync";
import useValueHandler, { ValueHandlerGet } from "./useValueHandler";
import useEventHandler, { EventHandlerEvents } from "./useEventHandler";
import { ContextManagerProps, Controller, _Object } from "@app/types";
import { execCall } from "@app/logic/app/hooks";
import { executeReturnedValue } from "@app/common/format";

const verifyObjectParams = <IParameters extends Parameters<any>>(
  params: IParameters | undefined
): params is IParameters =>
  Array.isArray(params) &&
  typeof params[0] === "object" &&
  !Array.isArray(params[0]);

const getPersistParams = <IParameters extends Parameters<any>>(
  originalParams: IParameters | undefined,
  currentParams: IParameters | undefined
): IParameters => {
  if (verifyObjectParams(originalParams) && verifyObjectParams(currentParams)) {
    const params1 = originalParams[0] as _Object;
    const params2 = currentParams[0] as _Object;
    return [{ ...params1, ...params2 }] as IParameters;
  } else return originalParams as IParameters;
};

export interface CallOptions<IParameters> extends ContextManagerProps {
  initialParams: IParameters;
  skipFistCall: boolean;
  setNullOnFailed: boolean;
  /**Si el parametro para el metodo `refresh` es un object body este hara un spread del nuevo objeto con el objeto original */
  persistParams: boolean;
}

type FilterItemFunc<IResult> = (item: IResult) => IResult;

interface Filter<IResult> {
  key: number;
  predicate: FilterItemFunc<IResult>;
  valueFiltered: any;
}

interface FilterKeys {
  current: number | null;
  prev: number | null;
}

type ItemEvents = "change" | "error";

export type ItemManager<IResult> = Pick<
  EventHandlerEvents<ItemEvents, IResult>,
  "addEventListenner" | "removeEventListenner" | "getEventList"
>;

export type SetFilter<IResult> = (
  key: number,
  newItemFunc: FilterItemFunc<IResult>,
  valueFiltered: any
) => void;

export type Refresh<IParameters> = (
  args?: IParameters extends (infer U)[] ? [Partial<U>] : IParameters
) => void;

const isValueFilteredNonEmpty = (value: any) =>
  value !== null && value !== undefined;

export interface UseCallResponse<
  IController extends Controller,
  IKey extends keyof IController,
  IResult extends Awaited<ReturnType<IController[IKey]>>["response"],
  IParameters extends Parameters<IController[IKey]>
> {
  item: IResult | null;
  isCalling: boolean;
  refresh: Refresh<IParameters>;
  setFilter: SetFilter<IResult>;
  itemManager: ItemManager<IResult>;
  originalItem: ValueHandlerGet<IResult | null>;
  isSuccess: ValueHandlerGet<boolean | null>;
  params: ValueHandlerGet<IParameters | undefined>;
}

/**Hook que devuelve el @see FetchResponse.response de una funcion `Call` de una coleccion de controladores del backend */
export default function useCall<
  IController extends Controller,
  IKey extends keyof IController,
  IResult extends Awaited<ReturnType<IController[IKey]>>["response"],
  IParameters extends Parameters<IController[IKey]>
>(
  controller: IController,
  control: IKey,
  options?:
    | Partial<CallOptions<IParameters>>
    | (() => Partial<CallOptions<IParameters>>)
): UseCallResponse<IController, IKey, IResult, IParameters> {
  const [item, setItem] = useState<IResult | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [filters, setFilters] = useValueHandler<Filter<IResult>[]>([]);
  const [count, setCount] = useValueHandler(0);
  const [filterKeys, setFilterKeys] = useValueHandler<FilterKeys>({
    current: null,
    prev: null,
  });
  const [params, setParams] = useValueHandler<IParameters | undefined>(() =>
    executeReturnedValue(executeReturnedValue(options)?.initialParams)
  );
  const [originalItem, setOriginalItem, methods] =
    useValueHandler<IResult | null>(null);
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null); // Este valor por si solo no actualiza el DOM, por lo que necesita de un Trigger para que pueda ver el estado actualizadp
  const itemEvent = useEventHandler<ItemEvents, IResult>();

  const itemManager: ItemManager<IResult> = {
    addEventListenner: itemEvent.addEventListenner,
    removeEventListenner: itemEvent.removeEventListenner,
    getEventList: itemEvent.getEventList,
  };

  const refresh: Refresh<IParameters> = (args) => {
    const op = executeReturnedValue(options);
    const final =
      op && op.persistParams
        ? getPersistParams(params(), args as IParameters)
        : args;
    setParams(final as IParameters);
    setUpdate((prev) => !prev);
  };

  const fetchResponse = async (
    func: IController[IKey],
    parameters: IParameters,
    options?: Partial<CallOptions<IParameters>>
  ) => {
    return await execCall(func, parameters, options);
  };

  const setFilter: SetFilter<IResult> = (
    key: number,
    newItemFunc: FilterItemFunc<IResult>,
    valueFiltered: any
  ) => {
    const currKeys = filterKeys();
    setFilterKeys({
      current: key,
      prev: currKeys.current,
    });
    const newFilter = filters().some((x) => x.key === key)
      ? filters().map((filter) => {
          if (filter.key === key)
            return { ...filter, predicate: newItemFunc, valueFiltered };
          return filter;
        })
      : filters().concat([{ key: key, predicate: newItemFunc, valueFiltered }]);
    setFilters(newFilter, onChangeFilters);
  };

  const onChangeFilters = (filters: Filter<IResult>[]) => {
    const currKeys = filterKeys();
    let originalItemCopy = methods.getDeepCopy();

    if (filters.length > 0 && originalItemCopy) {
      filters.forEach(
        (filt) =>
          (originalItemCopy = filt.predicate(originalItemCopy as IResult))
      );
      const empty = isEmpty(originalItemCopy);

      const currFilter = filters.find(
        (x) =>
          x.key === currKeys.current && isValueFilteredNonEmpty(x.valueFiltered)
      );
      setItem(
        !currFilter && empty
          ? originalItem()
          : filters.some(
              (x) =>
                x.key === currKeys.current &&
                isValueFilteredNonEmpty(x.valueFiltered)
            )
          ? originalItemCopy
          : originalItem()
      );
    }
  };

  useEffectAsync(async () => {
    const op = options instanceof Function ? options() : options;
    const prev = count();
    setCount((prev) => prev + 1);
    if (op && op.skipFistCall && prev === 0) return;
    const func = controller[control];
    if (typeof func !== "function") return;
    const args = params();
    setIsCalling(true);
    const parameters = Array.isArray(args) ? args : ([args] as IParameters);
    const response = await fetchResponse(func, parameters, op);
    const success = !!(
      response.isSuccess &&
      !response.error &&
      response.response
    );
    setIsSuccess(success);
    setIsCalling(false);
    if (success) {
      setItem(response.response);
      setOriginalItem(response.response);
      itemEvent.listen("change", response.response);
    } else if (!success && op && op.setNullOnFailed) {
      setItem(null);
      setOriginalItem(null);
      itemEvent.listen("error", null as IResult);
    }
  }, [update]);

  return {
    item,
    isCalling,
    refresh,
    setFilter,
    itemManager,
    originalItem,
    isSuccess,
    params,
  };
}
