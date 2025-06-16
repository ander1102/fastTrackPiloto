import { ChangeEvent } from "react";
import useValueHandler from "./useValueHandler";

export default function useInputSearch() {
  const [timer, setTimer] = useValueHandler<NodeJS.Timeout | number>(-1);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    originalOnChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    delay?: number
  ) => {
    if (!originalOnChange) return;
    if (delay) {
      clearInterval(timer());
      setTimer(
        setTimeout(() => {
          originalOnChange!(e);
        }, delay)
      );
      return;
    }
    originalOnChange(e);
  };

  return { handleChange };
}
