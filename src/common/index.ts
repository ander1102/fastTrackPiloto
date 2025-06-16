import { FORM_EMPTY_VALUES } from "@app/constants/form";
import { clearString } from "./format";
import { toPath } from "./lodash";

export const Sleep = (s?: number) =>
  new Promise((resolve) => setTimeout(resolve, (s ?? 0) * 1000));

interface ParseJSONResult<IResult> {
  isSuccess: boolean;
  result: IResult;
}

/**Intenta transformar un string en formato JSON a un objeto de javascript, devolviendo el resultado si se logro transformar, en caso de que no devolverá el mismo string */
export const tryParseJSON = <IResult>(
  str: string
): ParseJSONResult<IResult | string> => {
  try {
    const parse = deepParseJson(str) as IResult;
    return {
      isSuccess: true,
      result: parse,
    };
  } catch (error) {
    return {
      isSuccess: false,
      result: str,
    };
  }
};

const isNumString = (str: string) => !isNaN(Number(str));

export function deepParseJson<T>(jsonString: any): T | string {
  if (typeof jsonString === "string") {
    if (isNumString(jsonString)) {
      return jsonString;
    }
    try {
      return deepParseJson(JSON.parse(jsonString));
    } catch (err) {
      return jsonString;
    }
  } else if (Array.isArray(jsonString)) {
    // @ts-ignore: Unreachable code error
    return jsonString.map((val) => deepParseJson<T>(val));
  } else if (typeof jsonString === "object" && jsonString !== null) {
    return Object.keys(jsonString).reduce((obj, key) => {
      const val = jsonString[key];
      // @ts-ignore: Unreachable code error
      obj[key] = isNumString(val) ? val : deepParseJson(val);
      return obj;
    }, {}) as T;
  } else {
    return jsonString;
  }
}

/**Verifica si un objeto esta vacio */
export const isEmptyObject = (obj: any) => {
  if (typeof obj !== "object") return false;
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === "{}";
};

/**Devuelve un objeto eliminando todas las keys seleccionadas */
export const omit = <T extends { [k: string]: any }, K extends keyof T>(
  obj: T,
  ...omits: K[]
): Omit<T, K> =>
  omits.reduce((prev, curr) => {
    const { [curr]: omitted, ...rest } = prev as T;
    return rest;
  }, obj as Omit<T, K>);

/**Determina si un valor esta vacio dependiendo de su valor o referencia */
export const isEmpty = (value: any, strict?: boolean) => {
  if (typeof value === "object") {
    if (Array.isArray(value)) return value.length === 0;
    return isEmptyObject(value);
  }
  return strict
    ? typeof value === "string"
      ? !clearString(value)
      : value !== 0 && !value
    : FORM_EMPTY_VALUES.some((x) => x === value);
};

export const contains = (value: any, containValue: any): boolean => {
  switch (typeof value) {
    case "string":
      return value.includes(containValue);
    case "number":
      return value >= containValue;
    case "boolean":
      return value === containValue;
    case "object":
      if (Array.isArray(value))
        return value.some((x) => contains(x, containValue));
      return JSON.stringify(value) === JSON.stringify(containValue);
    default:
      return false;
  }
};

export function getYupError(err: any) {
  let tpm: any = {};
  err.inner.forEach((error: any) => {
    tpm[error.path] = error.message;
  });
  return tpm;
}

export function isPromiseLike(x: any): x is PromiseLike<any> {
  return x && typeof (x as PromiseLike<any>).then === "function";
}

type MapObjectOut<T, TOut> = { [K in keyof T]: TOut };

export function mapObject<T, TOut>(
  obj: T,
  map: <K extends keyof T>(value: T[K], key: K) => TOut
): MapObjectOut<T, TOut> {
  const ret = {} as MapObjectOut<T, TOut>;
  for (const key in obj) {
    const value = obj[key];
    ret[key] = map(value, key);
  }
  return ret;
}

/**Devuelve un index aleatorio de un array
 * @returns Un numero random que sea inferior al tamaño del array
 */
export const getRandomIndex = (arr: any[]) =>
  Math.floor(Math.random() * arr.length);

/**Suma todos los elementos de un array de números */
export const Sum = (arr: number[]) =>
  arr.reduce((prev, curr) => prev + curr, 0);

/**Suma todos los elementos de una coleccion de objetos */
export const SumByCollection = <T>(arr: T[], selector: (value: T) => number) =>
  arr.reduce((prev, curr) => prev + selector(curr), 0);

/**Evalua si el script esta siendo ejecutado del lado del cliente */
export const isClientSide = () =>
  typeof window !== "undefined" && !!window.document;

/**Evalua si la app se encuentra en un entorno de desarrollo */
export const isDebug = () =>
  typeof process === "undefined"
    ? false
    : process && process.env.NODE_ENV === "development";

export const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
  
/** Evalúa si el string contiene los caracteres de un número de teléfono. */
export const hasPhoneNumberCharacters = (phoneNumber: string) =>
  /^[()+\-\.0-9\ ]*$/.test(phoneNumber);

export const evaluateValues = <T extends { [key: string]: any }>(
  obj: T,
  condition: (value: any) => boolean
): boolean => Object.values(obj).every(condition);

export const evaluateSomeValues = <T extends { [key: string]: any }>(
  obj: T,
  condition: (value: any) => boolean
): boolean => Object.values(obj).every(condition);

export const getRandomNumberByRange = (start: number, end: number) =>
  Math.floor(Math.random() * end) - Math.floor(Math.random() * start);

export const nestObject = (objetoOriginal: Record<string, any>) => {
  const obj: any = {};

  for (const key in objetoOriginal) {
    const keys = key.split("."); // Divide la clave en partes
    if (keys.length == 1 && !key.includes("[")) {
      obj[key] = objetoOriginal[key];
    } else if (key.includes("[")) {
      const start = key.indexOf("[");
      const end = key.indexOf("]");
      if (start >= 0 && end >= 0) {
        const firstKey = key.substring(0, start);
        const secondKey = key.substring(end + 2, key.length);
        const index = +key.substring(start + 1, end);

        if (obj[firstKey] === undefined) {
          obj[firstKey] = [];
        }
        if (obj[firstKey][index] === undefined) {
          obj[firstKey][index] = {};
        }
        if (obj[firstKey][index] !== undefined) {
          obj[firstKey][index] = {
            ...obj[firstKey][index],
            [secondKey]: objetoOriginal[key],
          };
        }
      }
    } else if (keys.length == 1) {
      obj[key] = objetoOriginal[key];
    } else if (keys.length == 2) {
      if (!obj[keys[0]]) {
        obj[keys[0]] = {};
      }
      obj[keys[0]][keys[1]] = objetoOriginal[key];
    }
  }
  return obj;
};

export const removeMXN = (value: string) => value.replace("MXN", "");

export const getValueByRoute = <T extends { [key: string]: any }>(
  obj: T,
  route: string
): any => {
  let p = 0;
  const path = toPath(route);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }

  if (p !== path.length && !obj) return undefined;

  return obj;
};


interface AnyObject {
  [key: string]: any;
}

export const  mapValues = (baseObject: AnyObject, mappingObject: AnyObject): AnyObject =>{
  const isObject = (value: any): boolean => typeof value === 'object' && value !== null;

  const mapRecursive = (base: AnyObject, mapping: AnyObject): AnyObject => {
    for (let key in base) {
      if (base.hasOwnProperty(key)) {
        if (isObject(mapping[key])) {
          base[key] = mapRecursive(base[key] || {}, mapping[key]);
        } else if (Array.isArray(mapping[key])) {
          base[key] = mapping[key].map((item: any, index: number) => {
            if (isObject(item)) {
              return mapRecursive(base[key]?.[index] || {}, item);
            } else {
              return item;
            }
          });
        } else {
          // If the key exists in the mapping object, use its value; otherwise, use the value from the base object
          base[key] = mapping.hasOwnProperty(key) ? mapping[key] : base[key];
        }
      }
    }
    return base;
  };

  return mapRecursive({ ...baseObject }, mappingObject);
}
