import { PropsWithChildren } from "react";
import Grid, { type ItemProps } from "@app/components/Grid";
import { ClientCollection } from "@app/types/Clients";
import { ClientFulfillment } from "@app/types/Dossiers";
import { Button } from "primereact/button";
import { copyToClipboard } from "@app/utils/DOM";
import { toast } from "react-toastify";
import { LeadsCollection } from "@app/types/Leads";
import { DateDDMMYYHHMMA } from "@app/common/date";

export const RazonSocialTemplate = (item: ClientCollection) => (
  <>{item.infoComercio?.razonSocial}</>
);

export const TitularTemplate = (item: ClientCollection) => (
  <>{item.infoComercio?.titular}</>
);

export const FechaTemplate = (item: LeadsCollection) => DateDDMMYYHHMMA( new Date(item.fecha));

export const CorreoColumn = (item: LeadsCollection) => (
  <div className="flex justify-center" ><i className="pi pi-envelope cursor-pointer text-[#B8AFE6]" onClick={()=>doSomething(item.email)} /></div>
);

function doSomething(email: string){
  copyToClipboard(email);
  toast.success('Correo electrónico copiado correctamente')
}
export const UbicacionTemplate = (item: ClientCollection) => (
  <>{item.infoDomicilio?.estado}</>
);

export const TelefonoTemplate = (item: ClientCollection) => (
  <>{item.infoComercio?.telefono}</>
);

interface FormItemProps extends ItemProps {
  title?: string;
  error?: string;
  info?: string;
  infoClassName?: string;
  required?: boolean;
  row?: boolean;
  maxWidth?: string;
  flex?: boolean;
  disabled?: boolean;
}

interface FormItemFulfillmentProps extends ItemProps {
  title?: string;
  error?: string;
  info?: string;
  infoClassName?: string;
  required?: boolean;
  row?: boolean;
  flex?: boolean;
  disabled?: boolean;
  maxWidth?: string;
  name: string;
  fulfillment: ClientFulfillment;
  setFulfillment: React.Dispatch<React.SetStateAction<ClientFulfillment>>;
  canFulfillment: boolean;
}

export const FormItem = ({
  children,
  ...props
}: PropsWithChildren<FormItemProps>) => (
  <Grid.Item
    {...props}
    className={`flex ${
      props.row ? "flex-row items-start" : "mb-3 flex-col justify-center"
    } ${props.maxWidth ?? "w-full"}  ${props.className}`}
  >
    <div className="flex flex-col md:gap-1 md:flex-row md:items-center mr-3">
      <p
        className={`text-gray-800 text-md mb-2 
        ${!props.title ? "opacity-0" : ""}
        ${props.disabled ? "txt-disabled" : ""}
        `}
      >
        {props.title ?? "_"}
        {props.required && <span className="pb-4">*</span>}
      </p>
      {props.error && <small className="p-error">{props.error}</small>}
    </div>
    {children}
    {props.info && <small className={props.infoClassName}>{props.info}</small>}
  </Grid.Item>
);

export const FormLayoutContainer = ({ children }: PropsWithChildren) => (
  <div className="border-b border-blue-200 text-left py-5">{children}</div>
);

export const FormItemFulfillment = ({
  children,
  ...props
}: PropsWithChildren<FormItemFulfillmentProps>) => {
  const { fulfillment, setFulfillment, name } = props;
  const active = fulfillment[name as keyof ClientFulfillment] ?? undefined;

  return (
    <FormItem {...props}>
      <div className={`formItemFulfillment has ${!props.flex ? "flex" : ""}`}>
        {children}
        {props.canFulfillment && (
          <div className="buttons-check">
            <Button
              type="button"
              icon="pi pi-times"
              text
              raised
              className={`button ${active === false ? "active" : ""} `}
              severity="danger"
              onClick={() => {
                const newValue = active == false ? undefined : false;
                const tpmFulfillment = {
                  ...fulfillment,
                  [name]: newValue,
                };
                delete tpmFulfillment[name + "Reason"];
                if (newValue == undefined) {
                  delete tpmFulfillment[name];
                }
                setFulfillment(tpmFulfillment);
              }}
            />
            <Button
              type="button"
              className={`button ${active === true ? "active" : ""} `}
              icon="pi pi-check"
              text
              raised
              severity="info"
              onClick={() => {
                const newValue = active == true ? undefined : true;
                const tpmFulfillment = {
                  ...fulfillment,
                  [name]: newValue,
                };
                delete tpmFulfillment[name + "Reason"];
                if (newValue == undefined) {
                  delete tpmFulfillment[name];
                }
                setFulfillment(tpmFulfillment);
              }}
            />
          </div>
        )}
      </div>
    </FormItem>
  );
};
