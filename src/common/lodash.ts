const charCodeOfDot = ".".charCodeAt(0);
const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  "[^.[\\]]+" +
    "|" +
    // Or match property names within brackets.
    "\\[(?:" +
    // Match a non-string expression.
    "([^\"'][^[]*)" +
    "|" +
    // Or match strings (supports escaping characters).
    "([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2" +
    ")\\]" +
    "|" +
    // Or match "" as the space between consecutive dots or empty brackets.
    "(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))",
  "g"
);

function isSymbol(value: any) {
  const type = typeof value;
  return (
    type === "symbol" ||
    (type === "object" && value != null && getTag(value) === "[object Symbol]")
  );
}

function getTag(value: any) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

function memoizeCapped(func: (str: string) => string[]) {
  const result = memoize(func, (key) => {
    const { cache } = result;
    if (cache.size === 500) {
      cache.clear();
    }
    return key;
  });

  return result;
}

const stringToPath = memoizeCapped((string) => {
  const result = [];
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push("");
  }
  /* @ts-ignore */
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match;
    if (quote) {
      key = subString.replace(reEscapeChar, "$1");
    } else if (expression) {
      key = expression.trim();
    }
    result.push(key);
  });
  return result;
}) as unknown as (str: string) => any[];

function memoize(
  func: (...args: any[]) => any,
  resolver: (...args: any[]) => string
) {
  if (
    typeof func !== "function" ||
    (resolver != null && typeof resolver !== "function")
  ) {
    throw new TypeError("Expected a function");
  }
  const memoized = function (...args: any[]) {
    /* @ts-ignore */
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    /* @ts-ignore */
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}

memoize.Cache = Map;

export const toPath = (value: string) =>
  isSymbol(value) ? [value] : structuredClone(stringToPath(value));
