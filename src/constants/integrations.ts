import { IntegrationLinksProps } from "@app/layout/integraciones/links";
import { DropdownOptions } from "@app/types/Form";
import { IntegrationExcelColumn, LINK_ESTATUS } from "@app/types/Integrations";
import { ExcelCell, ExcelOptions } from "@app/types/Excel";
import { DROPDOWN_ALL } from "./form";

export const INTEGRATIONS_LINK_ITEMS: IntegrationLinksProps[] = [
  {
    title: "Link de Pago",
    description:
      "Genera un link de pago único y comparte con tus clientes bajo tus especificaciones de monto y concepto.",
    imagePath: "/Images/integrations/payment_link.svg",
  },
  {
    title: "Link de Negocio",
    description:
      "Genera un link de negocio y comparte con tus clientes para comenzar a hacer cobros.",
    imagePath: "/Images/integrations/payment_negocio.svg",
  },
];

export const LIFE_TIME_DROPDOWN_OPTIONS: DropdownOptions<number>[] = [
  { label: "15 minutos", value: 900 },
  { label: "1 hora", value: 3600 },
  { label: "24 horas", value: 86400 },
];

export const ESTATUS_LINK: DropdownOptions<string>[] = DROPDOWN_ALL("").concat([
  {
    label: LINK_ESTATUS.Pagado,
    value: LINK_ESTATUS.Pagado,
  },
  {
    label: LINK_ESTATUS.Pendiente,
    value: LINK_ESTATUS.Pendiente,
  },
  {
    label: LINK_ESTATUS.Vencido,
    value: LINK_ESTATUS.Vencido,
  },
]);

const INTEGRATION_EXCEL_LINKS_COLUMNS: Record<
  keyof IntegrationExcelColumn,
  string
> = {
  empresa: "Empresa",
  estatus: "Estatus",
  fechaCreacion: "Fecha de creación",
  fechaPago: "Fecha de pago",
  idagep_integraciones_link_pago: "ID de Link",
  monto: "Monto",
  referencia: "Referencia",
  req_id: "ID de Transacción",
};

const INTEGRATION_EXCEL_LINKS_HEADER_CONFIG = Object.fromEntries(
  Object.keys(INTEGRATION_EXCEL_LINKS_COLUMNS).map((key) => [
    key,
    {
      height: 30,
      align: "left",
      alignVertical: "bottom",
      fontWeight: "bold",
      wrap: true,
    } as ExcelCell,
  ])
);

export const INTEGRATION_EXCEL_LINKS_CONFIG: Partial<
  ExcelOptions<IntegrationExcelColumn>
> = {
  displayColumns: INTEGRATION_EXCEL_LINKS_COLUMNS,
  headerOptions: INTEGRATION_EXCEL_LINKS_HEADER_CONFIG,
  columnOptions: {
    monto: { width: 15 },
    empresa: { width: 20 },
    estatus: { width: 15 },
    fechaCreacion: { width: 20 },
    fechaPago: { width: 20 },
    idagep_integraciones_link_pago: { width: 15 },
    req_id: { width: 15 },
    referencia: { width: 20 },
  },
  itemOptions: {
    monto: { type: "number", format: "$#,##0.00" },
  },
};
