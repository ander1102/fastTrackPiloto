import { ProgressSpinner } from "primereact/progressspinner";
import withModalPageSize from "@app/components/HOC/withModalPageSize";
import { PageSizeModalProps } from "@app/components/HOC/withModalPageSize";

import styles from "@app/components/ModalComponent/modal.module.css";
import { ViewProps } from "@app/components/ViewManager/View/comp";

function LoaderModal({ visibleStyles }: PageSizeModalProps<ViewProps>) {
  return (
    <div className={styles.Modal} style={visibleStyles}>
      <ProgressSpinner />
    </div>
  );
}

export default withModalPageSize(LoaderModal);
