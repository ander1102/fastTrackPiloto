import { ObjectCallbacks } from "@app/types";
import { Byte } from "@app/types/Form";

const DEFAULT_MASK_TEXT = "*";

export const bufferToBinaryString = (arrayBuffer: ArrayBuffer) =>
  String.fromCharCode(...new Uint8Array(arrayBuffer));

export const getFileExtension = (fileName: string) => {
  const exts = fileName.split(".");
  return `.${exts[exts.length - 1]}`;
};

export const blobToBase64 = (blob: Blob): PromiseLike<string | null> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result;
      if (!dataUrl || typeof dataUrl === "string") resolve(dataUrl);
      else resolve(bufferToBinaryString(dataUrl));
    };
    reader.readAsDataURL(blob);
  });

export const isDate = (value: string | Date): value is Date => {
  switch (typeof value) {
    case "object":
      return value instanceof Date && !isNaN(value.getTime());
    default:
      return !isNaN(Date.parse(value));
  }
};

export const tryConvertDate = (value: any) => (value as Date).toISOString();

export const separateString = (str: string | null | undefined) =>
  (str ?? "").trim().split(/ +/);

/**Elimina los espacios en blanco en un string afuera del texto como los espacios entre el texto */
export const clearString = (x: string | null | undefined): string =>
  separateString(x).join(" ");

interface FormatObj {
  toFormatString: () => string;
  value: Date;
  toSimpleFormatString: () => string;
}

interface DateFormatObj {
  start: (date: Date | string, disableUTC?: boolean) => FormatObj;
  now?: (date: Date | string) => FormatObj;
  end: (date: Date | string, disableUTC?: boolean) => FormatObj;
}

type DateFormatTypes = "day" | "month";
type DateFormatNamespace = Record<DateFormatTypes, DateFormatObj>;

export const toSimpleFormatString = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const stringToDate = (value: string) => {
  //YYYY-MM-DDThh:mm:ss ISO 8601
  if (!value) return new Date();
  const dateParts = value.split(" ");
  const dateComponents = dateParts[0].split("-");
  const timeComponents = dateParts[1].split(":");
  const year = parseInt(dateComponents[0]);
  const month = parseInt(dateComponents[1]) - 1;
  const day = parseInt(dateComponents[2]);
  const hours = parseInt(timeComponents[0]);
  const minutes = parseInt(timeComponents[1]);
  const seconds = parseInt(timeComponents[2]);
  const date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(hours, minutes, seconds);
  return date;
};

export const DateFormat: DateFormatNamespace = {
  day: {
    start: (date, disableUTC) => {
      const d = new Date(date);
      const value = new Date(
        disableUTC ? d.setHours(0, 0, 0) : d.setUTCHours(0, 0, 0)
      );

      return {
        toFormatString: () => value.toISOString().split(".")[0],
        value,
        toSimpleFormatString: () => toSimpleFormatString(value),
      };
    },
    now: (date) => {
      const value = new Date(date);
      return {
        toFormatString: () => value.toISOString().split(".")[0],
        value,
        toSimpleFormatString: () => toSimpleFormatString(value),
      };
    },
    end: (date, disableUTC) => {
      const d = new Date(date);
      const value = new Date(
        disableUTC ? d.setHours(23, 59, 59) : d.setUTCHours(23, 59, 59)
      );

      return {
        toFormatString: () => value.toISOString().split(".")[0],
        value,
        toSimpleFormatString: () => toSimpleFormatString(value),
      };
    },
  },
  month: {
    start: (date, disableUTC) => {
      const d = new Date(date);
      const value = disableUTC
        ? new Date(d.getFullYear(), d.getMonth(), 1)
        : new Date(d.getUTCFullYear(), d.getUTCMonth(), 1);
      if (disableUTC) value.setHours(0, 0, 0, 0);
      else value.setUTCHours(0, 0, 0, 0);
      return {
        toFormatString: () => value.toISOString().split(".")[0],
        value,
        toSimpleFormatString: () => toSimpleFormatString(value),
      };
    },
    end: (date, disableUTC) => {
      const d = new Date(date);
      const value = disableUTC
        ? new Date(d.getFullYear(), d.getMonth() + 1, 0)
        : new Date(d.getUTCFullYear(), d.getUTCMonth() + 1, 0);
      if (disableUTC) value.setHours(23, 59, 59, 999);
      else value.setUTCHours(23, 59, 59, 999);
      return {
        toFormatString: () => value.toISOString().split(".")[0],
        value,
        toSimpleFormatString: () => toSimpleFormatString(value),
      };
    },
  },
};

/**Devuelve un string con la primera letra en mayuscula */
export const beginUppercase = (str: string, each?: boolean) => {
  if (each)
    return separateString(str)
      .map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
      .join(" ");
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export const base64ToString = (base64: string): string => atob(base64);

/**Convierte una cadena base64 a un blob */
export function base64ToBlob(base64: string, contentType?: string): Blob {
  contentType = contentType || "";
  const byteCharacters = base64ToString(base64);
  return stringToBlob(byteCharacters, contentType);
}

/**Convierte una cadena binaria en un blob */
export function stringToBlob(value: string, contentType?: string): Blob {
  const sliceSize = 512;
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < value.length; offset += sliceSize) {
    const slice = value.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export const cleanBase64 = (src: string | null): string => {
  if (!src) return "";
  return src.split("base64,")?.[1].trim();
};

/**Devuelve un nuevo objeto con los valores reemplazados por un `value` establecido, devolviendo las mismas keys con el mismo valor */
export const ReplaceObjectValue = <
  T extends { [key: string]: any },
  IValue = any
>(
  obj: T,
  value: IValue
): Record<keyof T, IValue> =>
  Object.keys(obj).reduce(
    (prev, curr) => ({ ...prev, [curr]: value }),
    {}
  ) as Record<keyof T, IValue>;

export const ReplaceConditionalObjectValue = <
  T extends { [key: string]: any },
  IValue = any
>(
  obj: T,
  value: IValue,
  condition: (value: any) => boolean
): Record<keyof T, IValue> =>
  Object.keys(obj).reduce((prev, curr) => {
    const currValue = obj[curr];
    return { ...prev, [curr]: !condition(currValue) ? currValue : value };
  }, {}) as Record<keyof T, IValue>;

/**
 * Elimina los acentos de un string
 * @param search
 * @returns
 */
export const eliminarAcentos = (search: string): string => {
  return search
    ? search
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    : "";
};

export const toByte = (value: any): Byte => {
  if (typeof value === "boolean") return value === true ? 1 : 0;
  if (typeof value === "string")
    return value === "1" || value === "true" ? 1 : 0;
  return 0;
};

export const arrayBufferToBase64 = (arr: ArrayBuffer) => {
  const binary = new Uint8Array(arr);
  return Buffer.from(binary).toString("base64");
};

export const executeReturnedValue = <T>(
  value: T | ((...args: any[]) => T),
  ...args: any[]
): T => (value instanceof Function ? value(...args) : value);

export const createFromCallbackObject = <T extends { [key: string]: any }>(
  callbacks: ObjectCallbacks<T>,
  obj: T
): T =>
  Object.fromEntries(
    Object.entries(callbacks).map((x) => {
      const [key, value] = x;
      return [key, value instanceof Function ? value(obj?.[key]) : value];
    })
  ) as T;

export const hexToRgba = (hex: string, opacity: number): string => {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  } else if (hex.length !== 6) {
    throw new Error("Color hexadecimal inválido. Debe tener 3 o 6 caracteres.");
  }

  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  if (opacity < 0 || opacity > 1) {
    throw new Error("La opacidad debe estar en el rango de 0 a 1.");
  }

  const rgba = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  return rgba;
};

export const fillArrayCircularly = <T>(arr1: T[], lenght: number): T[] => {
  const filledArray: T[] = [];

  for (let i = 0; i < lenght; i++) {
    const index = i % arr1.length;
    filledArray.push(arr1[index]);
  }

  return filledArray;
};

/**Devuelve un array con los elementos desordenados de forma aleatoria */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const includesWholeWord = (text: string, word: string): boolean => {
  const regex = new RegExp(`\\b${word}\\b`, "i");
  return regex.test(text);
};

export const timeFormat = (tiempoEnSegundos: number): string => {
  const minutos: number = Math.floor(tiempoEnSegundos / 60);
  const segundos: number = tiempoEnSegundos % 60;
  return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
};

const getMaskFill = (length: number, mask?: string) =>
  new Array(length).fill(mask ?? DEFAULT_MASK_TEXT).join("");

export const maskText = (
  text: string,
  masklenght: number,
  start?: boolean,
  mask?: string
): string => {
  if (!text || text.length < masklenght) return text;
  if (text.length === masklenght) return getMaskFill(masklenght, mask);
  const maskDiff = text.length - masklenght;
  const unMaskText = start
    ? text.slice(0, masklenght)
    : text.slice(-masklenght);
  return start
    ? unMaskText + getMaskFill(maskDiff, mask)
    : getMaskFill(maskDiff, mask) + unMaskText;
};
