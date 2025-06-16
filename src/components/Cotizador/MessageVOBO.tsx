import { Message } from "primereact/message";
import { VOBO_TYPE } from "./constants";

const MessageVOBO = (vobo: string) => {
  switch (vobo) {
    case VOBO_TYPE.ENVIAR_PARA_VOBO:
      return (
        <div className="my-5">
          <Message
            severity="success"
            text="Se ha realizado la configuración del cliente con éxito."
          />
        </div>
      );
    case VOBO_TYPE.NEGADO:
      return (
        <div className="my-5">
          <Message
            severity="error"
            text="Se requiere una tasa mayor de débito y crédito para realizar la configuración del cliente."
          />
        </div>
      );
    case VOBO_TYPE.ENVIAR_VOBO_PARA_REVISION:
      return (
        <div className="my-5">
          <Message
            severity="warn"
            text="Se requiere una tasa mayor de  crédito para realizar la configuración del cliente."
          />
        </div>
      );
    default:
      return null;
  }
};

export default MessageVOBO;
