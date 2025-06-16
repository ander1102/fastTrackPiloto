import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";

interface CustomCardModalProps extends ViewProps<boolean> {
  title: string;
  description: string;
  image: string;
}

function CustomCardModal({
  visibleStyles,
  handleClose,
  show,
  title,
  description,
  image,
}: PageSizeModalProps<CustomCardModalProps>) {
  return (
    <Dialog
      visible={show}
      className="shadow-none md:w-2/5 w-11/12"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={false}
    >
      <section className="flex flex-col items-center">
        <img  src={image}  />
        <h2 className="text-dark-gray-100 text-center text-[26px] mb-5 mt-3">
          {title}
        </h2>
        <span className="text-center text-[18px] text-light-gray-200 px-12 mb-5">
          {description}
        </span>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(CustomCardModal);
