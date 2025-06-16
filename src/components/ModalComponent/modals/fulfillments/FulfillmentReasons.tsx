import { useEffect, useState, useMemo } from "react";
import Grid from "@app/components/Grid";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { ClientFulfillment } from "@app/types/Dossiers";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { LABEL_CLIENT } from "@app/constants/client";
import { ButtonLoader } from "@app/components/Buttons";
import { FormItem } from "@app/components/FormManager/FormItem";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { DossiersControllers } from "@app/logic/backend/dossiers";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
interface FulfillmentReasonsModalProps extends ViewProps {
  item: ClientFulfillment;
}
interface FieldType {
  label: string;
  name: string;
  value: string;
}

function FulfillmentReasons({
  item,
  visibleStyles,
  show,
  handleClose,
}: PageSizeModalProps<FulfillmentReasonsModalProps>) {
  const [fulfillment, setFulfillment] = useState<ClientFulfillment>(item);

  const reasons = useMemo(() => {
    const obj: any = item;
    const fields: FieldType[] = [];
    for (const key in item) {
      const label = LABEL_CLIENT[key] ?? key;
      const value = obj[key] ?? undefined;
      const tpmField = { name: key, label: label, value: value as string };
      if (value === false) {
        fields.push(tpmField);
      }
    }
    return fields;
  }, [item]);

  const formik = useFormik({
    initialValues: fulfillment,
    onSubmit: async (values) => {
      try {
        await DossiersControllers.update({ ...fulfillment, estatus: 2 });
        toast.success(
          "El cliente ha sido rechazado ",
          DEFAULT_TOAST_CONFIGURATION
        );
      } catch (error) {
        toast.error(
          "Ha ocurrido un error al rechazar el cliente ",
          DEFAULT_TOAST_CONFIGURATION
        );
      } finally {
        handleClose();
      }

      try {
        await DossiersControllers.send({ ...fulfillment, estatus: 2 });
      }catch (error) {
        toast.error(
          "Ha ocurrido un error al enviar el correo al  cliente ",
          DEFAULT_TOAST_CONFIGURATION
        );
      }
  

    },
    validateOnChange: false,
    validate: async (values) => {
      const errors: { [key: string]: string } = {};
      for (const key in reasons) {
        const field = reasons[key].name;
        const currentReason =
          fulfillment[(field + "Reason") as keyof ClientFulfillment];
        if (typeof currentReason == "undefined" || String(currentReason).trim() == "" ) {
          errors[field] = "El campo es obligatorio";
        }
      }
      return errors;
    },
  });

  return (
    <Dialog
      id="expedienteModal"
      header="Rechazo de información del expediente"
      visible={show}
      style={{ width: "45vw", borderRadius:10}}
      className="shadow-none w-[95%]  md:w-[80%]  xl:w-[50%] max-w-[800px]"
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      draggable={false}
      onHide={() => handleClose()}
      dismissableMask
      focusOnShow={false}
      headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
      contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9}}
    >
      <Grid sm={1} md={1} lg={2} gap={3} className="my-2">
        {reasons.length
          ? reasons.map((current) => (
              <FormItem
                key={current.name}
                label={current.label}
                error={
                  formik.errors[
                    current.name as keyof ClientFulfillment
                  ] as string
                }
              >
                <InputText
                  name={current.name}
                  placeholder={current.label}
                  className={
                    (formik.errors[
                      current.name as keyof ClientFulfillment
                    ] as string) && "p-invalid"
                  }
                  onChange={(e) => {
                    setFulfillment({
                      ...fulfillment,
                      [current.name + "Reason"]: e.target.value,
                    });
                  }}
                  value={
                    fulfillment[
                      (current.name + "Reason") as keyof ClientFulfillment
                    ] as string
                  }
                />
              </FormItem>
            ))
          : null}

      </Grid>
      
      <div className="flex justify-end mt-5">
          <ButtonLoader
            loading={formik.isSubmitting}
            onClick={(event) => {
              formik.setValues(fulfillment);
              event.preventDefault();
              formik.handleSubmit();
            }}
            type="button"
            className="rechazaBtn"
          >
            Rechazar
          </ButtonLoader>
        </div>
    </Dialog>
  );
}

export default withModalPageSize(FulfillmentReasons);
