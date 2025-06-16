import { ValueHandler } from "@app/common/classes/ValueHandler";
import { executeReturnedValue } from "@app/common/format";
import { useCallback, useImperativeHandle, useMemo, useRef } from "react";

type Value<IValue> = IValue | (() => IValue);

type ValueSetter<IValue> = IValue | ((prev: IValue) => IValue);

export type ValueHandlerGet<IValue> = () => IValue;

export type ValueHandlerSet<IValue> = (
  value: ValueSetter<IValue>,
  cb?: (newValue: IValue) => void
) => void;

export type ValueHandlerResult<IValue> = [
  ValueHandlerGet<IValue>,
  ValueHandlerSet<IValue>,
  ValueHandlerMethods<IValue>
];

export type ValueMethods<IValue> = Omit<
  ValueHandler<IValue>,
  "get" | "set" | "value"
>;
type ValueHandlerMethods<IValue> = ValueMethods<IValue>;

const _initial = <IValue>(initial?: Value<IValue>) =>
  new ValueHandler(executeReturnedValue(initial));
/**Hook que maneja un estado interno sin controlar. A diferencia de `React.useState` este hook no actualiza el componente
 * si no que guarda su estado por medio de una referencia que no cambia durante el lifecycle.
 */
export default function useValueHandler<IValue>(
  initial?: Value<IValue>
): ValueHandlerResult<IValue> {
  const value = useRef<ValueHandler<IValue>>();

  //Se cambia a useImperativeHandle ya que se ejecuta antes que un effect
  useImperativeHandle(
    value,
    () => _initial(initial) as ValueHandler<IValue>,
    []
  );

  const get = useCallback(() => value.current?.get() as IValue, []);

  const set = useCallback(
    (newValue: ValueSetter<IValue>, cb?: (value: IValue) => void) => {
      const final = executeReturnedValue(newValue, value.current?.get());

      value.current?.set(final);
      if (cb) cb(final);
    },
    []
  );

  const getDeepCopy = () => value.current?.getDeepCopy() as IValue;

  const methods = useMemo(() => ({ getDeepCopy }), []);

  return [get, set, methods];
}
