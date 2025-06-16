import { createContext, PropsWithChildren } from "react";
import { FormContextProps } from "@app/components/FormManager/types";

export const FormContext = createContext(
  undefined as unknown as FormContextProps
);
export const FormContextProvider = ({
  children,
  formFields,
  disableds,
  activeTab,
  formik,
  validationSchema,
  formMethods,
}: PropsWithChildren<FormContextProps>) => {
  return (
    <FormContext.Provider
      value={{
        disableds,
        formFields,
        activeTab,
        formik,
        validationSchema,
        formMethods,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
