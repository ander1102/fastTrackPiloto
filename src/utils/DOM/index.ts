import { isEmpty, Sleep } from "@app/common";
import { FetchResponse } from "@app/common/fetch";
import { base64ToBlob, beginUppercase } from "@app/common/format";
import { Log } from "@app/common/log";
import { modalManager } from "@app/components/ModalComponent";
import LoaderModal from "@app/components/ModalComponent/modals/Loader";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { FormRecord } from "@app/types/Form";
import { toast } from "react-toastify";

function hideInput(el: HTMLElement) {
  el.style.position = "absolute";
  el.style.top = "0";
  el.style.left = "0";
  el.style.width = "0";
  el.style.height = "0";
  el.style.display = "none";
}

/**Obtiene un arreglo con los archivos seleccionados en un input. Devuelve null si no se seleccionó ningun archivo */
function getFiles(input: HTMLInputElement): File[] | null {
  if (!input.files || input.files.length == 0) return null;

  return Array.prototype.slice.call(input.files) as File[];
}

/**Muestra el selector de archivos y devuelve el archivo seleccionado o null si no hay archivo */
export function upload(): Promise<File | null>;
/**Muestra el selector de archivos y devuelve el archivo seleccionado o null si no hay archivo */
export function upload(multi: false, accept?: string): Promise<File | null>;
/**Muestra el selector de archivos y devuelve los archivos seleccionados o null si no hay archivos */
export function upload(multi: true, accept?: string): Promise<File[] | null>;
export function upload(
  multi?: boolean,
  accept?: string
): Promise<File | File[] | null> {
  //Creamos un elemento input escondido:
  const input = document.createElement("input");
  input.type = "file";
  hideInput(input);
  input.multiple = multi || false;
  input.accept = accept || "";
  //Lo agregamos al documento:
  document.body.appendChild(input);
  return new Promise((resolve) => {
    input.onchange = async (ev) => {
      const files = getFiles(input);
      const ret = files && (multi ? files : files[0]);
      //Quitamos el input del documento:
      document.body.removeChild(input);
      resolve(ret);
    };

    /**Bandera que indica si se debe de revisar si el input se cancelo, esto porque sólo se debe de hacer una vez */
    let checkCancel = true;
    function onBodyFocus(ev: any) {
      if (!checkCancel) return;
      checkCancel = false;

      document.body.removeEventListener("focusin", onBodyFocus, true);
      document.body.removeEventListener("click", onBodyFocus, true);
      document.body.removeEventListener("keydown", onBodyFocus, true);
      document.body.removeEventListener("mousemove", onBodyFocus, true);

      //Realizamos el chequeo con un retraso, si lo revisamos inmediatamente el valor de input.value aun no
      //estará actualizado
      setTimeout(() => {
        if (!input.value) {
          //El usuario no seleccionó ningún archivo
          resolve(null);
        }
      }, 500);
    }
    /**Se ejecuta cuando el dialogo de escoger archivos aparece */
    function onInitBodyFocus() {
      window.removeEventListener("blur", onInitBodyFocus, true);
      document.body.addEventListener("focusin", onBodyFocus, true);
      document.body.addEventListener("click", onBodyFocus, true);
      document.body.addEventListener("keydown", onBodyFocus, true);
      document.body.addEventListener("mousemove", onBodyFocus, true);
    }
    window.addEventListener("blur", onInitBodyFocus, true);

    input.focus();
    input.click();
  });
}

interface ShowFetchResponseToastOptions<T> {
  setSuccessTitle: (response: FetchResponse<T>) => string;
  setFailureTitle: (
    response: FetchResponse<T>,
    errorSetted?: boolean
  ) => string;
  setError: (response: FetchResponse<T>) => boolean;
}

export const ShowFetchResponseToast = <T>(
  response: FetchResponse<T>,
  options?: Partial<ShowFetchResponseToastOptions<T>>
): boolean => {
  const errorSetted = options?.setError && options.setError(response);
  if (response.error || errorSetted || !response.isSuccess) {
    toast.error(
      `Error: ${
        options?.setFailureTitle
          ? options.setFailureTitle(response, errorSetted)
          : response.error?.message
      }`,
      DEFAULT_TOAST_CONFIGURATION
    );
    return false;
  }
  if (options?.setSuccessTitle)
    toast.success(
      options.setSuccessTitle(response),
      DEFAULT_TOAST_CONFIGURATION
    );
  return true;
};

/**Ejecuta una promesa y mientras se resuelve muestra un spinner que abarca solo
 * el tamaño de la pagina sin contar el tamaño del sidebar
 */
export async function execWithLoader<
  IFunc extends (...args: any[]) => Promise<any>
>(
  func: IFunc,
  args: Parameters<IFunc>,
  context?: string,
  delay?: number
): Promise<ReturnType<IFunc>> {
  const loader = modalManager.showSync(LoaderModal, {}, context);
  if (context && delay) await Sleep(delay); // se aplica delay en caso de que la funcion se ejecute de inmediato darle tiempo al componente de registrarse en el MountHandler
  loader.start();
  const res = await func(...args);
  loader.close();
  return res;
}
1;

/**Si data es string, lo convierte a blob, si es blob lo devuelve tal cual */
function fixData(data: Blob | string, contentType?: string | undefined): Blob {
  if (typeof data == "string") {
    return base64ToBlob(data, contentType);
  } else {
    return data;
  }
}

/**Descarga un Blob o un string base64*/
export function download(
  data: Blob | string,
  filename: string,
  contentType?: string
) {
  data = fixData(data, contentType);
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  const url = window.URL.createObjectURL(data);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export const translation: any = {
  snTerminal: "No. serie",
  Modelo: "Modelo",
  firmware: "Versión ",
};

export const checkEmptyFields = <IField>(
  fields: (keyof IField)[],
  field: IField
) => {
  const requiredValues = fields
    .map((key) => ({
      key,
      value: field[key],
    }))
    .filter((obj) => isEmpty(obj.value, true));
  const format = new Intl.ListFormat("es", { style: "long" });
  if (requiredValues.length > 0) {
    toast.error(`Debes completar los siguientes campos:
    ${format.format(
      requiredValues.map((obj) => {
        let column: string = obj.key as string;
        return translation.hasOwnProperty(column)
          ? translation[column]
          : beginUppercase(column);
      })
    )}`);
    return true;
  }

  return false;
};

export const checkValidationFields = <IField>(
  field: IField,
  validation: Partial<FormRecord<IField>>,
  index?: number
): boolean => {
  const invalid = Object.keys(validation).reduce((prev, curr) => {
    const validator: any = validation[curr as keyof FormRecord<IField>];
    const value = field[curr as keyof IField];
    return prev.concat(
      value &&
        validator &&
        validator.validate &&
        !validator.validate(value, validator.selectValidateValue, index)
        ? [validator]
        : []
    );
  }, [] as Partial<FormRecord<IField>>[keyof IField][]);

  if (invalid.length > 0) {
    toast.error(`Ha ocurrido los siguientes errores de validación:
    ${invalid.map(
      (x) =>
        (x?.displayError instanceof Function
          ? x?.displayError(x.selectValidateValue, index)
          : x?.displayError) + "\n\n"
    )}
    `);
    return false;
  }

  return true;
};

export const getDisplayError = <T, K extends keyof T>(
  validation: Partial<FormRecord<T>> | undefined,
  key: K,
  value: T[K],
  index?: number
): string | undefined => {
  const validator = validation?.[key];
  if (
    value &&
    validator &&
    validator.validate &&
    !validator.validate(value, validator.selectValidateValue, index)
  )
    return validator.displayError && validator.displayError instanceof Function
      ? validator.displayError(validator.selectValidateValue, index)
      : validator.displayError;
};

export const copyToClipboard = (text: string) => {
  const input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};

export const copyToClipboardNavigator = (
  text: string,
  successMessage: string = "Copiado exitosamente en el portapapeles.",
  errorMessage: string = "Error al copiar en el portapapeles."
) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(successMessage, DEFAULT_TOAST_CONFIGURATION);
    })
    .catch(() => {
      toast.error(errorMessage, DEFAULT_TOAST_CONFIGURATION);
    });
};
