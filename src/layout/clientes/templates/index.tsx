import { PropsWithChildren } from "react";
import { CSSProperties } from "react";
import { toast } from "react-toastify";
import { Button, ButtonExcel } from "@app/components/Buttons";
import Grid, { type ItemProps } from "@app/components/Grid";

import {
  ClientCollection,
  ClientExcelColumns,
  ClientGetExcelParams,
} from "@app/types/Clients";
import { ExcelExportBody } from "@app/types/Excel";
import { ClientFulfillment } from "@app/types/Dossiers";
import { ClientsControllers } from "@app/logic/backend/clients";
import { DateDDMMYYHHMMA } from "@app/common/date";
import { CLIENT_EXCEL_CONFIG } from "@app/constants/client";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";

export interface FormItemProps extends ItemProps {
  title?: string;
  error?: string;
  info?: string;
  infoClassName?: string;
  required?: boolean;
  row?: boolean;
  maxWidth?: string;
  minWidth?: string;
  flex?: boolean;
  disabled?: boolean;
  labelError?: string | boolean | undefined;
  style?: CSSProperties;
}

export interface FormItemFulfillmentProps extends ItemProps {
  title?: string;
  error?: string;
  info?: string;
  infoClassName?: string;
  required?: boolean;
  row?: boolean;
  flex?: boolean;
  disabled?: boolean;
  maxWidth?: string;
  minWidth?: string;
  name: string;
  fulfillment: ClientFulfillment;
  setFulfillment: React.Dispatch<React.SetStateAction<ClientFulfillment>>;
  canFulfillment: boolean;
  download?: string;
  style?: CSSProperties;
}

interface ClientesTableHeaderProps {
  isMaster: boolean;
  loading: boolean;
  params: ClientGetExcelParams;
}

export const FormItem = ({
  children,
  ...props
}: PropsWithChildren<FormItemProps>) => (
  <Grid.Item
    {...props}
    className={`flex ${props.row ? "flex-row items-start" : "mb-3 flex-col"} ${props.maxWidth ?? "w-full"
      } ${props.minWidth ?? "w-full"} ${props.className ?? ""}`}
  >
    <div className="flex flex-col md:gap-1 md:flex-row md:items-center mr-3">
      <p
        className={`text-md mb-2 
        ${props.labelError == undefined ? "text-gray-800" : props.labelError ? "text-[#FF5758]" : "text-[#60b650]"}
        ${props.title ? "" : "opacity-0"}
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
  const { fulfillment, setFulfillment, name, download = "" } = props;

  const active = fulfillment
    ? fulfillment[name as keyof ClientFulfillment] ?? undefined
    : false;

  return (
    <FormItem {...props}>
      <div
        className={`formItemFulfillment has ${!props.flex ? "flex" : ""
          } w-full `}
      >
        {children}
        {props.canFulfillment && (
          <div
            className={`buttons-check ml-5 flex justify-between ${props?.title === "Calle"
              ? "w-[7.5%]"
              : props?.title?.includes("t.")
                ? "w-[31%]"
                : "w-[15%]"
              }`}
          >
            <Button
              type="button"
              icon={`pi pi-times ${active === false ? "text-[#D82B2C]" : "text-[#6A6D74]"}`}
              text
              raised
              className={`button ${active === false ? "active" : ""} `}
              style={{ borderRadius: 6 }}
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
              style={{ borderRadius: 6 }}
              icon={`pi pi-check ${active ? "text-[#6B3374]" : "text-[#6A6D74]"}`}
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

export const ClientesTableHeader = ({
  isMaster,
  loading,
  params,
}: ClientesTableHeaderProps) => {
  return (
    <ButtonExcel
      disabled={loading}
      getItemAsync={getItemAsync(params)}
      getWorksheets={getWorksheets}
      fileName={getName}
    />
  );
};
const getItemAsync =
  (params: ClientGetExcelParams) =>
  async (): Promise<ClientExcelColumns[] | null> => {
    const clients = await ClientsControllers.excel(params);

    if (!clients.isSuccess) {
      toast.error(
        "Ha ocurrido un error. Por favor, intente más tarde.",
        DEFAULT_TOAST_CONFIGURATION
      );
      return null;
    }

    return clients.response;
  };
const getName = () => {
  return `Clientes ${new Date()}`;
};
const getWorksheets = (
  items: ClientExcelColumns[]
): ExcelExportBody<ClientExcelColumns> => {
  return {
    worksheets: [
      {
        name: "Clientes",
        items:
          items.map((x) => ({
            ...x,
            fechaIncorporacion: DateDDMMYYHHMMA(new Date(x.fechaIncorporacion)),
          })) ?? [],
        options: CLIENT_EXCEL_CONFIG,
      },
    ],
  };
};
