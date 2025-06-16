import { CacheResourceProvider } from "@app/context/CacheResource";
import { createCacheResorceComponentManager } from "./create";

const CacheResourceManager = createCacheResorceComponentManager();

export const cacheResource = CacheResourceManager.cacheResource;

export const CacheResourceComponent = () => {
  return (
    <CacheResourceProvider>
      <CacheResourceManager.Component />
    </CacheResourceProvider>
  );
};
