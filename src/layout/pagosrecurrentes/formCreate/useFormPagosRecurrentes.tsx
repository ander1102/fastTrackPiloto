import { useFormik, FormikErrors } from "formik";
import { PagosRecurrentesPaymentsCreateBody } from "@app/types/PagosRecurrentes";
import { VALIDATION_PAGOS_RECURRENTES } from "@app/constants/pagosRecurrentes";
import { useContext, useState } from "react";
import { PagosRecurrentesController } from "@app/logic/backend/pagosRecurrentes";
import { UserContext } from "@app/context";
import { modalManager } from "@app/components/ModalComponent";
import ModalPaymentCreated from "@app/layout/pagosrecurrentes/formCreate/modalPaymentCreated";
import ModalPaymentDeclined from "@app/layout/pagosrecurrentes/formCreate/modalPaymentDeclined";
import { useRouter } from "next/router";

interface useFormPagosRecurrentesReturn {
  disabled: boolean;
  values: PagosRecurrentesPaymentsCreateBody;
  errors: FormikErrors<PagosRecurrentesPaymentsCreateBody>;
  handleOnSubmit: () => void | Promise<any>;
  handleOnChange: (
    field: string,
    value: string | number,
    shouldValidate?: boolean
  ) => Promise<FormikErrors<PagosRecurrentesPaymentsCreateBody>> | Promise<void>;
}

function useFormPagosRecurrentes(
  initialValues: PagosRecurrentesPaymentsCreateBody
): useFormPagosRecurrentesReturn {
  const userCtx = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: PagosRecurrentesPaymentsCreateBody) => {
    const body: PagosRecurrentesPaymentsCreateBody = {
      ...values,
      idagep_usuario: userCtx.user.persona.idagep_usuarios ?? 0,
      idagep_empresa: userCtx.user.idagep_empresa ?? 0,
      estatus: 1,
    };
    const response = await PagosRecurrentesController.createPayments(
      body
    );

    if (
      response.isSuccess &&
      response.response.mensaje == "Pago recurrente agregado"
    ) {
      setDisabled(true);
      await modalManager.show(ModalPaymentCreated);
      setTimeout(() => {
        router.back();
      }, 2000);
    } else {
      await modalManager.show(ModalPaymentDeclined);
    }
  };

  const formik = useFormik<PagosRecurrentesPaymentsCreateBody>({
    initialValues: initialValues,
    validationSchema: VALIDATION_PAGOS_RECURRENTES,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validate: async (values) => {},
  });

  return {
    values: formik.values,
    errors: formik.errors,
    handleOnSubmit: formik.submitForm,
    handleOnChange: formik.setFieldValue,
    disabled: disabled,
  };
}

export default useFormPagosRecurrentes;
