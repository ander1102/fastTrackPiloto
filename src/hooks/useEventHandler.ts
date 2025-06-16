import { EventHandler, EventsList } from "@app/common/classes/EventHandler";
import { useImperativeHandle, useRef } from "react";

const getId = (event: string) => `_${event}`;

export interface EventHandlerEvents<IEvents, IValue> {
  addEventListenner: (event: IEvents, fn: (value: IValue) => void) => void;
  removeEventListenner: (event: IEvents) => void;
  listen: (event: IEvents, value: IValue) => void;
  listenAll: () => void;
  clearAll: () => void;
  getEventList: () => EventsList<IValue>[] | undefined;
}

/**Hook que genera un eventHandler donde se pueden suscribir callbacks en distintos eventos */
export default function useEventHandler<
  IEvents extends string,
  IValue = any
>(): EventHandlerEvents<IEvents, IValue> {
  const eventHandler = useRef<EventHandler<IValue>>();

  //Se cambia a useImperativeHandle ya que se ejecuta antes que un effect
  useImperativeHandle(eventHandler, () => new EventHandler<IValue>(), []);

  const addEventListenner = (event: IEvents, fn: (value: IValue) => void) => {
    const id = getId(event);
    if (eventHandler.current?.isSuscribed(id)) return;
    eventHandler.current?.suscribe((value) => fn(value as IValue), id);
  };

  const getEventList = () => eventHandler.current?.getEventList();

  const removeEventListenner = (event: IEvents) => {
    const id = getId(event);
    eventHandler.current?.clear(id);
  };

  const listen = (event: IEvents, value: IValue) => {
    const id = getId(event);
    eventHandler.current?.setSelectedId(id);
    eventHandler.current?.listen(value);
  };

  const listenAll = () => {
    eventHandler.current?.listenAll();
  };

  const clearAll = () => {
    eventHandler.current?.clearAll();
  };

  return {
    addEventListenner,
    removeEventListenner,
    listen,
    listenAll,
    clearAll,
    getEventList,
  };
}
