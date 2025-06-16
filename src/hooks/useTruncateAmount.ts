import { NUMBER_FORMAT } from "@app/constants";

const useTruncateAmout = (amout: number) => {
  const truncateDecimals = (number: number) => {
    return Math[number < 0 ? "ceil" : "floor"](number);
  };

  const aux = amout;
  const truncated = truncateDecimals(aux * 100) / 100;

  return NUMBER_FORMAT.format(truncated);
};

export default useTruncateAmout;
