import { useEffect, EffectCallback } from "react";

type EffectResult = void | EffectCallback;
/**Devuelve un efecto que se ejecutara de manera asincrona */
export default function useEffectAsync(
  effect: () => Promise<EffectResult>,
  deps?: any[]
) {
  let ref: EffectResult | null = null;
  useEffect(() => {
    effect().then((res) => (ref = res));
    return () => {
      const result = ref;
      if (result && typeof result === "function") result();
    };
  }, deps);
}
