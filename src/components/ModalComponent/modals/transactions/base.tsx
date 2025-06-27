import { PageSizeModalProps } from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog, DialogProps } from "primereact/dialog";
import { ReactElement, useMemo } from "react";

interface TransactionModalBaseProps extends ViewProps {
  title: string;
  body1: ReactElement;
  body2: ReactElement;
  imageSrc: string;
  footer?: ReactElement;
  dialogProps?: Partial<DialogProps>;
  unMountContent?: boolean;
  unMountReplaceElement?: ReactElement;
}

export default function TransactionModalBase({
  title,
  body1,
  body2,
  footer,
  dialogProps,
  imageSrc,
  unMountContent,
  unMountReplaceElement,
  handleClose,
  show,
  visibleStyles,
}: PageSizeModalProps<TransactionModalBaseProps>) {
  const CIRCLE = useMemo(() => Array.from({ length: 7 }), []);
  return (
    <Dialog
      maskClassName="modalTransaction"
      {...(dialogProps || {})}
      visible={show}
      maskStyle={visibleStyles}
      draggable={false}
      pt={{
        content: {
          className: "max-w-[70vw] md:max-w-[45vw] lg:max-w-[35vw]",
        },
      }}
      onHide={handleClose}
      dismissableMask
    >
      {unMountContent === true ? (
        <>{unMountReplaceElement}</>
      ) : (
        <article className="max-w-xl">
          <div className="flex justify-center mb-2">
            <img src={imageSrc} width={50} height={50} alt="" />{" "}
          </div>

          <div className="text-2xl text-center text-primary-color mb-2">{title}</div>

          <div className="bg-white p-5 relative mb-8">
            <div className="pb-5">
              <section>{body1}</section>
              <div className="w-full border-t border-dashed border-1 border-thin border-[#386EB1] my-3"></div>

              <section>{body2}</section>
            </div>
            <div
              className="flex justify-between absolute w-full left-0 right-0 bottom-neg-25"
              style={{ transform: "scale(1.1)" }}
            >
              {CIRCLE.map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-3xl bg-[#F0F0F0]" />
              ))}
            </div>
          </div>

          <section>{footer}</section>
        </article>
      )}
    </Dialog>
  );
}
