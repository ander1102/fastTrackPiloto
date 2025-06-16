import { signal } from "@preact/signals-core";
import { useMemo } from "react";

const useSignal = <T>(value: T) => useMemo(() => signal(value), []); // Se hace un custom hook a parte ya que tiene problemas la libreria de preact con SSR

export default useSignal;
