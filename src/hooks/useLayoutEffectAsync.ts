import { EffectCallback, useLayoutEffect } from "react";

type EffectResult = void | EffectCallback;

/**Devuelve un efecto que se ejecutara de manera asincrona */
export default function useLayoutEffectAsync(
  effect: () => Promise<EffectResult>,
  deps?: any[]
) {
  let ref: EffectResult | null = null;
  useLayoutEffect(() => {
    effect().then((res) => (ref = res));
    return () => {
      const result = ref;
      if (result && typeof result === "function") result();
    };
  }, deps);
}
