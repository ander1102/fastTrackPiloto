import {
  ShowFunc,
  ShowFuncSync,
  ViewManagerComponent,
  ConditionView,
} from "./manager";
import { ViewProps } from "./comp";
import { register } from "../Controlled/create";

const { component: RegisterComponent } = register;

interface ComponentProps {
  context?: boolean;
}

export interface ViewManager {
  component: (props: ComponentProps) => JSX.Element;
  show: ShowFunc;
  showSync: ShowFuncSync;
  removeAllEntries: () => void;
  removeSomeEntries: (condition: ConditionView) => void;
}

let i = 0;
/**Metodo que genera un compomponente que sirve para renderizar un arreglo de componentes dentro de su propio estado
 * el componente llama al metodo asincrono @see `show` para agregar un nuevo objeto que recive como parametros el
 * componente jsx que va a renderizar como componente, y las props que recibe el componente, cada metodo hereda
 * una propiedad @see `onClose` que al llamarse elimina el componente del estado devolviendo un resultado
 */
export function createViewManager(): ViewManager {
  let instance: ViewManagerComponent | undefined = undefined;
  let queue: ((instance: ViewManagerComponent) => void)[] = [];

  const processQueue = () => {
    while (instance && queue.length > 0) {
      const value = queue.pop();
      if (value) value(instance);
    }
  };

  const handleRef = (x: ViewManagerComponent) => {
    instance = x;
    processQueue();
  };

  const component = ({ context }: ComponentProps) => {
    if (context)
      return (
        <>
          <RegisterComponent />
          <ViewManagerComponent ref={handleRef} />
        </>
      );
    return <ViewManagerComponent ref={handleRef} />;
  };
  const show: ShowFunc = (
    render: React.ComponentType<ViewProps>,
    props?: any,
    context?: string
  ) => {
    return new Promise((resolve) => {
      queue.push((i) => i.show(render, props, context).then((x) => resolve(x)));
      processQueue();
    });
  };

  const showSync: ShowFuncSync = (
    render: React.ComponentType<ViewProps>,
    props?: any,
    context?: string
  ) => {
    if (instance) {
      const value = instance.showSync(render, props, context);
      queue = [];
      return value;
    }
    return { close: () => {}, start: () => {} };
  };

  const removeAllEntries: () => void = () => {
    if (instance) {
      instance.removeAllEntries();
      queue = [];
    }
  };

  const removeSomeEntries = (condition: ConditionView) => {
    if (instance) {
      instance.removeSomeEntries(condition);
      queue = [];
    }
  };

  return { component, show, removeAllEntries, removeSomeEntries, showSync };
}
