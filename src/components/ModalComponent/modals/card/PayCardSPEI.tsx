import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { ButtonLoader } from "@app/components/Buttons";
import Grid from "@app/components/Grid";
import { FormItem } from "@app/components/FormManager/FormItem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  CardInfoCardRequestResponseCard,
  CardCreditResponseCredit,
} from "@app/types/Card";
import moment from "moment";
moment.locale("es");
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { copyToClipboard } from "@app/utils/DOM";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";

interface PayCardSPEIProps extends ViewProps<boolean> {
  infocard?: CardInfoCardRequestResponseCard;
  credit?: CardCreditResponseCredit;
}
function PayCardSPEI({
  infocard,
  credit,
  visibleStyles,
  handleClose,
  show,
}: PageSizeModalProps<PayCardSPEIProps>) {
  return (
    <Dialog
      visible={show}
      className="shadow-none sm:w-full md:w-1/2 lg:w-2/3"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      dismissableMask
      closable={false}
    >
      <section className="flex flex-col items-center lg:px-5 relative">
        <img
          className="absolute right-0"
          style={{}}
          alt="SPEI"
          src="/Images/cards/SPEI.png"
          width={80}
        />
        <div className="w-full">
          <p className="text-2xl text-black-1 text-center">
            Pago de tarjeta
          </p>
          <p className={"text-xl h-1/2 flex text-left items-center"}>
            <i
              className={"pi pi-arrow-left size-5 absolute cursor-pointer"}
              onClick={() => handleClose(false)}
            />
          </p>
        </div>
        <div className="mb-3">
          <p className="text-md text-grey-1 text-center">
            Realiza el pago de tu tarjeta para estar al corriente <br /> con tu
            crédito.
          </p>
        </div>

        <Grid lg={2} gap={3} className="w-full">
          <FormItem label="CLABE interbancaria" className="relative">
            <InputText
              readOnly
              value={infocard?.stp}
              className="text-primary border-primary"
            />
            <Button
              icon="pi pi-copy"
              text
              className="text-primary right-0 bottom-0"
              style={{ position: "absolute" }}
              onClick={() => {
                copyToClipboard(infocard?.stp ?? "");
                toast.success(
                  "CLABE interbancaria copiada correctamente",
                  DEFAULT_TOAST_CONFIGURATION
                );
              }}
            />
          </FormItem>

          <FormItem label="Banco de destino">
            <InputText className="text-grey-1" readOnly value="Sistema de Transferencias y Pagos" />
          </FormItem>

          <FormItem label="Fecha limite de pago">
            <InputText
              readOnly
              className="text-grey-1"
              value={moment(credit?.limit_date).format("DD [de] MMMM")}
            />
          </FormItem>

          <FormItem label="Pago para no generar intereses">
            <InputText
              readOnly
              className="text-grey-1"
              value={
                useTruncateAmout(credit?.not_interest_payment as number) ?? 0
              }
            />
          </FormItem>

          <FormItem label="Pago mínimo de la tarjeta">
            <InputText
              readOnly
              className="text-grey-1"
              value={useTruncateAmout(credit?.min_payment as number) ?? 0}
            />
          </FormItem>
          <FormItem label="Deduda total">
            <InputText
              className="text-primary border-primary"
              readOnly
              value={useTruncateAmout((credit?.total_debt as number) ?? 0)}
            />
          </FormItem>
        </Grid>

        <div className="flex justify-center mt-3">
          <ButtonLoader
            className="button-primary-large"
            label="Listo"
            onClick={() => handleClose(false)}
          />
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(PayCardSPEI);
