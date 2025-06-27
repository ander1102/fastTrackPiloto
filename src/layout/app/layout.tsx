import { HTMLAttributes, PropsWithChildren } from "react";
import { SVG } from "@app/components/svg";
import { useRouter } from "next/router";
import styles from "@app/styles/NewUser.module.css";
import Link from "next/link";
import { Dropdown } from "primereact/dropdown";
import { LEADESTATUS } from "@app/constants/form";
import { LeadsControllers } from "@app/logic/backend/leads";
import { toast } from "react-toastify";
import { ButtonDetails } from "@app/components/Buttons";
import { modalManager } from "@app/components/ModalComponent";
import ModalConfirmChange from "@app/components/ModalComponent/modals/leads/statusChangeModal";

interface PageFormTitleProps {
  title: string;
  showEditIcon?: boolean;
  icon?: boolean;
  color?: string;
  onEditIconClick?: () => void;
  disabled?: boolean;
}

export default function PageLayout({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <article {...props} className="w-full flex flex-col h-full grow">
      {children}
    </article>
  );
}

export function LeadsLayout({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <article {...props} className="w-full !h-[100vh] flex flex-col grow">
      {children}
    </article>
  );
}

export const PageFormLayout = ({ children }: PropsWithChildren) => (
  <article className="w-full h-full flex-1 flex flex-col bg-white px-10 py-8">
    {children}
  </article>
);

export const PageFormTitle = ({
  title,
  showEditIcon,
  icon = true,
  onEditIconClick,
  disabled,
  children,
}: PropsWithChildren<PageFormTitleProps>) => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      {children}
      <p className="text-2xl text-primary-color flex items-center cursor-pointer">
        {icon && <SVG.ArrowLeft className={styles.arrowIcon} />}

        {title}
      </p>
      {showEditIcon && (
        <i
          className={
            disabled === true
              ? "pi pi-pencil ml-3 cursor-pointer text-primary-color"
              : "pi pi-check ml-3 cursor-pointer text-primary-color"
          }

          onClick={onEditIconClick}
        />
      )}
    </div>
  );
};

export const FormTitle = ({
  title,
  showEditIcon,
  icon = true,
  onEditIconClick,
}: PageFormTitleProps) => {
  const router = useRouter();
  return (
    <div>
      <p className={`text-2xl cursor-pointer mb-3`}>
        {title}{" "}
        {showEditIcon && (
          <i
            className="pi pi-pencil ml-3 cursor-pointer"
            onClick={onEditIconClick}
          />
        )}
      </p>
      <p
        className="flex text-xl items-center cursor-pointer text-[#6A6D74]"
        onClick={() => router.back()}
      >
        {icon && <i className={"pi pi-arrow-left  mr-3"} />} Regresar
      </p>
    </div>
  );
};

export enum STATUS_NAME {
  ACTIVO = "Activo",
  HABILITADO = "Habilitado",
  PROSPECTO = "Prospecto",
  SIN_MOVIMIENTO = "Sin movimiento",
  INACTIVO = "Inactivo",
  EN_PROCESO = "En proceso",
  DESHABILITADO = "Deshabilitado",
  EN_PROGRESO = "En progreso",
  CONFIGURAR = "Configurar",
  REVISAR = "Revisar"
}
export enum STATUS_COLOR {
  GREEN = "bg-status-green",
  YELLOW = "bg-status-yellow",
  ORANGE = "bg-status-orange",
  RED = "bg-status-red",
  BROWN = "bg-status-brown",
  PURPLE = "bg-status-purple"
}
export const StatusBodyTemplate = ({
  estatus,
}: {
  estatus: string | number;
}) => {


  const STATUS_CLASS: { [key: string]: string } = {
    [STATUS_NAME.ACTIVO]: STATUS_COLOR.GREEN,
    [STATUS_NAME.HABILITADO]: STATUS_COLOR.GREEN,
    [STATUS_NAME.PROSPECTO]: STATUS_COLOR.YELLOW,
    [STATUS_NAME.SIN_MOVIMIENTO]: STATUS_COLOR.YELLOW,
    [STATUS_NAME.INACTIVO]: STATUS_COLOR.ORANGE,
    [STATUS_NAME.EN_PROCESO]: STATUS_COLOR.ORANGE,
    [STATUS_NAME.DESHABILITADO]: STATUS_COLOR.RED,
    [STATUS_NAME.EN_PROGRESO]: STATUS_COLOR.RED,
    [STATUS_NAME.CONFIGURAR]: STATUS_COLOR.BROWN,
    "0": STATUS_COLOR.RED,
    "1": STATUS_COLOR.GREEN,
    [STATUS_NAME.REVISAR]: STATUS_COLOR.PURPLE,
  };
  return (
    <div className="w-full font-normal truncate flex items-center">
      <div className={`rounded-full h-2 w-2 ${STATUS_CLASS[estatus]}`} />
      &nbsp;{estatus}
    </div>
  );
};

export const FulfillmentlBodyTemplate = ({
  expediente,
  id,
}: {
  expediente: string;
  id: number;
}) => {
  const arrayClass = {
    Pendiente: "bg-status-yellow rounded-full h-2 w-2",
    Terminado: "bg-status-green rounded-full h-2 w-2",
    Validar: "bg-status-orange rounded-full h-2 w-2",
  };
  return (
    <Link
      className="w-full font-normal truncate flex items-center cursor-pointer"
      href={`/dashboard/expediente/${id}`}
    >
      <div className={(arrayClass as any)[expediente]} />
      &nbsp;{expediente}
    </Link>
  );
};

export const DetailsTemplate = ({ path }: { path: string }) => {
  return (
    <Link href={path}>
      <ButtonDetails />
    </Link>
  );
};

export const LeadStatusBodyTemplate = ({
  expediente,
  id,
  onRefresh,
}: {
  expediente: string;
  id: number;
  onRefresh: any;
}) => {
  return (
    <Dropdown
      options={LEADESTATUS}
      value={expediente}
      onChange={(e) => {
        handleLeadEstatus(e.value, id, onRefresh);
      }}
      optionValue="value"
      optionLabel="label"
      placeholder={"Estatus"}
      valueTemplate={selectedEstatusTemplate}
      style={{ border: "none", background: "transparent" }}
      dropdownIcon={"none"}
      id={"leadStatusDrop"}
    />
  );
};

const selectedEstatusTemplate = (option: string, props: any) => {
  if (props.value) {
    return satusBodyTemplate(props.value);
  }
  return <span>{props.placeholder}</span>;
};

const satusBodyTemplate = (item: string) => {
  const arrayClass = {
    Convertido:
      "w-full font-normal truncate flex items-center cursor-pointer !font-[700]",
    Nuevo: "w-full font-normal truncate flex items-center cursor-pointer",
    Calificado: "w-full font-normal truncate flex items-center cursor-pointer",
    Contactado: "w-full font-normal truncate flex items-center cursor-pointer",
    NoCalificado:
      "w-full font-normal truncate flex items-center cursor-pointer",
  };

  return (
    <p className={(arrayClass as any)[item]}>
      {" "}
      <i className="pi pi-pencil" /> &nbsp; {item}{" "}
    </p>
  );
};

const handleLeadEstatus = async (value: string, id: number, onRefresh: any) => {
  let cuales = { newStatus: value };
  const cambioEstatus = await modalManager.show(
    ModalConfirmChange,
    { item: cuales },
    "dashboard/leads"
  );
  if (cambioEstatus === true) sendStatusChange(value, id, onRefresh);
};

const sendStatusChange = (value: string, id: number, onRefresh: any) => {
  LeadsControllers.updateLeadStatus({ idagep_leads: id, estatus: value })
    .then((res) => {
      if (res.isSuccess) {
        toast.success("Estatus actualizado correctamente");
        onRefresh([]);
      }
    })
    .catch((res) => {
      toast.error("Ocurrió un error al actualizar estado");
    });
};

export const LeadsDetailsTemplate = ({ path }: { path: string }) => {
  return (
    <Link
      href={path}
      style={{ background: "transparent", color: "#5840D1", border: "none" }}
      className="bg-transparent text-[#5840D1] cursor-pointer"
    >
      <SVG.ArrowRight width={20} />
    </Link>
  );
};
