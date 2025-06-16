import {
  EventHandlerRegister,
  RegisterComponentManager,
  type ComponentRegister,
  type Status,
} from "./manager";

type Register = (entry: ComponentRegister) => void;
type ChangeStatus = (key: string, status: Status) => void;
type GetComponentHandler = (key: string) => EventHandlerRegister | undefined;
type GetComponentDetails = (key: string) => ComponentRegister | undefined;

export interface RegisterManager {
  component: () => JSX.Element;
  registerComponent: Register;
  changeStatus: ChangeStatus;
  getComponentHandler: GetComponentHandler;
  getComponentDetails: GetComponentDetails;
}

export function createRegisterComponentManager(): RegisterManager {
  let instance: RegisterComponentManager | undefined = undefined;
  let queue: ((instance: RegisterComponentManager) => void)[] = [];

  const processQueue = () => {
    while (instance && queue.length > 0) {
      const value = queue.pop();
      if (value) value(instance);
    }
  };

  const handleRef = (x: RegisterComponentManager) => {
    instance = x;
    processQueue();
  };

  const component = () => <RegisterComponentManager ref={handleRef} />;

  const registerComponent: Register = (entry) => {
    queue.push((i) => i.registerComponent(entry));
    processQueue();
  };

  const changeStatus: ChangeStatus = (key, status) => {
    queue.push((i) => i.changeStatus(key, status));
    processQueue();
  };

  const getComponentDetails = (key: string) => {
    const comp = instance?.getComponentDetails(key);
    processQueue();
    return comp;
  };

  const getComponentHandler: GetComponentHandler = (key) => {
    const handler = instance?.getComponentHandler(key);
    processQueue();
    return handler;
  };

  return {
    component,
    changeStatus,
    registerComponent,
    getComponentHandler,
    getComponentDetails,
  };
}

export const register = createRegisterComponentManager();
