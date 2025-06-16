import { SectionTab } from "@app/types/Form";
import GeneralContent from "../contents/general";
import DireccionContent from "../contents/direccion";
import ContactosContent from "@app/layout/ventas/clientesreferidos/contents/contactos";
import DocumentacionContent from "@app/layout/ventas/clientesreferidos/contents/documentacion";
import CotizacionContent from "@app/layout/ventas/clientesreferidos/contents/cotizacion";
import { TabLayoutSimple } from "@app/layout/clientes/form/forms/layout";
export default function createTabs(): SectionTab[] {
  return [
    {
      title: "",
      keyname: "general",
      display: "General",
      Content: GeneralContent,
      TabLayout: TabLayoutSimple,
    },
    {
      title: "",
      keyname: "direccion",
      display: "Dirección",
      Content: DireccionContent,
      TabLayout: TabLayoutSimple,
    },
    {
      title: "",
      keyname: "contactos",
      display: "Contactos",
      Content: ContactosContent,
      TabLayout: TabLayoutSimple,
    },

    {
      title: "",
      keyname: "documentacion",
      display: "Documentación",
      Content: DocumentacionContent,
      TabLayout: TabLayoutSimple,
    },
    {
      title: "",
      keyname: "Cotizacion",
      display: "Cotización",
      Content: CotizacionContent,
      TabLayout: TabLayoutSimple,
    },
  ];
}
