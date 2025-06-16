import { SectionTab } from "@app/types/Form";
import GeneralContent from "../../sharedContents/general";
import DireccionContent from "../../sharedContents/direccion";
import ContantosContent from "../../sharedContents/contactos";
import DocumentacionContent from "../../sharedContents/documentacion";
import OperacionesContent from "../../sharedContents/operaciones";
import FinanzasContent from "../../sharedContents/finanzas";
import CotizacionContent from "../../sharedContents/cotizacion";
import RepresentantesContent from "../contents/representantes";
import TabLayout from "../../layout";

export default function createTabs(): SectionTab[] {
  return [
    {
      title: "Información del cliente",
      keyname: "general",
      display: "General",
      Content: GeneralContent,
      TabLayout,
    },
    {
      title: "Documentación",
      keyname: "documentacion",
      display: "Documentación",
      Content: DocumentacionContent,
      TabLayout,
    },
    {
      title: "Operaciones",
      keyname: "operaciones",
      display: "Operaciones",
      Content: OperacionesContent,
      TabLayout,
    },
    {
      title: "Dirección Fiscal",
      keyname: "direccion",
      display: "Dirección Fiscal",
      Content: DireccionContent,
      TabLayout,
    },
    {
      title: "Contactos",
      keyname: "contactos",
      display: "Contactos",
      Content: ContantosContent,
      TabLayout,
    },

    {
      title: "Representantes",
      keyname: "representantes",
      display: "Representantes",
      Content: RepresentantesContent,
      TabLayout,
    },
    // {
    //   title: "Finanzas",
    //   keyname: "finanzas",
    //   display: "Finanzas",
    //   Content: FinanzasContent,
    // },
    // {
    //   title: "Cotización",
    //   keyname: "cotizacion",
    //   display: "Cotización",
    //   Content: CotizacionContent,
    // },
  ];
}
