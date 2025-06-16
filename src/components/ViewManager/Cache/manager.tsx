import React, { ContextType, PureComponent } from "react";
import { CacheContext } from "@app/context/CacheResource";
import {
  CacheConfig,
  NamedResource,
  Resource,
  ResourceCacheAction,
} from "@app/types/Cache";
import { cacheResourceFuncs } from "@app/logic/cache";

export class ResourceComponentManager extends PureComponent<any> {
  static contextType = CacheContext;
  context!: ContextType<typeof CacheContext>;
  constructor(props: any) {
    super(props);
  }

  public cacheResource = <T extends Resource<string>, TName extends string>(
    name: TName,
    resource: T,
    resourceConf: CacheConfig<Extract<keyof T, string>>
  ): NamedResource<T, TName> => {
    const { getState, dispatch } = this.context;
    const getResource = () => getState()[name]?.cache || {};
    const depends = resourceConf.depends || [];
    const dispatchResource = (ac: ResourceCacheAction<string>) => {
      if (ac.type == "clear") {
        //Si es limpiar el resource, lanzamos una acción de limpiado recursiva para limpiar este y todos los demás resources
        dispatch({
          type: "clearRec",
          payload: {
            resource: name,
          },
        });
        return;
      }
      dispatch({
        type: "resource",
        payload: {
          resource: name,
          depends: depends,
          action: ac,
        },
      });
    };

    const retResource = cacheResourceFuncs(
      getResource,
      dispatchResource,
      { maxSize: 1 },
      resource,
      resourceConf
    );

    return {
      name,
      funcs: retResource,
      depends,
    };
  };

  render() {
    return <></>;
  }
}
