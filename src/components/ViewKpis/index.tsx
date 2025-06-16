import { PropsWithChildren } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button, ButtonMini } from "../Buttons";
import { COMMON_TOOLTIP_OPTIONS } from "@app/constants";
import { useRouter } from "next/router";

interface KpiContainerProps extends PropsWithChildren {
  back?: boolean;
  className?: string;
  itemsContainerClassName?: string;
  title?: string;
}

export function KpiContainer({
  back,
  children,
  className = "",
  itemsContainerClassName = "",
  title = "",
}: KpiContainerProps) {
  const router = useRouter();
  return (
    <div
      className={`kpi-container ${
        children ? "gap-x-8 gap-y-5" : ""
      } ${className}`}
    >
      {title && (
        <div className={`kpi-container-title ${back ? "min-h-[6rem]" : ""}`}>
          <h1 className="kpi-title">{title}</h1>
          {back && (
            <Button className="button-back" onClick={router.back}>
              <i className="pi pi-arrow-left" />
              Regresar
            </Button>
          )}
        </div>
      )}

      <div className={`kpi-container-items ${itemsContainerClassName}`}>
        {children}
      </div>
    </div>
  );
}

interface KpiItemProps {
  className?: string;
  estatus?: string;
  loading?: boolean;
  title?: string;
  tooltip?: string;
  value: string | number;
}

export function KpiItem({
  className = "",
  estatus,
  loading,
  title,
  tooltip,
  value,
}: KpiItemProps) {
  return (
    <div
      className={`kpi-item ${loading ? "!justify-center items-center" : ""} ${
        value.toLocaleString().length > 10 ? "min-w-min" : "min-w-[10.5rem]"
      } ${className}`}
    >
      {loading ? (
        <ProgressSpinner
          className="!w-8 !h-8 !m-0"
          strokeWidth="7"
          animationDuration=".5s"
        />
      ) : (
        <>
          <div className={`kpi-item-title-container ${tooltip ? "pr-5" : ""}`}>
            {getStatusColor(estatus) && (
              <span
                className={`rounded-full h-2 w-2 ${getStatusColor(estatus)}`}
              />
            )}
            <span className="kpi-item-title">{title}</span>
          </div>
          <span className="kpi-item-value">{value}</span>
          {tooltip && (
            <div className="kpi-item-tooltip">
              <ButtonMini
                aria-disabled
                tabIndex={-1}
                tooltip={tooltip}
                tooltipOptions={COMMON_TOOLTIP_OPTIONS}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

const getStatusColor = (estatus?: string) => {
  switch (estatus?.toLocaleLowerCase()) {
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
