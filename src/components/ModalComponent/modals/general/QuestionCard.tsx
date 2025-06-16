import { ButtonProps } from "primereact/button";
import { Dialog, DialogProps } from "primereact/dialog";
import { ButtonLoader } from "@app/components/Buttons";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import styles from "@app/components/ModalComponent/modal.module.css";

interface QuestionCardProps extends ViewProps<boolean> {
  handleAccept: (res: (close: boolean) => void) => void;
  handleCancel: (res: (close: boolean) => void) => void;
  title: string;
  description: string;
  buttonAcceptProps?: ButtonProps;
  buttonCancelProps?: ButtonProps;
  classNames?: string;
  dialogProps?: Partial<DialogProps>;
}

function QuestionCardModal({
  handleAccept,
  handleCancel,
  title,
  description,
  buttonAcceptProps,
  buttonCancelProps,
  classNames,
  dialogProps,
  handleClose,
  visibleStyles,
  show,
}: PageSizeModalProps<QuestionCardProps>) {
  return (
    <Dialog
      visible={show}
      className={`shadow-none sm:w-full md:w-3/5 xl:w-1/2 ${classNames ?? ""}`}
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={false}
      {...dialogProps}
    >
      <section className="flex flex-col justify-center min-h-[280px] ">
        <div>
          <h2 className="text-2xl text-black-1 mb-5 text-center">{title}</h2>
          <p className="text-lg text-grey-1 text-center mb-3 ">{description}</p>
        </div>
        <div className="flex justify-center my-6 gap-6">
          <ButtonLoader
            {...buttonCancelProps}
            onClick={async () => {
              await handleCancel(handleClose);
            }}
          />
          <ButtonLoader
            {...buttonAcceptProps}
            onClick={async () => {
              await handleAccept(handleClose);
            }}
          />
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(QuestionCardModal);
