import {
  CSSProperties,
  ComponentType,
  useContext,
  useMemo,
  useState,
} from "react";
import { ViewProps } from "../ViewManager/View/comp";
import { PageSizeContext, PageSizeContextProps } from "@app/context/Size";
import { Sleep } from "@app/common";

export type PageSizeModalProps<IProps extends ViewProps<any>> =
  PageSizeContextProps &
    IProps &
    withModalPageSizeProps<
      IProps extends ViewProps<infer IResult> ? IResult : any
    >;

interface withModalPageSizeProps<IResult> {
  show: boolean;
  handleClose: (res?: IResult) => void;
}

export default function withModalPageSize<
  IProps extends ViewProps<any>,
  IResult extends IProps extends ViewProps<infer IRes> ? IRes : any
>(Modal: ComponentType<PageSizeModalProps<IProps>>) {
  return (props: IProps) => {
    const [show, setShow] = useState(true);
    const ctx = useContext(PageSizeContext);
    const styles: CSSProperties = useMemo(
      () => ({
        ...ctx.visibleStyles,
        width:
          ctx.visibleStyles.marginLeft &&
          `calc(100% - ${ctx.visibleStyles.marginLeft})`,
      }),
      [ctx.visibleLeft]
    );

    const handleClose = (res?: IResult) => {
      setShow(false);
      //Se agrega un delay para que se complete la animacion de cierre antes de desmontarse el modal
      Sleep(0.5).then(() => {
        props.onClose(res as IResult);
      });
    };

    return (
      <Modal
        {...props}
        {...ctx}
        visibleStyles={styles}
        show={show}
        handleClose={handleClose}
      />
    );
  };
}
