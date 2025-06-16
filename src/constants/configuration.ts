import { BankData, ConfigurationPassword } from "@app/types/Configuration";
import { FormRecord } from "@app/types/Form";

export const CONFIGURATION_VALIDATION: Partial<FormRecord<BankData>> = {
  clabe: {
    selectValidateValue: 18,
    validate: (value, selector) => value.length <= selector,
    displayError: (selector) =>
      `La clabe no debe de exceder de ${selector} dígitos`,
  },
};

export const CONFIGURATION_PASSWORD_VALIDATION: Partial<
  FormRecord<ConfigurationPassword>
> = {
  repeatPasword: {
    selectValidateValue: 20,
    validate: (value, selector) => value.length <= selector,
    displayError: (selector) =>
      `La contraseña no debe exceder de ${selector} carácteres`,
  },
  confirmRepeatPassword: {
    selectValidateValue: 20,
    validate: (value, selector) => value.length <= selector,
    displayError: (selector) =>
      `La contraseña no debe exceder de ${selector} carácteres`,
  },
};

export const CONFIGURATION_REQUIRED_FIELDS: (keyof BankData)[] = [
  "account",
  "bank",
  "clabe",
  "name",
];
