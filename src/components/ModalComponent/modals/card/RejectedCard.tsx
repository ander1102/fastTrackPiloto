import withModalPageSize, {
    PageSizeModalProps,
  } from "@app/components/HOC/withModalPageSize";
  import { ViewProps } from "@app/components/ViewManager/View/comp";
  import { Dialog } from "primereact/dialog";
  
  import styles from "@app/components/ModalComponent/modal.module.css";
  
  function RejectedCardModal({
    visibleStyles,
    handleClose,
    show,
  }: PageSizeModalProps<ViewProps<boolean>>) {
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
          <img
            alt="request"
            src="/Images/cards/rejected.svg"
            className="w-56 h-48"
          />
          <h2 className="text-black-1 text-center text-2xl mb-3">
            Tu solicitud fue rechazada
          </h2>
          <span className="text-grey-1 text-center mb-3">
          Si tienes alguna duda, contacta a
          </span>
          <a href="#" className="text-primary" >atención a clientes </a>
       
        </section>
      </Dialog>
    );
  }
  
  export default withModalPageSize(RejectedCardModal);
  