import { CacheConfig, NamedResource, Resource } from "@app/types/Cache";
import { ResourceComponentManager } from "./manager";

export function createCacheResorceComponentManager() {
  let instance: ResourceComponentManager | undefined = undefined;
  let queue: ((instance: ResourceComponentManager) => void)[] = [];

  const processQueue = () => {
    while (instance && queue.length > 0) {
      const value = queue.pop();
      if (value) value(instance);
    }
  };

  const handleRef = (x: ResourceComponentManager) => {
    instance = x;
    processQueue();
  };

  const Component = () => <ResourceComponentManager ref={handleRef} />;

  const cacheResource = <T extends Resource<string>, TName extends string>(
    name: TName,
    resource: T,
    resourceConf: CacheConfig<Extract<keyof T, string>>
  ): NamedResource<T, TName> => {
    const cacheRet = instance?.cacheResource(name, resource, resourceConf);
    processQueue();
    return cacheRet || ({} as NamedResource<T, TName>);
  };

  return {
    Component,
    cacheResource,
  };
}
