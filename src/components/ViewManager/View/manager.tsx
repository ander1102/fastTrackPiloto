import React from "react";
import {
  type ViewComponentProps,
  type Entry,
  type ViewProps,
  ViewMainComponent,
} from "./comp";
import { register } from "../Controlled/create";
import { Sleep } from "@app/common";
import { Log } from "@app/common/log";

export interface ShowFunc {
  <TResult>(
    render: React.ComponentType<ViewProps<TResult>>,
    context?: string
  ): Promise<TResult>;
  <TProps>(
    render: React.ComponentType<TProps>,
    props?: Omit<TProps, keyof ViewProps<any>>,
    context?: string
  ): Promise<TProps extends ViewProps<infer TResult> ? TResult : unknown>;
}

export type ShowToastFunc<TProps> = (
  render: React.ComponentType<TProps>,
  props?: Omit<TProps, keyof ViewProps<any>>
) => void;

export interface ViewSyncStartOptions {
  delay: number;
}

export interface ViewSyncResult<IResult> {
  start: (options?: Partial<ViewSyncStartOptions>) => void;
  /**Cierra el modal instanciado, devolviendo el resultado que previamente
   * fue seteado con la llamada @see `onClose` en caso de no ser llamado
   * devolvera undefined, si el modal fue previamente cerrado la funcion no
   * tendrá efecto
   */
  close: () => IResult;
}

export interface ShowFuncSync {
  <TResult>(
    render: React.ComponentType<ViewProps<TResult>>,
    context?: string
  ): ViewSyncResult<TResult>;
  <TProps>(
    render: React.ComponentType<TProps>,
    props?: Omit<TProps, keyof ViewProps<any>>,
    context?: string
  ): TProps extends ViewProps<infer TResult>
    ? ViewSyncResult<TResult>
    : ViewSyncResult<unknown>;
}

export type ConditionView = (x: Entry) => boolean;

let VIEW_CONTEXT_ID = 0;
let VIEW_CONTEXT_ID_SYNC = 0;

export class ViewManagerComponent extends React.PureComponent<
  {},
  ViewComponentProps
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      views: [],
      nextId: 0,
    };
  }

  show = (
    render: React.ComponentType<ViewProps>,
    props: {},
    context?: string
  ): PromiseLike<any> => {
    return new Promise((resolve) => {
      const currId = this.state.nextId;

      const entry: Entry = {
        id: currId,
        render: render,
        props: {
          onClose: this.handleClose(currId, resolve),
          ...(props || {}),
        },
      };

      this.startModal(entry, resolve, context);
    });
  };

  showSync = (
    render: React.ComponentType<ViewProps>,
    props: {},
    context?: string
  ): ViewSyncResult<any> => {
    const currId = this.state.nextId;
    let result: any;

    const entry: Entry = {
      id: currId,
      render: render,
      props: {
        ...(props || {}),
        onClose: (res) => {
          result = res;
        },
      },
    };

    return {
      start: (options) => {
        if (!options?.delay) return this.startModalSync(entry, result, context);
        Sleep(options.delay).then(() =>
          this.startModalSync(entry, result, context)
        );
      },
      close: this.handleCloseSync(entry.id, result),
    };
  };

  private startModal = (
    entry: Entry,
    resolve: (value: any) => void,
    context?: string
  ) => {
    if (context) {
      const componentDetails = register.getComponentDetails(context);
      const handler = register.getComponentHandler(context);
      if (
        componentDetails &&
        componentDetails.status === "mounted" &&
        handler
      ) {
        this.addEntry(entry);
        const context_id = `${context}_${++VIEW_CONTEXT_ID}`;
        handler.event.suscribe(() => {
          Log.debug.log("suscribe");
          this.handleClose(entry.id, resolve)(undefined);
        }, context_id);
        handler.event.setSelectedId(context_id);
      } else {
        Log.debug.warn(
          "No se puede renderizar este modal porque el componente anclado al context no esta disponible en el React Tree"
        );
        resolve(undefined);
      }
    } else {
      this.addEntry(entry);
    }
  };

  private startModalSync = (entry: Entry, result?: any, context?: string) => {
    if (context) {
      const componentDetails = register.getComponentDetails(context);
      const handler = register.getComponentHandler(context);
      if (
        componentDetails &&
        componentDetails.status === "mounted" &&
        handler
      ) {
        this.addEntry(entry);
        const context_id = `${context}_sync_${++VIEW_CONTEXT_ID_SYNC}`;
        handler.event.suscribe(() => {
          Log.debug.log("suscribe");
          this.handleCloseSync(entry.id, result)();
        }, context_id);
        handler.event.setSelectedId(context_id);
      } else {
        Log.debug.warn(
          "No se puede renderizar este modal porque el componente anclado al context no esta disponible en el React Tree"
        );
      }
    } else {
      this.addEntry(entry);
    }
  };

  removeAllEntries = () => {
    this.removeAll();
  };

  private removeAll = () => {
    if (this.state.views.length === 0) return;
    this.setState(() => ({ views: [] }));
  };

  removeSomeEntries = (condition: ConditionView) => {
    if (this.state.views.length === 0) return;
    this.setState((prev) => ({ views: prev.views.filter(condition) }));
  };

  private addEntry = (entry: Entry) => {
    this.setState((prev) => ({
      views: prev.views.concat(entry),
      nextId: prev.nextId + 1,
    }));
  };

  private removeEntry = (id: number) => {
    this.setState((prev) => ({
      views: prev.views.filter((view) => view.id !== id),
    }));
  };

  private handleClose =
    (id: number, resolve: (result: any) => void) => (result: any) => {
      resolve(result);

      this.removeEntry(id);
    };

  private handleCloseSync = (id: number, result: any) => () => {
    this.removeEntry(id);
    return result;
  };

  render() {
    return <ViewMainComponent {...this.state} />;
  }
}
