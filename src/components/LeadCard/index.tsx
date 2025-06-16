
interface myStylesObject {
  card: string;
  title: string;
  text: string;
}

interface LeadCardProps {
  title: string;
  content: any;
  cardStyles?: myStylesObject;
  variant?: string;
}

const TEMPLATE_COLUMNS = 5;
const getStatusColor = (title?: string) => {
  switch (title?.toLocaleLowerCase()) {
    case "estado activo":
      return "bg-status-green";
    case "estado sin movimientos":
      return "bg-status-yellow";
    case "estado inactivo":
      return "bg-status-orange";
    case "estado deshabilitado":
      return "bg-status-red";
    case "estado configurar":
      return "bg-status-brown";
    default:
      return;
  }
};

export default function StatusCard(props: LeadCardProps) {
  return (
    <div className={props?.cardStyles?.card}>
       {props.variant === 'clients' ?
      <>
        <div
            className={
              props?.cardStyles?.title &&
              "flex items-center gap-2 text-light-gray-500"
            }
          >
            <span className={`rounded-full h-2 w-2 mr-2 ${getStatusColor(props.title)}`} />
            <span className="flex-1">{props.title}</span>
          </div>
          <div>
            <span className={props?.cardStyles?.text && "text-base"}>
              {props.content}
            </span>
          </div>
      </>
      :
      <>
        <span className={props?.cardStyles?.title}>{props.title}</span>
        <span className={props?.cardStyles?.text}>{props.content}</span>
      </>
    }
    </div>
  );
}
