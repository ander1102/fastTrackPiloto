import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Checkbox, CheckboxProps } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";
import { Button } from "@app/components/Buttons";
import { FormItem } from "@app/components/FormManager/FormItem";
import { modalManager } from "@app/components/ModalComponent";
import modalLink from "./modalLink";

import { UserContext } from "@app/context";
import { IntegrationsControllers } from "@app/logic/backend/integrations";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { LIFE_TIME_DROPDOWN_OPTIONS } from "@app/constants/integrations";

export interface LinkFormProps {
  isLinkPago?: boolean;
}

interface PagoValues {
  monto: number | null;
  referencia: string;
  expiracion: number;
}
interface NegocioValues {
  montoMax: number | null;
  mensaje: string;
}
interface ClientValues {
  client_email: boolean;
  client_name: boolean;
  client_phone: boolean;
  client_address: boolean;
}

const getDefaultPagoValues = (): PagoValues => ({
  monto: null,
  referencia: "",
  expiracion: 0,
});
const getDefaultNegocioValues = (): NegocioValues => ({
  montoMax: null,
  mensaje: "",
});
const getDefaultClientValues = (): ClientValues => ({
  client_email: true,
  client_name: false,
  client_phone: false,
  client_address: false,
});

function handleChangeValues<Values>(
  setValues: Dispatch<SetStateAction<Values>>,
  field: keyof Values,
  value: string | boolean | number | null
) {
  setValues((prevValues) => ({
    ...prevValues,
    [field]: value,
  }));
}

export function LinkForm({ isLinkPago = false }: LinkFormProps) {
  const { user } = useContext(UserContext);
  const [pagoValues, setPagoValues] = useState(getDefaultPagoValues());
  const [negocioValues, setNegocioValues] = useState(getDefaultNegocioValues());
  const [clientValues, setClientValues] = useState(getDefaultClientValues());
  const [loading, setLoading] = useState(false);

  const handleShowModalLink = async (token: string, tokenQR: string) => {
    await modalManager.show(modalLink, {
      isLinkPago,
      concepto: pagoValues.referencia,
      monto: pagoValues.monto ?? 0,
      mensaje: negocioValues.mensaje,
      token,
      tokenQR,
    });
  };

  const generateLink = async () => {
    setLoading(true);

    try {
      if (isLinkPago) {
        if ((pagoValues.monto ?? 0) <= 0) {
          toast.error("El monto debe ser mayor a 0", DEFAULT_TOAST_CONFIGURATION);
          setLoading(false);
          return;
        }
  
        if (!pagoValues.expiracion) {
          toast.error("Debes seleccionar un tiempo de vida", DEFAULT_TOAST_CONFIGURATION);
          setLoading(false);
          return; 
        }
      }
      const { response } = isLinkPago
        ? await IntegrationsControllers.getLinkPago({
            monto: pagoValues.monto ?? 0,
            concepto: pagoValues.referencia,
            expiracion: pagoValues.expiracion,
            idagep_empresa: user.idagep_empresa ?? 0,
            checkout_opciones: { ...clientValues },
          })
        : await IntegrationsControllers.getLinkNegocio({
            montoMax: negocioValues.montoMax ?? 0,
            mensaje: negocioValues.mensaje,
            idagep_empresa: user.idagep_empresa ?? 0,
            checkout_opciones: { ...clientValues },
          });

      const token = response.token ?? "";
      const tokenQR = response.tokenQR ?? "";

      handleShowModalLink(token, tokenQR);
    } catch {
      toast.error(
        "Hubo un error al generar el link de pago",
        DEFAULT_TOAST_CONFIGURATION
      );
    }

    setLoading(false);
  };

  return (
    <div className="md:w-72 px-3 flex flex-col gap-5">
      {isLinkPago ? (
        <>
          <FormItem label="Monto">
            <InputNumber
              aria-disabled={loading}
              className="w-full"
              currency="USD"
              disabled={loading}
              mode="currency"
              placeholder="$0.00 MXN"
              suffix=" MXN"
              value={pagoValues.monto}
              onChange={(e) =>
                handleChangeValues(setPagoValues, "monto", e.value)
              }
            />
          </FormItem>

          <FormItem label="Referencia">
            <InputText
              aria-disabled={loading}
              disabled={loading}
              placeholder="Referencia"
              value={pagoValues.referencia}
              onChange={(e) =>
                handleChangeValues(setPagoValues, "referencia", e.target.value)
              }
            />
          </FormItem>
          <FormItem label="Tiempo de Vida">
            <Dropdown
              aria-disabled={loading}
              className="w-full rounded-[7px]"
              disabled={loading}
              options={LIFE_TIME_DROPDOWN_OPTIONS}
              placeholder="Seleccionar"
              value={pagoValues.expiracion}
              onChange={(e) =>
                handleChangeValues(setPagoValues, "expiracion", e.value)
              }
            />
          </FormItem>
        </>
      ) : (
        <>
          <FormItem label="Monto máximo">
            <InputNumber
              aria-disabled={loading}
              className="w-full"
              currency="USD"
              disabled={loading}
              mode="currency"
              placeholder="$500.00 MXN"
              suffix=" MXN"
              value={negocioValues.montoMax}
              onChange={(e) =>
                handleChangeValues(setNegocioValues, "montoMax", e.value)
              }
            />
          </FormItem>

          <FormItem label="Mensaje">
            <InputTextarea
              aria-disabled={loading}
              className="!h-28"
              disabled={loading}
              placeholder="¡Muchas gracias por tu compra! Esperamos tenerte de vuelta pronto."
              value={negocioValues.mensaje}
              onChange={(e) =>
                handleChangeValues(setNegocioValues, "mensaje", e.target.value)
              }
            />
          </FormItem>
        </>
      )}

      <FormItem
        className="w-full sm:w-60"
        label="Solicitar la siguiente información al tarjetahabiente:"
        labelClassName="font-medium mb-5"
      >
        <div className="flex flex-col gap-3">
          {formCheckboxes.map(({ key, label, required }) => (
            <CheckboxWithLabel
              aria-disabled={loading}
              checked={!!clientValues[key]}
              className={`${isLinkPago ? "link-pago" : "link-negocio"}`}
              disabled={required || loading}
              key={key}
              keyValue={key}
              label={label}
              required={required}
              onChange={(e) =>
                handleChangeValues(setClientValues, key, !!e.target.checked)
              }
            />
          ))}
        </div>
      </FormItem>

      <Button
        className={`!w-44 !h-10 !mt-5 !rounded-xl self-center !text-sm hover:opacity-90 ${
          isLinkPago ? "!bg-primary-color" : "!bg-primary-color"
        }`}
        onClick={generateLink}
      >
        Generar Liga
      </Button>
    </div>
  );
}

interface FormCheckbox {
  label: string;
  key: keyof ClientValues;
  required?: boolean;
}
const formCheckboxes: FormCheckbox[] = [
  { label: "Correo*", key: "client_email", required: true },
  { label: "Nombre Completo", key: "client_name" },
  { label: "Teléfono", key: "client_phone" },
  { label: "Dirección", key: "client_address" },
];

interface CheckboxWithLabelProps extends CheckboxProps {
  keyValue: string;
  label: string;
}
function CheckboxWithLabel({
  keyValue,
  label,
  ...props
}: CheckboxWithLabelProps) {
  return (
    <div className="flex items-center gap-6">
      <Checkbox inputId={keyValue} name={keyValue} {...props} />
      <label htmlFor={keyValue} className="text-[#4A5056]">
        {label}
      </label>
    </div>
  );
}
