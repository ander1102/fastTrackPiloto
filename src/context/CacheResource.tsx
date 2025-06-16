import { emptyFunctionCache } from "@app/constants/cache";
import {
  AppCacheAction,
  CacheEntry,
  CacheResource,
  CacheResourceConfig,
  CacheState,
  FunctionCache,
  FunctionCacheAction,
  JSONValue,
  ResourceCacheAction,
} from "@app/types/Cache";
import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

interface CacheContextProps {
  getState: () => CacheState;
  dispatch: Dispatch<AppCacheAction>;
}

const CACHE_INITIAL = {} as CacheState;

const INITIAL_CACHE_CONTEXT: CacheContextProps = {
  getState: () => CACHE_INITIAL,
  dispatch: (value) => {},
};

export const CacheContext = createContext(INITIAL_CACHE_CONTEXT);

export const errorFunctionCache: (err: Error) => FunctionCache = (err) => ({
  entries: [],
  error: err,
});

export function setCacheEntry(
  cache: FunctionCache,
  config: CacheResourceConfig,
  entry: CacheEntry
): FunctionCache {
  const index = cache.entries.findIndex((x) => x.args === entry.args);
  if (index !== -1) {
    return {
      entries: cache.entries.map((x, i) => (i === entry.id ? entry : x)),
    };
  }

  return {
    entries: [entry, ...cache.entries.slice(0, config.maxSize - 1)],
  };
}

export function setExistingCacheEntryByIndex(
  cache: FunctionCache,
  index: number,
  getNewEntry: (old: CacheEntry) => CacheEntry
): FunctionCache {
  if (index < 0 || index >= cache.entries.length) {
    throw new Error("Indice fuera de rango");
  }
  return {
    entries: cache.entries.map((x, i) => (i === index ? getNewEntry(x) : x)),
  };
}

export function CacheFuncReducer(
  cache: FunctionCache,
  action: FunctionCacheAction
): FunctionCache {
  switch (action.type) {
    case "clear":
      return emptyFunctionCache;
    case "error":
      return errorFunctionCache(action.payload.error);
    case "setEntry":
      return setCacheEntry(cache, action.payload.config, action.payload.entry);
    case "resolvePromise":
      return setExistingCacheEntryById(cache, action.payload.id, (x) => ({
        ...x,
        value: {
          ...x.value,
          payload: action.payload.value,
        },
      }));

    default:
      return cache;
  }
}

export function setExistingCacheEntryById(
  cache: FunctionCache,
  id: number,
  getNewEntry: (old: CacheEntry) => CacheEntry
): FunctionCache {
  const index = cache.entries.findIndex((x) => x.id === id);
  if (index === null || index === undefined) return cache;
  return setExistingCacheEntryByIndex(cache, index, getNewEntry);
}

export const cacheReducer = <T,>(
  cache: CacheResource<T>,
  action: ResourceCacheAction<Extract<keyof T, string>>
) => {
  switch (action.type) {
    case "clear":
      return {};
    case "func":
      return {
        ...cache,
        [action.payload.func]: CacheFuncReducer(
          (cache[action.payload.func] || {})!,
          action.payload.action
        ),
      };
  }
};

const reducer = (state: CacheState, action: AppCacheAction): CacheState => {
  switch (action.type) {
    case "clearRec":
      return CACHE_INITIAL;
    case "clearRec":
      return state;
    case "resource":
      return {
        ...state,
        [action.payload.resource]: {
          cache: {},
          depends: action.payload.depends,
        },
      };
    default:
      return state;
  }
};

export const CacheResourceProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, {} as CacheState);

  const getState = () => state;

  return (
    <CacheContext.Provider value={{ getState, dispatch }}>
      {children}
    </CacheContext.Provider>
  );
};
