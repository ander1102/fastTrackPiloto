import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import styles from "@app/components/ModalComponent/modal.module.css";
import { ClientPersona } from "../form/types";
import { useMemo } from "react";
import { createClientTypes } from "@app/constants/client";
import { ClientTypeObj } from "@app/types/Clients";
import { SVG } from "@app/components/svg";

interface ClientTypeModalProps extends ViewProps<ClientPersona> {
  title:string
}

const Card = ({
  handleClose,
  icon,
  name,
  value,
}: ClientTypeObj &
  Pick<PageSizeModalProps<ClientTypeModalProps>, "handleClose">) => {
  const Icon = SVG[icon];
  return (
    <button
      className="w-full h-[40vh] bg-dark-gray-300 px-5 py-7 flex flex-col"
      onClick={() => handleClose(value)}
    >
      <section
        className="border-b-2 w-full flex-[3] py-3 flex flex-col justify-between"
        style={{ borderColor: '#DAC1E0' }}
      >
        {Icon && <Icon className="self-center h-[7rem]" />}
        <span className="text-left text-[1.5rem]">{name}</span>
      </section>
      <section className="flex justify-end w-full flex-[3] items-end">
        <SVG.ArrowRight className="w-[30px] text-primary" />
      </section>
    </button>
  );
};

function ClientTypeModal({
  visibleStyles,
  show,
  handleClose,
  title
}: PageSizeModalProps<ClientTypeModalProps>) {
  const types = useMemo(createClientTypes, []);
  return (
    <Dialog
      header={
        <div className="dialog-header">
          <h2 className="dialog-title !text-[#6B3374]">{title}</h2>
        </div>
      }
      visible={show}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      draggable={false}
      onHide={() => handleClose(undefined)}
      contentStyle={{ padding: "1rem 5rem 5rem 5rem" }}
      style={{ width: "70vw", borderRadius: 10 }}
      focusOnShow={false}
    >
      <h1 className="my-5">Selecciona el tipo de régimen</h1>
      <section className="flex flex-col md:flex-row gap-5 items-center">
        {types.map((type) => (
          <Card key={type.value} {...type} handleClose={handleClose} />
        ))}
      </section>
    </Dialog>
  );
}

export default withModalPageSize(ClientTypeModal);
